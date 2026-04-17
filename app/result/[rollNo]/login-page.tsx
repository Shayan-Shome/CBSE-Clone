'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

function generateCaptcha() {
  const ops = ['+', '-']
  const op = ops[Math.floor(Math.random() * ops.length)]
  let a: number, b: number, answer: number
  if (op === '+') {
    a = Math.floor(Math.random() * 9) + 1
    b = Math.floor(Math.random() * 9) + 1
    answer = a + b
  } else {
    a = Math.floor(Math.random() * 9) + 2
    b = Math.floor(Math.random() * (a - 1)) + 1
    answer = a - b
  }
  return { expression: `${a} ${op} ${b} = ?`, answer: String(answer) }
}

export default function LoginPage() {
  const router = useRouter()
  const [rollNo, setRollNo] = useState('')
  const [schoolNo, setSchoolNo] = useState('')
  const [admitCardId, setAdmitCardId] = useState('')
  const [captchaInput, setCaptchaInput] = useState('')
  const [captcha, setCaptcha] = useState({ expression: '', answer: '' })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [serverError, setServerError] = useState('')
  const [loading, setLoading] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => { refreshCaptcha() }, [])

  function refreshCaptcha() {
    const c = generateCaptcha()
    setCaptcha(c)
    setCaptchaInput('')
    setTimeout(() => drawCaptcha(c.expression), 50)
  }

  function drawCaptcha(expression: string) {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    canvas.width = 160; canvas.height = 38
    ctx.fillStyle = '#e8f0fe'
    ctx.fillRect(0, 0, 160, 38)
    for (let i = 0; i < 6; i++) {
      ctx.strokeStyle = `rgba(${Math.random()*180},${Math.random()*180},${Math.random()*180},0.35)`
      ctx.beginPath(); ctx.moveTo(Math.random()*160,Math.random()*38); ctx.lineTo(Math.random()*160,Math.random()*38); ctx.stroke()
    }
    for (let i = 0; i < 25; i++) {
      ctx.fillStyle = `rgba(${Math.random()*180},${Math.random()*180},${Math.random()*180},0.35)`
      ctx.fillRect(Math.random()*160, Math.random()*38, 2, 2)
    }
    ctx.font = 'bold 17px "Courier New", monospace'
    ctx.fillStyle = '#003399'
    ctx.textBaseline = 'middle'
    let x = 8
    for (const ch of expression) {
      ctx.save(); ctx.translate(x, 19); ctx.rotate((Math.random()-0.5)*0.25); ctx.fillText(ch, 0, 0); ctx.restore()
      x += ch === ' ' ? 7 : 13
    }
    ctx.strokeStyle = '#ced4da'; ctx.lineWidth = 1; ctx.strokeRect(0,0,160,38)
  }

  function validate() {
    const errs: Record<string, string> = {}
    if (!/^\d{8}$/.test(rollNo)) errs.rollNo = '*Only number digit allowed'
    if (!/^\d{5}$/.test(schoolNo)) errs.schoolNo = '*Only number digit allowed'
    if (!admitCardId.trim()) errs.admitCardId = '*Required'
    if (!captchaInput.trim()) errs.captcha = '*Required'
    return errs
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault(); setServerError('')
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    setErrors({})
    if (captchaInput.trim() !== captcha.answer) {
      setErrors({ captcha: '*Incorrect Security Pin. Please try again.' })
      refreshCaptcha(); return
    }
    setLoading(true)
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rollNo, schoolNo, admitCardId }),
      })
      const data = await res.json()
      if (!res.ok || !data.success) {
        setServerError(data.message || 'Invalid credentials. Please check your details.')
        refreshCaptcha(); setLoading(false); return
      }
      window.location.href = `/api/result/${rollNo}`
    } catch {
      setServerError('Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  function handleReset() {
    setRollNo(''); setSchoolNo(''); setAdmitCardId(''); setCaptchaInput('')
    setErrors({}); setServerError(''); refreshCaptcha()
  }

  const labelStyle: React.CSSProperties = {
    paddingTop: 'calc(0.375rem + 1px)',
    fontSize: '16px',
    fontFamily: '"Open Sans", sans-serif',
    display: 'block',
  }

  const rowStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'flex-start',
    marginBottom: '14px',
  }

  const col5: React.CSSProperties = { width: '41.6667%', paddingRight: '15px' }
  const col7: React.CSSProperties = { width: '58.3333%' }
  const offset5col7: React.CSSProperties = { marginLeft: '41.6667%', width: '58.3333%' }

  return (
    <>
      <Header />
      <section className="searchResultSection">
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ background: '#fff', borderRadius: '4px', padding: '20px 25px', boxShadow: '0 0.5rem 1.5rem rgba(0,0,0,0.15)' }}>

            <div className="text-center" style={{ marginBottom: '8px' }}>
              <h5 className="font-weight-bold">
                Senior School Certificate Examination (Class XII) Results 2025
              </h5>
            </div>
            <hr />

            <form onSubmit={handleSubmit} noValidate>

              {/* Roll Number */}
              <div style={rowStyle}>
                <div style={col5}>
                  <label htmlFor="txtRollno" style={labelStyle}>
                    Enter Your Roll Number :
                  </label>
                </div>
                <div style={col7}>
                  <input type="text" id="txtRollno" name="RollNo" className="form-control" placeholder="Roll Number" maxLength={8} autoComplete="off" value={rollNo} onChange={e => setRollNo(e.target.value)} />
                  {errors.rollNo && <span className="text-danger" style={{ fontSize: '13px' }}>{errors.rollNo}</span>}
                </div>
              </div>

              {/* School Number */}
              <div style={rowStyle}>
                <div style={col5}>
                  <label htmlFor="schoolNo" style={labelStyle}>
                    Enter School No. :
                  </label>
                </div>
                <div style={col7}>
                  <input type="text" id="schoolNo" name="SchoolNo" className="form-control" placeholder="School Number" maxLength={5} autoComplete="off" value={schoolNo} onChange={e => setSchoolNo(e.target.value)} />
                  {errors.schoolNo && <span className="text-danger" style={{ fontSize: '13px' }}>{errors.schoolNo}</span>}
                </div>
              </div>

              {/* Admit Card */}
              <div style={rowStyle}>
                <div style={col5}>
                  <label htmlFor="admitCardId" style={labelStyle}>
                    Enter Admit Card ID. :<br />
                    <small style={{ color: '#007bff', fontSize: '13px' }}><strong>(as given on your admit card)</strong></small>
                  </label>
                </div>
                <div style={col7}>
                  <input type="text" id="admitCardId" name="admitCardId" className="form-control" placeholder="Admit Card Id" maxLength={8} autoComplete="off" value={admitCardId} onChange={e => setAdmitCardId(e.target.value)} />
                  {errors.admitCardId && <span className="text-danger" style={{ fontSize: '13px' }}>{errors.admitCardId}</span>}
                </div>
              </div>

              {/* Security Pin Input */}
              <div style={rowStyle}>
                <div style={col5}>
                  <label htmlFor="txtcaptcha" style={labelStyle}>
                    Enter Security Pin{' '}
                    <small style={{ color: '#007bff', fontSize: '13px' }}><strong>(numeric answer)</strong></small>
                  </label>
                </div>
                <div style={col7}>
                  <input type="text" id="txtcaptcha" name="Captcha1" className="form-control" placeholder="Security Pin" maxLength={6} autoComplete="off" value={captchaInput} onChange={e => setCaptchaInput(e.target.value)} />
                  {errors.captcha && <span className="text-danger" style={{ fontSize: '13px' }}>{errors.captcha}</span>}
                </div>
              </div>

              {/* Captcha Image */}
              <div style={rowStyle}>
                <div style={col5}>
                  <label style={labelStyle}>Security Pin :</label>
                </div>
                <div style={{ ...col7, display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <canvas ref={canvasRef} id="capimage" style={{ border: '1px solid #ced4da', borderRadius: '3px', display: 'block' }} />
                  <span onClick={refreshCaptcha} title="Refresh captcha" style={{ cursor: 'pointer', fontSize: '16px', userSelect: 'none' }} role="button" tabIndex={0} onKeyDown={e => e.key === 'Enter' && refreshCaptcha()}>🔄</span>
                </div>
              </div>

              {/* Server Error */}
              {serverError && (
                <div style={{ ...rowStyle }}>
                  <div style={offset5col7}>
                    <span className="text-danger" style={{ fontWeight: 600 }}>{serverError}</span>
                  </div>
                </div>
              )}

              {/* Buttons */}
              <div style={rowStyle}>
                <div style={offset5col7}>
                  <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? 'Please wait...' : 'Submit'}
                  </button>
                  {' '}
                  <button type="button" className="btn btn-danger" onClick={handleReset}>Reset</button>
                  <div className="text-danger" style={{ marginTop: '4px' }}></div>
                </div>
              </div>

            </form>

            <hr />
            <div className="text-center" style={{ fontSize: '13px', lineHeight: '1.6' }}>
              <p>
                <strong>Disclaimer : </strong>Neither NIC nor CBSE is responsible for any inadvertent error
                that may have crept in the results being published on NET. The results published on net are
                for Immediate information to the examinees. These cannot be treated as original mark sheets.
                Original mark sheets have been issued by the Board separately.
              </p>
            </div>

          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}
