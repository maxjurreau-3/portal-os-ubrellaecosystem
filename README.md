# Umbrella Ecosystem (scaffold)

This repository contains a development scaffold for the Umbrella Ecosystem, including:

- portal-os/ — Portal‑OS v3 multi‑engine runtime (runtime spine and local engines)
- substrate/ — deep engine layer (coherence, awareness, unified field, quantum-suite)
- domains/, lanes/, engines/, world-models/, publishing/, micro-apps/, portal-apps/, quantum-suite/, ecosystem-operations/, meta-architect/

Quick start (dev smoke test)
1. Ensure you have Node 16+ installed.
2. From repository root, run:
   npm run smoke

What happens
- The smoke script wires a substrate bridge between Portal‑OS event requests and substrate APIs.
- It invokes a couple of substrate operations through the Portal‑OS substrate-engine facade and logs results.

Notes
- This scaffold uses ES modules and an in-repo EventBus for wiring; for production you should replace stubbed crypto/signing and the non-cryptographic UUID helper.
- The runtime is intentionally lightweight (no React) and uses minimal DOM helpers — treat Portal‑OS as a multi-engine OS runtime rather than a generic React app.
