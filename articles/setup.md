# تثبيت دارت

هناك عدة طرق لتثبيت دارت على نظامك. يمكنك تثبيت دارت على ويندوز، ماك، لينكس أو تشغيله من المتصفح.

## المتطلبات
- Dart SDK
- VS Code أو محررات أخرى مثل Intellij [سنستخدم VS Code هنا]

## تثبيت دارت على ويندوز
اتبع التعليمات التالية لتثبيت دارت على نظام ويندوز:

### الخطوات:
1. حمل Dart SDK من [هنا](https://dart.dev/get-dart)
2. انسخ مجلد dart-sdk إلى محرك الأقراص C
3. أضف المسار `C:\dart-sdk\bin` إلى متغيرات البيئة. شاهد الفيديو للتوضيح
4. افتح موجه الأوامر واكتب `dart --version` للتحقق
5. ثبت VS Code وأضف امتداد Dart

> ملاحظة: Dart SDK يوفر الأدوات اللازمة لترجمة وتشغيل برامج دارت.

## تثبيت دارت على ماك
1. ثبت Homebrew من [هنا](https://brew.sh)
2. اكتب في الطرفية: `brew tap dart-lang/dart`
3. اكتب في الطرفية: `brew install dart`

### أمر تثبيت Homebrew:
```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
لتحديد مسار Homebrew:
bash
export PATH=/opt/homebrew/bin:$PATH
تثبيت دارت على لينكس
لتركيب دارت على لينكس، افتح الطرفية والصق الأوامر التالية:
```
```bash
sudo apt-get update
sudo apt-get install apt-transport-https
wget -qO- https://dl-ssl.google.com/linux/linux_signing_key.pub | sudo gpg --dearmor -o /usr/share/keyrings/dart.gpg
echo 'deb [signed-by=/usr/share/keyrings/dart.gpg arch=amd64] https://storage.googleapis.com/download.dartlang.org/linux/debian stable main' | sudo tee /etc/apt/sources.list.d/dart_stable.list
sudo apt-get update
sudo apt-get install dart
لتحديد مسار دارت:
bash
export PATH="$PATH:/usr/lib/dart/bin"
التحقق من تثبيت دارت
افتح موجه الأوامر واكتب dart --version. إذا ظهر رقم الإصدار، فقد تم التثبيت بنجاح.

بعض الأوامر المفيدة
الأمر	الوصف
dart --help	عرض جميع الأوامر المتاحة
dart filename.dart	تشغيل ملف دارت
dart create	إنشاء مشروع دارت جديد
dart fix	تحديث المشروع للتركيب الجديد
تشغيل دارت على الويب
يمكنك تشغيل برامج دارت في متصفحك دون تثبيت أي برامج باستخدام DartPad.

روابط رسمية
رابط التثبيت الرسمي لدارت

هل يمكن تشغيل دارت من الموبايل؟
نعم، يمكنك استخدام DartPad لتشغيل برامج دارت بسيطة من هاتفك دون تثبيت أي برامج. لكن لا ينصح باستخدامه للمشاريع الكبيرة.