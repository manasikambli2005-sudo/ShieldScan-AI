import { FaLock } from "react-icons/fa";

function Hero() {
  return (
    <section className="hero">
      <FaLock className="hero-icon" />

      <h1>
        AI Phishing
        <br />
        URL Detector
      </h1>

      <p>
        Detect suspicious and malicious URLs using intelligent heuristic
        analysis.
      </p>
    </section>
  );
}

export default Hero;