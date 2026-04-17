import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

function pad(n: number | null): string {
  if (n === null || n === undefined) return ''
  return String(n).padStart(3, '0')
}

function marksCell(total: number | null, repeat: string | null): string {
  if (total === null || total === undefined) return ''
  const m = pad(total)
  return repeat ? `${m}&nbsp;&nbsp;&nbsp;&nbsp;${repeat}` : `${m}&nbsp;&nbsp;&nbsp;&nbsp;`
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ rollNo: string }> }
) {
  const { rollNo } = await params

  const { data: student, error: se } = await supabase
    .from('students').select('*').eq('roll_no', rollNo.trim()).single()

  if (se || !student) {
    return new NextResponse('Student not found.', { status: 404 })
  }

  const { data: subjects } = await supabase
    .from('subjects').select('*').eq('student_id', student.id)
    .order('is_additional', { ascending: true }).order('id', { ascending: true })

  const mainSubjects = (subjects ?? []).filter(s => !s.is_additional)
  const additionalSubjects = (subjects ?? []).filter(s => s.is_additional)

  const subjectRows = mainSubjects.map(s => `
    <tr>
      <td>${s.sub_code}</td>
      <td>${s.sub_name}</td>
      <td>${pad(s.theory_marks)}</td>
      <td>${pad(s.practical_marks)}</td>
      <td>${marksCell(s.total_marks, s.repeat_type)}</td>
      <td>${s.positional_grade}</td>
    </tr>`).join('')

  const additionalRows = additionalSubjects.length > 0 ? `
    <tr>
      <td colspan="6"><strong>Additional Subject</strong></td>
    </tr>
    ${additionalSubjects.map(s => `
    <tr>
      <td>${s.sub_code}</td>
      <td>${s.sub_name}</td>
      <td>${pad(s.theory_marks)}</td>
      <td>${pad(s.practical_marks)}</td>
      <td>${marksCell(s.total_marks, s.repeat_type)}</td>
      <td>${s.positional_grade}</td>
    </tr>`).join('')}` : ''

  const html = `<!DOCTYPE html>
<html>
<head>
    <meta name="viewport" content="width=device-width" />
    <title>CBSE Results 2026</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <link href="/css/bootstrap.min.css" rel="stylesheet" />
    <link href="/css/own.css" rel="stylesheet" />
    <link href="/css/customStyle10th.css" rel="stylesheet" />
</head>

<body>
    <section class="headertop" id="to_print">
        <div class="container-fluid">
            <div class="row">
                <div class="col-lg-5 col-md-5 col-sm-12 col-xs-12">
                    <img src="https://cbseresults.nic.in/2025/Images/cbseResult.jpg" alt="" class="img-fluid mx-aut float-left logoleft" />
                </div>
                <div class="col-lg-7 col-md-7 col-sm-12 col-xs-12 text-right">
                    <a href="/" class="mt-2 h3 d-block text-white"> https://cbseresults.nic.in</a>
                    <span class="d-block h5 text-white">Examination Results 2026</span>
                </div>
            </div>
        </div>
    </section>

    <section class="searchResultSection">
        <div class="container formdivstyle shadow-lg">
            <div class="row formdivstyle1">
                <div class="col-sm-12">

                    <div class="form-group row d-print-none">
                        <div class="col-sm-12 text-right">
                            <input type="hidden" id="refCaptcha" />
                            <input type="hidden" id="Button2" />
                            <button type="button" id="printresult" class="btn btn-primary btn-sm" onclick="window.print();">
                                Print <i class="fa fa-print"> </i>
                            </button>
                            <a class="btn btn-danger btn-sm" href="/" id="close">Check Another Result</a>
                        </div>
                    </div>

                    <div class="form-group row">
                        <div class="col-sm-12 text-center">
                            <h5 class="font-weight-bold ">
                                <span> Senior School Certificate Examination (Class XII) Results 2026 </span>
                            </h5><hr />
                        </div>
                    </div>

                    <div class="table-responsive">
                        <table class="table table-striped table-hover table-sm borderTablePrint border-1 tableCt" border="1">
                            <tbody>
                                <tr>
                                    <th class="thct">Roll No : </th>
                                    <td>${student.roll_no}</td>
                                </tr>
                                <tr>
                                    <th class="thct">Candidate Name : </th>
                                    <td> ${student.candidate_name}</td>
                                </tr>
                                <tr>
                                    <th class="thct">Mother's Name : </th>
                                    <td> ${student.mother_name}</td>
                                </tr>
                                <tr>
                                    <th class="thct">Father's Name : </th>
                                    <td> ${student.father_name}</td>
                                </tr>
                                <tr>
                                    <th class="thct">School's Name : </th>
                                    <td> ${student.school_name}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div class="table-responsive">
                        <table class="table table-striped table-hover table-sm borderTablePrint border-1 tableCt" border="1">
                            <thead>
                                <tr class="bg-info">
                                    <th>SUB CODE</th>
                                    <th>SUB NAME</th>
                                    <th>THEORY</th>
                                    <th>Prac./IA/Proj.</th>
                                    <th>MARKS</th>
                                    <th>POSITIONAL GRADE</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${subjectRows}
                                ${additionalRows}
                                <tr class="bg-info">
                                    <th colspan="2">Result : </th>
                                    <th colspan="3">${student.result_status}</th>
                                    <th></th>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div class="col-sm-12">
                        <p class="text-center">
                            <strong>Note:</strong> Abbreviations used against Result<br />
                            <strong>R.L.</strong> - Result Later (Your result is under preparation and it will be declared soon), <strong>N.E.</strong> - Not Eligibile, <strong>R.W.</strong> - Result Withheld, <strong>ABST</strong> - Absent
                            <br />
                            <strong>COMP</strong> – Compartment, <strong>UFM</strong> - Unfairmeans, <strong>XXXX</strong> - Improvement, <strong>SJD</strong> - Subjudice, <strong>N.R.</strong> - Not Registered,
                            <strong>R.T </strong> - Repeat in Theory, <strong>R.P.</strong> - Repeat in Practical, <strong>R.B.</strong> - Repeat in both
                        </p>
                        <hr />
                        <p class="text-center">
                            <strong>Disclaimer: </strong>Neither NIC nor CBSE is responsible for any inadvertent error that may have crept in the results being published on NET. The results published on net are for Immediate information to the examinees. These cannot be treated as original mark sheets. Original mark sheets have been issued by the Board separately.
                        </p>
                    </div>

                </div>
            </div>
        </div>
    </section>

    <section class="footerfirst">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-12">
                    <p class="text-center disclaimer">
                        This site is designed, developed and hosted by National Informatics Centre, Ministry of
                        Electronics &amp; Information Technology, Government of India.
                    </p>
                </div>
            </div>
        </div>
    </section>


</body>
</html>`

  return new NextResponse(html, {
    status: 200,
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  })
}
