const { example } = require("../src/helpers");
const { selectors: monaco, addInput, clearInput } = require("./shared/monaco");

const selectors = {
  monaco,
};

const code = `
import { render } from 'solid-js/web';
import { createSignal } from 'solid-js';

function Counter({id, defaultCount = 0}: {id: string, defaultCount?: number}) {
	const [count, setCount] = createSignal(defaultCount);
	const increment = () => setCount(count() + 1)

	return (
		<button type="button" onClick={increment} id={id} style={{margin: '0px 8px'}}>
			{count()}
		</button>
	);
}

render(() => (
	<div>
		<Counter id="first" />
		<Counter defaultCount={10} id="second" />
	</div>
), document.getElementById('app'))`;

example("Solid", async (page, { step }) => {
  await page.goto("https://playground.solidjs.com/");

  await clearInput(page, { timeout: 60000 });
  await step("Add Code", addInput(selectors.monaco.input, code, { delay: 80 }));

  const frame = page.frames().filter((f) => f !== page.mainFrame())[0];

  await step("Increment first button", async () => {
    await frame.waitForSelector("#first");
    for (let i of [1, 2, 3, 4, 5]) {
      await frame.click(`#first`, { force: true });
    }
  });

  await frame.waitForSelector('#first:text("5")');

  await step("Increment second button", async () => {
    await frame.waitForSelector("#second");
    for (let i of [1, 2, 3, 4, 5]) {
      await frame.click(`#second`, { force: true });
    }
  });

  await frame.waitForSelector('#second:text("15")');
});
