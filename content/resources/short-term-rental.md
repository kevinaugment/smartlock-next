---
title: STR Platform & Smart Lock Integration Matrix
slug: str-integration-matrix
description: Direct integration support for Airbnb, VRBO, and PMS tools.
category: Resources
tags: [data-table, standard]
calculator_slug: short-term-rental-roi-calculator
---

## Integration Support

| Brand | Airbnb Direct | VRBO Direct | Guesty / Hospitable | Notes |
| :--- | :--- | :--- | :--- | :--- |
| **August / Yale** | ✅ Yes | ❌ No | ✅ Yes | Via Airbnb "Linked Accounts" |
| **Schlage Encode** | ❌ No | ❌ No | ✅ Yes | Needs 3rd party (e.g., Seam) |
| **RemoteLock** | ✅ Yes | ✅ Yes | ✅ Yes | The gold standard for API |
| **TTLock (Gateway)** | ❌ No | ❌ No | ✅ Yes | Most affordable option |
| **Nuki** | ✅ Yes | ❌ No | ✅ Yes | Best for EU headers |

### Key Takeaways
*   **RemoteLock**: Best for multi-platform syncing (Airbnb + VRBO + Booking).
*   **Schlage**: Great hardware, but requires middleware (like Yonomi or Seam) for automation.

---

---
title: Automated Check-in Workflow
slug: automated-checkin-guide
description: How to create a "zero-touch" guest experience.
category: Resources
tags: [decision-guide]
calculator_slug: short-term-rental-roi-calculator
---

## The Ideal Flow

1.  **Booking Confirmed**: Guest books on Airbnb.
2.  **Trigger**: PMS (e.g., Guesty) detects new reservation.
3.  **Code Generation**: PMS calls Lock API -> Generates unique PIN (last 4 digits of phone).
4.  **Communication**: Automated message sent to guest: "Welcome! Your code is 1234."
5.  **Activation**: Code becomes active at Check-In time (e.g., 3:00 PM).
6.  **Expiration**: Code is deleted at Check-Out time (e.g., 11:00 AM).
