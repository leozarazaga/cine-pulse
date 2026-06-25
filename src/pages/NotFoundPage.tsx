import { Link } from "react-router";
import "../styles/not-found-page.css";

const NotFoundPage = () => {
    return (
        <main className="not-found-wrapper">
            <div className="not-found-content">
                <h1 className="not-found-code">404</h1>
                <h2 className="not-found-title">Lost in the Shadows?</h2>
                <p className="not-found-text">
                    The page you are looking for doesn't exist or has been moved.
                </p>
                <div className="not-found-action">
                    <Link to="/" className="not-found-btn">
                        Return to Homepage <span className="btn-arrow">→</span>
                    </Link>
                </div>
            </div>
        </main>
    );
};

export default NotFoundPage;