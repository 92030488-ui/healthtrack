import { useState } from "react";

const empty = { name: "", email: "", message: "" };

export default function Contact() {
  const [form, setForm] = useState(empty);
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setSent(false);
  };

  const submit = (e) => {
    e.preventDefault();
    const err = {};
    if (form.name.trim().length < 2) err.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) err.email = "Enter a valid email address.";
    if (form.message.trim().length < 10) err.message = "Message must be at least 10 characters.";
    setErrors(err);
    if (Object.keys(err).length) return;
    // Frontend-only project: no server, so we just confirm to the user
    setSent(true);
    setForm(empty);
  };

  return (
    <>
      <header className="ht-page-header">
        <div className="container">
          <h1>Contact us</h1>
          <p className="lead text-secondary mb-0">Questions or feedback? We would love to hear from you.</p>
        </div>
      </header>

      <div className="container">
        <div className="row g-4">
          <div className="col-lg-7">
            <form className="ht-card p-4" onSubmit={submit} noValidate>
              {sent && (
                <div className="alert alert-success" role="status">
                  <i className="bi bi-check-circle-fill me-2"></i>Thanks! Your message has been received.
                </div>
              )}
              <div className="mb-3">
                <label className="form-label" htmlFor="cname">Name</label>
                <input id="cname" name="name" className={`form-control ${errors.name ? "is-invalid" : ""}`} value={form.name} onChange={onChange} />
                <div className="invalid-feedback">{errors.name}</div>
              </div>
              <div className="mb-3">
                <label className="form-label" htmlFor="cemail">Email</label>
                <input id="cemail" name="email" type="email" className={`form-control ${errors.email ? "is-invalid" : ""}`} value={form.email} onChange={onChange} />
                <div className="invalid-feedback">{errors.email}</div>
              </div>
              <div className="mb-3">
                <label className="form-label" htmlFor="cmsg">Message</label>
                <textarea id="cmsg" name="message" rows="5" className={`form-control ${errors.message ? "is-invalid" : ""}`} value={form.message} onChange={onChange}></textarea>
                <div className="invalid-feedback">{errors.message}</div>
              </div>
              <button className="btn btn-ht" type="submit"><i className="bi bi-send me-2"></i>Send message</button>
            </form>
          </div>

          <div className="col-lg-5">
            <div className="ht-card p-4 mb-3">
              <h2 className="h5 mb-3">Get in touch</h2>
              <p className="mb-2"><i className="bi bi-envelope-fill text-success me-2"></i>support@healthtrack.example</p>
              <p className="mb-2"><i className="bi bi-geo-alt-fill text-success me-2"></i>Beirut, Lebanon</p>
              <p className="mb-0"><i className="bi bi-clock-fill text-success me-2"></i>Mon - Fri, 9:00 - 17:00</p>
            </div>
            <div className="ht-card p-4">
              <h2 className="h5 mb-3">FAQ</h2>
              <div className="accordion accordion-flush" id="faq">
                <div className="accordion-item bg-transparent">
                  <h3 className="accordion-header">
                    <button className="accordion-button collapsed bg-transparent" data-bs-toggle="collapse" data-bs-target="#q1">
                      Where is my data stored?
                    </button>
                  </h3>
                  <div id="q1" className="accordion-collapse collapse" data-bs-parent="#faq">
                    <div className="accordion-body text-secondary">In your browser only (localStorage). Clearing site data removes it.</div>
                  </div>
                </div>
                <div className="accordion-item bg-transparent">
                  <h3 className="accordion-header">
                    <button className="accordion-button collapsed bg-transparent" data-bs-toggle="collapse" data-bs-target="#q2">
                      Is HealthTrack free?
                    </button>
                  </h3>
                  <div id="q2" className="accordion-collapse collapse" data-bs-parent="#faq">
                    <div className="accordion-body text-secondary">Yes, it is a free student project.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
