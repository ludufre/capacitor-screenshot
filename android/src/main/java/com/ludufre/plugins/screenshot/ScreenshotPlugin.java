package com.ludufre.plugins.screenshot;

import android.graphics.Bitmap;
import android.util.Base64;
import android.view.View;

import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

import java.io.ByteArrayOutputStream;

@CapacitorPlugin(name = "Screenshot")
public class ScreenshotPlugin extends Plugin {
    @PluginMethod
    public void take(PluginCall call) {
        getBridge().getActivity().runOnUiThread(new Runnable() {
            @Override
            public void run() {
                Bitmap img = null;
                View view = getBridge().getWebView();
                view.setDrawingCacheEnabled(true);
                img = Bitmap.createBitmap(view.getDrawingCache());
                view.setDrawingCacheEnabled(false);

                ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
                img.compress(Bitmap.CompressFormat.PNG, 100, byteArrayOutputStream);
                byte[] byteArray = byteArrayOutputStream.toByteArray();

                JSObject ret = new JSObject();
                ret.put("base64", new String(Base64.encode(byteArray, Base64.NO_WRAP)));
                call.resolve(ret);
            }
        });
    }
}
