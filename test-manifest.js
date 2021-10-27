const env = require("dotenv").config();

const PlaywrightTests = [
  { name: "examples/airbnb.js" },
  { name: "examples/airtable.js" },
  { name: "examples/climatescape.js" },
  { name: "examples/codesandbox.js" },
  { name: "examples/cypress.js" },
  { name: "examples/discord.js" },
  { name: "examples/espn.js" },
  { name: "examples/firebugs.js" },
  { name: "examples/framer.js" },
  { name: "examples/google.js" },
  { name: "examples/monaco.js" },
  { name: "examples/notion.js" },
  { name: "examples/nytimes.js" },
  { name: "examples/reactcharts.js" },
  { name: "examples/reactvirtualized.js" },
  { name: "examples/realadvisor.js" },
  { name: "examples/reddit.js" },
  { name: "examples/replay.js" },
  { name: "examples/replit.js" },
  { name: "examples/storybook-ui.js" },
  { name: "examples/storybook.js" },
  { name: "examples/tablecheck.js" },
  { name: "examples/unsplash.js" },
  { name: "examples/vscode.js" },
  { name: "examples/yelp.js" },
  { name: "qawolf/facebook_create_and_delete_post.js", env },
  { name: "qawolf/facebook_like_and_comment_on_post.js", env },
  { name: "qawolf/facebook_view_friend_profile.js", env },
];

module.exports = { PlaywrightTests };
