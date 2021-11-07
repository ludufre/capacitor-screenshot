export interface ScreenshotPlugin {
  take(): Promise<{ base64: string }>;
}
