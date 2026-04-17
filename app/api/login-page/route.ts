import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  const html = `<!DOCTYPE html>
<html>
<head>
    <meta name="viewport" content="width=device-width">
    <title>CBSE Results 2026</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <link href="/css/own.css" rel="stylesheet">
    <link href="/css/bootstrap.min.css" rel="stylesheet">
    <link href="/css/customStyle10th.css" rel="stylesheet">
</head>
<body>
    <section class="headertop">
        <div class="container-fluid">
            <div class="row">
                <div class="col-lg-5 col-md-5 col-sm-12 col-xs-12">
                    <img src="https://cbseresults.nic.in/2025/Images/cbseResult.jpg" alt="" class="img-fluid mx-aut float-left logoleft">
                </div>
                <div class="col-lg-7 col-md-7 col-sm-12 col-xs-12 text-right">
                    <a href="/" class="mt-2 h3 d-block text-white"> https://cbseresults.nic.in</a>
                    <span class="d-block h5 text-white">Examination Results 2026 </span>
                </div>
            </div>
        </div>
    </section>

    <div class="form-horizontal">
        <section class="searchResultSection">
            <div class="container">
                <div class="row g-3">
                    <div class="col-sm-10 offset-lg-1 offset-md-1 offset-sm-1 offset-xs-1">
                        <div class="formdivstyle shadow-lg">

                            <div class="col-sm-12 text-center text-dark">
                                <h5 class="font-weight-bold">
                                    <span> Senior School Certificate Examination (Class XII) Results 2026 </span>
                                </h5>
                            </div>
                            <hr>

                            <div id="error-msg" style="display:none; color:red; text-align:center; margin-bottom:8px;"></div>

                            <div class="form-group row">
                                <label for="rollno" class="col-sm-5 col-form-label">
                                    <label class="control-label" for="RollNo">Enter Your Roll Number :</label>
                                </label>
                                <div class="col-sm-7">
                                    <input autocomplete="off" class="form-control" id="txtRollno" maxlength="8" minlength="8" name="RollNo" placeholder="Roll Number" type="text" value="">
                                    <span class="field-validation-valid text-danger" id="err-roll"></span>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="schoolNo" class="col-sm-5 col-form-label">
                                    <label class="control-label" for="SchoolNo">Enter School No. :</label>
                                </label>
                                <div class="col-sm-7">
                                    <input autocomplete="off" class="form-control" id="schoolNo" maxlength="5" minlength="5" name="SchoolNo" placeholder="School Number" type="text" value="">
                                    <span class="field-validation-valid text-danger" id="err-school"></span>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="centerNo" class="col-sm-5 col-form-label">
                                    <label class="control-label" for="admitCardId">Enter Admit Card ID. :</label>
                                    <small class="text-primary">
                                        <strong>(as given on your admit card)</strong>
                                    </small>
                                </label>
                                <div class="col-sm-7">
                                    <input autocomplete="off" class="form-control" id="admitCardId" maxlength="8" name="admitCardId" placeholder="Admit Card Id" type="text" value="">
                                    <span class="field-validation-valid text-danger" id="err-admit"></span>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="Captcha" class="col-sm-5 col-form-label">
                                    <label class="control-label" for="Captcha1">Enter Security Pin </label>
                                    <small class="text-primary">
                                        <strong> (numeric answer)</strong>
                                    </small>
                                </label>
                                <div class="col-sm-7">
                                    <input autocomplete="off" class="form-control" id="txtcaptcha" maxlength="6" name="Captcha1" placeholder="Security Pin" type="text" value="">
                                    <span class="field-validation-valid text-danger" id="err-captcha"></span>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="CaptchaImg" class="col-sm-5 col-form-label">
                                    <label class="control-label" for="Secpin">Security Pin :</label>
                                </label>
                                <div class="col-sm-7">
                                    <canvas id="capimage" style="border:1px solid #ced4da; border-radius:3px; vertical-align:middle;"></canvas>
                                    <span id="refCaptcha" onclick="refreshCaptcha()" style="cursor:pointer; margin-left:6px; font-size:16px;">🔄</span>
                                </div>
                            </div>
                            <div class="form-group row">
                                <div class="col-sm-7 offset-5">
                                    <input type="button" id="Submit" value="Submit" class="btn btn-primary" onclick="handleSubmit()">
                                    <input type="button" id="Button2" value="Reset" class="btn btn-danger" onclick="handleReset()">
                                    <div class="text-danger" id="err-server"></div>
                                </div>
                            </div>
                            <hr>
                            <div class="col-sm-12 text-center">
                                <p class="text-center">
                                    <strong>Disclaimer : </strong>Neither NIC nor CBSE is responsible for any inadvertent error that may have crept in the results being published on NET. The results published on net are for Immediate information to the examinees. These cannot be treated as original mark sheets. Original mark sheets have been issued by the Board separately.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>

    <section class="footerfirst position-fixed bottom-0 w-100">
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

    <script>
        var captchaAnswer = '';

        function generateCaptcha() {
            var a = Math.floor(Math.random() * 9) + 1;
            var b = Math.floor(Math.random() * 9) + 1;
            var ops = ['+', '-'];
            var op = ops[Math.floor(Math.random() * ops.length)];
            if (op === '-' && b > a) { var t = a; a = b; b = t; }
            captchaAnswer = op === '+' ? String(a + b) : String(a - b);
            return a + ' ' + op + ' ' + b + ' = ?';
        }

        function drawCaptcha(expr) {
            var canvas = document.getElementById('capimage');
            canvas.width = 160; canvas.height = 38;
            var ctx = canvas.getContext('2d');
            ctx.fillStyle = '#e8f0fe';
            ctx.fillRect(0, 0, 160, 38);
            for (var i = 0; i < 6; i++) {
                ctx.strokeStyle = 'rgba(' + Math.floor(Math.random()*180) + ',' + Math.floor(Math.random()*180) + ',' + Math.floor(Math.random()*180) + ',0.35)';
                ctx.beginPath(); ctx.moveTo(Math.random()*160, Math.random()*38); ctx.lineTo(Math.random()*160, Math.random()*38); ctx.stroke();
            }
            ctx.font = 'bold 17px Courier New'; ctx.fillStyle = '#003399'; ctx.textBaseline = 'middle';
            var x = 8;
            for (var c = 0; c < expr.length; c++) {
                var ch = expr[c];
                ctx.save(); ctx.translate(x, 19); ctx.rotate((Math.random()-0.5)*0.25); ctx.fillText(ch, 0, 0); ctx.restore();
                x += ch === ' ' ? 7 : 13;
            }
            ctx.strokeStyle = '#ced4da'; ctx.lineWidth = 1; ctx.strokeRect(0, 0, 160, 38);
        }

        function refreshCaptcha() {
            document.getElementById('txtcaptcha').value = '';
            document.getElementById('err-captcha').innerText = '';
            drawCaptcha(generateCaptcha());
        }

        function handleReset() {
            document.getElementById('txtRollno').value = '';
            document.getElementById('schoolNo').value = '';
            document.getElementById('admitCardId').value = '';
            document.getElementById('txtcaptcha').value = '';
            document.getElementById('err-roll').innerText = '';
            document.getElementById('err-school').innerText = '';
            document.getElementById('err-admit').innerText = '';
            document.getElementById('err-captcha').innerText = '';
            document.getElementById('err-server').innerText = '';
            refreshCaptcha();
        }

        async function handleSubmit() {
            var roll = document.getElementById('txtRollno').value.trim();
            var school = document.getElementById('schoolNo').value.trim();
            var admit = document.getElementById('admitCardId').value.trim();
            var captcha = document.getElementById('txtcaptcha').value.trim();

            // Clear errors
            document.getElementById('err-roll').innerText = '';
            document.getElementById('err-school').innerText = '';
            document.getElementById('err-admit').innerText = '';
            document.getElementById('err-captcha').innerText = '';
            document.getElementById('err-server').innerText = '';

            // Validate
            var valid = true;
            if (!/^[0-9]{8}$/.test(roll)) { document.getElementById('err-roll').innerText = '*Only number digit allowed'; valid = false; }
            if (!/^[0-9]{5}$/.test(school)) { document.getElementById('err-school').innerText = '*Only number digit allowed'; valid = false; }
            if (!admit) { document.getElementById('err-admit').innerText = '*Required'; valid = false; }
            if (!captcha) { document.getElementById('err-captcha').innerText = '*Required'; valid = false; }
            if (!valid) return;

            if (captcha !== captchaAnswer) {
                document.getElementById('err-captcha').innerText = '*Incorrect Security Pin. Please try again.';
                refreshCaptcha(); return;
            }

            document.getElementById('Submit').value = 'Please wait...';
            document.getElementById('Submit').disabled = true;

            try {
                var res = await fetch('/api/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ rollNo: roll, schoolNo: school, admitCardId: admit })
                });
                var data = await res.json();
                if (!res.ok || !data.success) {
                    document.getElementById('err-server').innerText = data.message || 'Invalid credentials. Please check your details.';
                    refreshCaptcha();
                    document.getElementById('Submit').value = 'Submit';
                    document.getElementById('Submit').disabled = false;
                    return;
                }
                window.location.href = '/api/result/' + roll;
            } catch(e) {
                document.getElementById('err-server').innerText = 'Something went wrong. Please try again.';
                document.getElementById('Submit').value = 'Submit';
                document.getElementById('Submit').disabled = false;
            }
        }

        // Init captcha on load
        window.onload = function() { refreshCaptcha(); };
    </script>
</body>
</html>`

  return new NextResponse(html, {
    status: 200,
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  })
}
