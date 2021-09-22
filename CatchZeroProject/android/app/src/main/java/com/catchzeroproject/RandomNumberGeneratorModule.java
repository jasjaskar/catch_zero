package com.catchzeroproject;

import android.widget.Toast;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.util.Random;

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