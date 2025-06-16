export interface ScreenshotPlugin {
  /**
   * Captures a screenshot of the current view.
   * @param opts - Optional parameters for the screenshot.
   * @returns A promise that resolves with an object containing the screenshot data.
   */
  take(opts?: { saveToDisk?: boolean }): Promise<{ base64: string; path?: string; webPath?: string }>;
}
