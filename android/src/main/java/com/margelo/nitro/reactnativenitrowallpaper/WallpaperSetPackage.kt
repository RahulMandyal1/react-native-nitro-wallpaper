package com.margelo.nitro.reactnativenitrowallpaper

import com.facebook.react.BaseReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.module.model.ReactModuleInfoProvider

import android.util.Log

class WallpaperSetPackage : BaseReactPackage() {
    override fun getModule(name: String, reactContext: ReactApplicationContext): NativeModule? {
        // Set context here for Nitro modules
        if (context == null) {
            context = reactContext.applicationContext
            Log.d("WallpaperSetPackage", "Context set in getModule")
        }
        return null
    }

    override fun getReactModuleInfoProvider(): ReactModuleInfoProvider {
        return ReactModuleInfoProvider { HashMap() }
    }

    companion object {
        var context: android.content.Context? = null
        init {
            // Initialize the native Nitro module early - this registers the HybridObject in the registry
            // This must be called before any JS code tries to use the module
            reactnativenitrowallpaperOnLoad.initializeNative()
        }
    }
}
