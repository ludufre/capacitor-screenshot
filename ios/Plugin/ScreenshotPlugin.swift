import Foundation
import Capacitor
import UIKit

@objc(ScreenshotPlugin)
public class ScreenshotPlugin: CAPPlugin {
    
    @objc func take(_ call: CAPPluginCall) {
        DispatchQueue.main.async {
            let image = self.getScreenshot();
            let imageData = image?.pngData()
            
            call.resolve([
                "base64": imageData?.base64EncodedString()
            ])
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
}

