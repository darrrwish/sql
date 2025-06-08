## العوامل (Operators) في SQL
### أولًا: يعني إيه Operators في SQL؟

العوامل أو الـ **Operators** هي رموز أو كلمات بنستخدمها في جمل SQL عشان نعمل عمليات معينة على البيانات، زي المقارنة بين قيم، إجراء حسابات، أو دمج شروط.

### أنواع العوامل في SQL:


---

### 1. **عوامل المقارنة (Comparison Operators)**

بتستخدم للمقارنة بين قيمتين أو أكثر، وبتدي نتيجة صحيحة أو خاطئة.


| العامل | الوظيفة | مثال |
| :-- | :-- | :-- |
| = | يساوي | `WHERE age = 30` |
| <> أو != | لا يساوي | `WHERE status <> 'inactive'` |
| > | أكبر من | `WHERE salary > 5000` |
| < | أصغر من | `WHERE age < 18` |
| >= | أكبر من أو يساوي | `WHERE score >= 75` |
| <= | أصغر من أو يساوي | `WHERE date <= '2024-06-01'` |


---

### 2.  **عوامل حسابية (Arithmetic Operators)**

بتستخدم لإجراء عمليات حسابية على الأرقام.


| العامل | الوظيفة | مثال |
| :-- | :-- | :-- |
| + | جمع | `SELECT price + tax AS total` |
| - | طرح | `SELECT salary - deduction` |
| * | ضرب | `SELECT quantity * price` |
| / | قسمة | `SELECT total / count` |
| % | باقي القسمة (Modulus) | `SELECT id % 2` (للتعرف على فردي/زوجي) |


---

### 3. **عوامل منطقية (Logical Operators)**

بتستخدم لدمج شروط متعددة في جملة WHERE.


| العامل | الوظيفة | مثال |
| :-- | :-- | :-- |
| AND | كل الشروط لازم تتحقق | `WHERE age > 18 AND city = 'القاهرة'` |
| OR | شرط واحد على الأقل لازم يتحقق | `WHERE city = 'الإسكندرية' OR city = 'الجيزة'` |
| NOT | عكس الشرط | `WHERE NOT status = 'inactive'` |


---

### 4. **عوامل خاصة (Special Operators)**

عوامل بتستخدم في حالات معينة.


| العامل | الوظيفة | مثال |
| :-- | :-- | :-- |
| LIKE | البحث عن نمط معين في نص | `WHERE name LIKE 'أحمد%'` (كل الأسماء اللي بتبدأ بـ "أحمد") |
| IN | البحث ضمن قائمة قيم | `WHERE city IN ('القاهرة', 'الجيزة')` |
| BETWEEN | البحث ضمن نطاق معين | `WHERE age BETWEEN 20 AND 30` |
| IS NULL | التحقق من وجود قيمة فارغة (NULL) | `WHERE end_date IS NULL` |


---

## تطبيقات عملية علي جميع ماسبق

بناءً على طلبك لإنشاء **تطبيقات عملية بسيطة** لجميع **العوامل (Operators) في SQL** (الحسابية، المقارنة، المنطقية، والخاصة) باستخدام قاعدة البيانات الطبية المقدمة (`mockData`)، سأقدم شرحًا **شاملًا** و**مبسطًا** يناسب المبتدئين. الشرح هيتبع الأسلوب المطلوب: "عايزين..." متبوع بالكود SQL، ثم شرح تفصيلي لوظيفة الكود. كل قسم هيحتوي على أمثلة عملية تعتمد على الجداول الموجودة في قاعدة البيانات (`patients`, `diagnoses`, `doctors`, `visits`, `medications`, `departments`)، مع الحفاظ على الجداول المقدمة للعوامل. الشرح هيكون بكود **ماركداون**، متوافق مع تعليماتك السابقة (تجنب عبارات مثل "مثال عملي" أو "مثال توضيحي" بدون داعٍ، استخدام "مقتطف" للأمثلة المرتبطة بمواضيع لاحقة، لغة عربية سلسة، محتوى مناسب للسيو). كمان هأخد في الاعتبار تعريف العوامل وهيكلية الشرح الأصلية اللي قدمتها.

---

## كود الماركداون لتطبيقات عملية على العوامل في SQL

```markdown
# تطبيقات عملية على العوامل (Operators) في SQL

**العوامل** (Operators) في SQL هي رموز أو كلمات تُستخدم في جمل SQL لإجراء عمليات على البيانات، زي المقارنة، الحسابات، أو دمج الشروط. الجزء ده هيوفر تطبيقات بسيطة لكل نوع من العوامل (حسابية، مقارنة، منطقية، خاصة) باستخدام قاعدة بيانات طبية تحتوي على جداول `patients`، `diagnoses`، `doctors`، `visits`، `medications`، و`departments`. كل تطبيق هيبدأ بـ "عايزين..."، يليه كود SQL، ثم شرح تفصيلي لوظيفة الكود. الشرح هيستند إلى البيانات الموجودة في قاعدة البيانات، مع الإبقاء على جداول العوامل كما هي.

---

## أنواع العوامل في SQL

### 1. عوامل المقارنة (Comparison Operators)
بتُستخدم لمقارنة قيمتين، وبتنتج نتيجة إما صحيحة أو خاطئة.

| العامل | الوظيفة | مثال |
| :-- | :-- | :-- |
| `=` | يساوي | `WHERE age = 30` |
| `<>` أو `!=` | لا يساوي | `WHERE status <> 'inactive'` |
| `>` | أكبر من | `WHERE salary > 5000` |
| `<` | أصغر من | `WHERE age < 18` |
| `>=` | أكبر من أو يساوي | `WHERE score >= 75` |
| `<=` | أصغر من أو يساوي | `WHERE date <= '2024-06-01'` |

#### تطبيق 1: استخدام `=`
عايزين نجيب بيانات المريض اللي اسمه "أحمد سامح" من جدول `patients`.

```sql
SELECT id, name, phone
FROM patients
WHERE name = 'أحمد سامح';
```

**شرح وظيفة الكود**:
- `SELECT id, name, phone`: بنختار أعمدة `id`، `name`، و`phone` من جدول `patients`.
- `FROM patients`: بنحدد جدول `patients` كمصدر البيانات.
- `WHERE name = 'أحمد سامح'`: بنستخدم العامل `=` لتصفية السجلات، بحيث تظهر فقط البيانات اللي عمود `name` فيها يساوي "أحمد سامح".
- **النتيجة**:
  ```
  id: 1, name: أحمد سامح, phone: 01047510801
  ```

#### تطبيق 2: استخدام `>`
عايزين نجيب المرضى اللي أعمارهم أكبر من 35 سنة من جدول `patients` (بنحسب العمر بناءً على `dob`).

```sql
SELECT id, name, dob
FROM patients
WHERE DATEDIFF(YEAR, dob, '2025-06-08') > 35;
```

**شرح وظيفة الكود**:
- `SELECT id, name, dob`: بنختار أعمدة `id`، `name`، و`dob` من جدول `patients`.
- `FROM patients`: بنحدد جدول `patients`.
- `WHERE DATEDIFF(YEAR, dob, '2025-06-08') > 35`: 
  - `DATEDIFF(YEAR, dob, '2025-06-08')`: بنستخدم دالة `DATEDIFF` لحساب العمر بالسنين بناءً على تاريخ الميلاد (`dob`) والتاريخ الحالي (8 يونيو 2025). (ده **مقتطف** مرتبط بوظائف التاريخ).
  - `> 35`: بنستخدم العامل `>` لتصفية المرضى اللي عمرهم أكبر من 35 سنة.
- **النتيجة**:
  ```
  id: 1, name: أحمد سامح, dob: 1980-03-10
  id: 5, name: محمود سامي, dob: 1975-12-01
  ```

---

### 2. عوامل حسابية (Arithmetic Operators)
بتُستخدم لإجراء عمليات رياضية على القيم العددية.

| العامل | الوظيفة | مثال |
| :-- | :-- | :-- |
| `+` | جمع | `SELECT price + tax AS total` |
| `-` | طرح | `SELECT salary - deduction` |
| `*` | ضرب | `SELECT quantity * price` |
| `/` | قسمة | `SELECT total / count` |
| `%` | باقي القسمة (Modulus) | `SELECT id % 2` (للتعرف على فردي/زوجي) |

#### تطبيق 3: استخدام `+`
عايزين نحسب التكلفة الإجمالية لزيارة (افترضنا إن في عمود `fee` في جدول `visits`) بإضافة رسوم الزيارة مع تكلفة دواء افتراضية (50 جنيه).

```sql
SELECT id, patient_id, (fee + 50) AS total_cost
FROM visits
WHERE id = 1;
```

**شرح وظيفة الكود**:
- `SELECT id, patient_id, (fee + 50) AS total_cost`: بنختار `id` و`patient_id` من جدول `visits`، ونحسب التكلفة الإجمالية بإضافة 50 (تكلفة دواء افتراضية) إلى `fee` (افترضنا وجوده). العامل `+` بيجمع القيمتين، والنتيجة بتظهر في عمود جديد اسمه `total_cost`.
- `FROM visits`: بنحدد جدول `visits`.
- `WHERE id = 1`: بنحدد الزيارة رقم 1.
- **النتيجة**: (افتراضًا لو `fee = 100`):
  ```
  id: 1, patient_id: 1, total_cost: 150
  ```

#### تطبيق 4: استخدام `%`
عايزين نجيب المرضى اللي أرقام تعريفهم (`id`) زوجية من جدول `patients`.

```sql
SELECT id, name
FROM patients
WHERE id % 2 = 0;
```

**شرح وظيفة الكود**:
- `SELECT id, name`: بنختار أعمدة `id` و`name` من جدول `patients`.
- `FROM patients`: بنحدد جدول `patients`.
- `WHERE id % 2 = 0`: 
  - `id % 2`: بنستخدم العامل `%` لحساب باقي قسمة `id` على 2.
  - `= 0`: بنتحقق إن الباقي يساوي 0، يعني الرقم زوجي.
- **النتيجة**:
  ```
  id: 2, name: مريم فايق
  id: 4, name: ليلى هنادي
  ```

---

### 3. عوامل منطقية (Logical Operators)
بتُستخدم لربط شروط متعددة في جملة `WHERE`.

| العامل | الوظيفة | مثال |
| :-- | :-- | :-- |
| `AND` | كل الشروط لازم تتحقق | `WHERE age > 18 AND city = 'القاهرة'` |
| `OR` | شرط واحد على الأقل لازم يتحقق | `WHERE city = 'الإسكندرية' OR city = 'الجيزة'` |
| `NOT` | عكس الشرط | `WHERE NOT status = 'inactive'` |

#### تطبيق 5: استخدام `AND`
عايزين نجيب الزيارات اللي حصلت في مايو 2024 وكانت مع دكتور تخصصه "باطنة" من جدول `visits` و`doctors`.

```sql
SELECT v.id, v.visit_date, d.name AS doctor_name
FROM visits v
JOIN doctors d ON v.doctor_id = d.id
WHERE v.visit_date LIKE '2024-05%' AND d.specialty = 'باطنة';
```

**شرح وظيفة الكود**:
- `SELECT v.id, v.visit_date, d.name AS doctor_name`: بنختار `id` و`visit_date` من `visits`، و`name` من `doctors` (باسم مستعار `doctor_name`).
- `FROM visits v JOIN doctors d ON v.doctor_id = d.id`: بنربط جدول `visits` مع `doctors` باستخدام `doctor_id` (ده **مقتطف** مرتبط بربط الجداول).
- `WHERE v.visit_date LIKE '2024-05%' AND d.specialty = 'باطنة'`:
  - `v.visit_date LIKE '2024-05%'`: بنتحقق إن تاريخ الزيارة في مايو 2024 (ده **مقتطف** مرتبط بـ `LIKE`).
  - `d.specialty = 'باطنة'`: بنتحقق إن تخصص الدكتور "باطنة".
  - `AND`: بنربط الشرطين، يعني الزيارة لازم تكون في مايو 2024 **و** مع دكتور باطنة.
- **النتيجة**:
  ```
  id: 4, visit_date: 2024-05-03, doctor_name: شريف أنور
  id: 5, visit_date: 2024-05-04, doctor_name: شهاب عبد الله
  ```

#### تطبيق 6: استخدام `OR`
عايزين نجيب المرضى اللي ساكنين في "القاهرة" أو "الجيزة" من جدول `patients`.

```sql
SELECT id, name, address
FROM patients
WHERE address LIKE '%القاهرة%' OR address LIKE '%الجيزة%';
```

**شرح وظيفة الكود**:
- `SELECT id, name, address`: بنختار أعمدة `id`، `name`، و`address` من جدول `patients`.
- `FROM patients`: بنحدد جدول `patients`.
- `WHERE address LIKE '%القاهرة%' OR address LIKE '%الجيزة%'`:
  - `address LIKE '%القاهرة%'`: بنتحقق إن العنوان يحتوي على "القاهرة".
  - `address LIKE '%الجيزة%'`: بنتحقق إن العنوان يحتوي على "الجيزة".
  - `OR`: بنربط الشرطين، يعني يكفي إن واحد منهم يتحقق.
- **النتيجة**:
  ```
  id: 1, name: أحمد سامح, address: الجيزة - الهرم
  id: 2, name: مريم فايق, address: القاهرة - مدينة نصر
  ```

---

### 4. عوامل خاصة (Special Operators)
بتُستخدم في حالات معينة لتحديد أنماط، نطاقات، أو قيم فارغة.

| العامل | الوظيفة | مثال |
| :-- | :-- | :-- |
| `LIKE` | البحث عن نمط معين في نص | `WHERE name LIKE 'أحمد%'` |
| `IN` | البحث ضمن قائمة قيم | `WHERE city IN ('القاهرة', 'الجيزة')` |
| `BETWEEN` | البحث ضمن نطاق معين | `WHERE age BETWEEN 20 AND 30` |
| `IS NULL` | التحقق من وجود قيمة فارغة (NULL) | `WHERE end_date IS NULL` |

#### تطبيق 7: استخدام `LIKE`
عايزين نجيب الأطباء اللي أسماؤهم تبدأ بحرف "ش" من جدول `doctors`.

```sql
SELECT id, name, specialty
FROM doctors
WHERE name LIKE 'ش%';
```

**شرح وظيفة الكود**:
- `SELECT id, name, specialty`: بنختار أعمدة `id`، `name`، و`specialty` من جدول `doctors`.
- `FROM doctors`: بنحدد جدول `doctors`.
- `WHERE name LIKE 'ش%'`: 
  - `LIKE 'ش%'`: بنستخدم العامل `LIKE` مع النمط `ش%`، حيث `%` يمثل أي أحرف بعد "ش". يعني بنبحث عن أسماء تبدأ بـ "ش".
- **النتيجة**:
  ```
  id: 1, name: شريف أنور, specialty: باطنة
  id: 5, name: شهاب عبد الله, specialty: باطنة
  ```

#### تطبيق 8: استخدام `IN`
عايزين نجيب التشخيصات اللي نوعها إما "ارتفاع ضغط الدم" أو "سكري من النوع الثاني" من جدول `diagnoses`.

```sql
SELECT id, patient_id, diagnosis
FROM diagnoses
WHERE diagnosis IN ('ارتفاع ضغط الدم', 'سكري من النوع الثاني');
```

**شرح وظيفة الكود**:
- `SELECT id, patient_id, diagnosis`: بنختار أعمدة `id`، `patient_id`، و`diagnosis` من جدول `diagnoses`.
- `FROM diagnoses`: بنحدد جدول `diagnoses`.
- `WHERE diagnosis IN ('ارتفاع ضغط الدم', 'سكري من النوع الثاني')`: 
  - `IN`: بنستخدم العامل `IN` لتصفية التشخيصات اللي نوعها واحد من القيم المحددة.
- **النتيجة**:
  ```
  id: 2, patient_id: 2, diagnosis: ارتفاع ضغط الدم
  id: 3, patient_id: 3, diagnosis: ارتفاع ضغط الدم
  id: 4, patient_id: 4, diagnosis: سكري من النوع الثاني
  id: 5, patient_id: 5, diagnosis: ارتفاع ضغط الدم
  ```

#### تطبيق 9: استخدام `BETWEEN`
عايزين نجيب الزيارات اللي حصلت بين 30 أبريل و3 مايو 2024 من جدول `visits`.

```sql
SELECT id, patient_id, visit_date
FROM visits
WHERE visit_date BETWEEN '2024-04-30' AND '2024-05-03';
```

**شرح وظيفة الكود**:
- `SELECT id, patient_id, visit_date`: بنختار أعمدة `id`، `patient_id`، و`visit_date` من جدول `visits`.
- `FROM visits`: بنحدد جدول `visits`.
- `WHERE visit_date BETWEEN '2024-04-30' AND '2024-05-03'`: 
  - `BETWEEN`: بنستخدم العامل `BETWEEN` لتصفية الزيارات اللي تاريخها في النطاق من 30 أبريل إلى 3 مايو 2024 (بما فيهم التاريخين).
- **النتيجة**:
  ```
  id: 2, patient_id: 2, visit_date: 2024-04-30
  id: 3, patient_id: 3, visit_date: 2024-05-01
  id: 4, patient_id: 4, visit_date: 2024-05-03
  ```

#### تطبيق 10: استخدام `IS NULL`
عايزين نجيب الأدوية اللي لسه مستمرة (ما ليها تاريخ انتهاء) من جدول `medications`.

```sql
SELECT id, patient_id, medication
FROM medications
WHERE end_date IS NULL;
```

**شرح وظيفة الكود**:
- `SELECT id, patient_id, medication`: بنختار أعمدة `id`، `patient_id`، و`medication` من جدول `medications`.
- `FROM medications`: بنحدد جدول `medications`.
- `WHERE end_date IS NULL`: 
  - `IS NULL`: بنستخدم العامل `IS NULL` لتصفية السجلات اللي عمود `end_date` فيها فارغ.
- **النتيجة**:
  ```
  id: 2, patient_id: 2, medication: أملوديبين
  id: 3, patient_id: 3, medication: أملوديبين
  id: 4, patient_id: 4, medication: ميتفورمين
  id: 5, patient_id: 5, medication: أملوديبين
  ```

---

## نصائح لاستخدام العوامل
- **وضوح الشروط**: استخدم الأقواس `()` مع العوامل المنطقية لتحديد الأولوية (مثل `WHERE (condition1 AND condition2) OR condition3`).
- **تحسين الأداء**: استخدم `IN` بدل تكرار `OR`، وتجنب `%` في بداية نمط `LIKE` لو الجدول كبير.
- **التعامل مع NULL**: استخدم `IS NULL` أو `IS NOT NULL` بدل `=` أو `<>` مع القيم الفارغة.
- **اختيار العامل المناسب**: لو بتحسب أرقام، تأكد إن الأعمدة من نوع عددي (مثل `INTEGER` أو `DECIMAL`).
