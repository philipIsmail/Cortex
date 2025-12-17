import { useState } from "react";
import Bubble from "./Bubble";
import ResultsPanel from "./ResultsPanel";
import { decode } from "../decoder/decode";

const BUBBLES = [
    // Engagement / Attention (10)
    "Focused",
    "Zoned in",
    "Locked in",
    "Mentally present",
    "Alert",
    "Tuned out",
    "Coasting",
    "Disengaged",
    "Distracted",
    "Checking out",

    // Energy / Fatigue (10)
    "Energized",
    "Drained",
    "Exhausted",
    "Sluggish",
    "Burnt out",
    "Running on fumes",
    "Wired",
    "Rested",
    "Heavy",
    "Flat",

    // Direction / Progress (10)
    "Making progress",
    "Stuck",
    "Spinning wheels",
    "Missing the piece",
    "Going in circles",
    "Clear next step",
    "No clear path",
    "On track",
    "Off track",
    "Second guessing",

    // Threat / Pressure (10)
    "Urgent",
    "Immediate",
    "Pressured",
    "Watching the clock",
    "Deadline looming",
    "On edge",
    "Under scrutiny",
    "Can’t drop the ball",
    "Something at stake",
    "Avoiding consequences",

    // Cognitive Load / Noise (10)
    "Foggy",
    "Racing thoughts",
    "Pulled in many directions",
    "Overloaded",
    "Scattered",
    "Too many inputs",
    "Switching constantly",
    "Can’t settle",
    "Mentally noisy",
    "Saturated",

    // Control / Baseline (10)
    "Calm",
    "Steady",
    "Neutral",
    "In control",
    "Reacting",
    "Waiting",
    "Bracing",
    "Holding it together",
    "Stable",
    "Grounded",
];

export default function BubbleField() {
    const [selections, setSelections] = useState({});
    const [showResults, setShowResults] = useState(false);
    const [results, setResults] = useState(null);

    const handleTap = (label) => {
        setSelections((prev) => {
            const current = prev[label] || 0;
            const next = current === 3 ? 0 : current + 1;

            const updated = { ...prev };
            if (next === 0) delete updated[label];
            else updated[label] = next;

            return updated;
        });
    };

    const handleDone = () => {
        const decoded = decode(selections);
        setResults(decoded);
        setShowResults(true);
    };

    const handleClear = () => {
        setSelections({});
        setShowResults(false);
    };

    return (
        <>
            <div style={styles.field}>
                {BUBBLES.map((label) => (
                    <Bubble
                        key={label}
                        label={label}
                        intensity={selections[label] || 0}
                        onTap={() => handleTap(label)}
                    />
                ))}
            </div>

            <div style={styles.actionBar}>
                <button onClick={handleClear} style={styles.secondary}>
                    Clear
                </button>
                <button
                    onClick={handleDone}
                    style={styles.primary}
                    disabled={Object.keys(selections).length < 2}
                >
                    Done
                </button>
            </div>

            {showResults && (
                <ResultsPanel results={results} onClose={() => setShowResults(false)} />
            )}
        </>
    );
}

const styles = {
    field: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: "clamp(8px, 2vw, 14px)",
        padding: "clamp(16px, 4vw, 32px)",
        paddingBottom: "120px",
    },
    actionBar: {
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "clamp(12px, 4vw, 20px)",
        background: "rgba(11,15,20,0.9)",
        backdropFilter: "blur(6px)",
    },
    primary: {
        padding: "12px 20px",
        borderRadius: "999px",
        border: "none",
        background: "#4c7dff",
        color: "#fff",
        fontWeight: 600,
        cursor: "pointer",
        minWidth: "96px",
    },
    secondary: {
        padding: "12px 20px",
        borderRadius: "999px",
        background: "transparent",
        color: "#aaa",
        border: "1px solid #333",
        cursor: "pointer",
        minWidth: "96px",
    },
};