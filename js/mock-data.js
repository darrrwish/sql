export const mockData = {
    patients: [
      { id: 1, name: 'أحمد سامح', gender: 'ذكر', dob: '1980-03-10', phone: '01047510801', address: 'الجيزة - الهرم' },
      { id: 2, name: 'مريم فايق', gender: 'أنثى', dob: '1992-09-15', phone: '01123456789', address: 'القاهرة - مدينة نصر' },
      { id: 3, name: 'محمود فضل', gender: 'ذكر', dob: '1988-06-22', phone: '01256255072', address: 'الإسكندرية - سيدي بشر' },
      { id: 4, name: 'ليلى هنادي', gender: 'أنثى', dob: '1995-01-05', phone: '01099887766', address: 'المنصورة - الجامعة' },
      { id: 5, name: 'محمود سامي', gender: 'ذكر', dob: '1975-12-01', phone: '01018351143', address: 'طنطا - المحلة الكبرى' }
    ],
    diagnoses: [
      { id: 1, patient_id: 1, diagnosis: 'التهاب رئوي حاد', diagnosis_date: '2024-04-28' },
      { id: 2, patient_id: 2, diagnosis: 'ارتفاع ضغط الدم', diagnosis_date: '2024-04-30' },
      { id: 3, patient_id: 3, diagnosis: 'ارتفاع ضغط الدم', diagnosis_date: '2024-05-01' },
      { id: 4, patient_id: 4, diagnosis: 'سكري من النوع الثاني', diagnosis_date: '2024-05-03' },
      { id: 5, patient_id: 5, diagnosis: 'ارتفاع ضغط الدم', diagnosis_date: '2024-05-04' }
    ],
    doctors: [
      { id: 1, name: 'شريف أنور', specialty: 'باطنة', phone: '01055667788' },
      { id: 2, name: 'نجلاء فهمي', specialty: 'جراحة عظام', phone: '01224448899' },
      { id: 3, name: 'هاني هادي', specialty: 'صدرية', phone: '01177889900' },
      { id: 4, name: 'مينا فادي', specialty: 'قلب', phone: '01011223344' },
      { id: 5, name: 'شهاب عبد الله', specialty: 'باطنة', phone: '01122334455' }
    ],
visits: [
  { id: 1, patient_id: 1, doctor_id: 3, visit_date: '2024-04-28', notes: 'سعال وارتفاع حرارة', fee: 150 },
  { id: 2, patient_id: 2, doctor_id: 5, visit_date: '2024-04-30', notes: 'ضغط مرتفع وصداع', fee: 200 },
  { id: 3, patient_id: 3, doctor_id: 5, visit_date: '2024-05-01', notes: 'دوخة وألم بالرأس', fee: 180 },
  { id: 4, patient_id: 4, doctor_id: 1, visit_date: '2024-05-03', notes: 'تحليل سكر', fee: 220 },
  { id: 5, patient_id: 5, doctor_id: 5, visit_date: '2024-05-04', notes: 'ضغط مرتفع', fee: 190 }
],

    medications: [
      { id: 1, patient_id: 1, medication: 'أموكسيسيللين', dose: '500mg/8h', start_date: '2024-04-28', end_date: '2024-05-05' },
      { id: 2, patient_id: 2, medication: 'أملوديبين', dose: '5mg/24h', start_date: '2024-04-30', end_date: null },
      { id: 3, patient_id: 3, medication: 'أملوديبين', dose: '5mg/24h', start_date: '2024-05-01', end_date: null },
      { id: 4, patient_id: 4, medication: 'ميتفورمين', dose: '850mg/12h', start_date: '2024-05-03', end_date: null },
      { id: 5, patient_id: 5, medication: 'أملوديبين', dose: '5mg/24h', start_date: '2024-05-04', end_date: null }
    ],
    departments: [
      { id: 1, name: 'باطنة' },
      { id: 2, name: 'جراحة عظام' },
      { id: 3, name: 'صدرية' },
      { id: 4, name: 'قلب' },
      { id: 5, name: 'غدد صماء' }
    ]
  };