# Smart Lock Hub: Support Content Structure Design

## 1. Overview
This document defines the structural and architectural design for adding "Support Content" (Data Tables, Glossaries, Decision Flows) to the 14 core Smart Lock Hub calculators.

**Goal**: Enhance SEO traffic and User Utility by surrounding calculators with high-value, reference-grade content.
**Strategy**: "Breadth-First" - Every calculator gets at least one "Data Table" (Hard) and one "Glossary/Guide" (Soft).

## 2. Content Architecture

We will leverage the existing `articles` table but strictly categorize them to function as "Support Modules".

### 2.1 Database Schema Usage
*   **Table**: `articles`
*   **Category**: Create a new category `Resources` (slug: `resources`) or use existing appropriate categories.
*   **Tags**: precise tagging is crucial.
    *   `#data-table`: For reference tables.
    *   `#glossary`: For term definitions.
    *   `#decision-guide`: For flowcharts/guides.
    *   `#standard`: For ANSI/BHMA references.
*   **Association**: Use `calculator_articles` table to link these specific articles to their parent calculator.

### 2.2 Content Templates

#### Type A: Data Table (`#data-table`)
*   **Structure**:
    1.  **Brief Context**: 1-2 sentences explaining *why* this data matters.
    2.  **The Table**: Markdown table with clear headers.
    3.  **Key Takeaways**: Bullet points summarizing the "winner" or "optimal choice" from the data.
    4.  **Source**: Citation (e.g., "Based on ANSI 156.36").

#### Type B: Glossary/Terminology (`#glossary`)
*   **Structure**:
    1.  **Concept Intro**: High-level explanation of the domain (e.g., "RF Signal Metrics").
    2.  **Definition List**: `<dt>`/`<dd>` style or H3 headers for each term.
    3.  **Impact**: "How this affects your lock choice" section.

#### Type C: Decision/Flow (`#decision-guide`)
*   **Structure**:
    1.  **Problem Statement**: "Choosing the right protocol..."
    2.  **Visual Flow**: Mermaid JS flowchart or step-by-step logic.
    3.  **Scenarios**: "If you have X, choose Y".

## 3. Implementation Content Map

### 3.1 Tech & Installation
| Calculator | Module Title | Type | Key Content |
| :--- | :--- | :--- | :--- |
| **Door Compatibility** | Standard Door Bore & Backset Dimensions | Table | ANSI vs DIN dims, Deadbolt sizes |
| | Lock Anatomy: Deep Dive | Glossary | Deadbolt, Latch, Strike Plate, Backset |
| **Installation Time** | Smart Lock Labor Hours Estimator | Table | Hours per lock type (Retrofit vs Fresh) |
| | DIY Toolkit Reference | List | Hole saws, chisels, templates |
| **Power Consumption** | Protocol Power Draw (μA/mA) | Table | Wi-Fi vs Zigbee vs BLE static current |
| | Understanding Quiescent Current | Glossary | Why "sleep mode" matters most |
| **Battery Life** | Battery Chemistry for Locks | Table | Alkaline vs Lithium vs CR123A capacity |
| | Self-Discharge & Cold Weather | Guide | Low-temp performance factors |
| **Emergency Backup** | Backup Power Methods Comparison | Table | 9V Contact vs USB-C vs Key Override |
| | Fail-Safe vs Fail-Secure | Glossary | Emergency exit safety logic |

### 3.2 Signal & Network
| Calculator | Module Title | Type | Key Content |
| :--- | :--- | :--- | :--- |
| **RF Coverage** | Material Attenuation Coefficients | Table | Signal loss through concrete/wood/glass |
| | RSSI & Link Budget 101 | Glossary | Decoding signal strength numbers |
| **Protocol Selection** | IoT Protocol specs (Z-Wave/Zigbee/Thread) | Table | Range, Power, Nodes, Speed |
| | Mesh Networks Explained | Guide | Router vs End Device roles |
| **Mesh Node Planner** | Hub Device Capacity Limits | Table | Max devices per SmartThings/Hue/Eero |
| | Network Hops & Latency | Glossary | The cost of relaying signals |

### 3.3 Business & Ops
| Calculator | Module Title | Type | Key Content |
| :--- | :--- | :--- | :--- |
| **Lock TCO** | Maintenance OpEx Estimates | Table | Battery/Labor costs over 5 years |
| | CapEx vs OpEx in Access Control | Glossary | Hidden costs of ownership |
| **Short Term Rental** | PMS & Lock Integration Matrix | Table | Airbnb/VRBO direct support by brand |
| | Keyless Check-in Workflows | Guide | Automating code generation |
| **Multi-Property** | Enterprise CMS Feature Comparison | Table | Yale Accentra vs RemoteLock features |
| | Access Control Lists (ACL) | Glossary | Managing permissions at scale |
| **Credential Capacity** | User Capacity by Lock Grade | Table | 50 vs 500 codes storage limits |
| | Credential Rotation Policy | Guide | Security best practices |

### 3.4 Security & Audit
| Calculator | Module Title | Type | Key Content |
| :--- | :--- | :--- | :--- |
| **Security Scorecard** | ANSI/BHMA Grading Standards | Table | Cycles test, Impact test requirements |
| | Anti-Pick & Anti-Bump Tech | Glossary | Cylinder security features |
| **Offline Resilience** | Offline Functionality Matrix | Table | What works without internet? |
| | Edge vs Cloud Processing | Guide | Reliability analysis |

## 4. UI/UX Integration

### 4.1 Page Layout
*   **Primary Column**: Calculator Tool (Top) + Calculator SEO Content (Bottom).
*   **Sidebar (Desktop) / Bottom (Mobile)**: "Related Resources" Widget.
    *   List of linked Support Articles.
    *   Visual indicators for "Data" (Table icon) vs "Guide" (Book icon).

### 4.2 Navigation
*   These articles will also be accessible via the `/articles` blog roll, tagged appropriately.
*   Cross-linking: Support articles should link *back* to the calculator as the "Actionable Tool".

## 5. Next Steps (Implementation Plan)
1.  **Database**: Create `resources` category and necessary tags.
2.  **Content Creation**: Batch generation of the 28+ Markdown files.
3.  **Association**: Populate `calculator_articles` table with links.
4.  **Frontend**: Update Calculator Layout to fetch and display `related_articles`.
