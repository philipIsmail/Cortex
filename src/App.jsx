import BubbleField from "./components/BubbleField";

function App() {
    return (
        <div style={styles.app}>
            <header style={styles.header}>
                <h1>Cortex</h1>
                <p>Tap what resonates. We’ll infer the rest.</p>
            </header>

            <BubbleField />
        </div>
    );
}

const styles = {
    app: {
        minHeight: "100vh",
        background: "#0b0f14",
        color: "#eaeef3",
        fontFamily: "Inter, system-ui, sans-serif",
        touchAction: "manipulation",
    },
    header: {
        textAlign: "center",
        padding: "24px 16px",
    },
};

export default App;