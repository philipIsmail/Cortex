# Cortex

Cortex is a web-based mental state inference system that decodes cognitive state from interaction signals, not self-labeled emotions.

Users tap words or phrases that resonate with their current experience. Each tap cycles intensity, which the system treats as signal strength. A decoder infers the most likely mental state and returns a confidence-weighted result.

## What It Does
- Collects high-dimensional interaction signals  
- Infers functional mental states (not moods)  
- Surfaces uncertainty only when it exists  
- Returns non-prescriptive avenues, not advice  

## Inferred States
- Focused but Blocked  
- Anxiety  
- Fear  
- Overstimulation  
- Mental Fatigue  
- Calm & Aligned  
- Fear-Driven Overdrive  
- Flow State  

## How It Works
1. Signal input via tap-based interaction  
2. Signals map to latent dimensions like engagement, clarity, threat, and fatigue  
3. A deterministic decoder outputs the top state and confidence  

This approach is inspired by how BCI systems infer intent from indirect, noisy input.

## Tech Stack
- React + Vite  
- Client-side inference (no backend)  
- No data storage  

## Disclaimer
Cortex is an experimental interface and is not a medical, psychological, or diagnostic tool.

## Author
Philip Ismai