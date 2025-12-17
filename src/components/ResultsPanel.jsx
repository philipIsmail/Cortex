export default function ResultsPanel({ results, onClose }) {
    return (
        <div style={styles.overlay}>
            <div style={styles.panel}>
                <button onClick={onClose} style={styles.close}>×</button>

                <h2>{results.primary.state}</h2>
                <p style={styles.confidence}>
                    {results.primary.confidence}% confidence
                </p>

                {results.secondary && (
                    <p style={styles.secondary}>
                        Also possible: {results.secondary.state} ({results.secondary.confidence}%)
                    </p>
                )}

                <p style={styles.explanation}>{results.explanation}</p>

                <ul>
                    {results.avenues.map((a) => (
                        <li key={a}>{a}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

const styles = {
    overlay: {
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.6)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    panel: {
        background: "#0f141a",
        borderRadius: "16px",
        padding: "24px",
        width: "90%",
        maxWidth: "420px",
        color: "#eaeef3",
        position: "relative",
    },
    close: {
        position: "absolute",
        top: 12,
        right: 12,
        background: "none",
        border: "none",
        color: "#888",
        fontSize: 22,
        cursor: "pointer",
    },
    confidence: { opacity: 0.7 },
    secondary: { opacity: 0.6 },
    explanation: { marginTop: 12 },
};