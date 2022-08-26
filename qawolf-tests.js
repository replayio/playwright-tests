const { readdirSync } = require("fs");
const fetch = require("node-fetch");

function getTests() {
  const files = [
    "airbnb_view_listings.js",
    "airtable_log_in_and_search.js",
    "bonobos_click_on_listing_add_listing_to_cart.js",
    "checkly_log_in_create_api_check_run_api_check.js",
    "climatescape_view_tabs.js",
    "code_sandbox_view_file_search_for_code.js",
    "codepen_create_pen_enter_html_css_js.js",
    "cypress_view_test_result_expand_runtime_environment_section.js",
    "e_bay_search_for_i_phone_sort_by_ending_soonest_view_listing.js",
    "eraser_draw_a_box_add_title_add_markdown.js",
    "espn_search_for_player.js",
    "etsy_search_listings_click_listings_add_listing_to_cart.js",
    "excalidraw_draw_rectangle_and_circle_connect_shapes_move_shapes.js",
    "facebook_add_and_cancel_friend_request.js",
    "facebook_create_and_delete_ad_campaign.js",
    "facebook_create_and_delete_post.js",
    "facebook_duplicate_ad_campaign.js",
    "facebook_like_and_comment_on_post.js",
    "facebook_like_and_unlike_comment.js",
    "facebook_messenger.js",
    "facebook_search_for_user.js",
    "facebook_toggle_ad_campaign_on_and_off.js",
    "facebook_view_ad_campaign_details.js",
    "facebook_view_ads_account_overview.js",
    "facebook_view_friend_profile.js",
    "fin.js",
    "fin_viz.js",
    "firebugs_filter_by_type_priority_keyword.js",
    "framer_click_layer.js",
    "getInbox.js",
    "google_search_view_about_result.js",
    "guide_create_a_test.js",
    "helpers.js",
    "lit_view_component_click_button_view_example_preview_clear_input.js",
    "marko_edit_code.js",
    "mdn_web_gl_basic_scissoring_scissor_animation_clear_by_clicking_view_textures_from_code.js",
    "monaco_view_samples_edit_and_run_custom_samples.js",
    "my_test.js",
    "my_test_2.js",
    "my_test_3.js",
    "natto_navigate_to_weather_run_cell.js",
    "new_york_times_search_for_topic.js",
    "notion_search_replay_docs.js",
    "on_ice_discord_log_in_view_channels.js",
    "on_ice_spotify.js",
    "on_ice_tiptap.js",
    "pixi_js_view_examples.js",
    "prosemirror_edit_text_in_editor_italicize_text_undo_changes_redo_changes.js",
    "quill_add_text_bold_text.js",
    "react_charts_view_examples.js",
    "react_virtualized_scroll_through_list_toggle_options.js",
    "react_window_select_examples_in_list.js",
    "real_advisor_search_sort_and_view_listings.js",
    "recorder_ebay_search_for_chairs.js",
    "recorder_reddit_search_for_community.js",
    "reddit_search_for_community.js",
    "remirror_input_text_apply_commands.js",
    "remove_user_team_member.js",
    "replit_log_in_view_sample_repl_run_code.js",
    "repro_cannot_comment_when_logged_in_with_api_key.js",
    "scratch_wait_for_message_issue.js",
    "shopify_select_product.js",
    "solid_add_code_increment_button.js",
    "storybook_open_story_zoom_in_and_out_activate_tab.js",
    "storybook_ui_open_story_click_tabs_component.js",
    "table_check_search_for_city_filter_by_budget.js",
    "udemy.js",
    "unsplash_search_for_photos_page_through_results_select_tag.js",
    "vs_code_create_and_edit_files.js",
    "vs_code_open_editor_search_open_and_create_files.js",
    "whats_my_user_agent_view_user_agent.js",
    "yelp_search_for_restaurant_view_search_results.js",
    "you_tube_click_on_video.js",
  ];
  const exclude = ["getInbox.js", "helpers.js", "framer_click_layer.js"];
  const tests = files.filter((file) => !exclude.includes(file));
  return tests;
}

async function recordTest(test) {
  const env = {
    ...process.env,
  };

  try {
    Object.assign(env, JSON.parse(process.env.TEST_TASK_ENV || "{}"));
  } catch (e) {
    console.error("Failed to parse TEST_TASK_ENV");
  }

  const proc = require("child_process").spawnSync("node", [`qawolf/${test}`], {
    cwd: __dirname,
    stdio: "inherit",
    env,
  });

  return proc.status;
}

async function pingTestMetrics(
  recordingId, // : string | undefined,
  test // : {
  // id: string;
  // duration: number;
  // recorded: boolean;
  // }
) {
  const runId = process.env.TEST_RUN_ID;
  const webhookUrl = process.env.RECORD_REPLAY_WEBHOOK_URL;

  if (!webhookUrl) {
    console.log(
      "RECORD_REPLAY_WEBHOOK_URL is undefined. Skipping test metrics"
    );
    return;
  }

  if (!runId) {
    console.log("TEST_RUN_ID is undefined. Skipping test metrics");
    return;
  }

  try {
    return await fetch(`${webhookUrl}/api/metrics`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "test.finished",
        recordingId,
        test: {
          ...test,
          runId,
        },
      }),
    });
  } catch (e) {
    console.log("Failed to send test metrics", e);
  }
}

(async () => {
  const tests = getTests();

  while (tests.length) {
    const test = tests.shift();
    console.log(`Starting ${test}`);
    const startTime = Date.now();
    try {
      const status = await recordTest(test);
      console.log(`Test ${test} ${status ? "failed" : "passed"}`);
    } catch (e) {
      console.error(`Recording crashed`, e);
    } finally {
      await pingTestMetrics(undefined, {
        id: test + (process.env.PLAYWRIGHT_CHROMIUM ? "-chromium" : "-firefox"),
        duration: Date.now() - startTime,
        recorded: !process.env.RECORD_REPLAY_NO_RECORD,
      });
    }
  }
})();
