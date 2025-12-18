#include <jni.h>
#include "wallpapersetOnLoad.hpp"

JNIEXPORT jint JNICALL JNI_OnLoad(JavaVM* vm, void*) {
  return margelo::nitro::wallpaperset::initialize(vm);
}
