const services = [
  ["01", "Leasing & marketing", "Thoughtful pricing, polished listings, responsive showings, and careful applicant screening."],
  ["02", "Resident care", "Clear communication, simple rent collection, and respectful support from move-in to renewal."],
  ["03", "Property protection", "Routine inspections, coordinated maintenance, and fast action when something needs attention."],
  ["04", "Owner reporting", "Straightforward statements and useful updates, so you always know how your property is performing."],
];

const managementSteps = [
  ["Listen", "We learn your property, priorities, and what a successful management relationship looks like to you."],
  ["Prepare", "We assess the home, recommend a rental strategy, and build a clear plan for launch or transition."],
  ["Manage", "We handle the daily details with consistent communication and an owner-first point of view."],
];

export default function Home() {
  const phoneNumber = process.env.NEXT_PUBLIC_PHONE_NUMBER;
  const phoneHref = phoneNumber?.replace(/[^+\d]/g, "");
  return (
    <main>
      <header className="nav-shell">
        <a className="brand" href="#top" aria-label="Mohave Integrity home">
          <span className="brand-mark">MI</span>
          <span>Mohave Integrity<small>Property Management</small></span>
        </a>
        <nav aria-label="Main navigation">
          <a href="#services">Services</a>
          <a href="#owners">Owners</a>
          <a href="#residents">Residents</a>
          <a href="#about">About</a>
        </nav>
        <a className="nav-cta" href="#contact">Let&apos;s talk <span aria-hidden="true">↗</span></a>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow"><span /> Kingman, Arizona</p>
          <h1>Your property,<br />managed with <em>integrity.</em></h1>
          <p className="hero-intro">Local, full-service property management for owners who want attentive care, reliable communication, and fewer day-to-day worries.</p>
          <div className="hero-actions">
            <a className="button button-dark" href="#contact">Request a proposal <span>→</span></a>
            <a className="text-link" href="#services">Explore our services <span>↓</span></a>
          </div>
        </div>
        <div className="desert-panel" aria-label="Abstract Mojave desert landscape">
          <div className="sun" />
          <div className="mountain mountain-back" />
          <div className="mountain mountain-front" />
          <div className="desert-note">
            <span>LOCAL KNOWLEDGE</span>
            <strong>Steady guidance.<br />Desert-tough care.</strong>
          </div>
          <div className="cactus cactus-one"><i /><i /><i /></div>
          <div className="cactus cactus-two"><i /><i /></div>
        </div>
      </section>

      <section className="trust-strip" aria-label="Our approach">
        <p>Built for the way you want to own.</p>
        <div><span>Clear communication</span><span>Dependable care</span><span>Local perspective</span></div>
      </section>

      <section className="services section" id="services">
        <div className="section-heading">
          <p className="eyebrow"><span /> Full-service management</p>
          <h2>Every detail handled.<br /><em>Every decision considered.</em></h2>
          <p>From finding the right resident to caring for the home and keeping you informed, we bring the moving parts together under one accountable team.</p>
        </div>
        <div className="service-list">
          {services.map(([number, title, text]) => (
            <article className="service-row" key={number}>
              <span>{number}</span><h3>{title}</h3><p>{text}</p><b aria-hidden="true">↗</b>
            </article>
          ))}
        </div>
      </section>

      <section className="owner-section" id="owners">
        <div className="owner-art" aria-hidden="true"><span>MOHAVE<br />COUNTY</span></div>
        <div className="owner-copy">
          <p className="eyebrow light"><span /> For property owners</p>
          <h2>More confidence.<br /><em>Less to carry.</em></h2>
          <p>Good management should create breathing room. We combine responsive service with practical systems, so your investment receives the attention it deserves without demanding all of yours.</p>
          <ul>
            <li><span>✓</span> A single, responsive point of contact</li>
            <li><span>✓</span> Proactive maintenance coordination</li>
            <li><span>✓</span> Transparent financial reporting</li>
            <li><span>✓</span> Thoughtful resident relationships</li>
          </ul>
          <a className="button button-sand" href="#contact">Talk about your property <span>→</span></a>
        </div>
      </section>

      <section className="process section" id="about">
        <div className="section-heading compact">
          <p className="eyebrow"><span /> Simple from the start</p>
          <h2>A clear path to<br /><em>better management.</em></h2>
        </div>
        <div className="process-grid">
          {managementSteps.map(([title, text], index) => (
            <article key={title}><b>0{index + 1}</b><h3>{title}</h3><p>{text}</p></article>
          ))}
        </div>
      </section>

      <section className="resident-band" id="residents">
        <div><p className="eyebrow light"><span /> Current residents</p><h2>Need a hand with your home?</h2></div>
        <p>Resident resources, maintenance guidance, and payment access can all live in one simple place.</p>
        <a className="button button-outline" href="#contact">Resident support <span>→</span></a>
      </section>

      <section className="contact section" id="contact">
        <div>
          <p className="eyebrow"><span /> Start a conversation</p>
          <h2>Let&apos;s make ownership<br /><em>feel easier.</em></h2>
        </div>
        <div className="contact-card">
          <p>Tell us a little about your property and what you&apos;re looking for. We&apos;ll help you understand the next best step.</p>
          <div className="contact-actions">
            {phoneNumber && phoneHref ? <a className="button button-rust" href={`tel:${phoneHref}`}>Call our AI receptionist <span>→</span></a> : null}
            <a className="button button-dark" href="mailto:info@mohaveintegrity.com?subject=Property%20management%20inquiry">Email our team <span>→</span></a>
          </div>
          {phoneNumber ? <strong className="phone-number">{phoneNumber} · Available 24/7</strong> : null}
          <small>Serving Kingman and the surrounding Mohave County community.</small>
        </div>
      </section>

      <footer>
        <a className="brand brand-footer" href="#top"><span className="brand-mark">MI</span><span>Mohave Integrity<small>Property Management</small></span></a>
        <p>Thoughtful management. Local integrity.</p>
        <div><a href="#services">Services</a><a href="#owners">Owners</a><a href="#residents">Residents</a><a href="#contact">Contact</a></div>
        <small>© {new Date().getFullYear()} Mohave Integrity. Kingman, Arizona.</small>
      </footer>
    </main>
  );
}
