declare module "@krakenjs/belter/dist/esm";
declare module "@krakenjs/jsx-pragmatic/dist/module";
declare module "@paypal/sdk-constants/dist/esm";
declare module "@krakenjs/beaver-logger/dist/esm";

declare namespace JSX {
  // eslint-disable-next-line
  interface IntrinsicElements {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [elemName: string]: any;
  }
}
