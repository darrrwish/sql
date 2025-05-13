/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1736455494")

  // update collection data
  unmarshal({
    "verificationTemplate": {
      "body": "<!-- ✅ قالب: تحقق من البريد الإلكتروني -->\n<table style=\"font-family: sans-serif; background-color: #F5F7FA; color: #333333; width: 100%; padding: 20px;\">\n  <tr>\n    <td style=\"max-width: 600px; margin: auto; background-color: #FFFFFF; border-radius: 10px; box-shadow: 0 2px 8px rgba(76, 175, 80, 0.1); padding: 40px;\">\n      <h2 style=\"color: #2E7D32;\">مرحبا!</h2>\n      <p>يرجى النقر على الزر أدناه لتأكيد بريدك الإلكتروني:</p>\n      <a href=\"#\" style=\"display: inline-block; background-color: #4CAF50; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; margin-top: 20px;\">تأكيد البريد الإلكتروني</a>\n    </td>\n  </tr>\n</table>"
    }
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1736455494")

  // update collection data
  unmarshal({
    "verificationTemplate": {
      "body": "<!DOCTYPE html>\n<html dir=\"rtl\" lang=\"ar\">\n<head>\n    <meta charset=\"UTF-8\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n    <title>تأكيد البريد الإلكتروني</title>\n    <style>\n        body {\n            font-family: 'Tajawal', sans-serif;\n            background-color: #f5f7fa;\n            color: #333333;\n            margin: 0;\n            padding: 0;\n            line-height: 1.6;\n        }\n        .container {\n            max-width: 600px;\n            margin: 20px auto;\n            background-color: #ffffff;\n            border-radius: 10px;\n            overflow: hidden;\n            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);\n        }\n        .header {\n            background-color: #2E7D32;\n            padding: 20px;\n            text-align: center;\n        }\n        .header h1 {\n            color: white;\n            margin: 0;\n            font-size: 24px;\n        }\n        .content {\n            padding: 30px;\n            text-align: center;\n        }\n        .btn {\n            display: inline-block;\n            padding: 12px 30px;\n            background-color: #4CAF50;\n            color: white;\n            text-decoration: none;\n            border-radius: 6px;\n            font-weight: bold;\n            margin: 20px 0;\n            transition: all 0.3s ease;\n        }\n        .btn:hover {\n            background-color: #3e8e41;\n            box-shadow: 0 4px 8px rgba(76, 175, 80, 0.3);\n        }\n        .footer {\n            padding: 15px;\n            text-align: center;\n            font-size: 12px;\n            color: #777777;\n            background-color: #f5f5f5;\n        }\n        .logo {\n            color: #4CAF50;\n            font-weight: bold;\n            font-size: 20px;\n        }\n    </style>\n</head>\n<body>\n    <div class=\"container\">\n        <div class=\"header\">\n            <h1>تأكيد بريدك الإلكتروني</h1>\n        </div>\n        <div class=\"content\">\n            <p>مرحباً بك في [APP_NAME]!</p>\n            <p>شكراً لتسجيلك معنا. يرجى النقر على الزر أدناه لتأكيد بريدك الإلكتروني:</p>\n            \n            <a href=\"[APP_URL]/auth/confirm-verification/{TOKEN}\" class=\"btn\">تأكيد البريد الإلكتروني</a>\n            \n            <p>إذا لم تطلب هذا البريد، يمكنك تجاهله بأمان.</p>\n        </div>\n        <div class=\"footer\">\n            <p>© 2023 <span class=\"logo\">[APP_NAME]</span>. جميع الحقوق محفوظة.</p>\n            <p>إذا واجهتك أي مشكلة، لا تتردد في التواصل معنا على support@example.com</p>\n        </div>\n    </div>\n</body>\n</html>"
    }
  }, collection)

  return app.save(collection)
})
