/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1736455494")

  // update collection data
  unmarshal({
    "resetPasswordTemplate": {
      "body": "<!DOCTYPE html>\n<html lang=\"ar\" dir=\"rtl\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>إعادة تعيين كلمة المرور - {APP_NAME}</title>\n  <link href=\"https://fonts.googleapis.com/css2?family=Tajawal:wght@400;700&display=swap\" rel=\"stylesheet\">\n  <style>\n    body {\n      background-color: #F5F7FA;\n      font-family: 'Tajawal', sans-serif;\n      color: #333333;\n      margin: 0;\n      padding: 0;\n    }\n    .container {\n      max-width: 600px;\n      margin: 40px auto;\n      background-color: #FFFFFF;\n      border-radius: 10px;\n      overflow: hidden;\n      box-shadow: 0 4px 10px rgba(0,0,0,0.05);\n    }\n    .header {\n      background-color: #2E7D32;\n      color: #fff;\n      padding: 20px;\n      text-align: center;\n    }\n    .header h1 {\n      margin: 0;\n      font-size: 24px;\n    }\n    .content {\n      padding: 30px;\n    }\n    .content p {\n      font-size: 16px;\n      line-height: 1.6;\n    }\n    .btn {\n      display: inline-block;\n      background-color: #2E7D32;\n      color: #fff;\n      text-decoration: none;\n      padding: 12px 24px;\n      border-radius: 8px;\n      margin-top: 20px;\n    }\n    .footer {\n      text-align: center;\n      font-size: 12px;\n      color: #999;\n      padding: 20px;\n    }\n  </style>\n</head>\n<body>\n  <div class=\"container\">\n    <div class=\"header\">\n      <h1>{APP_NAME}</h1>\n    </div>\n    <div class=\"content\">\n      <p>مرحبًا،</p>\n      <p>لقد طلبت إعادة تعيين كلمة المرور الخاصة بك على <strong>{APP_NAME}</strong>.</p>\n      <p>اضغط على الزر أدناه لإعادة تعيينها الآن:</p>\n      <a href=\"{APP_URL}/_/#/auth/confirm-password-reset/{TOKEN}\" class=\"btn\" target=\"_blank\" rel=\"noopener\">إعادة تعيين كلمة المرور</a>\n    </div>\n    <div class=\"footer\">\n      <p>إذا لم تطلب هذا الإجراء، تجاهل هذا البريد الإلكتروني.</p>\n    </div>\n  </div>\n</body>\n</html>\n"
    }
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1736455494")

  // update collection data
  unmarshal({
    "resetPasswordTemplate": {
      "body": "<p>Hello,</p>\n<p>Click on the button below to reset your password.</p>\n<p>\n  <a class=\"btn\" href=\"{APP_URL}/_/#/auth/confirm-password-reset/{TOKEN}\" target=\"_blank\" rel=\"noopener\">Reset password</a>\n</p>\n<p><i>If you didn't ask to reset your password, you can ignore this email.</i></p>\n<p>\n  Thanks,<br/>\n  {APP_NAME} team\n</p>"
    }
  }, collection)

  return app.save(collection)
})
