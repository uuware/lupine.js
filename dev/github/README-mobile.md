add android

npx cap init
Web asset directory: ../../../dist/server_root/lupine-notes-and-tools_web
npx cap add android
npx cap sync
npx cap open android

Android platform signature certificate(.keystore) generation guide
https://ask.dcloud.net.cn/article/35777
keytool -genkey -alias uuware -keyalg RSA -keysize 2048 -validity 36500 -keystore uuware.keystore

pass:Wv0S1OaGnH6
What is your first and last name?
[Unknown]: uuware.com
What is the name of your organizational unit?
[Unknown]: uuware.com
What is the name of your organization?
[Unknown]: uuware.com
What is the name of your City or Locality?
[Unknown]: Auckland
What is the name of your State or Province?
[Unknown]: Auckland
What is the two-letter country code for this unit?
[Unknown]: NZ
Is CN=uuware.com, OU=uuware.com, O=uuware.com, L=Auckland, ST=Auckland, C=NZ correct?

use command to view:
keytool -list -v -keystore uuware.keystore
keytool -list -v -keystore uuware.keystore -alias uuware
SHA1: 97:3C:FB:FC:6C:8B:50:3C:CC:F1:8B:52:10:1F:F3:DF:1E:06:7C:52
SHA256: 07:49:76:E7:CA:99:FC:C1:CF:AA:20:30:F2:20:36:2F:1F:B9:3D:D3:A0:AB:B0:42:BB:35:0B:B3:80:E6:0D:F7

export certificate to cert.pem
keytool -export -alias uuware -keystore uuware.keystore -rfc -file cert.pem
use openssl to view MD5 fingerprint
& 'c:\Program Files\Git\usr\bin\openssl.exe' x509 -in cert.pem -noout -fingerprint -md5
MD5: 40e161ca0f9f998ca84216a0d97017a6
