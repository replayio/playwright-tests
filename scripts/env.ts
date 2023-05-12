import fetch from "node-fetch";
import { config } from "dotenv";
import fs from "fs";

config({ path: fs.existsSync(".env.local") ? ".env.local" : ".env" });

async function run() {
  const authorization = process.env.QAWOLF_API_KEY;
  const teamId = process.env.QAWOLF_TEAM_ID;
  const environmentId = process.env.QAWOLF_ENVIRONMENT_ID;

  if (!authorization) {
    throw new Error("QAWOLF_API_KEY was unset and is required");
  }
  if (!teamId) {
    throw new Error("QAWOLF_TEAM_ID was unset and is required");
  }
  if (!environmentId) {
    throw new Error("QAWOLF_ENVIRONMENT_ID was unset and is required");
  }

  const resp = await fetch("https://app.qawolf.com/api/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "x-qawolf-team-id": teamId,
      authorization,
    },
    body: JSON.stringify({
      operationName: "environment",
      variables: {
        id: environmentId,
      },
      query: `
        query environment($id: String!) {
              environment(where: {id: $id}) {
                ...EnvironmentFragment
                __typename
            }
        }
          
          fragment EnvironmentFragment on Environment {
              id
              name
              variablesJSON
              variables(orderBy: {name: asc}) {
                ...EnvironmentVariableFragment
                __typename
            }
            __typename
        }
        
        fragment EnvironmentVariableFragment on EnvironmentVariable {
            created_at
            environment_id
            id
            name
            value
            __typename
        }
      `,
    }),
  });

  const json = await resp.json();

  const env = JSON.parse(json.data?.environment?.variablesJSON || "{}");

  process.env = {
    ...process.env,
    ...env,
  };

  await import(
    require.resolve(process.argv[2], {
      paths: [__dirname, process.cwd()],
    })
  );
}

run();
