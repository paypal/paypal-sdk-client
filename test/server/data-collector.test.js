/**
 * @jest-environment jsdom
 */
import {
  loadDataCollector,
  createConfigScript,
  createFraudnetScript,
  FRAUDNET_FNCLS,
  FRAUDNET_APP_NAME,
} from "../../src/data-collector";

describe.only("data-collector.js", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const testInputs = {
    clientMetadataID: "some-cmid",
    fraudnetAppName: "spb-test-name",
    env: "unit-tests",
    cspNonce: "not-sure-what-this-is-yet-csp-nonce",
    queryStringParams: {
      /* TBD */
    },
  };

  test("creates both scripts", async () => {
    const mockAppendChild = jest.fn();
    document.body.appendChild = mockAppendChild;

    await loadDataCollector(testInputs);

    expect(mockAppendChild).toHaveBeenCalledTimes(2);
  });

  test("it create and append the config element", async () => {
    const mockSetAttribute = jest.fn();
    const mockAppendChild = jest.fn();
    const mockReturnedElement = {
      setAttribute: mockSetAttribute,
    };
    document.createElement = jest.fn(() => {
      return mockReturnedElement;
    });
    document.body.appendChild = mockAppendChild;

    const expectedScriptConfig = {
      f: testInputs.clientMetadataID,
      s: FRAUDNET_APP_NAME,
      //u: <NOT SURE THIS IS RELEVANT! Does it currently default in spb?>
      cb1: "fnCallback",
    };
    await createConfigScript(testInputs);

    expect(document.createElement).toHaveBeenNthCalledWith(1, "script");
    expect(mockSetAttribute).toBeCalledWith("nonce", testInputs.cspNonce);
    expect(mockSetAttribute).toBeCalledWith("type", "application/json");
    expect(mockSetAttribute).toBeCalledWith("id", "fconfig");
    expect(mockSetAttribute).toBeCalledWith("fncls", FRAUDNET_FNCLS);
    expect(mockReturnedElement.textContent).toEqual(
      JSON.stringify(expectedScriptConfig)
    );
    expect(mockAppendChild).toBeCalledWith(mockReturnedElement);
  });

  test("creates fraudnet script with config", async () => {
    const mockAppendChild = jest.fn();
    const mockListener = jest.fn();
    const mockSetAttribute = jest.fn();
    const mockReturnedElement = {
      setAttribute: mockSetAttribute,
      addEventListener: mockListener,
    };
    document.body.appendChild = mockAppendChild;

    document.createElement = jest.fn(() => {
      return mockReturnedElement;
    });

    await createFraudnetScript(testInputs);

    expect(document.createElement).toHaveBeenCalledWith("script");
    expect(mockSetAttribute).toHaveBeenCalledWith("nonce", testInputs.cspNonce);
    // expect(mockSetAttribute).toHaveBeenCalledWith("src", expect.stringContaining("fb.js"))
    expect(mockListener).toHaveBeenCalledWith("error", expect.any(Function));
    expect(mockAppendChild).toBeCalledWith(mockReturnedElement);
  });
});
