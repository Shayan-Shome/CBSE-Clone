export interface Student {
  id: number
  roll_no: string
  school_no: string
  admit_card_id: string
  candidate_name: string
  mother_name: string
  father_name: string
  school_name: string
  result_status: string
}

export interface Subject {
  id: number
  student_id: number
  sub_code: string
  sub_name: string
  theory_marks: number | null
  practical_marks: number | null
  total_marks: number | null
  positional_grade: string
  is_additional: boolean
  repeat_type: string | null
}

export interface ResultData {
  student: Student
  subjects: Subject[]
}
