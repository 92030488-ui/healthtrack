import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="container text-center py-5">
      <div className="display-1 fw-bold ht-gradient-text">404</div>
      <h1 className="h3">Page not found</h1>
      <p className="text-secondary">The page you are looking for does not exist.</p>
      <Link to="/" className="btn btn-ht">Back to home</Link>
    </div>
  );
}
