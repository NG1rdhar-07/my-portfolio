import { o as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { a as AnimatePresence, i as motion, n as useTransform, r as useMotionValue, t as useSpring } from "../_libs/framer-motion.mjs";
import { A as ArrowRight, C as Earth, D as ChevronLeft, E as ChevronRight, M as Apple, O as BookOpenText, S as ExternalLink, T as CodeXml, _ as Globe, a as User, b as FolderKanban, c as Send, d as Play, f as Pause, g as HardDrive, h as Linkedin, i as Users, j as ArrowLeft, k as Battery, l as Search, m as Mail, n as ZoomIn, o as Twitter, p as Maximize2, r as Wifi, s as Terminal, t as ZoomOut, u as RotateCw, v as Github, w as Download, x as FileText, y as Folder } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-3rQ8hU00.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var WMContext = (0, import_react.createContext)(null);
var zCounter = 10;
var idCounter = 0;
var DEFAULT_SIZES = {
	about: {
		width: 780,
		height: 520,
		title: "About"
	},
	projects: {
		width: 860,
		height: 560,
		title: "Projects — Finder"
	},
	terminal: {
		width: 720,
		height: 460,
		title: "noor — zsh"
	},
	safari: {
		width: 900,
		height: 600,
		title: "Safari"
	},
	resume: {
		width: 720,
		height: 640,
		title: "Resume.pdf — Preview"
	},
	mail: {
		width: 640,
		height: 500,
		title: "Contact — Mail"
	},
	research: {
		width: 780,
		height: 620,
		title: "ZKP-Guard.pdf — Preview"
	},
	video: {
		width: 720,
		height: 460,
		title: "QuickTime Player"
	}
};
function WindowManagerProvider({ children }) {
	const [windows, setWindows] = (0, import_react.useState)([]);
	const [focusedId, setFocusedId] = (0, import_react.useState)(null);
	const focus = (0, import_react.useCallback)((id) => {
		zCounter += 1;
		setFocusedId(id);
		setWindows((ws) => ws.map((w) => w.id === id ? {
			...w,
			zIndex: zCounter,
			minimized: false
		} : w));
	}, []);
	const open = (0, import_react.useCallback)((appId, opts) => {
		const def = DEFAULT_SIZES[appId];
		setWindows((ws) => {
			const existing = ws.find((w) => w.appId === appId && !opts?.payload);
			if (existing && appId !== "projects" && appId !== "video" && appId !== "safari") {
				zCounter += 1;
				setFocusedId(existing.id);
				return ws.map((w) => w.id === existing.id ? {
					...w,
					minimized: false,
					zIndex: zCounter
				} : w);
			}
			idCounter += 1;
			zCounter += 1;
			const id = `${appId}-${idCounter}`;
			const width = opts?.width ?? def.width;
			const height = opts?.height ?? def.height;
			const vw = typeof window !== "undefined" ? window.innerWidth : 1200;
			const vh = typeof window !== "undefined" ? window.innerHeight : 800;
			const x = Math.max(20, Math.round((vw - width) / 2) + idCounter % 5 * 24);
			const y = Math.max(40, Math.round((vh - height) / 2) - 20 + idCounter % 5 * 20);
			setFocusedId(id);
			return [...ws, {
				id,
				appId,
				title: opts?.title ?? def.title,
				x,
				y,
				width,
				height,
				zIndex: zCounter,
				minimized: false,
				maximized: false,
				payload: opts?.payload
			}];
		});
	}, []);
	const close = (0, import_react.useCallback)((id) => {
		setWindows((ws) => ws.filter((w) => w.id !== id));
	}, []);
	const minimize = (0, import_react.useCallback)((id) => {
		setWindows((ws) => ws.map((w) => w.id === id ? {
			...w,
			minimized: true
		} : w));
	}, []);
	const toggleMaximize = (0, import_react.useCallback)((id) => {
		setWindows((ws) => ws.map((w) => w.id === id ? {
			...w,
			maximized: !w.maximized
		} : w));
	}, []);
	const move = (0, import_react.useCallback)((id, x, y) => {
		setWindows((ws) => ws.map((w) => w.id === id ? {
			...w,
			x,
			y
		} : w));
	}, []);
	const resize = (0, import_react.useCallback)((id, width, height) => {
		setWindows((ws) => ws.map((w) => w.id === id ? {
			...w,
			width,
			height
		} : w));
	}, []);
	const value = {
		windows,
		openApps: (0, import_react.useMemo)(() => new Set(windows.map((w) => w.appId)), [windows]),
		focusedId,
		open,
		close,
		focus,
		minimize,
		toggleMaximize,
		move,
		resize
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WMContext.Provider, {
		value,
		children
	});
}
function useWM() {
	const ctx = (0, import_react.useContext)(WMContext);
	if (!ctx) throw new Error("useWM outside provider");
	return ctx;
}
var profile = {
	name: "Noor",
	title: "Software Engineer · AI Developer",
	tagline: "Final-year B.Tech at LNMIIT Jaipur — building user-centric software, GenAI apps, and scalable systems.",
	location: "Jaipur, India",
	email: "noor@example.com",
	links: {
		github: "https://github.com/NG1rdhar-07",
		linkedin: "https://www.linkedin.com/in/noor-999b9b202/",
		leetcode: "https://leetcode.com/u/NG1rdhar_07/",
		twitter: "https://x.com/NoorGirdhar786",
		resume: "https://drive.google.com/file/d/1wIfB8-CduOjW1wuoWbBwdepoeLtMvVcP/view?usp=sharing"
	}
};
var skills = {
	Languages: [
		"C++",
		"Python",
		"JavaScript",
		"SQL"
	],
	"Frameworks & Tools": [
		"React",
		"Node.js",
		"FastAPI",
		"Postman",
		"ChromaDB",
		"Git",
		"Docker"
	],
	Concepts: [
		"DSA",
		"Algorithms",
		"OOP",
		"System Design",
		"ML/DL",
		"DBMS"
	],
	Databases: [
		"MongoDB",
		"PostgreSQL",
		"MySQL"
	]
};
var projects = [
	{
		id: "datapilot",
		name: "DataPilot AI",
		tagline: "Natural language → Python analytics pipeline.",
		stack: [
			"Python",
			"React",
			"Supabase",
			"PostgreSQL",
			"Gemini SDK",
			"OpenTelemetry"
		],
		features: [
			"Engineered a GenAI analytics pipeline translating natural language to Python, using deterministic fuzzy-matching and automated LLM failover",
			"Architected a secure, AST-validated sandbox to safely execute and self-heal AI-generated code",
			"Async backend with OpenTelemetry tracing and owner-scoped PostgreSQL repositories enforcing strict isolation"
		],
		architecture: "React UI → FastAPI orchestrator → LLM planner → AST sandbox → Postgres",
		links: [
			{
				label: "GitHub",
				url: "https://github.com/NG1rdhar-07/datapilot-ai"
			},
			{
				label: "Live Demo",
				url: "https://datapilot-ai-alpha.vercel.app"
			},
			{
				label: "Watch Demo",
				url: "https://youtu.be/8XhrnDDOeBo"
			},
			{
				label: "Architecture",
				url: "https://drive.google.com/file/d/1FobCIOPpMVxiBZDncBltPntsH-CLtlwk/view?usp=sharing"
			}
		]
	},
	{
		id: "rag",
		name: "Hybrid RAG Search Engine",
		tagline: "BM25 + Vector search with RAGAS evaluation.",
		stack: [
			"Python",
			"ChromaDB",
			"React",
			"FastAPI",
			"RAGAS"
		],
		features: [
			"Hybrid retrieval combining BM25 keyword search and vector similarity via Reciprocal Rank Fusion",
			"Evaluated with RAGAS, achieving strong faithfulness scores to quantify and reduce LLM hallucination",
			"Async FastAPI REST backend with Pydantic validation and a React frontend exposing live retrieval traces"
		],
		architecture: "Ingest → BM25 + Chroma → RRF fusion → Rerank → Answer + trace",
		links: [{
			label: "GitHub",
			url: "https://github.com/NG1rdhar-07/hybrid-rag-search-engine"
		}]
	},
	{
		id: "vidgraph",
		name: "Causal-VidGraph Engine",
		tagline: "Causal video reasoning over 5,440 videos.",
		stack: [
			"Python",
			"HuggingFace",
			"NetworkX",
			"CUDA",
			"Bash"
		],
		features: [
			"Multimodal reasoning pipeline processing 5,440 raw videos and 34K QA pairs — scaled graph data 10x to eliminate severe overfitting",
			"Optimized DGX cluster compute using 4-bit NF4 quantization on a 7B model, eliminating VRAM OOM crashes",
			"Deterministic anti-hallucination gate via DeBERTa-v3 NLI to cross-verify visual entities prior to GNN execution"
		],
		architecture: "Video → Scene graph → NetworkX causal graph → QA generation → NLI filter",
		links: [
			{
				label: "GitHub",
				url: "https://github.com/NG1rdhar-07/Causal-VidGraph"
			},
			{
				label: "System Overview",
				url: "https://drive.google.com/file/d/1c-ejyuJwDw-cVbr7pFvEv3HIqfpZuI3_/view?usp=sharing"
			},
			{
				label: "Report",
				url: "https://drive.google.com/file/d/12fOGiuaaGBh8Zj30BFp_DAekuysTJhha/view?usp=sharing"
			}
		]
	}
];
var experience = [{
	role: "Web Development Intern",
	org: "Indicore Infocomm Pvt. Ltd.",
	period: "May 2025 — July 2025",
	stack: "React.js · SQL · REST APIs · Git & GitHub · Agile",
	href: "https://drive.google.com/file/d/1xQWdJSS5W2HjlXMHPYuExzkWTlxNLXtw/view?usp=sharing",
	points: [
		"Built full-stack features across frontend and backend components.",
		"Optimized SQL queries to improve data retrieval speed and backend efficiency.",
		"Implemented automated testing and CI/CD pipelines for smooth deployments."
	]
}, {
	role: "Coordinator",
	org: "The LNMIIT Alumni Association",
	period: "Oct 2025 — Apr 2026",
	points: [
		"Planned and executed major events with the coordinator team, from planning to on-ground logistics.",
		"Facilitated alumni talks and career mentorship sessions for students.",
		"Led internal team communication and task delegation across volunteers."
	],
	links: [
		{
			label: "ECHO Alumni Meet",
			url: "https://alumni.lnmiit.ac.in/newsroom/news/ECHO-2026-A-Successful-Homecoming.dz"
		},
		{
			label: "Delhi Chapter Meet",
			url: "https://alumni.lnmiit.ac.in/newsroom/news/LNMIIT-Alumni-Association-Hosts-Successful-Delhi-Chapter-Meet-2026.dz"
		},
		{
			label: "Mentorship Session",
			url: "https://www.linkedin.com/posts/akshita-s-g_im-a-fossil-and-so-i-mentor-guess-what-activity-7414587607235538944-cR46"
		},
		{
			label: "Team Kickoff",
			url: "https://www.linkedin.com/posts/noor-999b9b202_wrapping-up-the-first-meet-with-the-y-25-activity-7419425662517653504-a04A"
		}
	]
}];
var education = [{
	school: "The LNM Institute of Information Technology, Jaipur",
	degree: "B.Tech, Communication & Computer Engineering",
	period: "2023 — 2027",
	detail: "CGPA: 7.93 / 10"
}, {
	school: "Daffodils Public School, Fatehabad",
	degree: "Higher Secondary Education (AISSCE)",
	period: "2022",
	detail: "88.6%"
}];
var certifications = [
	{
		title: "CS50x: Introduction to Computer Science",
		issuer: "Harvard University",
		year: "2023",
		url: "https://drive.google.com/file/d/1o8x12AgUTZqNFaMvKa0l42uBZfL2HZNt/view?usp=sharing"
	},
	{
		title: "Walmart Sparkathon 2k'25",
		issuer: "Walmart",
		year: "2025",
		url: "https://drive.google.com/file/d/1rR1Fk_OBSzq0g8j_qOUYVAC7Oqw68ujj/view?usp=sharing"
	},
	{
		title: "ZKP-Guard — Certificate",
		issuer: "ICTIS 2026",
		year: "2026",
		url: "https://drive.google.com/file/d/1mPR5l3qOc4w10q-6sZzd4yKe3SBNIoAu/view?usp=sharing"
	}
];
var research = {
	title: "ZKP-Guard: A Lightweight Framework for Verifying Digital Image Authenticity and Ownership",
	authors: [
		"Noor",
		"S. Mukherjee",
		"S. S. Yadav"
	],
	venue: "ICTIS 2026, Bangkok",
	publisher: "Springer LNNS — Accepted",
	video: "https://youtu.be/IW5Znqj4Qt8",
	abstract: "ZKP-Guard proposes a lightweight zero-knowledge framework to verify authenticity and ownership of digital images without revealing the underlying pixels or private keys. The system combines perceptual hashing with succinct proofs, enabling downstream verifiers to attest provenance across social, journalistic and forensic pipelines with minimal computational overhead."
};
function MenuBar(_) {
	const { open, windows, focus } = useWM();
	const [now, setNow] = (0, import_react.useState)(() => /* @__PURE__ */ new Date());
	(0, import_react.useEffect)(() => {
		const t = setInterval(() => setNow(/* @__PURE__ */ new Date()), 1e3);
		return () => clearInterval(t);
	}, []);
	const time = now.toLocaleString("en-US", {
		weekday: "short",
		month: "short",
		day: "numeric",
		hour: "numeric",
		minute: "2-digit",
		hour12: true
	});
	const launch = (appId, payload, title) => {
		if (!payload) {
			const existing = windows.find((w) => w.appId === appId);
			if (existing) return focus(existing.id);
		}
		open(appId, {
			title,
			payload
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed top-0 left-0 right-0 z-[9999] flex h-7 items-center justify-between bg-black/35 px-4 text-[13px] text-white backdrop-blur-xl",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Apple, {
					size: 15,
					className: "drop-shadow"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-semibold",
					children: "My Portfolio"
				}),
				[
					{
						label: "Resume",
						onClick: () => launch("safari", { url: profile.links.resume }, "Resume — Safari")
					},
					{
						label: "Terminal",
						onClick: () => launch("terminal")
					},
					{
						label: "Old Portfolio",
						onClick: () => launch("safari", { url: "https://the-noor-node.vercel.app/" }, "old-portfolio — Safari")
					}
				].map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: m.onClick,
					className: "rounded px-1 opacity-90 hover:bg-white/10",
					children: m.label
				}, m.label))
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-3 opacity-90",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => {},
					className: "rounded p-0.5 hover:bg-white/10",
					"aria-label": "Battery",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Battery, { size: 16 })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => {},
					className: "rounded p-0.5 hover:bg-white/10",
					"aria-label": "Wi-Fi",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wifi, { size: 14 })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "tabular-nums",
					children: time
				})
			]
		})]
	});
}
var items = [
	{
		id: "projects",
		label: "Projects",
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FolderKanban, {}),
		gradient: "from-sky-300 to-blue-500"
	},
	{
		id: "terminal",
		label: "Terminal",
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Terminal, {}),
		gradient: "from-zinc-700 to-zinc-900"
	},
	{
		id: "safari",
		label: "Safari",
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Globe, {}),
		gradient: "from-cyan-300 to-blue-500"
	},
	{
		id: "resume",
		label: "Resume",
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, {}),
		gradient: "from-slate-100 to-slate-300"
	}
];
function Dock() {
	const { open, openApps, windows, focus } = useWM();
	const mouseX = useMotionValue(Infinity);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "pointer-events-none fixed inset-x-0 bottom-2 z-[9998] flex justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
			onMouseMove: (e) => mouseX.set(e.clientX),
			onMouseLeave: () => mouseX.set(Infinity),
			className: "pointer-events-auto flex items-end gap-2 rounded-2xl border border-white/15 bg-white/10 px-3 py-2 backdrop-blur-2xl",
			style: { boxShadow: "0 20px 40px -20px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.25)" },
			children: items.map((it) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DockIcon, {
				item: it,
				mouseX,
				isOpen: openApps.has(it.id),
				onClick: () => {
					if (it.id === "resume") {
						open("safari", {
							title: "Resume — Safari",
							payload: { url: profile.links.resume }
						});
						return;
					}
					const existing = windows.find((w) => w.appId === it.id);
					if (existing) focus(existing.id);
					else open(it.id);
				}
			}, it.id))
		})
	});
}
function DockIcon({ item, mouseX, isOpen, onClick }) {
	const ref = (0, import_react.useRef)(null);
	const size = useSpring(useTransform(useTransform(mouseX, (val) => {
		const bounds = ref.current?.getBoundingClientRect();
		if (!bounds) return 999;
		return val - bounds.x - bounds.width / 2;
	}), [
		-140,
		0,
		140
	], [
		48,
		78,
		48
	]), {
		stiffness: 200,
		damping: 20,
		mass: .15
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col items-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.button, {
			ref,
			onClick,
			whileTap: {
				y: 6,
				scale: .9
			},
			style: {
				width: size,
				height: size
			},
			className: `group relative grid place-items-center rounded-2xl bg-gradient-to-br ${item.gradient} text-white shadow-lg shadow-black/40`,
			"aria-label": item.label,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "pointer-events-none absolute -top-8 rounded-md bg-black/70 px-2 py-0.5 text-xs text-white opacity-0 shadow group-hover:opacity-100",
				children: item.label
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "[&>svg]:h-1/2 [&>svg]:w-1/2 drop-shadow",
				children: item.icon
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `mt-1 h-1 w-1 rounded-full ${isOpen ? "bg-white/90" : "bg-transparent"}` })]
	});
}
function DesktopIcons() {
	const { open } = useWM();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "pointer-events-none fixed top-10 right-4 z-10 flex flex-col gap-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "pointer-events-auto flex w-20 flex-col items-center gap-1 rounded p-1 text-center text-white/90 hover:bg-white/10",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid h-14 w-14 place-items-center rounded-lg bg-gradient-to-br from-zinc-200 to-zinc-400 text-zinc-800 shadow-lg",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HardDrive, {})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-[11px] drop-shadow",
				children: "Macintosh HD"
			})]
		}), [
			{
				label: "Projects",
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FolderKanban, {}),
				color: "from-sky-300 to-blue-500",
				onOpen: () => open("projects")
			},
			{
				label: "Connect",
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, {}),
				color: "from-emerald-400 to-teal-600",
				onOpen: () => open("safari", {
					title: "Connect — Safari",
					payload: { url: "start://noor" }
				})
			},
			{
				label: "Resume",
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, {}),
				color: "from-rose-400 to-red-600",
				onOpen: () => open("safari", {
					title: "Resume — Safari",
					payload: { url: profile.links.resume }
				})
			},
			{
				label: "old-portfolio",
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Earth, {}),
				color: "from-fuchsia-400 to-purple-600",
				onOpen: () => open("safari", {
					title: "old-portfolio — Safari",
					payload: { url: "https://the-noor-node.vercel.app/" }
				})
			}
		].map((ic) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DesktopIcon, { ...ic }, ic.label))]
	});
}
function DesktopIcon({ label, icon, color, onOpen }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		onDoubleClick: onOpen,
		className: "pointer-events-auto group flex w-20 flex-col items-center gap-1 rounded p-1 text-center text-white/90 hover:bg-white/10 focus:bg-white/15 focus:outline-none",
		title: "Double-click to open",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: `grid h-14 w-14 place-items-center rounded-lg bg-gradient-to-br ${color} text-white shadow-lg transition group-active:scale-95 group-focus:ring-2 group-focus:ring-white/60`,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "[&>svg]:h-7 [&>svg]:w-7",
				children: icon
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-[11px] drop-shadow",
			children: label
		})]
	});
}
function Window({ win, children }) {
	const { focus, close, minimize, toggleMaximize, move, focusedId } = useWM();
	const dragStart = (0, import_react.useRef)({
		x: 0,
		y: 0
	});
	const isFocused = focusedId === win.id;
	const style = win.maximized ? {
		top: 28,
		left: 0,
		width: "100vw",
		height: "calc(100vh - 116px)"
	} : {
		top: win.y,
		left: win.x,
		width: win.width,
		height: win.height
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		initial: {
			opacity: 0,
			scale: .92,
			y: 20
		},
		animate: {
			opacity: win.minimized ? 0 : 1,
			scale: win.minimized ? .3 : 1,
			y: win.minimized ? 400 : 0,
			pointerEvents: win.minimized ? "none" : "auto"
		},
		exit: {
			opacity: 0,
			scale: .9
		},
		transition: {
			type: "spring",
			stiffness: 260,
			damping: 26
		},
		className: "absolute select-none rounded-xl overflow-hidden",
		style: {
			...style,
			zIndex: win.zIndex,
			boxShadow: isFocused ? "0 30px 80px -20px rgba(0,0,0,0.55), 0 8px 24px -6px rgba(0,0,0,0.35), inset 0 0 0 0.5px rgba(255,255,255,0.15)" : "0 18px 40px -18px rgba(0,0,0,0.4), inset 0 0 0 0.5px rgba(255,255,255,0.1)"
		},
		onMouseDown: () => focus(win.id),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex h-full flex-col bg-[oklch(0.22_0.01_260/0.88)] backdrop-blur-2xl text-white/90",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex h-8 shrink-0 items-center gap-2 border-b border-white/10 bg-gradient-to-b from-white/10 to-white/5 px-3",
				onMouseDown: (e) => {
					if (win.maximized) return;
					dragStart.current = {
						x: e.clientX - win.x,
						y: e.clientY - win.y
					};
					const onMove = (ev) => {
						move(win.id, Math.max(0, ev.clientX - dragStart.current.x), Math.max(28, ev.clientY - dragStart.current.y));
					};
					const onUp = () => {
						window.removeEventListener("mousemove", onMove);
						window.removeEventListener("mouseup", onUp);
					};
					window.addEventListener("mousemove", onMove);
					window.addEventListener("mouseup", onUp);
				},
				onDoubleClick: () => toggleMaximize(win.id),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							"aria-label": "Close",
							onClick: (e) => {
								e.stopPropagation();
								close(win.id);
							},
							className: "group grid h-3 w-3 place-items-center rounded-full bg-[#ff5f57] hover:brightness-110",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "hidden text-[8px] text-black/70 group-hover:block",
								children: "×"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							"aria-label": "Minimize",
							onClick: (e) => {
								e.stopPropagation();
								minimize(win.id);
							},
							className: "group grid h-3 w-3 place-items-center rounded-full bg-[#febc2e] hover:brightness-110",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "hidden text-[8px] text-black/70 group-hover:block",
								children: "−"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							"aria-label": "Maximize",
							onClick: (e) => {
								e.stopPropagation();
								toggleMaximize(win.id);
							},
							className: "group grid h-3 w-3 place-items-center rounded-full bg-[#28c840] hover:brightness-110",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "hidden text-[8px] text-black/70 group-hover:block",
								children: "+"
							})
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "pointer-events-none absolute left-1/2 -translate-x-1/2 text-xs font-medium text-white/70",
					children: win.title
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex-1 overflow-hidden",
				children
			})]
		})
	});
}
function Spotlight({ open, onClose }) {
	const wm = useWM();
	const [q, setQ] = (0, import_react.useState)("");
	const [i, setI] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		if (open) {
			setQ("");
			setI(0);
		}
	}, [open]);
	const results = (0, import_react.useMemo)(() => {
		const base = [
			{
				id: "about",
				label: "About Noor",
				category: "Application",
				appId: "about",
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { size: 16 })
			},
			{
				id: "projects",
				label: "Projects",
				category: "Application",
				appId: "projects",
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FolderKanban, { size: 16 })
			},
			{
				id: "terminal",
				label: "Terminal",
				category: "Application",
				appId: "terminal",
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Terminal, { size: 16 })
			},
			{
				id: "safari",
				label: "Safari — Links",
				category: "Application",
				appId: "safari",
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Globe, { size: 16 })
			},
			{
				id: "resume",
				label: "Resume.pdf",
				category: "Document",
				appId: "resume",
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { size: 16 })
			},
			{
				id: "research",
				label: "ZKP-Guard — Research Paper",
				category: "Document",
				appId: "research",
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpenText, { size: 16 })
			},
			{
				id: "mail",
				label: "Contact Noor",
				category: "Application",
				appId: "mail",
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { size: 16 })
			},
			...projects.map((p) => ({
				id: `proj-${p.id}`,
				label: p.name,
				category: "Project",
				appId: "projects",
				payload: { projectId: p.id },
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FolderKanban, { size: 16 })
			})),
			...Object.entries(skills).flatMap(([group, list]) => list.map((s) => ({
				id: `skill-${s}`,
				label: s,
				category: `Skill · ${group}`,
				appId: "about",
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { size: 16 })
			})))
		];
		if (!q.trim()) return base.slice(0, 8);
		const needle = q.toLowerCase();
		return base.filter((r) => r.label.toLowerCase().includes(needle) || r.category.toLowerCase().includes(needle)).slice(0, 8);
	}, [q]);
	(0, import_react.useEffect)(() => setI(0), [q]);
	(0, import_react.useEffect)(() => {
		if (!open) return;
		const onKey = (e) => {
			if (e.key === "Escape") onClose();
			if (e.key === "ArrowDown") {
				e.preventDefault();
				setI((v) => Math.min(v + 1, results.length - 1));
			}
			if (e.key === "ArrowUp") {
				e.preventDefault();
				setI((v) => Math.max(v - 1, 0));
			}
			if (e.key === "Enter") {
				const r = results[i];
				if (r) {
					wm.open(r.appId, { payload: r.payload });
					onClose();
				}
			}
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [
		open,
		results,
		i,
		onClose,
		wm
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: open && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		initial: { opacity: 0 },
		animate: { opacity: 1 },
		exit: { opacity: 0 },
		className: "fixed inset-0 z-[10000] flex items-start justify-center bg-black/30 pt-[15vh] backdrop-blur-sm",
		onClick: onClose,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
			initial: {
				scale: .96,
				y: -8,
				opacity: 0
			},
			animate: {
				scale: 1,
				y: 0,
				opacity: 1
			},
			exit: {
				scale: .96,
				opacity: 0
			},
			transition: {
				type: "spring",
				stiffness: 320,
				damping: 26
			},
			onClick: (e) => e.stopPropagation(),
			className: "w-full max-w-xl overflow-hidden rounded-2xl border border-white/15 bg-[oklch(0.22_0.01_260/0.85)] text-white shadow-2xl backdrop-blur-2xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3 border-b border-white/10 px-4 py-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
						size: 18,
						className: "opacity-70"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						autoFocus: true,
						value: q,
						onChange: (e) => setQ(e.target.value),
						placeholder: "Spotlight Search",
						className: "flex-1 bg-transparent text-lg outline-none placeholder:text-white/40"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("kbd", {
						className: "rounded bg-white/10 px-1.5 py-0.5 text-xs text-white/60",
						children: "ESC"
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
				className: "max-h-80 overflow-y-auto py-1",
				children: [results.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
					className: "px-4 py-6 text-center text-sm text-white/50",
					children: "No results"
				}), results.map((r, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onMouseEnter: () => setI(idx),
					onClick: () => {
						wm.open(r.appId, { payload: r.payload });
						onClose();
					},
					className: `flex w-full items-center gap-3 px-4 py-2 text-left text-sm ${i === idx ? "bg-blue-500/70" : "hover:bg-white/5"}`,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "opacity-80",
							children: r.icon
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "flex-1 truncate",
							children: r.label
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs text-white/50",
							children: r.category
						})
					]
				}) }, r.id))]
			})]
		})
	}) });
}
function LockScreen({ onUnlock }) {
	const [value, setValue] = (0, import_react.useState)("");
	const [now, setNow] = (0, import_react.useState)(() => /* @__PURE__ */ new Date());
	const [unlocking, setUnlocking] = (0, import_react.useState)(false);
	const inputRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		inputRef.current?.focus();
		const id = setInterval(() => setNow(/* @__PURE__ */ new Date()), 1e3);
		return () => clearInterval(id);
	}, []);
	const [error, setError] = (0, import_react.useState)(false);
	const submit = (e) => {
		e?.preventDefault();
		if (unlocking) return;
		if (value.length > 0) {
			setError(true);
			setValue("");
			inputRef.current?.focus();
			return;
		}
		setUnlocking(true);
		setTimeout(onUnlock, 650);
	};
	const time = now.toLocaleTimeString([], {
		hour: "2-digit",
		minute: "2-digit",
		hour12: false
	});
	const date = now.toLocaleDateString([], {
		weekday: "long",
		month: "long",
		day: "numeric"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
		className: "fixed inset-0 z-[10001] overflow-hidden text-white",
		initial: { opacity: 1 },
		animate: unlocking ? {
			opacity: 0,
			scale: 1.05,
			filter: "blur(20px)"
		} : { opacity: 1 },
		transition: {
			duration: .6,
			ease: "easeInOut"
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"aria-hidden": true,
				className: "absolute inset-0",
				style: { background: "radial-gradient(1200px 800px at 20% 10%, oklch(0.55 0.18 300) 0%, transparent 60%),radial-gradient(1000px 700px at 85% 20%, oklch(0.6 0.16 260) 0%, transparent 55%),radial-gradient(900px 700px at 60% 100%, oklch(0.45 0.15 340) 0%, transparent 60%),linear-gradient(180deg, oklch(0.22 0.06 280) 0%, oklch(0.12 0.05 270) 100%)" }
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"aria-hidden": true,
				className: "absolute inset-0 bg-black/30 backdrop-blur-sm"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative flex h-full w-full flex-col items-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					initial: {
						opacity: 0,
						y: -10
					},
					animate: {
						opacity: 1,
						y: 0
					},
					transition: { delay: .1 },
					className: "mt-16 text-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-sm font-medium tracking-wide text-white/80",
						children: date
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-1 text-8xl font-thin tabular-nums drop-shadow-lg",
						children: time
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.form, {
					onSubmit: submit,
					initial: {
						opacity: 0,
						y: 20
					},
					animate: {
						opacity: 1,
						y: 0
					},
					transition: { delay: .25 },
					className: "mt-auto mb-40 flex flex-col items-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid h-24 w-24 place-items-center rounded-full bg-gradient-to-br from-sky-400 to-indigo-600 shadow-2xl ring-2 ring-white/30",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { size: 44 })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-3 text-lg font-medium",
							children: "Noor Portfolio"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								ref: inputRef,
								type: "password",
								value,
								onChange: (e) => {
									setValue(e.target.value);
									if (error) setError(false);
								},
								placeholder: "Enter Password",
								className: `w-56 rounded-full border bg-white/10 px-4 py-2 text-center text-sm text-white outline-none backdrop-blur placeholder:text-white/50 focus:border-white/50 ${error ? "border-red-400/70 animate-pulse" : "border-white/20"}`,
								autoComplete: "off"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "submit",
								className: "grid h-9 w-9 place-items-center rounded-full bg-white/15 text-white transition hover:bg-white/25",
								"aria-label": "Unlock",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { size: 16 })
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-3 text-[11px] text-white/60",
							children: error ? "Wrong password. Leave it blank and press Enter." : "Press Enter to log in"
						})
					]
				})]
			})
		]
	});
}
var notify = null;
function confirmOpenExternal(url) {
	return new Promise((resolve) => {
		if (!notify) {
			window.open(url, "_blank", "noopener,noreferrer");
			resolve(true);
			return;
		}
		notify({
			url,
			resolve
		});
	});
}
function SystemDialogHost() {
	const [pending, setPending] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		notify = setPending;
		return () => {
			notify = null;
		};
	}, []);
	const close = (ok) => {
		if (pending) {
			pending.resolve(ok);
			if (ok) window.open(pending.url, "_blank", "noopener,noreferrer");
		}
		setPending(null);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: pending && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		className: "fixed inset-0 z-[10000] grid place-items-center bg-black/40 backdrop-blur-sm",
		initial: { opacity: 0 },
		animate: { opacity: 1 },
		exit: { opacity: 0 },
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
			initial: {
				scale: .9,
				opacity: 0,
				y: 10
			},
			animate: {
				scale: 1,
				opacity: 1,
				y: 0
			},
			exit: {
				scale: .95,
				opacity: 0
			},
			transition: {
				type: "spring",
				damping: 22,
				stiffness: 260
			},
			className: "w-[380px] overflow-hidden rounded-2xl border border-white/15 bg-zinc-900/90 text-white shadow-2xl backdrop-blur-2xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "px-6 pt-5 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-[15px] font-semibold",
						children: "\"System\" would like to open a new tab"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-2 line-clamp-2 break-all text-xs text-white/60",
						children: pending.url
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-1 text-[11px] text-white/40",
						children: "Opens in your real browser."
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-5 grid grid-cols-2 border-t border-white/10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => close(false),
					className: "border-r border-white/10 py-2.5 text-sm text-white/80 hover:bg-white/5",
					children: "Cancel"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => close(true),
					className: "py-2.5 text-sm font-semibold text-sky-400 hover:bg-white/5",
					children: "Allow"
				})]
			})]
		})
	}) });
}
function AboutApp() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full overflow-hidden",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
			className: "w-52 shrink-0 border-r border-white/10 bg-black/20 p-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto grid h-24 w-24 place-items-center rounded-full bg-gradient-to-br from-indigo-400 to-fuchsia-500 text-3xl font-semibold text-white shadow-lg",
					children: "N"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 text-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-base font-semibold",
						children: profile.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs text-white/60",
						children: profile.title
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 space-y-1 text-xs text-white/70",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: ["📍 ", profile.location] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: ["✉️ ", profile.email] })]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex-1 overflow-y-auto p-6 text-sm leading-relaxed",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-lg font-semibold text-white",
					children: "About"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-white/80",
					children: profile.tagline
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "mt-6 text-sm font-semibold text-white/90",
					children: "Skills"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-2 grid grid-cols-1 gap-3 sm:grid-cols-2",
					children: Object.entries(skills).map(([group, list]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-lg bg-white/5 p-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-xs uppercase tracking-wide text-white/50",
							children: group
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-2 flex flex-wrap gap-1.5",
							children: list.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "rounded-md bg-white/10 px-2 py-0.5 text-xs text-white/90",
								children: s
							}, s))
						})]
					}, group))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "mt-6 text-sm font-semibold text-white/90",
					children: "Experience"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-2 space-y-3",
					children: experience.map((e) => {
						const Card = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-baseline justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "font-medium text-white",
									children: e.role
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-xs text-white/50",
									children: e.period
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs text-white/70",
								children: e.org
							}),
							e.stack && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-1 text-[11px] text-white/50",
								children: e.stack
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "mt-1.5 list-disc space-y-0.5 pl-4 text-xs text-white/70",
								children: e.points.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: p }, p))
							}),
							e.links && e.links.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-2 flex flex-wrap gap-1.5",
								children: e.links.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									href: l.url,
									target: "_blank",
									rel: "noreferrer",
									className: "rounded-md bg-white/10 px-2 py-0.5 text-[11px] text-white/85 hover:bg-white/20",
									children: [l.label, " ↗"]
								}, l.url))
							})
						] });
						return e.href ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: e.href,
							target: "_blank",
							rel: "noreferrer",
							className: "block rounded-lg bg-white/5 p-3 transition hover:bg-white/10",
							children: Card
						}, e.org) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "rounded-lg bg-white/5 p-3",
							children: Card
						}, e.org);
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "mt-6 text-sm font-semibold text-white/90",
					children: "Education"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-2 space-y-2",
					children: education.map((ed) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-baseline justify-between rounded-lg bg-white/5 p-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "font-medium text-white",
							children: ed.school
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-xs text-white/70",
							children: ed.degree
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-right text-xs text-white/60",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: ed.period }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: ed.detail })]
						})]
					}, ed.school))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "mt-6 text-sm font-semibold text-white/90",
					children: "Certifications"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-2 list-disc space-y-0.5 pl-4 text-xs text-white/80",
					children: certifications.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: c.url,
						target: "_blank",
						rel: "noreferrer",
						className: "hover:underline",
						children: [
							c.title,
							" — ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-white/60",
								children: [
									c.issuer,
									" · ",
									c.year
								]
							})
						]
					}) }, c.title))
				})
			]
		})]
	});
}
var HELP = [
	"Available commands:",
	"  whoami        — who is Noor",
	"  about         — short bio",
	"  skills        — tech stack",
	"  projects      — list projects",
	"  experience    — work history",
	"  research      — published paper",
	"  contact       — reach out",
	"  resume        — open resume",
	"  open <app>    — about|projects|safari|resume|mail|research",
	"  clear         — clear screen",
	"  help          — this message"
];
function TerminalApp() {
	const { open } = useWM();
	const [lines, setLines] = (0, import_react.useState)([{
		kind: "out",
		text: "Last login: today · noor@macbook-pro"
	}, {
		kind: "out",
		text: "Type \"help\" to see available commands."
	}]);
	const [input, setInput] = (0, import_react.useState)("");
	const scrollRef = (0, import_react.useRef)(null);
	const inputRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		scrollRef.current?.scrollTo({
			top: scrollRef.current.scrollHeight,
			behavior: "smooth"
		});
	}, [lines]);
	function run(cmd) {
		const raw = cmd.trim();
		const [c, ...rest] = raw.split(/\s+/);
		const out = [];
		switch (c) {
			case "": break;
			case "help":
				out.push(...HELP);
				break;
			case "whoami":
				out.push("Noor", "Software Engineer", "AI Developer");
				break;
			case "about":
				out.push(profile.tagline);
				break;
			case "skills":
				for (const [g, list] of Object.entries(skills)) out.push(`${g}: ${list.join(", ")}`);
				break;
			case "projects":
				projects.forEach((p) => out.push(`• ${p.name} — ${p.tagline}`));
				out.push("", "Run \"open projects\" to explore in Finder.");
				break;
			case "experience":
				experience.forEach((e) => out.push(`${e.role} @ ${e.org}  (${e.period})`));
				break;
			case "research":
				out.push(research.title, `${research.authors.join(", ")} — ${research.venue}`, research.publisher);
				break;
			case "contact":
				out.push(`Email: ${profile.email}`, "Or run \"open mail\".");
				break;
			case "resume":
				open("resume");
				out.push("Opening Resume.pdf in Preview…");
				break;
			case "open": {
				const app = rest[0];
				if ([
					"about",
					"projects",
					"safari",
					"resume",
					"mail",
					"research",
					"terminal"
				].includes(app)) {
					open(app);
					out.push(`Opening ${app}…`);
				} else out.push(`open: unknown app "${app ?? ""}"`);
				break;
			}
			case "clear":
				setLines([]);
				return;
			default: out.push(`zsh: command not found: ${c}. Try "help".`);
		}
		setLines((ls) => [
			...ls,
			{
				kind: "in",
				text: raw
			},
			...out.map((t) => ({
				kind: "out",
				text: t
			}))
		]);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "h-full cursor-text bg-black/70 font-mono text-[13px] text-emerald-300",
		onClick: () => inputRef.current?.focus(),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			ref: scrollRef,
			className: "h-full overflow-y-auto p-3",
			children: [lines.map((l, i) => l.kind === "in" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-sky-300",
					children: "noor@macbook"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-white/60",
					children: " ~ % "
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-white",
					children: l.text
				})
			] }, i) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "whitespace-pre-wrap text-white/85",
				children: l.text
			}, i)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-sky-300",
						children: "noor@macbook"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-white/60",
						children: "\xA0~\xA0%\xA0"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						ref: inputRef,
						value: input,
						onChange: (e) => setInput(e.target.value),
						onKeyDown: (e) => {
							if (e.key === "Enter") {
								run(input);
								setInput("");
							}
						},
						className: "flex-1 bg-transparent text-white caret-emerald-300 outline-none",
						spellCheck: false,
						autoFocus: true
					})
				]
			})]
		})
	});
}
function ProjectsApp({ win }) {
	const [selected, setSelected] = (0, import_react.useState)(win.payload?.projectId ?? null);
	const project = projects.find((p) => p.id === selected);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
			className: "w-48 shrink-0 border-r border-white/10 bg-black/20 p-2 text-sm",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "px-2 pb-2 text-xs uppercase tracking-wide text-white/50",
				children: "Favorites"
			}), [
				"Desktop",
				"Documents",
				"Projects",
				"Downloads"
			].map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: `flex items-center gap-2 rounded px-2 py-1 ${f === "Projects" ? "bg-white/10" : "text-white/70"}`,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Folder, { size: 14 }),
					" ",
					f
				]
			}, f))]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex-1 overflow-y-auto p-4",
			children: !project ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mb-3 text-xs text-white/50",
				children: "3 items"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-3 gap-4 sm:grid-cols-4",
				children: projects.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onDoubleClick: () => setSelected(p.id),
					className: "group flex flex-col items-center gap-1 rounded-lg p-3 hover:bg-white/10",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid h-16 w-20 place-items-center rounded-md bg-gradient-to-br from-sky-300 to-blue-600 text-white shadow-md",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Folder, { size: 30 })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-1 line-clamp-2 text-center text-xs text-white/90",
						children: p.name
					})]
				}, p.id))
			})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProjectDetail, {
				p: project,
				onBack: () => setSelected(null)
			})
		})]
	});
}
function ProjectDetail({ p, onBack }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			onClick: onBack,
			className: "mb-3 text-xs text-white/60 hover:text-white",
			children: "← Back"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-start gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid h-20 w-24 place-items-center rounded-lg bg-gradient-to-br from-sky-300 to-blue-600 text-white shadow-lg",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Folder, { size: 40 })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-xl font-semibold text-white",
					children: p.name
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-white/70",
					children: p.tagline
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-2 flex flex-wrap gap-1.5",
					children: p.stack.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "rounded-md bg-white/10 px-2 py-0.5 text-xs text-white/85",
						children: t
					}, t))
				})
			] })]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-5 grid gap-4 sm:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-lg bg-white/5 p-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-xs uppercase tracking-wide text-white/60",
					children: "Features"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-2 list-disc space-y-1 pl-4 text-sm text-white/85",
					children: p.features.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: f }, f))
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-lg bg-white/5 p-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-xs uppercase tracking-wide text-white/60",
						children: "Architecture"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 font-mono text-xs leading-relaxed text-emerald-300",
						children: p.architecture
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "mt-4 text-xs uppercase tracking-wide text-white/60",
						children: "System Overview"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-white/80",
						children: "Modular services communicate via typed contracts; each subsystem is instrumented and independently deployable."
					})
				]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-5 flex flex-wrap gap-2",
			children: p.links.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				onClick: () => confirmOpenExternal(l.url),
				title: "Open in your browser",
				className: "inline-flex items-center gap-1.5 rounded-md bg-white/10 px-3 py-1.5 text-sm hover:bg-white/20",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { size: 14 }),
					" ",
					l.label
				]
			}, l.url))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 text-[11px] text-white/40",
			children: "Links open in your actual browser after confirmation."
		})
	] });
}
var START_URL = "start://noor";
function normalizeUrl(input) {
	const v = input.trim();
	if (!v) return START_URL;
	if (v === START_URL) return v;
	if (/^https?:\/\//i.test(v)) return v;
	if (/^[\w.-]+\.[a-z]{2,}(\/.*)?$/i.test(v)) return `https://${v}`;
	return `https://www.google.com/search?igu=1&q=${encodeURIComponent(v)}`;
}
function toEmbeddable(url) {
	const m = url.match(/drive\.google\.com\/file\/d\/([^/]+)/);
	if (m) return `https://drive.google.com/file/d/${m[1]}/preview`;
	return url;
}
function detectExternalOnly(url) {
	if (/github\.com/i.test(url)) return {
		kind: "github",
		label: "GitHub"
	};
	if (/linkedin\.com/i.test(url)) return {
		kind: "linkedin",
		label: "LinkedIn"
	};
	if (/leetcode\.com/i.test(url)) return {
		kind: "leetcode",
		label: "LeetCode"
	};
	if (/(x\.com|twitter\.com)/i.test(url)) return {
		kind: "twitter",
		label: "X / Twitter"
	};
	if (/(youtube\.com|youtu\.be)/i.test(url)) return {
		kind: "youtube",
		label: "YouTube"
	};
	return null;
}
function StartPage() {
	const items = [
		{
			label: "GitHub",
			url: profile.links.github,
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Github, {}),
			color: "from-zinc-800 to-black"
		},
		{
			label: "LinkedIn",
			url: profile.links.linkedin,
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Linkedin, {}),
			color: "from-sky-600 to-blue-700"
		},
		{
			label: "LeetCode",
			url: profile.links.leetcode,
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CodeXml, {}),
			color: "from-orange-500 to-yellow-500"
		},
		{
			label: "X / Twitter",
			url: profile.links.twitter,
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Twitter, {}),
			color: "from-slate-800 to-black"
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "p-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-2xl font-semibold text-white",
				children: "Favorites"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-white/60",
				children: "Bookmarks · Noor"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4",
				children: items.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => window.open(s.url, "_blank", "noopener,noreferrer"),
					className: `group flex flex-col items-center gap-2 rounded-xl bg-gradient-to-br ${s.color} p-4 text-white shadow-lg transition hover:scale-105`,
					title: "Click to open in your browser",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "[&>svg]:h-8 [&>svg]:w-8",
							children: s.icon
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm font-medium",
							children: s.label
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, {
							size: 12,
							className: "opacity-60"
						})
					]
				}, s.label))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8 rounded-xl bg-white/5 p-4 text-sm text-white/70",
				children: "Bookmarks open in your real browser. Use the address bar for any URL, or ⌘K for Spotlight."
			})
		]
	});
}
function ExternalPage({ url, label }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid h-full place-items-center p-8",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md rounded-2xl border border-white/10 bg-white/5 p-6 text-center text-white shadow-xl backdrop-blur",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto grid h-14 w-14 place-items-center rounded-xl bg-white/10 [&>svg]:h-7 [&>svg]:w-7",
					children: {
						GitHub: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Github, {}),
						LinkedIn: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Linkedin, {}),
						LeetCode: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CodeXml, {}),
						"X / Twitter": /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Twitter, {}),
						YouTube: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, {})
					}[label] ?? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, {})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 text-lg font-semibold",
					children: [label, " can't be embedded"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-white/60",
					children: "This site blocks in-app previews for security. Open it in your real browser to view it."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-2 break-all text-[11px] text-white/40",
					children: url
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => window.open(url, "_blank", "noopener,noreferrer"),
					className: "mt-5 inline-flex items-center gap-2 rounded-md bg-sky-500 px-4 py-2 text-sm font-medium hover:bg-sky-400",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { size: 14 }), " Open in browser"]
				})
			]
		})
	});
}
function SafariApp({ win }) {
	const initial = win?.payload?.url ?? START_URL;
	const [history, setHistory] = (0, import_react.useState)([initial]);
	const [index, setIndex] = (0, import_react.useState)(0);
	const [draft, setDraft] = (0, import_react.useState)(initial);
	const iframeRef = (0, import_react.useRef)(null);
	const current = history[index];
	const external = (0, import_react.useMemo)(() => detectExternalOnly(current), [current]);
	const embedUrl = (0, import_react.useMemo)(() => toEmbeddable(current), [current]);
	(0, import_react.useEffect)(() => {
		setDraft(current);
	}, [current]);
	const navigate = (raw) => {
		const url = normalizeUrl(raw);
		const next = history.slice(0, index + 1).concat(url);
		setHistory(next);
		setIndex(next.length - 1);
	};
	const back = () => index > 0 && setIndex(index - 1);
	const forward = () => index < history.length - 1 && setIndex(index + 1);
	const reload = () => {
		if (iframeRef.current) iframeRef.current.src = iframeRef.current.src;
	};
	const isStart = current === START_URL;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full flex-col",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-2 border-b border-white/10 bg-black/30 px-3 py-1.5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: back,
					disabled: index === 0,
					className: "rounded p-1 hover:bg-white/10 disabled:opacity-30",
					"aria-label": "Back",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { size: 14 })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: forward,
					disabled: index >= history.length - 1,
					className: "rounded p-1 hover:bg-white/10 disabled:opacity-30",
					"aria-label": "Forward",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { size: 14 })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: reload,
					className: "rounded p-1 hover:bg-white/10",
					"aria-label": "Reload",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCw, { size: 14 })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("form", {
					className: "mx-2 flex-1",
					onSubmit: (e) => {
						e.preventDefault();
						navigate(draft);
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: draft,
						onChange: (e) => setDraft(e.target.value),
						className: "w-full rounded-md bg-white/10 px-3 py-1 text-sm text-white outline-none placeholder:text-white/40"
					})
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex-1 overflow-hidden bg-gradient-to-b from-[oklch(0.24_0.02_260)] to-[oklch(0.18_0.02_260)]",
			children: isStart ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "h-full overflow-y-auto",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StartPage, {})
			}) : external ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalPage, {
				url: current,
				label: external.label
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("iframe", {
				ref: iframeRef,
				src: embedUrl,
				title: "Safari",
				className: "h-full w-full border-0 bg-white",
				sandbox: "allow-scripts allow-same-origin allow-forms allow-popups allow-presentation allow-top-navigation",
				referrerPolicy: "no-referrer"
			}, embedUrl)
		})]
	});
}
var pages = [ResumePage1, ResumePage2];
function ResumeApp() {
	const [zoom, setZoom] = (0, import_react.useState)(1);
	const [page, setPage] = (0, import_react.useState)(0);
	const PageComp = pages[page];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full flex-col bg-neutral-900",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-2 border-b border-white/10 bg-black/30 px-3 py-1.5 text-xs",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => setZoom((z) => Math.max(.6, z - .1)),
					className: "rounded p-1 hover:bg-white/10",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ZoomOut, { size: 14 })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "tabular-nums",
					children: [Math.round(zoom * 100), "%"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => setZoom((z) => Math.min(1.6, z + .1)),
					className: "rounded p-1 hover:bg-white/10",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ZoomIn, { size: 14 })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mx-2 h-4 w-px bg-white/15" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => setPage((p) => Math.max(0, p - 1)),
					className: "rounded p-1 hover:bg-white/10",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { size: 14 })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
					"Page ",
					page + 1,
					" of ",
					pages.length
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => setPage((p) => Math.min(pages.length - 1, p + 1)),
					className: "rounded p-1 hover:bg-white/10",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { size: 14 })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "flex-1" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					href: profile.links.resume,
					download: true,
					className: "inline-flex items-center gap-1 rounded-md bg-white/10 px-2 py-1 hover:bg-white/20",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { size: 14 }), " Download"]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex-1 overflow-auto bg-neutral-800 p-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto rounded shadow-2xl",
				style: {
					width: 620 * zoom,
					transformOrigin: "top center"
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					style: {
						transform: `scale(${zoom})`,
						transformOrigin: "top left",
						width: 620
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageComp, {})
				})
			})
		})]
	});
}
function ResumePage1() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-[820px] bg-white p-10 text-neutral-900",
		style: { width: 620 },
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-3xl font-semibold tracking-tight",
				children: profile.name
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-neutral-600",
				children: profile.title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-1 text-xs text-neutral-500",
				children: [
					profile.email,
					" · ",
					profile.location
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("hr", { className: "my-4 border-neutral-200" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-sm font-semibold uppercase tracking-wide text-neutral-500",
				children: "Summary"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm",
				children: profile.tagline
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-4 text-sm font-semibold uppercase tracking-wide text-neutral-500",
				children: "Experience"
			}),
			experience.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex justify-between text-sm font-medium",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
						e.role,
						" — ",
						e.org
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-neutral-500",
						children: e.period
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-1 list-disc pl-4 text-xs text-neutral-700",
					children: e.points.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: p }, p))
				})]
			}, e.org)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-4 text-sm font-semibold uppercase tracking-wide text-neutral-500",
				children: "Education"
			}),
			education.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-1 flex justify-between text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
					e.school,
					" — ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-neutral-600",
						children: e.degree
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "text-neutral-500",
					children: [
						e.period,
						" · ",
						e.detail
					]
				})]
			}, e.school))
		]
	});
}
function ResumePage2() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-[820px] bg-white p-10 text-neutral-900",
		style: { width: 620 },
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-sm font-semibold uppercase tracking-wide text-neutral-500",
				children: "Skills"
			}),
			Object.entries(skills).map(([g, list]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-2 text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "font-medium",
					children: [g, ": "]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-neutral-700",
					children: list.join(", ")
				})]
			}, g)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-6 text-sm font-semibold uppercase tracking-wide text-neutral-500",
				children: "Certifications & Research"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-2 list-disc pl-4 text-sm text-neutral-800",
				children: certifications.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
					c.title,
					" — ",
					c.issuer,
					" (",
					c.year,
					")"
				] }, c.title))
			})
		]
	});
}
function MailApp() {
	const [sent, setSent] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full flex-col bg-[oklch(0.24_0.02_260)]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "border-b border-white/10 bg-black/20 px-4 py-2 text-xs text-white/70",
			children: "New Message"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit: (e) => {
				e.preventDefault();
				setSent(true);
			},
			className: "flex flex-1 flex-col p-4 text-sm",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-2 flex items-center gap-2 border-b border-white/10 pb-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "w-14 text-white/50",
						children: "To:"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: profile.email })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-2 flex items-center gap-2 border-b border-white/10 pb-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "w-14 text-white/50",
						children: "From:"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						required: true,
						placeholder: "you@example.com",
						className: "flex-1 bg-transparent outline-none"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-2 flex items-center gap-2 border-b border-white/10 pb-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "w-14 text-white/50",
						children: "Subject:"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						required: true,
						placeholder: "Let's build something",
						className: "flex-1 bg-transparent outline-none"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
					required: true,
					placeholder: "Write your message…",
					className: "flex-1 resize-none bg-transparent outline-none"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs text-white/50",
						children: sent ? "Draft ready — this is a demo mailbox." : "This is a portfolio mail UI."
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "submit",
						className: "inline-flex items-center gap-1.5 rounded-md bg-blue-500 px-3 py-1.5 text-sm text-white hover:bg-blue-500/90",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { size: 14 }), " Send"]
					})]
				})
			]
		})]
	});
}
function ResearchApp() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full flex-col bg-neutral-900",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-2 border-b border-white/10 bg-black/30 px-3 py-1.5 text-xs",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "opacity-70",
					children: "ZKP-Guard.pdf"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "flex-1" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					href: research.video,
					target: "_blank",
					rel: "noreferrer",
					className: "inline-flex items-center gap-1 rounded-md bg-red-500/80 px-2 py-1 hover:bg-red-500",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { size: 14 }), " Watch on YouTube"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					href: "#",
					className: "inline-flex items-center gap-1 rounded-md bg-white/10 px-2 py-1 hover:bg-white/20",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { size: 14 }), " Download"]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex-1 overflow-auto bg-neutral-800 p-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-[620px] rounded bg-white p-10 text-neutral-900 shadow-2xl",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-[11px] uppercase tracking-widest text-neutral-500",
								children: research.venue
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "mt-2 text-xl font-semibold leading-snug",
								children: research.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-2 text-sm text-neutral-700",
								children: research.authors.join(", ")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-1 text-xs text-neutral-500",
								children: research.publisher
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("hr", { className: "my-5 border-neutral-200" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-xs font-semibold uppercase tracking-wide text-neutral-500",
						children: "Abstract"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm leading-relaxed",
						children: research.abstract
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-5 text-xs font-semibold uppercase tracking-wide text-neutral-500",
						children: "1. Introduction"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm leading-relaxed text-neutral-800",
						children: "Digital images circulate through countless intermediaries, each capable of altering provenance metadata. ZKP-Guard combines perceptual hashing with succinct zero-knowledge proofs, letting a verifier confirm that a given image originated from a specific author without revealing either the source pixels or the author's signing key…"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-5 text-xs font-semibold uppercase tracking-wide text-neutral-500",
						children: "2. Framework"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm leading-relaxed text-neutral-800",
						children: "The framework has three components: (a) a lightweight fingerprinting module, (b) a proof generator that binds fingerprints to owner identity via a Groth16 circuit, and (c) an on-chain or off-chain verifier that authenticates ownership in under 15ms per image."
					})
				]
			})
		})]
	});
}
function VideoApp({ win }) {
	const name = win.payload?.name ?? "Project Demo";
	const [playing, setPlaying] = (0, import_react.useState)(false);
	const [progress, setProgress] = (0, import_react.useState)(0);
	const intRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		if (playing) intRef.current = window.setInterval(() => {
			setProgress((p) => p >= 100 ? (setPlaying(false), 100) : p + .5);
		}, 50);
		return () => {
			if (intRef.current) window.clearInterval(intRef.current);
		};
	}, [playing]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full flex-col bg-black text-white",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative flex-1 overflow-hidden",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-black" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "relative grid h-full place-items-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-xs uppercase tracking-widest text-white/50",
							children: "Now Playing"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-1 text-2xl font-semibold",
							children: name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setPlaying((p) => !p),
							className: "mt-6 grid h-16 w-16 place-items-center rounded-full bg-white/15 backdrop-blur transition hover:scale-105",
							children: playing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pause, { size: 26 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { size: 26 })
						})
					]
				})
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-3 border-t border-white/10 bg-black/60 px-4 py-2 text-xs",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => setPlaying((p) => !p),
					className: "rounded p-1 hover:bg-white/10",
					children: playing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pause, { size: 14 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { size: 14 })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "relative flex-1 h-1 rounded-full bg-white/15",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute inset-y-0 left-0 rounded-full bg-white/90",
						style: { width: `${progress}%` }
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "tabular-nums text-white/70",
					children: [
						Math.floor(progress * .6).toString().padStart(2, "0"),
						":",
						Math.floor(progress * .6 % 1 * 60).toString().padStart(2, "0"),
						" / 01:00"
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "rounded p-1 hover:bg-white/10",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Maximize2, { size: 14 })
				})
			]
		})]
	});
}
function renderApp(win) {
	switch (win.appId) {
		case "about": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AboutApp, {});
		case "terminal": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TerminalApp, {});
		case "projects": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProjectsApp, { win });
		case "safari": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SafariApp, { win });
		case "resume": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResumeApp, {});
		case "mail": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MailApp, {});
		case "research": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResearchApp, {});
		case "video": return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VideoApp, { win });
	}
}
function DesktopShell() {
	const { windows } = useWM();
	const [spot, setSpot] = (0, import_react.useState)(false);
	const [locked, setLocked] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		const onKey = (e) => {
			if (locked) return;
			if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
				e.preventDefault();
				setSpot((s) => !s);
			}
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [locked]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed inset-0 overflow-hidden font-sans text-white",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"aria-hidden": true,
				className: "absolute inset-0",
				style: { background: "radial-gradient(1200px 800px at 20% 10%, oklch(0.55 0.18 300) 0%, transparent 60%),radial-gradient(1000px 700px at 85% 20%, oklch(0.6 0.16 260) 0%, transparent 55%),radial-gradient(900px 700px at 60% 100%, oklch(0.45 0.15 340) 0%, transparent 60%),linear-gradient(180deg, oklch(0.22 0.06 280) 0%, oklch(0.12 0.05 270) 100%)" }
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"aria-hidden": true,
				className: "absolute inset-0 opacity-[0.08] mix-blend-overlay",
				style: {
					backgroundImage: "radial-gradient(rgba(255,255,255,0.6) 1px, transparent 1px)",
					backgroundSize: "3px 3px"
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				initial: false,
				animate: locked ? {
					opacity: 0,
					scale: .98
				} : {
					opacity: 1,
					scale: 1
				},
				transition: {
					duration: .5,
					ease: "easeOut"
				},
				className: "absolute inset-0",
				style: { pointerEvents: locked ? "none" : "auto" },
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuBar, { onSpotlight: () => setSpot(true) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DesktopIcons, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute inset-0 pt-7",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: windows.map((w) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Window, {
							win: w,
							children: renderApp(w)
						}, w.id)) })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dock, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spotlight, {
						open: spot,
						onClose: () => setSpot(false)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "pointer-events-none fixed bottom-1 left-3 z-[9997] text-[10px] text-white/40",
						children: "⌘K for Spotlight"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SystemDialogHost, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: locked && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LockScreen, { onUnlock: () => setLocked(false) }) })
		]
	});
}
function Desktop() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WindowManagerProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DesktopShell, {}) });
}
function Index() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Desktop, {});
}
//#endregion
export { Index as component };
