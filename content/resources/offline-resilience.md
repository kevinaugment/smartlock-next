---
title: Offline Functionality Matrix
slug: offline-functionality-matrix
description: What works when the Wi-Fi goes down?
category: Resources
tags: [data-table, standard]
calculator_slug: offline-resilience-scorecard
---

## Feature Availability (No Internet)

| Feature | Wi-Fi Lock | Zigbee/Z-Wave (Hub-Based) | Bluetooth Only | Keypad (Offline) |
| :--- | :--- | :--- | :--- | :--- |
| **Unlock via App** | ❌ No | ✅ Yes (Local Hub) | ✅ Yes (Near) | N/A |
| **PIN Code Entry** | ✅ Yes (Cached) | ✅ Yes (Cached) | N/A | ✅ Yes (Always) |
| **Add/Delete User** | ❌ No | ✅ Yes (Local Hub) | ✅ Yes (Near) | ✅ Yes (Manual) |
| **View Logs** | ❌ No | ✅ Yes (Local Hub) | ✅ Yes (Sync Later) | ❌ No |
| **Remote Unlock** | ❌ No | ❌ No | ❌ No | N/A |

### Key Takeaways
*   **Cache is King**: Good smart locks cache PIN codes locally. They don't need the cloud to verify "1234".
*   **Hub Local API**: Hubs like Hubitat or Home Assistant can control Zigbee locks even when the internet is cut.

---
---
title: Edge vs Cloud Processing
slug: edge-vs-cloud-guide
description: Where does the "thinking" happen?
category: Resources
tags: [glossary, decision-guide]
calculator_slug: offline-resilience-scorecard
---

## The Brain Location

### Cloud Processing
*   **Input**: You type a code.
*   **Process**: Lock asks server "Is this right?"
*   **Risk**: Server down = Lock dumb. High latency.
*   **Example**: Old August Connect (bridges).

### Edge Processing (Local)
*   **Input**: You type a code.
*   **Process**: Lock checks internal memory "Is this right?"
*   **Benefit**: Instant, works offline, private.
*   **Example**: Schlage Encode, Level Lock.
