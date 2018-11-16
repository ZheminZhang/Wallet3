//
// Created by Zhemin Zhang on 2018/9/16.
//

#ifndef _SCRYPT_H_
#define _SCRYPT_H_

int byte_to_hex(uint8_t *b, char * s, uint32_t slen);
int scrypt(const uint8_t * passwd, size_t passwdlen, const uint8_t * salt, size_t saltlen, uint64_t N, uint32_t r, uint32_t p, uint8_t * buf, size_t buflen);
#endif //_SCRYPT_H_
