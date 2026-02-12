# Content Enhancement Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Elevate 14 "Resources" articles from simple placeholders to "Gold Standard" technical references (700+ words, 72+ lines), providing deep value, SEO density, and actionable insights for calculator users.

**Architecture:** 
- **Format:** MDX in `app/_articles/resources/`
- **Standard Structure:**
  1. **Executive Summary:** Hook the reader immediately.
  2. **Detailed Analysis:** Deep technical breakdown (not surface level).
  3. **Data/Tables:** Rich comparisons.
  4. **Real-World Impact:** Why this matters vs theoretical data.
  5. **FAQ:** 3-5 specific questions.
  6. **Related Tools:** CTA to use the specific calculator.

---

## Batch 1: Cost & Economics (4 Articles)

These articles support the `subscription-vs-purchase-calculator` and `installation-cost-estimator`.

### Task 1.1: Enhance `cloud-vs-local-cost.mdx`
**Target:** Transform into a definitive guide on TCO (Total Cost of Ownership).
**Additions:**
- 5-year TCO breakdown with inflation adjustments.
- Hidden costs of "Local" (security patching time, VPN setup).
- Hidden costs of "Cloud" (API limits, per-user pricing).
- Case study: "The $5/mo Lock that Cost $500 to Support".

### Task 1.2: Enhance `smart-lock-saas-value.mdx`
**Target:** Deep dive into ROI of subscription features.
**Additions:**
- Matrix: "Free vs Paid" feature comparison by brand (August vs Schlage vs RemoteLock).
- Time-study data: "Manual Code Generation vs Automated".
- Legal value of audit trails (reference specific liability scenarios).

### Task 1.3: Enhance `locksmith-labor-rates.mdx`
**Target:** Comprehensive 2025 Labor Market Analysis.
**Additions:**
- Regional heat map data (textual representation).
- "Trip Charge" vs "Hourly" vs "Per Lock" pricing models.
- Emergency vs Standard rate multipliers.
- Checklist: "Questions to Ask Before Hiring a Locksmith".

### Task 1.4: Enhance `hidden-installation-costs.mdx`
**Target:** The "Budget Killer" guide.
**Additions:**
- Detailed breakdown of door alignment issues (hinge shimming, strike plate grinding).
- Door thickness details (1-3/8" vs 1-3/4" vs 2"+).
- Wiring costs for hardwired locks.
- Wi-Fi bridge redundancy requirements.

---

## Batch 2: Signals & Protocols (5 Articles)

These articles support the `signal-strength-analyzer` and `protocol-selection-wizard`.

### Task 2.1: Enhance `rssi-dbm-explained.mdx`
**Target:** The engineer's guide to signal reliability.
**Additions:**
- Logarithmic scale explanation (every 3dB is double/half power).
- Noise floor vs Signal Strength (SNR calculation).
- RSSI vs LQI (Link Quality Indicator) distinction.
- Troubleshooting flow: "My RSSI is -75, what now?".

### Task 2.2: Enhance `rf-interference-materials.mdx`
**Target:** Physics-based material analysis.
**Additions:**
- Specific attenuation data for common materials (Stucco, Lath & Plaster, Metal studs).
- The "Faraday Cage Effect" of metal fire doors.
- 2.4GHz vs 900MHz penetration comparison physics.
- Mitigation strategies (repeaters, hub placement geometry).

### Task 2.3: Enhance `protocol-power-draw-table.mdx`
**Target:** Battery engineering reference.
**Additions:**
- Coin cell vs AA vs Li-ion pack capacity analysis.
- Sleep current vs Wakeup current vs TX/RX peaks.
- Impact of "Polling Interval" on battery life.
- Protocol overhead (Z-Wave FLiRS vs Zigbee Check-in).

### Task 2.4: Enhance `what-is-quiescent-current.mdx`
**Target:** Deep technical explainer on standby power.
**Additions:**
- "Vampire Draw" physics.
- How smart home hubs keep locks awake (polling storms).
- Calculating theoretical battery life formula.
- Testing methodology (multimeter vs oscilloscope).

### Task 2.5: Enhance `smart-home-protocol-specs-table.mdx`
**Target:** The ultimate protocol "Cheat Sheet".
**Additions:**
- Detailed specs: Security (AES-128 vs S2), Max Hops, Data Rate.
- "Healing" capabilities of mesh networks.
- Interoperability reality check (Matter vs Proprietary).

---

## Batch 3: Hardware & Security Standards (5 Articles)

These articles support `door-lock-compatibility-checker`.

### Task 3.1: Enhance `ansi-bhma-grading-table.mdx`
**Target:** Definitive guide to lock durability.
**Additions:**
- Cycle testing deep dive (what 250,000 cycles actually looks like).
- Impact testing standards (sledgehammer equivalent).
- Finish warranty analysis (Grade 1 Finish vs Grade 1 Mechanical).

### Task 3.2: Enhance `anti-pick-bump-glossary.mdx`
**Target:** Physical security deep dive.
**Additions:**
- Pin tumbler mechanics explainer.
- "Bump Key" physics and why they work.
- Drill resistance ratings (UL 437).
- High-security cylinder types (bi-axial, sidebars).

### Task 3.3: Enhance `mesh-topology-guide.mdx`
**Target:** Network architecture guide.
**Additions:**
- Star vs Mesh vs Tree topology.
- "Coordinator" vs "Router" vs "End Device" roles in depth.
- The "Self-Healing" mechanism explained step-by-step.
- Best practices for backbone creation.

### Task 3.4: Enhance `standard-door-dimensions-table.mdx`
**Target:** Installation prep Bible.
**Additions:**
- ANSI vs DIN vs Euro profile vs Mortise.
- "Handing" rules (Left Hand Reverse, etc).
- Checklists for pre-purchase measurements.
- Solutions for non-standard doors (Mobile home, commercial glass).

### Task 3.5: Enhance `lock-anatomy-glossary.mdx`
**Target:** Visual/Descriptive dictionary.
**Additions:**
- Exploded view descriptions of internal components (cam, tailpiece, solicitor).
- "Clutch" mechanisms in smart locks.
- Motor types (brushed vs brushless) in locks.
