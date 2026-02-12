---
title: Building Material Attenuation Coefficients
slug: material-attenuation-table
description: How much signal your walls block (dB loss).
category: Resources
tags: [data-table, standard]
calculator_slug: rf-coverage-estimator
---

## Signal Loss by Material (at 2.4GHz)

| Material | Signal Loss (dB) | Impact | range Reduction |
| :--- | :--- | :--- | :--- |
| **Drywall (Plasterboard)** | 3 - 5 dB | Low | ~15% |
| **Wood Door (Hollow)** | 2 - 4 dB | Low | ~10% |
| **Solid Wood Door** | 5 - 8 dB | Medium | ~25% |
| **Brick Wall** | 8 - 12 dB | High | ~50% |
| **Concrete (6 inch)** | 12 - 20 dB | Very High | ~70% |
| **Metal Door / Stucco** | > 20 dB | Critical | ~90% (Blocker) |

### Key Takeaways
*   **Metal is the enemy**: Stucco (wires inside) and metal doors act as Faraday cages.
*   **Water blocks signal**: Appliances (fridges), fish tanks, and people absorb 2.4GHz signals heavily.

---

---
title: RSSI & Link Budget 101
slug: rssi-link-budget-glossary
description: How to read signal strength numbers like a pro.
category: Resources
tags: [glossary]
calculator_slug: rf-coverage-estimator
---

## Understanding RSSI

**Received Signal Strength Indicator (RSSI)** is measured in dBm (decibel-milliwatts). It is a negative number.
*   **Closer to 0 is better.**
*   **-50 dBm**: Excellent signal.
*   **-70 dBm**: Average, stable.
*   **-80 dBm**: Weak, expect latency.
*   **-90 dBm**: Unusable / Disconnected.

### Link Budget
The "budget" is the total signal power available minus all the losses (walls, distance) before the signal becomes too weak to hear.
*   **Zigbee Transmit Power**: +8 dBm to +20 dBm.
*   **Minimum Sensitivity**: -100 dBm.
*   **Budget**: ~110-120 dB.
*   A concrete wall eats 20 dB of that budget instantly.
