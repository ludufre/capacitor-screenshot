import Foundation
import Capacitor
import UIKit

@objc(ScreenshotPlugin)
public class ScreenshotPlugin: CAPPlugin, CAPBridgedPlugin {
    public let identifier = "ScreenshotPlugin"
    public let jsName = "Screenshot"
    public let pluginMethods: [CAPPluginMethod] = [
        CAPPluginMethod(name: "take", returnType: CAPPluginReturnPromise)
    ]
  
    private var imageCounter: Int = 0
    
    @objc func take(_ call: CAPPluginCall) {
        DispatchQueue.main.async {
            let image = self.getScreenshot();
            let imageData = image?.pngData()

            var result: [String: Any] = [
                "base64": imageData?.base64EncodedString() ?? ""
            ]

            if call.getBool("saveToDisk") == true {
                guard let fileURL = try? self.saveTemporaryImage(imageData!),
                      let webURL = self.bridge?.portablePath(fromLocalURL: fileURL) else {
                    call.reject("Unable to get portable path to file")
                    return
                }
                
                result["path"] = fileURL.absoluteString
                result["webPath"] = webURL.absoluteString
            }
            
            call.resolve(result)
        }
    }
    
    private func getScreenshot() -> UIImage? {
        var screenshotImage :UIImage?
        let layer = UIApplication.shared.keyWindow!.layer
        let scale = UIScreen.main.scale
        UIGraphicsBeginImageContextWithOptions(layer.frame.size, false, scale);
        guard let context = UIGraphicsGetCurrentContext() else {return nil}
        layer.render(in:context)
        screenshotImage = UIGraphicsGetImageFromCurrentImageContext()
        UIGraphicsEndImageContext()
        if let image = screenshotImage, false {
            UIImageWriteToSavedPhotosAlbum(image, nil, nil, nil)
        }
        
        return screenshotImage
    }
    
    func saveTemporaryImage(_ data: Data) throws -> URL {
       var url: URL
       repeat {
           imageCounter += 1
           url = URL(fileURLWithPath: NSTemporaryDirectory()).appendingPathComponent("screenshot-\(imageCounter).jpg")
       } while FileManager.default.fileExists(atPath: url.path)

       try data.write(to: url, options: .atomic)
       return url
   }
}
