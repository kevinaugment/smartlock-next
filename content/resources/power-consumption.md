---
title: IoT Protocol Power Draw Comparison
slug: protocol-power-draw-table
description: Static and active current consumption for common smart home protocols.
category: Resources
tags: [data-table, standard]
calculator_slug: protocol-selection-wizard
---

## Current Consumption (at 3.3V)

| Protocol | Sleep Current (μA) | TX Current (mA) | RX Current (mA) | Latency |
| :--- | :--- | :--- | :--- | :--- |
| **Wi-Fi 4 (802.11n)** | 50 - 200 | 200 - 300 | 50 - 100 | Low |
| **Zigbee 3.0** | < 5 | 20 - 40 | 20 - 25 | Medium |
| **Z-Wave (700 Series)** | < 2 | 10 - 25 | 10 - 15 | High |
| **Thread (OpenThread)** | < 5 | 20 - 40 | 20 - 25 | Low |
| **Bluetooth LE 5.0** | < 2 | 5 - 15 | 5 - 10 | Medium |

*Note: Values are typical for modern SoCs (e.g., ESP32, nRF52, EFR32).*

### Key Takeaways
*   **Wi-Fi is hungry**: Direct Wi-Fi locks burn batteries 5x-10x faster than Zigbee/Z-Wave.
*   **Sleep matters**: Locks spend 99.9% of time in sleep. A 10μA difference in sleep current affects battery life by months.

---
---
title: Understanding Quiescent Current
slug: what-is-quiescent-current
description: Why "doing nothing" is the hardest job for a battery-powered lock.
category: Resources
tags: [glossary]
calculator_slug: protocol-selection-wizard
---

## What is Quiescent Current?
Quiescent current (often called **sleep current** or standby current) is the tiny amount of electricity a device uses when it's idle. For a smart lock, this is what keeps it "listening" for a signal to unlock.

### Why it dominates battery life
A smart lock might only be active (turning the motor) for 10 seconds a day. The other **86,390 seconds**, it's sleeping.
*   **Active Draw**: 200mA for 10s = ~0.5 mAh
*   **Sleep Draw**: 0.05mA (50μA) for 24h = ~1.2 mAh

Even though the motor uses 4000x more power capability, the *duration* of sleep mode makes it the primary drain on battery life.
