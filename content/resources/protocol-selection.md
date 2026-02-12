---
title: Smart Home Protocol Specifications
slug: smart-home-protocol-specs-table
description: Technical comparison of Z-Wave, Zigbee, Thread, and Wi-Fi.
category: Resources
tags: [data-table, standard]
calculator_slug: protocol-selection-wizard
---

## The Big Four Compared

| Feature | Wi-Fi (2.4/5GHz) | Z-Wave (Sub-1GHz) | Zigbee (2.4GHz) | Thread (2.4GHz) |
| :--- | :--- | :--- | :--- | :--- |
| **Range (Indoor)** | ~150 ft | ~300 ft+ | ~30-50 ft | ~30-50 ft |
| **Mesh Capable** | No (usually) | Yes | Yes | Yes |
| **Max Nodes** | Router dependant | 232 | 65,000+ | 32 (Router), 511 (End) |
| **Power Draw** | High (mA) | Low (μA) | Low (μA) | Low (μA) |
| **Latency** | Low | High (Relay) | Medium | Low |

### Key Takeaways
*   **Z-Wave**: Best range and wall penetration (908 MHz).
*   **Thread**: Best for future-proofing (Matter).
*   **Wi-Fi**: Best for standalone locks (no hub needed).

---

---
title: Mesh Topology Explained
slug: mesh-topology-guide
description: How your smart lock talks to your hub through other devices.
category: Resources
tags: [glossary, decision-guide]
calculator_slug: protocol-selection-wizard
---

## Routers vs End Devices

In a mesh network (Zigbee/Z-Wave/Thread), devices have two roles:
1.  **Router (Repeater)**: Always powered (light switches, plugs). They relay messages for others.
2.  **End Device**: Battery powered (locks, sensors). They sleep and wake up only to talk.

### Why it matters for Locks
*   **Placement**: Your lock needs a *Router* nearby (within 20ft), not necessarily the Hub.
*   **Healing**: If you move a lamp, the lock might lose connection until the network "heals".
