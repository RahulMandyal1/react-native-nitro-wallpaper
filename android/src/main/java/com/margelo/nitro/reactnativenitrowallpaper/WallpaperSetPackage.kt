package com.margelo.nitro.reactnativenitrowallpaper

import com.facebook.react.BaseReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.module.model.ReactModuleInfoProvider

import android.util.Log

class WallpaperSetPackage : BaseReactPackage() {
    override fun getModule(name: String, reactContext: ReactApplicationContext): NativeModule? {
        return null
    }

    override fun createNativeModules(reactContext: ReactApplicationContext): MutableList<NativeModule> {
        Log.d("WallpaperSetPackage", "createNativeModules called!")
        context = reactContext
        return super.createNativeModules(reactContext) as MutableList<NativeModule>
    }

    override fun getReactModuleInfoProvider(): ReactModuleInfoProvider {
        return ReactModuleInfoProvider { HashMap() }
    }

    companion object {
        var context: android.content.Context? = null
        init {
            System.loadLibrary("reactnativenitrowallpaper")
        }
    }
}
