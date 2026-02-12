---
title: Understanding Signal Strength (RSSI)
slug: rssi-dbm-explained
description: Deciphering dBm values and what they mean for connection reliability.
category: Resources
tags: [glossary, standard]
calculator_slug: signal-strength-analyzer
---

## What is RSSI?

**Received Signal Strength Indicator (RSSI)** is measured in dBm (decibels-milliwatts). It is a negative number: close to 0 is better, consistent with "less signal loss".

| RSSI Range (dBm) | Signal Quality | Reliability |
| :--- | :--- | :--- |
| **-30 to -50** | Excellent | Perfect, near hub |
| **-51 to -65** | Good | Reliable, fast response |
| **-66 to -75** | Fair | Occasional latency |
| **-76 to -90** | Poor | Frequent disconnects |
| **< -90** | Unusable | Likely disconnected |

## Link Quality Indicator (LQI)
While RSSI measures "loudness", LQI measures "clarity". A strong signal (-40 dBm) with high interference (microwave, WiFi) can still have low LQI and poor performance.

---
---
title: RF Interference Sources
slug: rf-interference-materials
description: Common household materials that kill smart lock signals.
category: Resources
tags: [data-table]
calculator_slug: signal-strength-analyzer
---

## Material Signal Attenuation

| Material | Signal Loss (approx) | Effective Range Reduction |
| :--- | :--- | :--- |
| **Drywall / Wood** | -3 dBm | 10-15% |
| **Brick / Stone** | -10 dBm | 30-50% |
| **Glass (Clear)** | -2 dBm | 5-10% |
| **Glass (Low-E / Tinted)** | -15 dBm | 40-60% |
| **Metal Door** | -20 dBm | 60-80% |
| **Water / Aquarium** | -30 dBm | 90%+ (Signal Killer) |

### Best Practice
Never place a hub *behind* a TV, inside a metal cabinet, or directly next to a router (keep >3ft separation to avoid 2.4GHz saturation).
