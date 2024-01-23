/* @flow */

export function makeMockScriptElement(scrtipSrc: string): HTMLScriptElement {
  const mockElement = document.createElement("script");
  mockElement.setAttribute("src", scrtipSrc);
  // eslint-disable-next-line compat/compat
  document.body?.appendChild(mockElement);
  // $FlowIgnore
  return mockElement;
}
