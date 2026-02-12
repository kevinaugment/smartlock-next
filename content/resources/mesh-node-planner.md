---
title: Hub Device Capacity Limits
slug: hub-device-limit-table
description: Maximum number of devices supported by popular smart home hubs.
category: Resources
tags: [data-table, standard]
calculator_slug: mesh-node-planner
---

## Device Caps by Ecosystem

| Hub / Ecosystem | Max Devices | Realistic Limit | Notes |
| :--- | :--- | :--- | :--- |
| **SmartThings V3** | ~200 | ~64 direct | Needs repeaters for more |
| **Philips Hue Bridge** | 50 | 40-45 | Performance drops near limit |
| **Eero (Zigbee)** | ~50 | ~30 | Varies by router model |
| **Home Assistant (SkyConnect)** | 32 (Direct) | 100+ (Mesh) | Depends on Zigbee Stick |
| **Aqara M2** | 128 | ~64 | Requires repeaters |

### Key Takeaways
*   **The 32-Device Rule**: Most Zigbee coordinators can only handle 32 direct children. You *must* add routers (plugs) to go beyond this.
*   **Hue Limit**: If you hit 50 lights, buy a second bridge.

---

---
title: Network Hops & Latency
slug: network-hops-glossary
description: Why more repeaters isn't always better.
category: Resources
tags: [glossary]
calculator_slug: mesh-node-planner
---

## The Cost of Hops

A "Hop" is when a message jumps from Device A -> Device B -> Hub.
*   **Zigbee Max Hops**: ~15-30 (depending on profile).
*   **Z-Wave Max Hops**: 4.

### Impact on Latency
Each hop adds delay (~10-50ms).
*   **1 Hop**: Instant response.
*   **4 Hops**: Noticeable lag (human perception threshold ~100ms).
*   **Too Many Hops**: Packet loss and "Lock Not Responding" errors.
