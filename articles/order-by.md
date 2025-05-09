
# SQL ORDER BY - ترتيب نتيجة الاستعلام 

## مقدمة
في SQL، لما تيجي تطلع بيانات من جدول، ترتيبهم بيكون عشوائي. يعني مرة أحمد ممكن يطلع الأول، ومرة سعيد، وهكذا. لو حابب تطلع البيانات مرتبة حسب عمود معين (زي الاسم أو التاريخ أو السعر)، ساعتها لازم تستخدم `ORDER BY`.

## الصيغة الأساسية

```sql
SELECT اسم_العمود 
FROM اسم_الجدول
ORDER BY اسم_العمود [ASC | DESC];
```

- **ASC**: ترتيب تصاعدي (من الأصغر للأكبر - ده الوضع الافتراضي)
- **DESC**: ترتيب تنازلي (من الأكبر للأصغر)

## أمثلة عملية على قاعدة البيانات الطبية

### مثال 1: ترتيب المرضى حسب تاريخ الميلاد
```sql
SELECT name, dob
FROM patients
ORDER BY dob ASC;
```
**النتيجة**: المريض اللي اتولد الأول في الأعلى، لحد أصغر واحد في السن.

### مثال 2: ترتيب زيارات العيادة حسب التاريخ
```sql
SELECT *
FROM visits
ORDER BY visit_date DESC;
```
**الفائدة**: تشوف آخر زيارات تمت في النظام.

### مثال 3: ترتيب الأدوية أبجدياً
```sql
SELECT medication, dose
FROM medications
ORDER BY medication;
```

### مثال 4: ترتيب متعدد الأعمدة
```sql
SELECT name, specialty
FROM doctors
ORDER BY specialty, name;
```
**الشرح**: كل الدكاترة من نفس التخصص يظهروا مع بعض، مرتبين حسب الاسم.

### مثال 5: ترتيب عكسي حسب العنوان
```sql
SELECT name, address
FROM patients
ORDER BY address DESC;
```
**النتيجة**: مثلاً "طنطا" هتيجي قبل "القاهرة" لو مشينا بالعكس.

## تقنيات متقدمة
```sql
SELECT *
FROM doctors
ORDER BY specialty ASC, name DESC;
```
**الشرح**: رتب التخصص تصاعدي، بس داخل كل تخصص، رتب الأسماء تنازلي.

## ملخص الدرس
- `ORDER BY` بتستخدم لترتيب البيانات حسب عمود أو أكتر
- الوضع الافتراضي بيكون تصاعدي (`ASC`)
- للترتيب التنازلي استخدم `DESC`
- مفيد للترتيب الأبجدي أو حسب التواريخ أو الأرقام
- تقدر تستخدمه مع أي جدول في قاعدة البيانات