export const profile = {
  name: "Noor",
  title: "Software Engineer · AI Developer",
  tagline:
    "Final-year B.Tech at LNMIIT Jaipur — building user-centric software, GenAI apps, and scalable systems.",
  location: "Jaipur, India",
  email: "noor@example.com",
  links: {
    github: "https://github.com/NG1rdhar-07",
    linkedin: "https://www.linkedin.com/in/noor-999b9b202/",
    leetcode: "https://leetcode.com/u/NG1rdhar_07/",
    twitter: "https://x.com/NoorGirdhar786",
    resume:
      "https://drive.google.com/file/d/1yEd9K0Axl0VNp3RE9SRz8mEElKrnE1Sq/view?usp=drive_link",
  },
};

export const skills = {
  Languages: ["C++", "Python", "JavaScript", "SQL"],
  "Frameworks & Tools": [
    "React",
    "Node.js",
    "FastAPI",
    "Postman",
    "ChromaDB",
    "Git",
    "Docker",
  ],
  Concepts: ["DSA", "Algorithms", "OOP", "System Design", "ML/DL", "DBMS"],
  Databases: ["MongoDB", "PostgreSQL", "MySQL"],
};

export type ProjectLink = { label: string; url: string };

export type Project = {
  id: string;
  name: string;
  tagline: string;
  stack: string[];
  features: string[];
  links: ProjectLink[];
  architecture?: string;
};

export const projects: Project[] = [
  {
    id: "datapilot",
    name: "DataPilot AI",
    tagline: "Natural language → Python analytics pipeline.",
    stack: ["Python", "React", "Supabase", "PostgreSQL", "Gemini SDK", "OpenTelemetry"],
    features: [
      "Engineered a GenAI analytics pipeline translating natural language to Python, using deterministic fuzzy-matching and automated LLM failover",
      "Architected a secure, AST-validated sandbox to safely execute and self-heal AI-generated code",
      "Async backend with OpenTelemetry tracing and owner-scoped PostgreSQL repositories enforcing strict isolation",
    ],
    architecture: "React UI → FastAPI orchestrator → LLM planner → AST sandbox → Postgres",
    links: [
      { label: "GitHub", url: "https://github.com/NG1rdhar-07/datapilot-ai" },
      { label: "Live Demo", url: "https://datapilot-ai-alpha.vercel.app" },
      { label: "Watch Demo", url: "https://youtu.be/8XhrnDDOeBo" },
      {
        label: "Architecture",
        url: "https://drive.google.com/file/d/1FobCIOPpMVxiBZDncBltPntsH-CLtlwk/view?usp=sharing",
      },
    ],
  },
  {
    id: "rag",
    name: "Hybrid RAG Search Engine",
    tagline: "BM25 + Vector search with RAGAS evaluation.",
    stack: ["Python", "ChromaDB", "React", "FastAPI", "RAGAS"],
    features: [
      "Hybrid retrieval combining BM25 keyword search and vector similarity via Reciprocal Rank Fusion",
      "Evaluated with RAGAS, achieving strong faithfulness scores to quantify and reduce LLM hallucination",
      "Async FastAPI REST backend with Pydantic validation and a React frontend exposing live retrieval traces",
    ],
    architecture: "Ingest → BM25 + Chroma → RRF fusion → Rerank → Answer + trace",
    links: [
      { label: "GitHub", url: "https://github.com/NG1rdhar-07/hybrid-rag-search-engine" },
    ],
  },
  {
    id: "vidgraph",
    name: "Causal-VidGraph Engine",
    tagline: "Causal video reasoning over 5,440 videos.",
    stack: ["Python", "HuggingFace", "NetworkX", "CUDA", "Bash"],
    features: [
      "Multimodal reasoning pipeline processing 5,440 raw videos and 34K QA pairs — scaled graph data 10x to eliminate severe overfitting",
      "Optimized DGX cluster compute using 4-bit NF4 quantization on a 7B model, eliminating VRAM OOM crashes",
      "Deterministic anti-hallucination gate via DeBERTa-v3 NLI to cross-verify visual entities prior to GNN execution",
    ],
    architecture: "Video → Scene graph → NetworkX causal graph → QA generation → NLI filter",
    links: [
      { label: "GitHub", url: "https://github.com/NG1rdhar-07/Causal-VidGraph" },
      {
        label: "System Overview",
        url: "https://drive.google.com/file/d/1c-ejyuJwDw-cVbr7pFvEv3HIqfpZuI3_/view?usp=sharing",
      },
      {
        label: "Report",
        url: "https://drive.google.com/file/d/12fOGiuaaGBh8Zj30BFp_DAekuysTJhha/view?usp=sharing",
      },
    ],
  },
];

export type ExperienceLink = { label: string; url: string };

export type ExperienceItem = {
  role: string;
  org: string;
  period: string;
  stack?: string;
  points: string[];
  href?: string;
  links?: ExperienceLink[];
};

export const experience: ExperienceItem[] = [
  {
    role: "Web Development Intern",
    org: "Indicore Infocomm Pvt. Ltd.",
    period: "May 2025 — July 2025",
    stack: "React.js · SQL · REST APIs · Git & GitHub · Agile",
    href: "https://drive.google.com/file/d/1xQWdJSS5W2HjlXMHPYuExzkWTlxNLXtw/view?usp=sharing",
    points: [
      "Built full-stack features across frontend and backend components.",
      "Optimized SQL queries to improve data retrieval speed and backend efficiency.",
      "Implemented automated testing and CI/CD pipelines for smooth deployments.",
    ],
  },
  {
    role: "Coordinator",
    org: "The LNMIIT Alumni Association",
    period: "Oct 2025 — Apr 2026",
    points: [
      "Planned and executed major events with the coordinator team, from planning to on-ground logistics.",
      "Facilitated alumni talks and career mentorship sessions for students.",
      "Led internal team communication and task delegation across volunteers.",
    ],
    links: [
      {
        label: "ECHO Alumni Meet",
        url: "https://alumni.lnmiit.ac.in/newsroom/news/ECHO-2026-A-Successful-Homecoming.dz",
      },
      {
        label: "Delhi Chapter Meet",
        url: "https://alumni.lnmiit.ac.in/newsroom/news/LNMIIT-Alumni-Association-Hosts-Successful-Delhi-Chapter-Meet-2026.dz",
      },
      {
        label: "Mentorship Session",
        url: "https://www.linkedin.com/posts/akshita-s-g_im-a-fossil-and-so-i-mentor-guess-what-activity-7414587607235538944-cR46",
      },
      {
        label: "Team Kickoff",
        url: "https://www.linkedin.com/posts/noor-999b9b202_wrapping-up-the-first-meet-with-the-y-25-activity-7419425662517653504-a04A",
      },
    ],
  },
];

export const education = [
  {
    school: "The LNM Institute of Information Technology, Jaipur",
    degree: "B.Tech, Communication & Computer Engineering",
    period: "2023 — 2027",
    detail: "CGPA: 7.93 / 10",
  },
  {
    school: "Daffodils Public School, Fatehabad",
    degree: "Higher Secondary Education (AISSCE)",
    period: "2022",
    detail: "88.6%",
  },
];

export type Certification = {
  title: string;
  issuer: string;
  year: string;
  url: string;
};

export const certifications: Certification[] = [
  {
    title: "CS50x: Introduction to Computer Science",
    issuer: "Harvard University",
    year: "2023",
    url: "https://drive.google.com/file/d/1o8x12AgUTZqNFaMvKa0l42uBZfL2HZNt/view?usp=sharing",
  },
  {
    title: "Walmart Sparkathon 2k'25",
    issuer: "Walmart",
    year: "2025",
    url: "https://drive.google.com/file/d/1rR1Fk_OBSzq0g8j_qOUYVAC7Oqw68ujj/view?usp=sharing",
  },
  {
    title: "ZKP-Guard — Certificate",
    issuer: "ICTIS 2026",
    year: "2026",
    url: "https://drive.google.com/file/d/1mPR5l3qOc4w10q-6sZzd4yKe3SBNIoAu/view?usp=sharing",
  },
];

export const research = {
  title:
    "ZKP-Guard: A Lightweight Framework for Verifying Digital Image Authenticity and Ownership",
  authors: ["Noor", "S. Mukherjee", "S. S. Yadav"],
  venue: "ICTIS 2026, Bangkok",
  publisher: "Springer LNNS — Accepted",
  video: "https://youtu.be/IW5Znqj4Qt8",
  abstract:
    "ZKP-Guard proposes a lightweight zero-knowledge framework to verify authenticity and ownership of digital images without revealing the underlying pixels or private keys. The system combines perceptual hashing with succinct proofs, enabling downstream verifiers to attest provenance across social, journalistic and forensic pipelines with minimal computational overhead.",
};
