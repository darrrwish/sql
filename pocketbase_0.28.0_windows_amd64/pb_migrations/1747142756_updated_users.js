/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1736455494")

  // update collection data
  unmarshal({
    "otp": {
      "emailTemplate": {
        "body": "<!DOCTYPE html>\n<html lang=\"ar\" dir=\"rtl\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>رمز التحقق - {APP_NAME}</title>\n  <link href=\"https://fonts.googleapis.com/css2?family=Tajawal:wght@400;700&display=swap\" rel=\"stylesheet\">\n  <style>\n    body {\n      background-color: #F5F7FA;\n      font-family: 'Tajawal', sans-serif;\n      color: #333333;\n      margin: 0;\n      padding: 0;\n    }\n    .container {\n      max-width: 600px;\n      margin: 40px auto;\n      background-color: #FFFFFF;\n      border-radius: 10px;\n      overflow: hidden;\n      box-shadow: 0 4px 10px rgba(0,0,0,0.05);\n    }\n    .header {\n      background-color: #2E7D32;\n      color: #fff;\n      padding: 20px;\n      text-align: center;\n    }\n    .header h1 {\n      margin: 0;\n      font-size: 24px;\n    }\n    .content {\n      padding: 30px;\n      text-align: center;\n    }\n    .content p {\n      font-size: 16px;\n      line-height: 1.6;\n    }\n    .otp-code {\n      font-size: 32px;\n      font-weight: bold;\n      color: #4CAF50;\n      background-color: rgba(76, 175, 80, 0.1);\n      padding: 15px 30px;\n      border-radius: 10px;\n      display: inline-block;\n      margin-top: 20px;\n    }\n    .footer {\n      text-align: center;\n      font-size: 12px;\n      color: #999;\n      padding: 20px;\n    }\n  </style>\n</head>\n<body>\n  <div class=\"container\">\n    <div class=\"header\">\n      <h1>{APP_NAME}</h1>\n    </div>\n    <div class=\"content\">\n      <p>مرحبًا،</p>\n      <p>رمز التحقق المؤقت الخاص بك هو:</p>\n      <div class=\"otp-code\">{OTP}</div>\n      <p style=\"margin-top: 30px;\">\n        <i>إذا لم تطلب رمز تحقق لمرة واحدة، يمكنك تجاهل هذا البريد الإلكتروني.</i>\n      </p>\n    </div>\n    <div class=\"footer\">\n      <p>مع تحيات فريق {APP_NAME}</p>\n    </div>\n  </div>\n</body>\n</html>\n"
      }
    }
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1736455494")

  // update collection data
  unmarshal({
    "otp": {
      "emailTemplate": {
        "body": "<p>Hello,</p>\n<p>Your one-time password is: <strong>{OTP}</strong></p>\n<p><i>If you didn't ask for the one-time password, you can ignore this email.</i></p>\n<p>\n  Thanks,<br/>\n  {APP_NAME} team\n</p>"
      }
    }
  }, collection)

  return app.save(collection)
})
