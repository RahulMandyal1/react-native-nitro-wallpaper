#include <jni.h>
#include "reactnativenitrowallpaperOnLoad.hpp"

JNIEXPORT jint JNICALL JNI_OnLoad(JavaVM* vm, void*) {
  return margelo::nitro::reactnativenitrowallpaper::initialize(vm);
}
