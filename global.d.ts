export {};


declare const bootstrap: any;

declare global {
  const bootstrap: any;
  interface Window {
    bootstrap: any
  }
}
