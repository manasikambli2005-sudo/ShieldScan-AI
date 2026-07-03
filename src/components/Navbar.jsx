import { FaShieldAlt } from "react-icons/fa";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        <FaShieldAlt />
        <span>ShieldScan AI</span>
      </div>

      <a
        href="https://github.com/manasikambli2005-sudo/ShieldScan-AI"
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