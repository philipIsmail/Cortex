export default function Bubble({ label, intensity, onTap }) {
    return (
        <div
            onClick={onTap}
            style={{
                ...styles.bubble,
                ...stylesByIntensity[intensity],
            }}
        >
            {label}
        </div>
    );
}

const styles = {
    bubble: {
        padding: "clamp(10px, 2.5vw, 16px) clamp(14px, 4vw, 20px)",
        borderRadius: "999px",
        cursor: "pointer",
        userSelect: "none",
        transition: "all 120ms ease",
        background: "#151a21",
        color: "#eaeef3",
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: "#2a2f36",
        fontSize: "clamp(12px, 3vw, 14px)",
        textAlign: "center",
        maxWidth: "90vw",
    },
};


const stylesByIntensity = {
    0: {},
    1: {
        borderColor: "#4c7dff",
    },
    2: {
        borderColor: "#4c7dff",
        boxShadow: "0 0 8px rgba(76,125,255,0.6)",
        transform: "scale(1.05)",
    