package com.catchzeroproject;

import android.widget.Toast;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.util.Random;
// import android.net.wifi.WifiManager;
// import android.net.wifi.WifiInfo;
// import android.net.DhcpInfo;
// import android.content.Context;
// import java.util.List;
// import android.net.wifi.WifiConfiguration;
// import android.net.wifi.WifiNetworkSuggestion;
//import android.net.wifi.WifiNetworkSuggestion.Builder;

// import android.os.Build;
// import android.provider.Settings;
// import android.content.Intent;
// import java.util.Map;
// import java.util.Locale.Category;
// import java.util.HashMap;
// import java.util.ArrayList;
// import java.util.Formatter;
// import java.util.concurrent.TimeUnit;

public class RandomNumberGeneratorModule extends ReactContextBaseJavaModule {
  ReactApplicationContext reactContext;

    private static final int HIGHEST_RANDOM_NUMBER_VALUE  = 5;
  

  public RandomNumberGeneratorModule(ReactApplicationContext reactContext) {
    super(reactContext);
    this.reactContext = reactContext;
  }

  @Override
  public String getName() {
    return "RandomNumberGeneratorModule";
  }

//   @Override
//   public Map<String, Object> getConstants() {
//     final Map<String, Object> constants = new HashMap<>();
//     constants.put(DURATION_SHORT_KEY, Toast.LENGTH_SHORT);
//     constants.put(DURATION_LONG_KEY, Toast.LENGTH_LONG);
//     return constants;
//   }

  @ReactMethod
  public void getRandomNumber(Promise promise) {
    try{
        Random rand = new Random(); 
        int random_number = rand.nextInt(HIGHEST_RANDOM_NUMBER_VALUE + 1); 
        promise.resolve(random_number);
    }catch(Exception e){
        promise.reject(e);
    } 
  }
  
  

}