const { example } = require("../src/helpers");

const selectors = {
  codePanel: ".view-lines",
  input: "textarea.inputarea",
  login: 'button >> text="Log in"',
  username: "input[name='username']",
  password: "input[name='password']",
  loginButton: "form[action='/login'] button",
  myRepls: "a >> text='My repls'",
  item: ".repl-item",
};

const appendCode = (code) => async (page) => {
  await page.click(selectors.codePanel);

  for (let line of code.trim().split("\n")) {
    await page.type(selectors.input, line, { delay: 50 });
    await page.press(selectors.input, "Enter");
  }
};

const runCode = async (page) => {
  await page.keyboard.press("Meta+Enter");
};

const clearCode = async (page) => {
  await page.click(selectors.codePanel);
  await page.keyboard.press("Meta+A");
  await page.keyboard.press("Backspace");
};

const login = (
  username = "replaytestuser",
  password = "ReplayTest123"
) => async (page) => {
  await page.click(selectors.login);
  await page.click(selectors.username);
  await page.fill(selectors.username, username);
  await page.click(selectors.password);
  await page.fill(selectors.password, password);
  await page.click(selectors.loginButton);
};

example("repl.it", async (page, { step }) => {
  await page.goto("https://replit.com/site/pricing");

  await step("Login", login());
  await step("Navigate to sample repl", async () => {
    await page.click(selectors.myRepls);
    await page.click(`${selectors.item} >> text="Playwright Sample"`);
  });

  await step("Clearing code", clearCode);
  await step(
    "Appending code",
    appendCode(`
for (let i = 0; i < 10; i++) {
  console.log("Hello", i);
  `)
  );

  await runCode(page);
  await page.waitForTimeout(10000);
});
