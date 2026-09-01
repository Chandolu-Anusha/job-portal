import { useLocation, useNavigate } from "react-router-dom";
import "./HistoryControls.css";

function HistoryControls() {
    const navigate = useNavigate();
    const location = useLocation();

    // React Router stores the current entry's position in history.state.idx.
    // useLocation() re-renders this component on every navigation so the
    // disabled states stay accurate.
    const idx = window.history.state?.idx ?? 0;
    const canGoBack = idx > 0;
    const canGoForward = idx >= 0 && idx < window.history.length - 1;

    return (
        <div className="history-controls">

            <button
                type="button"
                className="history-btn"
                onClick={() => navigate(-1)}
                disabled={!canGoBack}
                title="Back"
                aria-label="Go back"
            >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="19" y1="12" x2="5" y2="12"></line>
                    <polyline points="12 19 5 12 12 5"></polyline>
                </svg>
            </button>

            <button
                type="button"
                className="history-btn"
                onClick={() => navigate(1)}
                disabled={!canGoForward}
                title="Forward"
                aria-label="Go forward"
            >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
            </button>

            <button
                type="button"
                className="history-btn"
                onClick={() => window.location.reload()}
                title="Refresh"
                aria-label="Refresh page"
            >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="23 4 23 10 17 10"></polyline>
                    <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path>
                </svg>
            </button>

        </div>
    );
}

export default HistoryControls;