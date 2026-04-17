export default function Header() {
  return (
    <section className="headertop" id="to_print">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-5 col-md-5 col-sm-12">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://cbseresults.nic.in/2025/Images/cbseResult.jpg"
              alt=""
              className="img-fluid mx-aut float-left logoleft"
            />
          </div>
          <div className="col-lg-7 col-md-7 col-sm-12 text-right">
            <a
              href="https://cbseresults.nic.in"
              target="_blank"
              rel="noreferrer"
              className="mt-2 h3 d-block text-white"
            >
              {' '}https://cbseresults.nic.in
            </a>
            <span className="d-block h5 text-white">Examination Results 2025</span>
          </div>
        </div>
      </div>
    </section>
  )
}
