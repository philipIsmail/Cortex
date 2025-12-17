export function decode(selections) {
    const s = {
        engagement: 0,
        clarity: 0,
        fatigue: 0,
        threat: 0,
        overload: 0,
        blocked: 0,
        aligned: 0,
        anxietyBias: 0,
        fearBias: 0,
        baseline: 0,
    };

    for (const [label, intensity] of Object.entries(selections)) {
        switch (label) {
            // Engagement
            case "Focused":
            case "Zoned in":
            case "Locked in":
            case "Mentally present":
            case "Alert":
            case "Energized":
            case "Wired":
                s.engagement += intensity;
                break;

            case "Tuned out":
            case "Coasting":
            case "Disengaged":
            case "Checking out":
                s.engagement -= intensity;
                break;

            // Clarity / Direction
            case "Clear next step":
            case "On track":
            case "Making progress":
                s.aligned += intensity;
                s.clarity += intensity;
                break;

            case "Stuck":
            case "Spinning wheels":
            case "Missing the piece":
            case "Going in circles":
            case "No clear path":
            case "Off track":
            case "Second guessing":
                s.blocked += intensity;
                s.clarity -= intensity;
                break;

            // Fatigue
            case "Drained":
            case "Exhausted":
            case "Sluggish":
            case "Burnt out":
            case "Running on fumes":
            case "Heavy":
            case "Flat":
                s.fatigue += intensity;
                break;

            case "Rested":
                s.fatigue -= intensity;
                break;

            // Threat / Pressure
            case "Urgent":
            case "Pressured":
            case "Watching the clock":
            case "Deadline looming":
            case "On edge":
            case "Under scrutiny":
            case "Can’t drop the ball":
            case "Something at stake":
            case "Avoiding consequences":
                s.threat += intensity;
                break;

            case "Immediate":
                s.threat += intensity;
                s.fearBias += intensity;
                break;

            case "Anticipating":
                s.anxietyBias += intensity;
                break;

            // Cognitive Load
            case "Foggy":
            case "Racing thoughts":
            case "Pulled in many directions":
            case "Overloaded":
            case "Scattered":
            case "Too many inputs":
            case "Switching constantly":
            case "Can’t settle":
            case "Mentally noisy":
            case "Saturated":
            case "Distracted":
                s.overload += intensity;
                break;

            // Baseline / Control
            case "Calm":
            case "Steady":
            case "Neutral":
            case "Stable":
            case "Grounded":
            case "In control":
                s.baseline += intensity;
                break;

            case "Reacting":
            case "Bracing":
            case "Holding it together":
                s.threat += intensity * 0.5;
                break;
        }
    }

    const scores = {
        "Focused but Blocked":
            s.engagement + s.blocked - s.threat - s.fatigue,

        Anxiety:
            s.anxietyBias + s.threat + s.overload - s.clarity,

        Fear:
            s.fearBias + s.threat * 1.2,

        Overstimulation:
            s.overload + s.threat * 0.5,

        "Mental Fatigue":
            s.fatigue + s.overload - s.engagement,

        "Calm & Aligned":
            s.baseline + s.clarity + s.aligned - s.threat,

        "Fear-Driven Overdrive":
            s.engagement * 1.2 +
            s.threat * 1.3 +
            s.fatigue * 0.6 -
            s.baseline -
            s.aligned,

        "Flow State":
            s.engagement * 1.3 +
            s.clarity * 1.2 +
            s.aligned * 1.2 +
            s.baseline -
            s.threat * 1.5 -
            s.fatigue -
            s.overload,
    };

    const clean = Object.entries(scores)
        .map(([k, v]) => [k, Math.max(v, 0)])
        .sort((a, b) => b[1] - a[1]);

    const total = clean.reduce((sum, [, v]) => sum + v, 0) || 1;

    const topStates = clean.map(([state, value]) => ({
        state,
        confidence: Math.round((value / total) * 100),
    }));

    const primary = topStates[0];
    const secondary =
        topStates[1] && topStates[1].confidence >= 8
            ? topStates[1]
            : null;

    return {
        primary,
        secondary,
        explanation: explanationFor(primary.state),
        avenues: avenuesFor(primary.state),
    };
}

function explanationFor(state) {
    if (state === "Focused but Blocked")
        return "High engagement with low directional clarity often gets mistaken for anxiety.";
    if (state === "Anxiety")
        return "Anticipatory threat signals outweigh immediate constraints.";
    if (state === "Fear")
        return "Immediate threat signals dominate attention.";
    if (state === "Overstimulation")
        return "Cognitive load is exceeding processing capacity.";
    if (state === "Mental Fatigue")
        return "Energy depletion is limiting effective engagement.";
    return "Signals suggest stable engagement and progress.";
    if (state === "Fear-Driven Overdrive")
        return "Sustained high engagement paired with strong threat signals suggests effort is being driven by avoidance rather than alignment.";
    if (state === "Flow State")
        return "High engagement, clarity, and alignment with minimal threat suggests a low-friction flow state.";
}

function avenuesFor(state) {
    if (state === "Focused but Blocked")
        return ["Clarify the constraint", "Change representation", "Pause effort briefly"];
    if (state === "Anxiety")
        return ["Shorten time horizon", "Externalize concerns"];
    if (state === "Fear")
        return ["Stabilize environment", "Reduce immediacy"];
    if (state === "Overstimulation")
        return ["Reduce inputs", "Sequence tasks"];
    if (state === "Mental Fatigue")
        return ["Restore energy", "Lower demand"];
    return ["Continue current approach"];
    if (state === "Fear-Driven Overdrive")
        return [
            "Reduce perceived stakes",
            "Restore safety margins",
            "Re-anchor effort to outcomes, not consequences",
        ];
    if (state === "Flow State")
        return [
            "Protect the environment",
            "Avoid introducing urgency",
            "Continue current approach",
        ];
}