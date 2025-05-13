/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1736455494")

  // update collection data
  unmarshal({
    "authAlert": {
      "emailTemplate": {
        "body": "<!DOCTYPE html>\n<html lang=\"ar\" dir=\"rtl\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>تنبيه تسجيل دخول - {APP_NAME}</title>\n  <link href=\"https://fonts.googleapis.com/css2?family=Tajawal:wght@400;700&display=swap\" rel=\"stylesheet\">\n  <style>\n    body {\n      background-color: #F5F7FA;\n      font-family: 'Tajawal', sans-serif;\n      color: #333333;\n      margin: 0;\n      padding: 0;\n    }\n    .container {\n      max-width: 600px;\n      margin: 40px auto;\n      background-color: #FFFFFF;\n      border-radius: 10px;\n      overflow: hidden;\n      box-shadow: 0 4px 10px rgba(0,0,0,0.05);\n    }\n    .header {\n      background-color: #2E7D32;\n      color: #fff;\n      padding: 20px;\n      text-align: center;\n    }\n    .header h1 {\n      margin: 0;\n      font-size: 24px;\n    }\n    .content {\n      padding: 30px;\n    }\n    .content p {\n      font-size: 16px;\n      line-height: 1.6;\n    }\n    .important {\n      font-weight: bold;\n      color: #C62828;\n      margin-top: 20px;\n    }\n    .btn {\n      display: inline-block;\n      background-color: #4CAF50;\n      color: #fff;\n      text-decoration: none;\n      padding: 12px 24px;\n      border-radius: 8px;\n      margin-top: 20px;\n    }\n    .footer {\n      text-align: center;\n      font-size: 12px;\n      color: #999;\n      padding: 20px;\n    }\n  </style>\n</head>\n<body>\n  <div class=\"container\">\n    <div class=\"header\">\n      <h1>{APP_NAME}</h1>\n    </div>\n    <div class=\"content\">\n      <p>مرحبًا،</p>\n      <p>لاحظنا تسجيل دخول إلى حسابك على <strong>{APP_NAME}</strong> من موقع جديد أو جهاز مختلف.</p>\n      <p>إذا كنت أنت من قام بذلك، يمكنك تجاهل هذا البريد الإلكتروني.</p>\n      <p class=\"important\">إذا لم تكن أنت، نوصي بتغيير كلمة المرور فورًا لحماية حسابك وإيقاف الوصول غير المصرح به.</p>\n      <a href=\"{APP_URL}/#/auth/change-password\" class=\"btn\" target=\"_blank\" rel=\"noopener\">تغيير كلمة المرور</a>\n    </div>\n    <div class=\"footer\">\n      <p>مع تحيات فريق {APP_NAME}</p>\n    </div>\n  </div>\n</body>\n</html>\n"
      }
    }
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1736455494")

  // update collection data
  unmarshal({
    "authAlert": {
      "emailTemplate": {
        "body": "<p>Hello,</p>\n<p>We noticed a login to your {APP_NAME} account from a new location.</p>\n<p>If this was you, you may disregard this email.</p>\n<p><strong>If this wasn't you, you should immediately change your {APP_NAME} account password to revoke access from all other locations.</strong></p>\n<p>\n  Thanks,<br/>\n  {APP_NAME} team\n</p>"
      }
    }
  }, collection)

  return app.save(collection)
})
