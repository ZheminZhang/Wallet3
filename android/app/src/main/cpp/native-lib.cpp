#include <jni.h>
#include <string>
#include <stdlib.h>
#include <stdio.h>
#include "scrypt.h"
#include "fastpbkdf2.h"

extern "C"
{
jstring Java_com_wallet3_NativeCUtils_scrypt(
        JNIEnv *env,
        jobject obj, /* this */
        jstring password,
        jstring salt) {
    //std::string hello = "Hello from C++";
    //std::string hello = "";
    unsigned dklen = 32;
    //unsigned rounds = 1000;
    uint64_t N = 1024;
    uint32_t r = 8;
    uint32_t p = 1;
    char s[2 * dklen];

    const char *pstr;
    jboolean boo = false;
    pstr = env->GetStringUTFChars(password, &boo);
    const char *sstr;
    sstr = env->GetStringUTFChars(salt, &boo);

    size_t password_len = env->GetStringLength(password);
    size_t salt_len = env->GetStringLength(salt);

    uint8_t dk_this[dklen];
    jbyteArray dk[dklen];
    //scrypt((uint8_t *) password, password_len, (uint8_t *) salt, salt_len, N, r, p, dk_this, dklen);
    scrypt((uint8_t *) pstr, strlen(pstr), (uint8_t *) sstr, strlen(sstr), N, r, p, dk_this, dklen);

    env->ReleaseStringUTFChars(password, pstr);
    env->ReleaseStringUTFChars(salt, sstr);

    byte_to_hex(dk_this, s, dklen);
    //hello = s;
    //hello = (char *) password;
    //return env->NewStringUTF(s.c_str());
    jstring rtstr = env->NewStringUTF(s);
    return rtstr;
    //return env->NewStringUTF(hello.c_str());
}
}

extern "C" {
jstring Java_com_wallet3_NativeCUtils_pbkdf2HmacSha512(
        JNIEnv *env,
        jobject obj, /* this */
        jstring password,
        jstring salt) {
        //std::string hello = "Hello from C++";
        //std::string hello = "";
        unsigned dklen = 64;
        unsigned iterations = 2048;
        char s[2 * dklen + 1 ];

        const char *pstr;
        jboolean boo = false;
        pstr = env->GetStringUTFChars(password, &boo);
        const char *sstr;
        sstr = env->GetStringUTFChars(salt, &boo);

        size_t password_len = env->GetStringLength(password);
        size_t salt_len = env->GetStringLength(salt);

        uint8_t dk_this[dklen];
        jbyteArray dk[dklen];
        //scrypt((uint8_t *) password, password_len, (uint8_t *) salt, salt_len, N, r, p, dk_this, dklen);
        fastpbkdf2_hmac_sha512((uint8_t *) pstr, strlen(pstr), (uint8_t *) sstr, strlen(sstr),iterations, dk_this, dklen);

        env->ReleaseStringUTFChars(password, pstr);
        env->ReleaseStringUTFChars(salt, sstr);

        byte_to_hex(dk_this, s, dklen);
        //hello = s;
        //hello = (char *) password;
        //return env->NewStringUTF(s.c_str());
        jstring rtstr = env->NewStringUTF(s);
        return rtstr;
        //return env->NewStringUTF(hello.c_str());
    }
}