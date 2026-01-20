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
    id: "aegisnet",
    title: "RWA Tokenization Protocol (AegisNet)",
    problem: "Regulatory compliance and security for Real World Assets on-chain.",
    role: "Lead Architect",
    stack: "Solidity • UUPS • Go • Distributed Systems",
    outcome: "Production-grade asset bridge with audit-ready security.",
    details: {
      what: "A production-grade RWA tokenization platform using UUPS proxies and a burn-and-mint bridge architecture.",
      who: "Fintech enterprise requiring strict regulatory compliance.",
      why: "Existing bridges lacked the compliance controls needed for regulated assets.",
      constraints: [
        "Strict regulatory compliance.",
        "Upgradeable smart contract architecture (UUPS).",
        "Cross-chain state consistency."
      ],
      engineering: [
        { title: "UUPS Proxy Pattern", desc: "Implemented UUPS for upgradeability, ensuring the contract logic could evolve without breaking state." },
        { title: "Burn-and-Mint Bridge", desc: "Designed a secure cross-chain settlement logic to maintain asset scarcity across chains." },
        { title: "Compliance Hooks", desc: "Integrated on-chain allowlists and freeze functionality for regulatory adherence." }
      ],
      frontend: {
        intent: "Admin dashboard for asset management and minting controls.",
        points: ["Real-time supply tracking", "Multi-sig integration for sensitive ops"]
      },
      marketing: {
        strategy: "Focus on 'Institutional Grade Security'.",
        execution: "Technical whitepapers and audit reports as primary assets."
      },
      reflection: {
        shipped: "A secure, compliant tokenization platform.",
        improved: "Achieved seamless cross-chain asset portability.",
        different: "Would explore LayerZero for more generalized messaging earlier."
      }
    }
  },
  {
    id: "mov33",
    title: "High-Concurrency Marketplace (Mov33)",
    problem: "Data loss and race conditions during high-traffic ticket drops.",
    role: "Tech Lead",
    stack: "Next.js 14 • Firebase • Cloud Functions",
    outcome: "0% data loss during peak transaction loads across distributed user bases.",
    details: {
      what: "A high-traffic event ticketing marketplace.",
      who: "Event organizers and thousands of concurrent buyers.",
      why: "Previous solution crashed under load, leading to overselling.",
      constraints: [
        "High concurrency during ticket drops.",
        "Zero tolerance for overselling.",
        "Real-time seat availability updates."
      ],
      engineering: [
        { title: "Atomic Transactions", desc: "Leveraged Firestore transactions to ensure inventory integrity." },
        { title: "Idempotent Webhooks", desc: "Designed payment processing webhooks to handle duplicate events gracefully." },
        { title: "Cloud Functions", desc: "Offloaded heavy processing (PDF generation, email) to serverless functions." }
      ],
      frontend: {
        intent: "Mobile-first checkout flow optimized for speed.",
        points: ["Real-time seat map", "Optimistic inventory locking"]
      },
      marketing: {
        strategy: "Simulated load tests shared on social media to build trust.",
        execution: "Launch countdowns to drive concentrated traffic."
      },
      reflection: {
        shipped: "A stable ticketing platform handling thousands of concurrents.",
        improved: "Checkout conversion rate increased by stabilizing the backend.",
        different: "Would consider a SQL database for complex relational queries if defining the schema from scratch again."
      }
    }
  },
  {
    id: "uvumbuzi",
    title: "Decentralized API Infrastructure",
    problem: "Slow deployments and frequent production incidents.",
    role: "Full Stack Infrastructure Engineer",
    stack: "Go • gRPC • Docker • CI/CD",
    outcome: "Reduced deployment time by 40% and cut production incidents by half.",
    details: {
      what: "Scalable API layers supporting decentralized reporting and analytics.",
      who: "Community network nodes.",
      why: "Manual deployment processes were error-prone and slow.",
      constraints: [
        "Distributed node network.",
        "Data integrity across nodes.",
        "Minimal downtime updates."
      ],
      engineering: [
        { title: "gRPC Services", desc: "Implemented high-performance internal communication between microservices." },
        { title: "Dockerized Workflows", desc: "Standardized environments from dev to prod to eliminate 'works on my machine' issues." },
        { title: "CI/CD Pipelines", desc: "Automated testing and deployment to ensure reliability." }
      ],
      frontend: {
        intent: "Status dashboard for node health.",
        points: ["Live connectivity maps", "Error rate monitoring"]
      },
      marketing: {
        strategy: "Developer-focused documentation.",
        execution: "Open source contributions."
      },
      reflection: {
        shipped: "A robust, automated infrastructure layer.",
        improved: "System stability and developer velocity.",
        different: "Would implement OpenTelemetry earlier for better observability."
      }
    }
  }
];
