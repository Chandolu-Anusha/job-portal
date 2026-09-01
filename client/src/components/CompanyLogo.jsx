import { useEffect, useState } from "react";
import { API_ORIGIN } from "../services/api";

/*
 * Resolves whatever value the API stores in job.companyLogo into a
 * loadable image URL:
 *   "" / null / undefined            -> ""  (component shows fallback)
 *   "https://cdn.company/logo.png"   -> used as-is (already complete)
 *   "uploads\logos\1-logo.jpeg"      -> http://localhost:5000/uploads/logos/1-logo.jpeg
 *   "/uploads/logos/1-logo.jpeg"     -> http://localhost:5000/uploads/logos/1-logo.jpeg
 *   "C:\server\uploads\1-logo.jpeg"  -> http://localhost:5000/uploads/1-logo.jpeg (defensive)
 */
function resolveCompanyLogoUrl(raw) {
    if (!raw || typeof raw !== "string") return "";

    let value = raw.trim();
    if (!value) return "";

    // Already a complete URL — use it directly, never prepend anything.
    if (/^https?:\/\//i.test(value)) return value;

    // Normalize separators and strip accidental filesystem prefixes.
    value = value.replace(/\\/g, "/");
    value = value.replace(/^[a-zA-Z]:\//, ""); // drive letters e.g. C:/
    value = value.replace(/^\/+/, "");         // leading slashes

    // Avoid doubling if a record stores "uploads/uploads/...".
    value = value.replace(/^(uploads\/)+/, "uploads/");

    return `${API_ORIGIN}/${value}`;
}

/*
 * Company logo with a professional initials fallback.
 * Renders <img class="company-logo"> when a valid logo exists AND loads;
 * falls back to <div class="company-avatar"> with the company initial when
 * the logo is missing or fails to load (404, backend offline, etc.).
 */
export default function CompanyLogo({ src, alt }) {
    const resolved = resolveCompanyLogoUrl(src);
    const [failed, setFailed] = useState(false);

    // Reset the error flag whenever a different source is provided.
    useEffect(() => {
        setFailed(false);
    }, [resolved]);

    const initial = ((alt || "").trim().charAt(0) || "?").toUpperCase();

    if (!resolved || failed) {
        return (
            <div className="company-avatar" title={alt}>
                {initial}
            </div>
        );
    }

    return (
        <img
            className="company-logo"
            src={resolved}
            alt={alt || "Company logo"}
            loading="lazy"
            onError={() => setFailed(true)}
        />
    );
}