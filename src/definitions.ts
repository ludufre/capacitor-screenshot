export interface ScreenshotPlugin {
  take(opts?: { saveToDisk?: boolean }): Promise<{ base64: string }>;
}
