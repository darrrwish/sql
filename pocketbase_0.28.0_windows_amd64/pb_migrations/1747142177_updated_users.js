/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1736455494")

  // update collection data
  unmarshal({
    "verificationTemplate": {
      "body": "<!DOCTYPE html>\n<html lang=\"ar\" dir=\"rtl\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>تفعيل حسابك على درويشSQL</title>\n  <link href=\"https://fonts.googleapis.com/css2?family=Tajawal:wght@400;700&display=swap\" rel=\"stylesheet\">\n  <style>\n    :root {\n      --dart-blue: #2E7D32;\n      --dart-blue-light: #4CAF50;\n      --light-bg: #F5F7FA;\n      --lighter-bg: #FFFFFF;\n      --text-dark: #333333;\n      --text-light: #F5F5F5;\n      --box-shadow-course-level: 0 2px 8px rgba(76, 175, 80, 0.1);\n    }\n\n    body {\n      margin: 0;\n      padding: 0;\n      font-family: 'Tajawal', sans-serif;\n      background-color: var(--light-bg);\n      color: var(--text-dark);\n    }\n\n    .email-wrapper {\n      max-width: 600px;\n      margin: auto;\n      background-color: var(--lighter-bg);\n      border-radius: 12px;\n      box-shadow: var(--box-shadow-course-level);\n      overflow: hidden;\n    }\n\n    .header {\n      background-color: var(--dart-blue);\n      padding: 20px;\n      text-align: center;\n      color: var(--text-light);\n    }\n\n    .header h1 {\n      margin: 0;\n      font-size: 24px;\n    }\n\n    .content {\n      padding: 30px;\n      color: var(--text-dark);\n    }\n\n    .content h2 {\n      color: var(--dart-blue);\n      margin-top: 0;\n    }\n\n    .activate-btn {\n      display: inline-block;\n      padding: 14px 28px;\n      background-color: var(--dart-blue-light);\n      color: #fff;\n      text-decoration: none;\n      border-radius: 8px;\n      font-weight: bold;\n      margin: 25px 0;\n    }\n\n    .footer {\n      background-color: var(--light-bg);\n      text-align: center;\n      padding: 20px;\n      font-size: 13px;\n      color: #777;\n    }\n\n    .footer a {\n      color: var(--dart-blue);\n      text-decoration: none;\n    }\n  </style>\n</head>\n<body>\n  <table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" style=\"padding: 30px 0;\">\n    <tr>\n      <td align=\"center\">\n        <div class=\"email-wrapper\">\n          <div class=\"header\">\n            <h1> درويشSQL</h1>\n          </div>\n          <div class=\"content\">\n            <h2>مرحبًا بك 👋</h2>\n            <p>شكرًا لانضمامك إلى <strong> درويشSQL</strong> لتعلّم قواعد البيانات بشكل عملي ومبسط.</p>\n            <p>يرجى الضغط على الزر أدناه لتفعيل حسابك :</p>\n            <div style=\"text-align: center;\">\n              <a href=\"{{ .ConfirmationURL }}\" class=\"activate-btn\" target=\"_blank\">تفعيل الحساب الآن</a>\n            </div>\n            <p style=\"font-size: 14px; color: #666;\">إذا لم تقم بإنشاء هذا الحساب، يمكنك تجاهل هذه الرسالة.</p>\n            <p style=\"font-size: 13px; direction:ltr; color:#aaa;\">{{ .Email }}</p>\n          </div>\n          <div class=\"footer\">\n            © 2025 SQL  — <a href=\"https://darrrwish.github.io/sql\" target=\"_blank\"> Darwish </a>\n          </div>\n        </div>\n      </td>\n    </tr>\n  </table>\n</body>\n</html>\n"
    }
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1736455494")

  // update collection data
  unmarshal({
    "verificationTemplate": {
      "body": "<!-- ✅ قالب: تحقق من البريد الإلكتروني -->\n<table style=\"font-family: sans-serif; background-color: #F5F7FA; color: #333333; width: 100%; padding: 20px;\">\n  <tr>\n    <td style=\"max-width: 600px; margin: auto; background-color: #FFFFFF; border-radius: 10px; box-shadow: 0 2px 8px rgba(76, 175, 80, 0.1); padding: 40px;\">\n      <h2 style=\"color: #2E7D32;\">مرحبا!</h2>\n      <p>يرجى النقر على الزر أدناه لتأكيد بريدك الإلكتروني:</p>\n      <a href=\"#\" style=\"display: inline-block; background-color: #4CAF50; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; margin-top: 20px;\">تأكيد البريد الإلكتروني</a>\n    </td>\n  </tr>\n</table>"
    }
  }, collection)

  return app.save(collection)
})
