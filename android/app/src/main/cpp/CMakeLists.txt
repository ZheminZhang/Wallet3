# 指定cmake最低版本，如果不知道就复制吧
cmake_minimum_required(VERSION 3.4.1)

# 第一个native-lib是供java调用的文件， SHARED是啥没看明白但是要写上
# 最后俩是所有cpp的名字和相对本文件的位置，这里在一个文件夹中就直接写名字了，文件有多少写多少
add_library(native-lib SHARED native-lib.cpp scrypt.cpp fastpbkdf2.cpp)
#add_library(openssl-crypto SHARED IMPORTED )
#add_library(openssl-ssl SHARED IMPORTED )
add_library(openssl-crypto STATIC IMPORTED )
add_library(openssl-ssl STATIC IMPORTED )

#引入第三方.so库，根据${ANDROID_ABI} 引用不同的库
#set_target_properties(openssl-crypto PROPERTIES IMPORTED_LOCATION /Users/zhangzhemin/MyApp/android/app/src/main/jniLibs/${ANDROID_ABI}/libcrypto.so.1.1)
#set_target_properties(openssl-ssl PROPERTIES IMPORTED_LOCATION /Users/zhangzhemin/MyApp/android/app/src/main/jniLibs/${ANDROID_ABI}/libssl.so.1.1)
set_target_properties(openssl-crypto PROPERTIES IMPORTED_LOCATION /Users/zhangzhemin/RNProjects/Wallet3/android/app/src/main/jniLibs/${ANDROID_ABI}/libcrypto.a)
set_target_properties(openssl-ssl PROPERTIES IMPORTED_LOCATION /Users/zhangzhemin/RNProjects/Wallet3/android/app/src/main/jniLibs/${ANDROID_ABI}/libssl.a)

find_library( log-lib log )

#include_directories("/usr/local/Cellar/openssl/1.0.2p/include")
include_directories("/Users/zhangzhemin/RNProjects/Wallet3/android/app/src/main")

# 我的理解是java要连接到native-lib，和一些其它的东西，不懂
target_link_libraries(native-lib openssl-crypto openssl-ssl ${log-lib})