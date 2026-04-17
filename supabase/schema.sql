-- Run this in Supabase SQL Editor

CREATE TABLE IF NOT EXISTS students (
  id              SERIAL PRIMARY KEY,
  roll_no         VARCHAR(20)  NOT NULL UNIQUE,
  school_no       VARCHAR(10)  NOT NULL,
  admit_card_id   VARCHAR(20)  NOT NULL,
  candidate_name  VARCHAR(100) NOT NULL,
  mother_name     VARCHAR(100),
  father_name     VARCHAR(100),
  school_name     VARCHAR(200),
  result_status   VARCHAR(50)  NOT NULL DEFAULT 'PASS'
);

CREATE TABLE IF NOT EXISTS subjects (
  id                SERIAL PRIMARY KEY,
  student_id        INTEGER NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  sub_code          VARCHAR(10)  NOT NULL,
  sub_name          VARCHAR(100) NOT NULL,
  theory_marks      INTEGER,
  practical_marks   INTEGER,
  total_marks       INTEGER,
  positional_grade  VARCHAR(5),
  is_additional     BOOLEAN NOT NULL DEFAULT FALSE,
  repeat_type       VARCHAR(5)   -- NULL, 'RT', 'RP', 'RB'
);

-- Seed data
TRUNCATE TABLE subjects, students RESTART IDENTITY CASCADE;

INSERT INTO students (roll_no, school_no, admit_card_id, candidate_name, mother_name, father_name, school_name, result_status)
VALUES ('16659510', '35391', 'UL103554', 'ANNESHA PAUL', 'ANUSHREE MAJUMDER', 'GOUTAM PAUL', 'SRI SRI RAVISHANKAR VIDYAMANDIR WEST TRIPURA', 'PASS');

INSERT INTO subjects (student_id, sub_code, sub_name, theory_marks, practical_marks, total_marks, positional_grade, is_additional, repeat_type)
VALUES
  (1, '041', 'MATHEMATICS',        43, 20, 63, 'B2', FALSE, NULL),
  (1, '043', 'CHEMISTRY',          51, 30, 81, 'B1', FALSE, NULL),
  (1, '301', 'ENGLISH CORE',       65, 20, 85, 'A2', FALSE, NULL),
  (1, '042', 'PHYSICS',            23, 30, 53, 'C1', FALSE, NULL),
  (1, '049', 'PAINTING',           30, 62, 92, 'A1', FALSE, NULL),
  (1, '048', 'PHYSICAL EDUCATION', 58, 30, 88, 'A2', TRUE,  NULL);
