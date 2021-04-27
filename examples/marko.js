const { example } = require("../src/helpers");
const { selectors: monaco, addInput, clearInput } = require("./shared/monaco");

const selectors = {
  tree: {
    file: ".file",
    fileByName(name) {
      return `${this.file} >> text=${name}`;
    },
  },
  output: ".preview-output",
  monaco,
};

example("Marko", async (page, { step }) => {
  await page.goto("https://markojs.com/try-online/");
  await page.waitForSelector(`${selectors.output} h1`);

  await clearInput(page, { timeout: 60000 });
  await step(
    "Add Code",
    addInput(
      selectors.monaco.input,
      `
style {
  .container {
      margin-left: auto;
      margin-right: auto;
      width: 800px;
  }
}

<div class="container">
    <h1>Here are some numbers</h1>
    $ const numbers = Array.from({length: 10}, () => Math.round(255 * Math.random()));
    $ console.log('Render', numbers)
    <if(numbers.length)>
        <ul>
            <for|n| of=numbers>
                <li style={
                    color: ${"`rgb(${n}, ${n}, ${n})`"}
                }>${"${n}"}</li>
            </for>
        </ul>
    </if>
    <else>
        <div>No numbers!</div>
    </else>
</div>`
    )
  );

  await page.waitForSelector(
    `${selectors.output} h1:text("Here are some numbers")`
  );
});
