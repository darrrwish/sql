## العوامل (Operators) في SQL
### أولًا: يعني إيه Operators في SQL؟

العوامل أو الـ **Operators** هي رموز أو كلمات بنستخدمها في جمل SQL عشان نعمل عمليات معينة على البيانات، زي المقارنة بين قيم، إجراء حسابات، أو دمج شروط.

---

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

## تطبيق عملي بسيط

نفترض عندنا جدول `patients` (المرضى) فيه الأعمدة: `name`، `age`، `city`، و`status`.

لو عايزين نجيب كل المرضى اللي أعمارهم أكبر من 30 وساكنين في القاهرة، ونشوف فقط اللي حالتهم مش "inactive"، هنكتب الاستعلام كالتالي:

```sql
SELECT name, age, city, status
FROM patients
WHERE age > 30 AND city = 'القاهرة' AND NOT status = 'inactive';
```

لو عايزين نجيب المرضى اللي أسماؤهم بتبدأ بـ "محمد" أو "أحمد":

```sql
SELECT name
FROM patients
WHERE name LIKE 'محمد%' OR name LIKE 'أحمد%';
```



