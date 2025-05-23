# SELECT Statement - جملة الاختيار

## مقدمة

لو إنت لسه بادئ تتعلم SQL، أول حاجة لازم تعرفها هي جملة SELECT. الجملة دي بنستخدمها علشان نجيب بيانات من جدول موجود في قاعدة البيانات...هنتعلم ازاي نختار أعمدة او بيانات معينة ترجع لينا من قاعدة البيانات و ازاي نختار كل البيانات او الأعمدة.

### يعني إيه SELECT؟

ببساطة، SELECT معناها "اختار"، وهي الطريقة اللي بنقول بيها لقاعدة البيانات: "هاتلي البيانات اللي محتاجها من جدول معين".

### شكل الجملة الأساسي

```sql
SELECT اسم_العمود2, اسم_العمود1 FROM اسم_الجدول;
```

---

## SELECT

### مثال 1: جلب بيانات محددة من جدول المرضى

هاتلي من قاعدة البيانات...أسماء المرضى و ارقام تليفوناتهم.

```sql
SELECT name, phone FROM patients;
```

### مثال 2: جلب بيانات محددة من جدول الأطباء

هاتلي من قاعدة البيانات...أسماء الدكاترة  و تخصصاتهم.

```sql
SELECT name, specialty FROM doctors;
```

---

## SELECT ALL (*)

### مثال 3: جلب كل البيانات من جدول المرضى

هاتلي كل الأعمدة...كل البيانات...بنستخدم علامة *.

```sql
SELECT * FROM patients;
```

---

## SELECT DISTINCT

أحيانًا العمود بيكون فيه بيانات مكررة، لكن إحنا مش عايزين التكرار، بنستخدم DISTINCT.

### مثال 4 : لو عايزين نعرف الأمراض المختلفة اللي اتشخص بيها المرضى بدون تكرار:

```sql
SELECT DISTINCT diagnosis
FROM diagnoses;
```

لاحظ إن "ارتفاع ضغط الدم" متكرر ٣ مرات في الجدول، لكن باستخدام DISTINCT ظهر مرة واحدة بس.

لاحظ الجدول الأصلي :

```sql
SELECT * diagnosis
FROM diagnoses;
```

### كمان ممكن نعدّ القيم المختلفة (نعد التشخيصات بدون تكرار) :

#### لو عايزين نعرف العدد بنستخدم دالة COUNT :

```sql
SELECT COUNT(DISTINCT diagnosis)
FROM diagnoses;
```

---

## نصائح مهمة

- استخدم `*` فقط عندما تحتاج كل الأعمدة
- حدد الأعمدة المطلوبة بدقة
- تأكد من كتابة اسم الجدول بعد FROM

## خلاصة الدرس

- SELECT هي أساس استرجاع البيانات في SQL
- ممكن تحديد أعمدة معينة أو استخدام `*` لجميع الأعمدة
