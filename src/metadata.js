const fetch = require("node-fetch");
require("dotenv").config();
const fs = require("fs");

const API = "https://graphql.replay.io/v1/graphql";
let gMetadataFile = "./metadata.log";

function setMetadataFile(path) {
  gMetadataFile = path;
}

function getMetadataFile(path) {
  return gMetadataFile;
}

async function upload(name, query, variables) {
  const headers = {
    "x-hasura-admin-secret": process.env.HASURA_KEY,
  };

  const options = {
    method: "POST",
    headers,
    body: JSON.stringify({
      query,
      name,
      variables,
    }),
  };

  const response = await fetch(API, options);
  const body = await response.json();
  console.log(`request`, body);

  return body;
}

function lastLine(filename) {
  const text = fs.readFileSync(filename, "utf8").trim();
  const lines = text.split("\n");
  return lines[lines.length - 1];
}

const UPDATE_TEST = `
mutation UpdateTest(
  $id: uuid!, 
  $recording_id: String, 
  $workspace_id: uuid!,
  $recordingTitle: String,
  $url: String, 
  $last_screen: String, 
  $last_screen_mime_type: String,
  $title: String, 
  $user_id: uuid!, 
  $duration: Int
  ) {
  update_recordings_by_pk(pk_columns: {id: $id}, _set: {
    workspace_id: $workspace_id, 
    recording_id: $recording_id
    last_screen_data: $last_screen,
    last_screen_mime_type: $last_screen_mime_type,
    recordingTitle: $recordingTitle,
    url: $url,
    title: $title,
    user_id: $user_id,
    duration: $duration
  }) {
    recording_id
    workspace_id
    url
    recordingTitle
    title
    user_id
    duration
  }
}    
`;

async function uploadMetadata(gRecordingFile) {
  console.log(
    "Uploading from recording file: ",
    gRecordingFile,
    "and metadata file",
    gMetadataFile
  );
  const recordingId = lastLine(gRecordingFile);
  const metadata = JSON.parse(lastLine(gMetadataFile));

  const variables = {
    recording_id: recordingId,
    id: recordingId,
    workspace_id: process.env.WORKSPACE_ID,
    user_id: process.env.USER_ID,
    last_screen_mime_type: "image/jpeg",
    ...metadata,
  };

  try {
    await upload(`UpdateTest`, UPDATE_TEST, variables);
  } catch (e) {
    console.error("Failed to upload metadata", e);
  }

  return recordingId;
}

module.exports = { uploadMetadata, getMetadataFile, setMetadataFile };
