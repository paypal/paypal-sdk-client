/* @flow */

export function makeMockScriptElement(src): HTMLScriptElement {
  const mockElement = document.createElement("script");
  mockElement.setAttribute("src", src);
  // eslint-disable-next-line compat/compat
  document.body?.appendChild(mockElement);
  // $FlowIgnore
  return mockElement;
}
