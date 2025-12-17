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
        padding: "14px 18px",
        borderRadius: "999px",
        cursor: "pointer",
        userSelect: "none",
        transition: "all 120ms ease",
        background: "#151a21",
        color: "#eaeef3",
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: "#2a2f36",
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
    },
    3: {
        borderColor: "#4c7dff",
        boxShadow: "0 0 14px rgba(76,125,255,0.9)",
        transform: "scale(1.1)",
    },
};