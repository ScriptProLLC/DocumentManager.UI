import { act } from "react-hooks-testing-library";

function asyncAct(asyncFunc) {
  act(() => {
    asyncFunc();
  });
}

function renderCompletion(s = 1) {
  return new Promise(r => setTimeout(r, s));
}

module.exports = {
  asyncAct,
  renderCompletion
};
