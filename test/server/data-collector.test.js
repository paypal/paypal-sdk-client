/**
 * @jest-environment jsdom
 */
import {
  loadDataCollector,
  FRAUDNET_FNCLS,
  FRAUDNET_APP_NAME,
} from "../../src/data-collector";

describe.only("data-collector.js", () => {
  test("it create the config element with correct inputs", async () => {
    const mockSetAttribute = jest.fn();
    const mockReturnedElement = {
      setAttribute: mockSetAttribute,
    };
    document.createElement = jest.fn(() => {
      return mockReturnedElement;
    });
    const inputs = {
      clientMetadataId: "some-cmid",
      fraudnetAppName: "spb-test-name",
      env: "unit-tests",
      cspNonce: "not-sure-what-this-is-yet-csp-nonce",
      queryStringParams: {
        /* TBD */
      },
    };

    const expectedScriptConfig = {
      f: inputs.clientMetadataId,
      s: FRAUDNET_APP_NAME,
      //u: <NOT SURE THIS IS RELEVANT! Does it currently default in spb?>
      cb1: "fnCallback",
    };
    await loadDataCollector(inputs);
    // assert script created with certain attributes
    expect(document.createElement).toBeCalledWith("script");
    expect(mockSetAttribute).toBeCalledWith("nonce", inputs.cspNonce);
    expect(mockSetAttribute).toBeCalledWith("type", "application/json");
    expect(mockSetAttribute).toBeCalledWith("id", "fconfig");
    expect(mockSetAttribute).toBeCalledWith("fncls", FRAUDNET_FNCLS);
    expect(mockReturnedElement.textContent).toEqual(
      JSON.stringify({ expectedScriptConfig })
    );
  });
});
