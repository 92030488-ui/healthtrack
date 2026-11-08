import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="ht-footer mt-5 py-4">
      <div className="container">
        <div className="row gy-3 align-items-center">
          <div className="col-md-6">
            <div className="ht-brand mb-1">
              <i className="bi bi-heart-pulse-fill me-2"></i>HealthTrack
            </div>
            <small className="text-secondary">
              CSCI426 Advanced Web Programming - Project Phase 1. Student project.
            </small>
          </div>
          <div className="col-md-6 text-md-end">
            <Link to="/features" className="me-3 footer-link">Features</Link>
            <Link to="/about" className="me-3 footer-link">About</Link>
            <Link to="/contact" className="footer-link">Contact</Link>
          </div>
        </div>
        <hr className="my-3" />
        <small className="text-secondary">
          &copy; {new Date().getFullYear()} HealthTrack. Built with React and Bootstrap. Icons by Bootstrap Icons.
        </small>
      </div>
    </footer>
  );
}
