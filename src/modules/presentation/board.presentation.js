export const BoardPresentation = (() => {
  function test(str) {
    console.log(str + 'module');
  }

  return {
    test
  };
})()

window.BoardPresentation = BoardPresentation;