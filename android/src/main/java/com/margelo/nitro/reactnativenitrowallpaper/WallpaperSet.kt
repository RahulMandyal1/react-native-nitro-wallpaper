package com.margelo.nitro.reactnativenitrowallpaper
  
import com.facebook.proguard.annotations.DoNotStrip

import android.app.WallpaperManager
import android.graphics.Bitmap
import android.graphics.BitmapFactory
import android.net.Uri
import com.margelo.nitro.core.Promise
import java.net.URL

@DoNotStrip
class WallpaperSet : HybridWallpaperSetSpec() {
  override fun setWallpaper(image: String, location: Double): Promise<Unit> {
    val promise = Promise<Unit>()
    val context = WallpaperSetPackage.context
    if (context == null) {
      promise.reject(Exception("Context not initialized"))
      return promise
    }

    Thread {
      try {
        val wallpaperManager = WallpaperManager.getInstance(context)
        val bitmap: Bitmap?

        if (image.startsWith("http")) {
          val url = URL(image)
          bitmap = BitmapFactory.decodeStream(url.openStream())
        } else if (image.startsWith("file://") || image.startsWith("content://")) {
          val uri = Uri.parse(image)
          val inputStream = context.contentResolver.openInputStream(uri)
            ?: throw Exception("Could not open input stream for URI: $image")
          bitmap = BitmapFactory.decodeStream(inputStream)
          inputStream?.close()
        } else {
          bitmap = BitmapFactory.decodeFile(image)
        }

        if (bitmap == null) {
          throw Exception("Failed to decode bitmap from: $image")
        }

        if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.N) {
          wallpaperManager.setBitmap(bitmap, null, true, location.toInt())
        } else {
          wallpaperManager.setBitmap(bitmap)
        }
        promise.resolve(Unit)
      } catch (e: Throwable) {
        promise.reject(e)
      }
    }.start()

    return promise
  }
}
