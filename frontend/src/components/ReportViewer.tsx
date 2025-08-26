import React from 'react';

export default function ReportViewer({ htmlPath, pdfPath }: {
    htmlPath?:
    string; pdfPath?: string
}) {
    if (!htmlPath && !pdfPath) return null;
    const htmlUrl = htmlPath ? `http://localhost:8787/` :
        undefined; // serve with `npm run report` at repo root
    return (
        <div style={{ marginTop: 16 }}>
            <h3>Reports</h3>
            {htmlPath && (
                <div style={{ marginBottom: 8 }}>
                    <a href={htmlUrl} target="_blank" rel="noreferrer">Open HTML Report</
                    a>
                </div>
            )}
            {pdfPath && (
                <div>
                    <a href={`/${pdfPath}`} onClick={e => e.preventDefault()}
                        title={pdfPath}>PDF saved at: {pdfPath}</a>
                </div>
            )}
            <p style={{ color: '#777' }}>Tip: run <code>npm run report</code> at repo
                root to serve the HTML report on port 8787.</p>
        </div>
    );
}