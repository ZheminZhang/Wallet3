package com.wallet3;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.rnfs.RNFSPackage;
import io.jchat.android.JMessageReactPackage;
import cn.jpush.reactnativejpush.JPushPackage;
import com.lwansbrough.RCTCamera.RCTCameraPackage;
import com.tradle.react.UdpSocketsModule;
import com.peel.react.TcpSocketsModule;
import com.peel.react.rnos.RNOSModule;
import com.bitgo.randombytes.RandomBytesPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import io.realm.react.RealmReactPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import cn.jiguang.imui.messagelist.ReactIMUIPackage;
import cn.jpush.reactnativejpush.JPushPackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  // 设置为 true 将不会弹出 toast
  private boolean SHUTDOWN_TOAST = false;
  // 设置为 true 将不会打印 log
  private boolean SHUTDOWN_LOG = false;

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new RNFSPackage(),
            new JMessageReactPackage(SHUTDOWN_TOAST),
            new JPushPackage(!BuildConfig.DEBUG, !BuildConfig.DEBUG),
            new RCTCameraPackage(),
            new UdpSocketsModule(),
            new TcpSocketsModule(),
            new RNOSModule(),
            new RandomBytesPackage(),
            new VectorIconsPackage(),
            new RealmReactPackage(),
            new ReactIMUIPackage(),
            new JPushPackage(SHUTDOWN_TOAST, SHUTDOWN_LOG),   //  <-- 添加 JPushPackage
            new NativePackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
