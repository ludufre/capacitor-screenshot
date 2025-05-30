package com.ludufre.plugins.screenshot;

import android.graphics.Bitmap;
import android.net.Uri;
import android.util.Base64;
import android.view.View;

import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;
import com.getcapacitor.FileUtils;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;

@CapacitorPlugin(name = "Screenshot")
public class ScreenshotPlugin extends Plugin {

    private int imageCounter = 0;

    @PluginMethod
    public void take(PluginCall call) {
        getBridge().getActivity().runOnUiThread(new Runnable() {
            @Override
            public void run() {
                try {
                Bitmap img = null;
                View view = getBridge().getWebView();
                view.setDrawingCacheEnabled(true);
                img = Bitmap.createBitmap(view.getDrawingCache());
                view.setDrawingCacheEnabled(false);

                ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
                img.compress(Bitmap.CompressFormat.PNG, 100, byteArrayOutputStream);
                byte[] byteArray = byteArrayOutputStream.toByteArray();

                JSObject ret = new JSObject();
                ret.put("base64", Base64.encodeToString(byteArray, Base64.NO_WRAP));

                Boolean saveToDisk = call.getBoolean("saveToDisk", false);
                if (saveToDisk != null && saveToDisk) {
                    try {
                    File file = saveTemporaryImage(byteArray);
                    String path = file.getAbsolutePath();
                    String webPath = FileUtils.getPortablePath(getContext(), bridge.getLocalUrl(), Uri.fromFile(file));

                    ret.put("path", "file://" + path);
                    ret.put("webPath", webPath);
                    } catch (IOException e) {
                    call.reject("Unable to save image to disk", e);
                    return;
                    }
                }

                call.resolve(ret);

                } catch (Exception e) {
                call.reject("Error capturing screenshot", e);
                }
            }
        });
    }

    private File saveTemporaryImage(byte[] data) throws IOException {
        File tempDir = getContext().getCacheDir();
        File file;

        do {
        imageCounter++;
        file = new File(tempDir, "screenshot-" + imageCounter + ".jpg");
        } while (file.exists());

        try (FileOutputStream fos = new FileOutputStream(file)) {
        fos.write(data);
        fos.flush();
        }

        return file;
    }
}
