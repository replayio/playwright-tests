const axios = require("axios");
const retry = require("async-retry");
const getUrls = require("get-urls");

const emailQuery = `
query email($created_after: String!, $to: String!) {
  email(created_after: $created_after, to: $to) {
    from
    html
    subject
    text
    to
  }
}
`;

const pollForEmail = async ({
  apiKey,
  createdAfter,
  teamId,
  timeoutMs,
  to,
}) => {
  let timeout = false;

  const requestPromise = retry(
    async (_, attempt) => {
      if (timeout) return;

      try {
        console.log(`wait for email to ${to}, attempt ${attempt}`);

        const result = await axios.post(
          "https://www.qawolf.com/api/graphql",
          {
            query: emailQuery,
            variables: {
              created_after: createdAfter.toISOString(),
              to,
            },
          },
          { headers: { authorization: apiKey, "x-qawolf-team-id": teamId } }
        );

        const { data, errors } = result?.data || {};
        if (errors?.length > 0) {
          throw new Error("GraphQL Errors " + JSON.stringify(errors));
        }

        const email = data?.email;
        if (!email) throw new Error(`email to ${to} not received`);

        console.log(`found email to ${to} with subject ${email.subject}`);

        return email;
      } catch (e) {
        console.debug(
          `pollForEmail failed ${e} ${JSON.stringify(e.response?.data)}`
        );
        throw e;
      }
    },
    {
      factor: 1,
      maxTimeout: 3000,
      minTimeout: 3000,
      retries: Math.round(timeoutMs / 3000),
    }
  );

  const timeoutPromise = new Promise((_, reject) => {
    setTimeout(() => {
      timeout = true;
      reject(new Error(`Email to ${to} not found`));
    }, timeoutMs);
  });

  return Promise.race([requestPromise, timeoutPromise]);
};

function getInbox(args = {}) {
  const apiKey = process.env.QAWOLF_API_KEY;
  const teamId = process.env.QAWOLF_TEAM_ID;

  const calledAt = new Date();
  let email = "replay@qawolf.email";

  if (args.id || args.new) {
    const [inbox, domain] = email.split("@");
    email = `${inbox}+${args.id || slug()}@${domain}`;
  }

  function sendMessage(options) {
    if (!options.to) throw new Error("must include the to field");
    if (!options.subject) throw new Error("must include the subject field");
    if (!options.html && !options.text) {
      throw new Error("must include the html field or text field");
    }

    return sendEmail({
      ...options,
      apiKey,
      from: email,
      teamId,
    });
  }

  async function waitForMessage({ after, timeout } = {}) {
    if (after && !(after instanceof Date)) {
      throw new Error("after must be a Date");
    }

    const message = await pollForEmail({
      apiKey,
      createdAfter: after || calledAt,
      teamId,
      timeoutMs: timeout || 60000,
      to: email,
    });

    // text first since it will have less noisy urls
    const urls = Array.from(getUrls([message.text, message.html].join(" ")))
      // ignore xml
      .filter((u) => !u.includes("w3.org"))
      // sort for deterministic order
      .sort();

    return { ...message, urls };
  }

  return { email, sendMessage, waitForMessage };
}

module.exports = { getInbox };
