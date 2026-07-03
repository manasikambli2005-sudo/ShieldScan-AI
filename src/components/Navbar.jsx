import { FaShieldAlt } from "react-icons/fa";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        <FaShieldAlt />
        <span>ShieldScan AI</span>
      </div>

      <a
        href="https://github.com/"
        target="_blank"
        rel="noreferrer"
        className="github-btn"
      >
        GitHub
      </a>
    </nav>
  );
}

export default Navbar;