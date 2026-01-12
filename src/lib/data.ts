export const WRITING_DATA = [
  {
    id: "systems-vs-features",
    title: "Features are cheap. Systems are expensive.",
    premise: "Why most products stall after v1.",
    date: "Oct 2024",
    readTime: "4 min",
    content: [
      { type: "p", text: "In the early days of a product, velocity is measured by visible surface area. How many buttons? How many screens? How many flows? We celebrate features because they are tangible evidence of work." },
      { type: "h3", text: "The Debt of Velocity" },
      { type: "p", text: "But every feature added without a unifying system creates an exponential tax on future development. I call this 'The Debt of Velocity'. It's not just code debt; it's decision debt. When three different engineers solve the same UI problem in three slightly different ways, you haven't built three features. You've built three conflicting truths about your product." },
      { type: "p", text: "A system isn't a UI kit. It's a set of constraints that liberates decision making. When I architect a frontend, I spend the first week building nothing visible. I build the data layer, the type definitions, the state management patterns. Stakeholders get nervous. They want to see pixels." },
      { type: "h3", text: "Constraints as Levers" },
      { type: "p", text: "Then, in week two, we ship the entire MVP. Because the system handles the reality, the features are just configuration." },
      { type: "callout", text: "True velocity is not speed of motion, but speed of direction. Systems ensure direction." },
      { type: "p", text: "If you are building for the demo, build features. If you are building for the decade, build systems." }
    ]
  },
  {
    id: "latency-design",
    title: "Latency is a design decision",
    premise: "Performance as a user-facing constraint.",
    date: "Sep 2024",
    readTime: "6 min",
    content: [
      { type: "p", text: "We often treat performance as an engineering ticket to be filed after the design is approved. This is a fundamental error. Latency is not a technical byproduct; it is the texture of the interface." },
      { type: "h3", text: "100ms is the Threshold of Control" },
      { type: "p", text: "When an interaction takes longer than 100ms to acknowledge, the user loses the feeling of direct manipulation. They are no longer moving the object; they are asking the computer to move it." },
      { type: "p", text: "I recently audited a dashboard that felt 'sluggish'. The API response times were actually fine (200ms). The issue was the layout shift (CLS) occurring after the data loaded. The interface shimmered into existence, forcing the eye to re-focus." },
      { type: "p", text: "We solved this not by optimizing the database, but by designing optimistic states. The button turns green immediately. The card assumes success. The interface lies, effectively, to preserve the user's flow state." },
      { type: "callout", text: "Optimistic UI is not a trick. It is a commitment to the user's intent over the network's reality." }
    ]
  },
  {
    id: "distribution-product",
    title: "Distribution is part of the product",
    premise: "Why engineering ends too early.",
    date: "Aug 2024",
    readTime: "5 min",
    content: [
      { type: "p", text: "The most dangerous myth in engineering is 'if we build it, they will come'. This implies a clean separation between the product (the thing you build) and the distribution (the way people find it)." },
      { type: "h3", text: "The Invisible Wall" },
      { type: "p", text: "I've seen brilliant architectures sit idle because the engineers treated SEO as 'marketing fluff' and Open Graph tags as an afterthought. They built a cathedral in a desert." },
      { type: "p", text: "When I architect a Next.js application, I am thinking about the share-ability of the URL structure before I think about the database schema. Can this state be deep-linked? Does this dynamic route generate a unique preview image?" },
      { type: "p", text: "These are not marketing tickets. These are architectural constraints. If the product cannot be shared effectively, the architecture has failed." }
    ]
  },
  {
    id: "illusion-simplicity",
    title: "The illusion of simplicity",
    premise: "What 'simple' actually costs.",
    date: "Jul 2024",
    readTime: "4 min",
    content: [
      { type: "p", text: "Simplicity is the most expensive feature you can buy. To make a payment flow feel 'simple' (one click), you must handle fraud detection, address validation, currency conversion, and error recovery in the background." },
      { type: "p", text: "Complexity is conserved. You cannot destroy it; you can only displace it. When we simplify the UI, we transfer that complexity to the engineer." }
    ]
  }
];

export const PROJECT_DATA = [
  {
    id: "b2b-platform",
    title: "B2B Supply Chain Platform",
    problem: "Fragmented supplier workflows and zero real-time visibility",
    role: "End-to-end Ownership",
    stack: "Next.js, Go, Redis, BigQuery, GCP",
    outcome: "Scaled to 5k suppliers, processed 2M+ events daily",
    details: {
      what: "A centralized procurement and logistics platform for mid-market manufacturers.",
      who: "For operations directors dealing with 50+ unmanaged supplier relationships.",
      why: "Legacy ERPs were too slow; email spreadsheets were causing 15% inventory slippage.",
      constraints: [
        "Strict 3-month timeline to MVP due to supply season.",
        "Must integrate with legacy SOAP-based on-premise ERPs.",
        "Zero-trust security requirement for supplier access.",
        "Budget capped at $15k/month for initial infra."
      ],
      engineering: [
        { title: "Go for Backend Services", desc: "Chosen for raw throughput on event processing and strict typing. Handled concurrent inventory updates without race conditions." },
        { title: "gRPC Internally, REST Externally", desc: "Microservices communicated via Protobuf for speed; exposed standard OpenAPI REST endpoints for third-party logistics partners." },
        { title: "Redis Strategy", desc: "Used as a write-through cache for inventory states. Reduced database load by 85% during morning order spikes." }
      ],
      frontend: {
        intent: "Built on Next.js for hybrid rendering. Dashboard shells were statically generated (SSG), while inventory data streamed in via React Server Components to keep initial load under 800ms.",
        points: ["Optimistic UI updates for inventory adjustments", "Virtual scrolling for 10k+ row data tables"]
      },
      marketing: {
        strategy: "Targeted LinkedIn conversion ads focusing on 'Supply Chain Visibility'.",
        execution: "Created motion graphics demonstrating the 'Chaos vs. Order' workflow."
      },
      reflection: {
        shipped: "A fully functional supplier portal and admin command center.",
        improved: "Reduced average PO processing time from 4 days to 4 hours.",
        different: "I would have used a managed Auth provider (Clerk/Auth0) sooner. Rolling custom auth for multi-tenant organizations consumed 2 weeks of engineering time I can't get back."
      }
    }
  },
  {
    id: "fintech-migration",
    title: "Fintech Core Migration",
    problem: "Monolithic debt causing 45min build times and fragility",
    role: "Lead Architect",
    stack: "TypeScript, AWS Lambda, DynamoDB, Terraform",
    outcome: "Zero-downtime cutover, 99.99% uptime achieved",
    details: {
      what: "Decomposition of a legacy Node.js monolith into domain-driven serverless functions.",
      who: "High-frequency trading desk requiring sub-second execution logs.",
      why: "The monolith was single-point-of-failure. One bad deployment took down the entire trading floor.",
      constraints: [
        "Data consistency is non-negotiable (financial ledgers).",
        "Cannot pause trading for maintenance windows.",
        "Compliance logging for every API interaction.",
        "Strict AWS IAM permission boundaries."
      ],
      engineering: [
        { title: "Event-Driven Architecture", desc: "Decoupled transaction ingestion from processing using EventBridge. This ensured we never lost a trade, even if the processor crashed." },
        { title: "DynamoDB Single Table Design", desc: "Optimized access patterns for 'GetAccountHistory'. reduced query latency to single-digit milliseconds." },
        { title: "Infrastructure as Code", desc: "Everything Terraform. No manual console clicks. Allowed us to spin up ephemeral staging environments per PR." }
      ],
      frontend: {
        intent: "Internal admin tools rebuilt with Vite + React Query. Moved from stale-while-revalidate to real-time websockets for trade monitoring.",
        points: ["WebSocket integration for live ledger updates", "Strict type-sharing between backend and frontend"]
      },
      reflection: {
        shipped: "A resilient, auto-scaling ledger system.",
        improved: "System can now handle 10x volume without manual intervention.",
        different: "I underestimated the cold-start times of Lambdas inside VPCs initially. Had to implement provisioned concurrency which increased costs slightly."
      }
    }
  },
  {
    id: "content-engine",
    title: "Media Intelligence Engine",
    problem: "Manual video tagging was unscalable for 10TB+ library",
    role: "Full Stack + AI Ops",
    stack: "Python, FastAPI, OpenAI API, React, FFmpeg",
    outcome: "Automated 90% of metadata tagging workflow",
    details: {
      what: "An automated pipeline that ingests raw footage, transcodes it, and tags it using vision models.",
      who: "Creative agency with thousands of archived assets.",
      why: "Editors spent 30% of their time searching for clips instead of editing.",
      constraints: [
        "Processing must happen asynchronously (long-running jobs).",
        "Cost control on GPU instances.",
        "UI must be intuitive for non-technical video editors."
      ],
      engineering: [
        { title: "Queue-Based Processing", desc: "Used BullMQ (Redis) to handle video transcoding jobs. Decoupled the API from the heavy lifting." },
        { title: "Vector Search", desc: "Stored embeddings of video descriptions in Pinecone, allowing semantic search like 'show me a happy dog running' instead of keyword matches." },
        { title: "FFmpeg WASM", desc: "Offloaded simple video trimming to the client-side browser to save server bandwidth." }
      ],
      frontend: {
        intent: "Focus on media playback performance. Custom video player with frame-accurate seeking and metadata overlays.",
        points: ["Waveform visualization", "Frame-accurate seeking"]
      },
      reflection: {
        shipped: "A searchable internal 'Netflix' for raw assets.",
        improved: "Search retrieval time dropped to <200ms.",
        different: "I would utilize edge functions for the metadata display layer earlier to reduce latency for global teams."
      }
    }
  }
];
