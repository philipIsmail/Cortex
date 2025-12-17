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
  