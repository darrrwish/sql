أولاً: يعني إيه عوامل (Operators) في SQL؟

العوامل هي رموز أو كلمات بنستخدمها في الاستعلامات (queries) علشان نعمل عمليات زي المقارنة أو الجمع أو التصفية أو حتى التعامل مع النصوص.


---

أنواع العوامل في SQL:

نوع العامل	وظيفته	أمثلة

عوامل حسابية	تعمل عمليات رياضية على الأرقام	+, -, *, /, %
عوامل المقارنة	تقارن بين قيمتين	=, <>, >, <, >=, <=
عوامل منطقية	بتربط بين شروط مختلفة داخل WHERE	AND, OR, NOT
عوامل بينية (BETWEEN, IN)	بتساعد في التصفية بين قيم محددة أو مجال معين	BETWEEN, IN, NOT IN
عوامل النصوص	بتشتغل على النصوص (strings)	LIKE, NOT LIKE
عوامل NULL	بتستخدم مع القيم الفارغة (NULL)	IS NULL, IS NOT NULL
عامل الإسناد	بيستخدم لتخزين أو تغيير قيمة في جملة SET أو SELECT	= (تساوي أو تعيين)



---

📘 1. العوامل الحسابية (Arithmetic Operators)

العامل	الوظيفة	مثال عملي

+	جمع	salary + 1000
-	طرح	salary - 500
*	ضرب	price * 2
/	قسمة	amount / 4
%	باقي القسمة (Modulus)	10 % 3 الناتج 1


> 🎯 مثال عملي:



SELECT name, 2025 - YEAR(dob) AS العمر
FROM patients;


---

📗 2. عوامل المقارنة (Comparison Operators)

العامل	معناه	مثال

=	يساوي	gender = 'ذكر'
<> أو !=	لا يساوي	gender <> 'أنثى'
>	أكبر من	age > 50
<	أصغر من	age < 30
>=	أكبر من أو يساوي	visit_date >= '2024-05-01'
<=	أصغر من أو يساوي	start_date <= '2024-05-03'



---

📙 3. العوامل المنطقية (Logical Operators)

العامل	الوظيفة	مثال

AND	الشرطان لازم يكونوا صح	gender = 'أنثى' AND address LIKE '%القاهرة%'
OR	لو أي شرط صح	gender = 'ذكر' OR age > 60
NOT	يعكس الشرط	NOT gender = 'ذكر'



---

📕 4. عوامل BETWEEN و IN

العامل	الوظيفة	مثال

BETWEEN	يحدد مدى بين قيمتين	visit_date BETWEEN '2024-05-01' AND '2024-05-05'
IN	يحدد قائمة بالقيم	specialty IN ('باطنة', 'قلب')
NOT IN	عكس IN	id NOT IN (1, 3, 5)



---

📒 5. عوامل LIKE للنصوص (Text Operators)

العامل	المعنى	الاستخدام

LIKE	يطابق نمط معين	name LIKE 'م%' → يبدأ بحرف "م"
%	أي عدد من الحروف	address LIKE '%الهرم%'
_	حرف واحد فقط	phone LIKE '010_7%'



---

📓 6. عوامل NULL

العامل	الوظيفة	المثال

IS NULL	يشوف إذا كانت القيمة فاضية	end_date IS NULL
IS NOT NULL	يشوف إذا كانت القيمة مش فاضية	end_date IS NOT NULL



---

✅ أمثلة عملية باستخدام قاعدة بياناتك:

مثال 1: عرض المرضى اللي بياخدوا علاج ضغط حاليًا

SELECT name, medication
FROM patients
JOIN medications ON patients.id = medications.patient_id
WHERE medication = 'أملوديبين' AND end_date IS NULL;


---

مثال 2: عرض زيارات المرضى اللي تمت في مايو

SELECT patients.name, visit_date
FROM visits
JOIN patients ON visits.patient_id = patients.id
WHERE visit_date BETWEEN '2024-05-01' AND '2024-05-31';


---

مثال 3: عرض الأطباء اللي تخصصهم باطنة أو قلب

SELECT name, specialty
FROM doctors
WHERE specialty IN ('باطنة', 'قلب');


---

🧾 ملخص سريع:

نوع العامل	أهم الاستخدامات

حسابي	جمع وطرح وضرب وقسمة
مقارنات	تصفية حسب قيمة معينة أو أكبر/أصغر منها
منطقية	ربط شروط باستخدام AND / OR
بينية	فلترة حسب مدى أو قائمة
نصية	البحث داخل النصوص بـ LIKE
NULL	التحقق من القيم 
