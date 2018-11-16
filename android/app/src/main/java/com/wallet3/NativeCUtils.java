package com.wallet3;

import com.facebook.react.bridge.Callback;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.lang.reflect.Array;
import java.nio.Buffer;

public class NativeCUtils extends ReactContextBaseJavaModule {

    public NativeCUtils(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    // Used to load the 'native-lib' library on application startup.
    static {
        System.loadLibrary("native-lib");
    }

    @Override
    public String getName() {
        return "NativeCUtils";
    }

    @ReactMethod
    public void scryptString(String password, String salt, Callback cb){
        cb.invoke(scrypt(password, salt));
    }

    @ReactMethod
    public void pbkdf2HmacSha512String(String password, String salt, Callback cb){
        cb.invoke(pbkdf2HmacSha512(password, salt));
    }

    /**
     * A native method that is implemented by the 'native-lib' native library,
     * which is packaged with this application.
     */
    public native String scrypt(String password, String salt);
    public native String pbkdf2HmacSha512(String password, String salt);
}

