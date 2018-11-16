//
//  native-lib.m
//  moduleTest
//
//  Created by Zhemin Zhang on 2018/9/16.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import "React/RCTLog.h"
#include "native-lib.h"
#include "scrypt.h"
#include "fastpbkdf2.h"

@implementation NativeCUtils

RCT_EXPORT_MODULE();
/*
 RCT_EXPORT_METHOD(hello:(RCTResponseSenderBlock) cb)
 {
 NSString * name = @"Zhemin";
 cb(@[ [NSNull null], name ]);
 //RCTLogInfo(@"Hello %@ from IOS", name);
 }
 */
RCT_EXPORT_METHOD(scryptString:(NSString *) password salt:(NSString *) salt callback:(RCTResponseSenderBlock) cb){
  unsigned dklen = 32;
  uint64_t N = 1024;
  uint32_t r = 8;
  uint32_t p = 1;
  char s[2 * dklen + 1];
  NSString * rtstr;
  
  const char * pstr;
  const char * sstr;
  
  pstr = [password cStringUsingEncoding:NSASCIIStringEncoding];
  sstr = [salt cStringUsingEncoding:NSASCIIStringEncoding];
  
  uint8_t dk_this[ dklen ];
  //scrypt((uint8_t *) password, password_len, (uint8_t *) salt, salt_len, N, r, p, dk_this, dklen);
  scrypt((uint8_t *) pstr, strlen(pstr), (uint8_t *) sstr, strlen(sstr), N, r, p, dk_this, dklen);
  byte_to_hex(dk_this, s, dklen);
  rtstr = [[NSString alloc] initWithCString:(const char*) s encoding:NSASCIIStringEncoding];
  cb(@[ [NSNull null], rtstr]);
  //RCTLogInfo(@"Hello %@ from IOS", name);
}

RCT_EXPORT_METHOD(pbkdf2HmacSha512String:(NSString *) password salt:(NSString *) salt callback:(RCTResponseSenderBlock) cb){
  unsigned dklen = 64;
  unsigned iterations = 2048;
  char s[2 * dklen + 1 ];
  NSString * rtstr;
  
  const char * pstr;
  const char * sstr;
  
  pstr = [password cStringUsingEncoding:NSASCIIStringEncoding];
  sstr = [salt cStringUsingEncoding:NSASCIIStringEncoding];
  
  uint8_t dk_this[ dklen ];
  //scrypt((uint8_t *) password, password_len, (uint8_t *) salt, salt_len, N, r, p, dk_this, dklen);
  fastpbkdf2_hmac_sha512((uint8_t *) pstr, strlen(pstr), (uint8_t *) sstr, strlen(sstr), iterations, dk_this, dklen);
  byte_to_hex(dk_this, s, dklen);
  rtstr = [[NSString alloc] initWithCString:(const char*) s encoding:NSASCIIStringEncoding];
  cb(@[ [NSNull null], rtstr]);
  //RCTLogInfo(@"Hello %@ from IOS", name);
}
@end
