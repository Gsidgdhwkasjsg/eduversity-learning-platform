import { Category, Instructor, Course, Review, User } from '../types';

export const CATEGORIES: Category[] = [
  {
    id: 'cat-1',
    name: 'Programming & Development',
    slug: 'programming-development',
    icon: 'Code2',
    description: 'Master modern full-stack web, mobile, cloud architectures and scalable system design.',
    courseCount: 42,
    color: '#3b82f6',
    gradient: 'from-blue-600 to-indigo-600'
  },
  {
    id: 'cat-2',
    name: 'Artificial Intelligence',
    slug: 'artificial-intelligence',
    icon: 'Cpu',
    description: 'Build LLM agents, neural networks, computer vision, and cutting-edge GenAI pipelines.',
    courseCount: 38,
    color: '#8b5cf6',
    gradient: 'from-purple-600 to-pink-600'
  },
  {
    id: 'cat-3',
    name: 'Data Science',
    slug: 'data-science',
    icon: 'BarChart3',
    description: 'Transform raw data into predictive models with Python, BigQuery, and statistical machine learning.',
    courseCount: 29,
    color: '#06b6d4',
    gradient: 'from-cyan-600 to-blue-600'
  },
  {
    id: 'cat-4',
    name: 'Business & Entrepreneurship',
    slug: 'business-entrepreneurship',
    icon: 'Briefcase',
    description: 'Launch venture-backed startups, master product management, and scale revenue.',
    courseCount: 24,
    color: '#10b981',
    gradient: 'from-emerald-600 to-teal-600'
  },
  {
    id: 'cat-5',
    name: 'UI/UX Design',
    slug: 'ui-ux-design',
    icon: 'Layout',
    description: 'Craft world-class design systems, wireframes, and high-fidelity interactive Figma prototypes.',
    courseCount: 31,
    color: '#f43f5e',
    gradient: 'from-rose-600 to-pink-600'
  },
  {
    id: 'cat-6',
    name: 'Graphic Design',
    slug: 'graphic-design',
    icon: 'Palette',
    description: 'Create memorable brand identities, vector illustrations, typography, and 3D visual assets.',
    courseCount: 19,
    color: '#ec4899',
    gradient: 'from-pink-600 to-purple-600'
  },
  {
    id: 'cat-7',
    name: 'Digital Marketing',
    slug: 'digital-marketing',
    icon: 'Megaphone',
    description: 'Drive exponential user growth with SEO, paid performance marketing, and retention loops.',
    courseCount: 22,
    color: '#f97316',
    gradient: 'from-orange-600 to-amber-600'
  },
  {
    id: 'cat-8',
    name: 'Cybersecurity',
    slug: 'cybersecurity',
    icon: 'ShieldCheck',
    description: 'Learn offensive ethical hacking, defensive SecOps, penetration testing, and zero-trust security.',
    courseCount: 18,
    color: '#ef4444',
    gradient: 'from-red-600 to-rose-700'
  },
  {
    id: 'cat-9',
    name: 'Finance',
    slug: 'finance',
    icon: 'TrendingUp',
    description: 'Master quantitative modeling, valuation, corporate finance, and algorithmic trading.',
    courseCount: 20,
    color: '#14b8a6',
    gradient: 'from-teal-600 to-emerald-600'
  },
  {
    id: 'cat-10',
    name: 'Personal Development',
    slug: 'personal-development',
    icon: 'Sparkles',
    description: 'Accelerate executive leadership, public speaking, cognitive performance, and career negotiation.',
    courseCount: 16,
    color: '#eab308',
    gradient: 'from-amber-500 to-yellow-600'
  }
];

export const INSTRUCTORS: Instructor[] = [
  {
    id: 'inst-1',
    name: 'Dr. Sarah Jenkins',
    title: 'Ex-DeepMind Research Scientist & Stanford Adjunct',
    company: 'NeuralFrontier Lab',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
    bio: 'Dr. Sarah Jenkins spent 8 years at Google DeepMind developing foundational transformer models and reinforcement learning algorithms. She holds a Ph.D. in Computer Science from MIT and has mentored over 45,000 engineers globally.',
    expertise: ['Generative AI', 'Deep Learning', 'PyTorch', 'Transformer Architecture', 'Agentic Systems'],
    rating: 4.95,
    reviewsCount: 3820,
    studentsCount: 48900,
    coursesCount: 4,
    socials: {
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com',
      github: 'https://github.com',
      website: 'https://sarahjenkins.ai'
    }
  },
  {
    id: 'inst-2',
    name: 'Alex Rivera',
    title: 'Principal Software Architect & Tech Lead',
    company: 'Stripe (Alumni)',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    bio: 'Alex Rivera is a veteran software architect who architected payment pipelines handling millions in throughput. He is passionate about production-grade TypeScript, resilient microservices, and React performance optimization.',
    expertise: ['Full-Stack TypeScript', 'Next.js 15', 'Distributed Systems', 'PostgreSQL', 'Docker & Kubernetes'],
    rating: 4.92,
    reviewsCount: 4210,
    studentsCount: 52100,
    coursesCount: 5,
    socials: {
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com',
      github: 'https://github.com'
    }
  },
  {
    id: 'inst-3',
    name: 'Elena Rostova',
    title: 'Design Director & Design System Specialist',
    company: 'Figma Community Ambassador',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80',
    bio: 'Elena has led product design teams at unicorn startups and created design systems utilized by millions. Her courses bridge the gap between creative visual thinking, user psychology, and front-end execution.',
    expertise: ['UI/UX Design', 'Design Systems', 'Figma Prototyping', 'Accessibility (a11y)', 'Design Sprints'],
    rating: 4.98,
    reviewsCount: 2980,
    studentsCount: 39400,
    coursesCount: 3,
    socials: {
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com',
      website: 'https://elenadesigns.io'
    }
  },
  {
    id: 'inst-4',
    name: 'Marcus Vance',
    title: 'Chief Information Security Officer & Ethical Hacker',
    company: 'CyberGuard Alliance',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    bio: 'Certified ethical hacker (OSCP, CISSP) with 12+ years defending enterprise infrastructures and discovering zero-day vulnerabilities. Marcus focuses on practical hands-on labs mimicking real-world cyber warfare.',
    expertise: ['Ethical Hacking', 'Penetration Testing', 'Network Defense', 'Cloud SecOps', 'Cryptography'],
    rating: 4.88,
    reviewsCount: 2150,
    studentsCount: 28400,
    coursesCount: 3,
    socials: {
      linkedin: 'https://linkedin.com',
      github: 'https://github.com'
    }
  },
  {
    id: 'inst-5',
    name: 'David Chen',
    title: 'Senior Portfolio Manager & Financial Quantitative Analyst',
    company: 'Apex Capital Partners',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
    bio: 'David manages quantitative portfolios with a focus on risk arbitrage and algorithmic strategies. He taught computational finance at NYU Stern and simplifies complex financial modeling for everyday practitioners.',
    expertise: ['Financial Modeling', 'Algorithmic Trading', 'Valuation & DCF', 'Risk Management', 'Python for Finance'],
    rating: 4.91,
    reviewsCount: 1890,
    studentsCount: 22100,
    coursesCount: 3,
    socials: {
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com'
    }
  },
  {
    id: 'inst-6',
    name: 'Sophia Al-Mansoor',
    title: 'VP of Growth & Performance Marketing',
    company: 'HyperGrowth Media',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80',
    bio: 'Sophia scaled user acquisition for three Y Combinator startups from 0 to over 10 million active users. She teaches actionable, data-backed growth loops, paid advertising, and conversion rate optimization.',
    expertise: ['Growth Marketing', 'SEO Strategies', 'Meta & Google Ads', 'Viral Loops', 'Analytics & Attribution'],
    rating: 4.89,
    reviewsCount: 1640,
    studentsCount: 19800,
    coursesCount: 2,
    socials: {
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com'
    }
  }
];

export const SAMPLE_VIDEOS = [
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4'
];

export const COURSES: Course[] = [
  {
    id: 'course-ai-101',
    title: 'Complete Autonomous AI Agents & Generative AI Masterclass 2026',
    subtitle: 'Build production-ready LLM agents, multi-agent swarms, RAG pipelines, and fine-tune models with PyTorch and LangGraph.',
    slug: 'autonomous-ai-agents-masterclass',
    category: 'Artificial Intelligence',
    instructorId: 'inst-1',
    instructor: INSTRUCTORS[0],
    thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80',
    previewVideoUrl: SAMPLE_VIDEOS[0],
    price: 84.99,
    originalPrice: 199.99,
    discountPercent: 58,
    level: 'Intermediate',
    duration: '28.5 hours',
    durationHours: 28.5,
    totalLessons: 64,
    rating: 4.96,
    reviewsCount: 2410,
    studentsCount: 34200,
    badge: 'Bestseller',
    isFeatured: true,
    language: 'English',
    updatedAt: 'November 2026',
    description: 'Generative AI and autonomous agent systems have completely revolutionized the software engineering landscape. This masterclass takes you from foundational attention mechanisms and transformer architecture up through deploying scalable multi-agent systems using LangGraph, CrewAI, vector embeddings, and autonomous self-healing code execution.',
    whatYouWillLearn: [
      'Architect and orchestrate autonomous multi-agent teams with memory and tool-calling capabilities',
      'Build end-to-end Retrieval Augmented Generation (RAG) systems with hybrid vector search',
      'Fine-tune state-of-the-art open-weights models (Llama 3, Mistral) using LoRA and QLoRA',
      'Implement real-time multimodal audio, vision, and streaming inference loops',
      'Deploy AI agents with enterprise-grade guardrails, rate-limiting, and evaluation telemetry',
      'Integrate production databases, function-calling schemas, and external API connectors'
    ],
    requirements: [
      'Basic proficiency in Python programming (syntax, functions, basic OOP)',
      'A computer running Windows, macOS, or Linux with internet access',
      'No prior machine learning or linear algebra degree required — all concepts explained from first principles'
    ],
    targetAudience: [
      'Software engineers transitioning into AI Engineering',
      'Data scientists looking to operationalize LLM systems into production products',
      'Technical founders seeking to build AI-native applications'
    ],
    modules: [
      {
        id: 'mod-1',
        courseId: 'course-ai-101',
        title: 'Module 1: Foundations of Modern GenAI & Agent Architectures',
        order: 1,
        lessons: [
          {
            id: 'les-1-1',
            moduleId: 'mod-1',
            title: '1. Course Orientation & The Architecture of Agentic AI',
            duration: '14:20',
            durationMinutes: 14,
            type: 'video',
            videoUrl: SAMPLE_VIDEOS[0],
            description: 'A comprehensive overview of reactive versus autonomous agents, cognitive loops (ReAct, Reflexion), and the course roadmap.',
            resources: [
              { title: 'Agentic_AI_Architecture_Diagram.pdf', url: '#', size: '2.4 MB', type: 'PDF' },
              { title: 'Course_Starter_Repo.zip', url: '#', size: '15.1 MB', type: 'ZIP' }
            ],
            isPreview: true
          },
          {
            id: 'les-1-2',
            moduleId: 'mod-1',
            title: '2. Setting Up Your Python 3.12 Virtual Environment & API Keys Safely',
            duration: '18:45',
            durationMinutes: 19,
            type: 'video',
            videoUrl: SAMPLE_VIDEOS[1],
            description: 'Configuring your local developer workspace, environment variable managers, and secure secret handling protocols.',
            resources: [
              { title: 'setup_instructions.md', url: '#', size: '45 KB', type: 'Markdown' }
            ],
            isPreview: true
          },
          {
            id: 'les-1-3',
            moduleId: 'mod-1',
            title: '3. Understanding Prompt Engineering vs Structured Tool Calling',
            duration: '22:10',
            durationMinutes: 22,
            type: 'video',
            videoUrl: SAMPLE_VIDEOS[2],
            description: 'Why JSON Schema validation and function calling surpass loose prose prompting for resilient software pipelines.',
            resources: []
          }
        ]
      },
      {
        id: 'mod-2',
        courseId: 'course-ai-101',
        title: 'Module 2: Advanced Vector Databases & Hybrid RAG Pipelines',
        order: 2,
        lessons: [
          {
            id: 'les-2-1',
            moduleId: 'mod-2',
            title: '4. Vector Embeddings: Cosine Similarity, HNSW Indexing & Chunking Strategies',
            duration: '26:30',
            durationMinutes: 27,
            type: 'video',
            videoUrl: SAMPLE_VIDEOS[3],
            description: 'Deep dive into semantic chunking, context windows, and indexing billions of tokens in vector stores.',
            resources: [
              { title: 'Vector_Math_Cheatsheet.pdf', url: '#', size: '1.8 MB', type: 'PDF' }
            ]
          },
          {
            id: 'les-2-2',
            moduleId: 'mod-2',
            title: '5. Hands-on Lab: Building a Self-Correcting RAG System',
            duration: '31:15',
            durationMinutes: 31,
            type: 'video',
            videoUrl: SAMPLE_VIDEOS[0],
            description: 'Write code that evaluates retrieved documents, detects hallucination, and automatically rewrites search queries.',
            resources: [
              { title: 'rag_code_starter.py', url: '#', size: '84 KB', type: 'Python' }
            ]
          }
        ]
      },
      {
        id: 'mod-3',
        courseId: 'course-ai-101',
        title: 'Module 3: Multi-Agent Collaboration & Production Deployment',
        order: 3,
        lessons: [
          {
            id: 'les-3-1',
            moduleId: 'mod-3',
            title: '6. Orchestrating Multi-Agent Graphs with State Persistence',
            duration: '34:50',
            durationMinutes: 35,
            type: 'video',
            videoUrl: SAMPLE_VIDEOS[1],
            description: 'Connecting research agents, coder agents, and reviewer agents into a synchronized workflow graph.',
            resources: []
          },
          {
            id: 'les-3-2',
            moduleId: 'mod-3',
            title: '7. Capstone Project: Deploying an Enterprise Support Swarm',
            duration: '42:10',
            durationMinutes: 42,
            type: 'video',
            videoUrl: SAMPLE_VIDEOS[2],
            description: 'Final project deployment with telemetry, latency benchmarks, and rate-limit mitigation.',
            resources: [
              { title: 'capstone_rubric_and_specs.pdf', url: '#', size: '3.1 MB', type: 'PDF' }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'course-web-201',
    title: 'The Complete Full-Stack Web Development Bootcamp (React, Next.js & Node)',
    subtitle: 'From zero to full-stack engineer. Build 8 real-world SaaS applications with Next.js 15, TypeScript, Tailwind CSS, PostgreSQL & Stripe.',
    slug: 'fullstack-web-development-bootcamp',
    category: 'Programming & Development',
    instructorId: 'inst-2',
    instructor: INSTRUCTORS[1],
    thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
    previewVideoUrl: SAMPLE_VIDEOS[1],
    price: 69.99,
    originalPrice: 179.99,
    discountPercent: 61,
    level: 'Beginner',
    duration: '45.0 hours',
    durationHours: 45.0,
    totalLessons: 112,
    rating: 4.94,
    reviewsCount: 3890,
    studentsCount: 49800,
    badge: 'Bestseller',
    isFeatured: true,
    language: 'English',
    updatedAt: 'October 2026',
    description: 'Learn the modern web stack that powers modern Silicon Valley startups. We build real production applications from scratch, covering frontend component architecture, responsive Tailwind styling, server-side data fetching, relational PostgreSQL databases, and secure authentication.',
    whatYouWillLearn: [
      'Master modern JavaScript (ESNext) and strict TypeScript from the ground up',
      'Build responsive, accessible user interfaces with React 19 and Tailwind CSS',
      'Architect full-stack apps with Next.js App Router, Server Actions & caching',
      'Design relational database schemas in PostgreSQL with Prisma and Supabase',
      'Implement real payment processing with Stripe subscriptions and webhooks',
      'Deploy with CI/CD on Vercel and Dockerize microservices for AWS/Cloud Run'
    ],
    requirements: [
      'A computer with a web browser and code editor (VS Code recommended)',
      'No prior coding experience required — starts from HTML & CSS basics'
    ],
    targetAudience: [
      'Complete beginners wanting to break into tech as high-earning developers',
      'Frontend developers wanting to level up to confident full-stack engineers',
      'Bootcamp graduates seeking real-world architecture depth'
    ],
    modules: [
      {
        id: 'mod-web-1',
        courseId: 'course-web-201',
        title: 'Module 1: Web Fundamentals & Modern TypeScript',
        order: 1,
        lessons: [
          {
            id: 'les-w-1',
            moduleId: 'mod-web-1',
            title: '1. Welcome & How the Modern Web Actually Works',
            duration: '12:15',
            durationMinutes: 12,
            type: 'video',
            videoUrl: SAMPLE_VIDEOS[1],
            description: 'Client-server model, DNS, HTTP/2, DOM rendering lifecycle, and modern dev tools.',
            resources: [
              { title: 'Web_Dev_Handbook.pdf', url: '#', size: '4.2 MB', type: 'PDF' }
            ],
            isPreview: true
          },
          {
            id: 'les-w-2',
            moduleId: 'mod-web-1',
            title: '2. TypeScript Mastery: Types, Generics, and Inference',
            duration: '24:40',
            durationMinutes: 25,
            type: 'video',
            videoUrl: SAMPLE_VIDEOS[2],
            description: 'Master strict typing without getting bogged down by endless compiler complaints.',
            resources: []
          }
        ]
      },
      {
        id: 'mod-web-2',
        courseId: 'course-web-201',
        title: 'Module 2: Building Modern SaaS with Next.js & PostgreSQL',
        order: 2,
        lessons: [
          {
            id: 'les-w-3',
            moduleId: 'mod-web-2',
            title: '3. Next.js 15 App Router & Server Components in Action',
            duration: '32:10',
            durationMinutes: 32,
            type: 'video',
            videoUrl: SAMPLE_VIDEOS[3],
            description: 'Eliminate client bundle bloat with streaming Server Components and optimistic UI mutations.',
            resources: []
          },
          {
            id: 'les-w-4',
            moduleId: 'mod-web-2',
            title: '4. Relational Database Modeling with PostgreSQL & Migrations',
            duration: '38:00',
            durationMinutes: 38,
            type: 'video',
            videoUrl: SAMPLE_VIDEOS[0],
            description: 'Designing performant indices, foreign key cascades, and transactional safety.',
            resources: []
          }
        ]
      }
    ]
  },
  {
    id: 'course-ux-301',
    title: 'Design Systems & Enterprise UI/UX Masterclass in Figma',
    subtitle: 'Learn to design high-converting, accessible products. Master Figma variables, component tokens, micro-interactions and usability testing.',
    slug: 'design-systems-figma-masterclass',
    category: 'UI/UX Design',
    instructorId: 'inst-3',
    instructor: INSTRUCTORS[2],
    thumbnail: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=1200&q=80',
    previewVideoUrl: SAMPLE_VIDEOS[2],
    price: 49.99,
    originalPrice: 129.99,
    discountPercent: 62,
    level: 'All Levels',
    duration: '18.0 hours',
    durationHours: 18.0,
    totalLessons: 48,
    rating: 4.98,
    reviewsCount: 1950,
    studentsCount: 26100,
    badge: 'Highest Rated',
    isFeatured: true,
    language: 'English',
    updatedAt: 'November 2026',
    description: 'Design systems are the secret weapon behind every scalable product team. In this hands-on masterclass, you will learn how to architect production-ready component libraries in Figma using design tokens, auto layout 5.0, responsive constraints, and strict accessibility standards.',
    whatYouWillLearn: [
      'Build scalable multi-brand design systems with Figma variables and modes',
      'Master auto-layout, nested components, interactive component states and variants',
      'Conduct user research, synthesize customer journey maps, and wireframe rapidly',
      'Deliver developer-ready handoff specs with pixel-perfect tokens and CSS documentation',
      'Execute usability testing sessions that uncover high-impact friction points'
    ],
    requirements: [
      'A free Figma account',
      'No prior graphic design software knowledge required'
    ],
    targetAudience: [
      'Product designers looking to lead design system initiatives at top companies',
      'Frontend developers wanting to elevate their visual aesthetics and design intuition',
      'Founders and product managers designing their own SaaS interfaces'
    ],
    modules: [
      {
        id: 'mod-ux-1',
        courseId: 'course-ux-301',
        title: 'Module 1: Design Tokens & Typography Systems',
        order: 1,
        lessons: [
          {
            id: 'les-ux-1',
            moduleId: 'mod-ux-1',
            title: '1. The Anatomy of an Enterprise Design System',
            duration: '16:00',
            durationMinutes: 16,
            type: 'video',
            videoUrl: SAMPLE_VIDEOS[2],
            description: 'Why design systems fail and how to structure atomic variables for effortless team adoption.',
            resources: [
              { title: 'Design_System_Template.fig', url: '#', size: '18.4 MB', type: 'Figma' }
            ],
            isPreview: true
          },
          {
            id: 'les-ux-2',
            moduleId: 'mod-ux-1',
            title: '2. Setting Up Color Palettes, Semantic Aliases & Dark Mode Tokens',
            duration: '22:30',
            durationMinutes: 23,
            type: 'video',
            videoUrl: SAMPLE_VIDEOS[3],
            description: 'WCAG contrast compliance, light/dark switching, and primary/secondary hierarchy.',
            resources: []
          }
        ]
      }
    ]
  },
  {
    id: 'course-sec-401',
    title: 'Practical Ethical Hacking & Offensive Cybersecurity 2026',
    subtitle: 'Hands-on penetration testing, web application vulnerabilities (OWASP Top 10), network exploitation, and threat hunting.',
    slug: 'practical-ethical-hacking-cybersecurity',
    category: 'Cybersecurity',
    instructorId: 'inst-4',
    instructor: INSTRUCTORS[3],
    thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
    previewVideoUrl: SAMPLE_VIDEOS[3],
    price: 79.99,
    originalPrice: 169.99,
    discountPercent: 53,
    level: 'Intermediate',
    duration: '24.0 hours',
    durationHours: 24.0,
    totalLessons: 56,
    rating: 4.89,
    reviewsCount: 1680,
    studentsCount: 21400,
    badge: 'Trending',
    isFeatured: true,
    language: 'English',
    updatedAt: 'October 2026',
    description: 'Step into the shoes of both an attacker and a security analyst. In this fully interactive course, you set up an isolated penetration testing lab with Kali Linux and attack realistic vulnerable targets while mastering defense strategies.',
    whatYouWillLearn: [
      'Master Kali Linux, Nmap reconnaissance, Wireshark packet analysis, and Metasploit',
      'Exploit and remediate OWASP Top 10 web vulnerabilities (SQLi, XSS, CSRF, SSRF)',
      'Conduct wireless network penetration testing and assess Wi-Fi protocols',
      'Defend corporate infrastructure using modern SIEM tools and endpoint detection'
    ],
    requirements: [
      'Basic familiarity with networking concepts (IP addresses, TCP/UDP, ports)',
      'A computer with at least 8GB RAM capable of running virtual machines'
    ],
    targetAudience: [
      'IT professionals and system administrators transitioning to cybersecurity',
      'Developers wanting to secure their web apps against real-world zero-day attacks',
      'Students preparing for CEH, OSCP, or CompTIA Security+ certifications'
    ],
    modules: [
      {
        id: 'mod-sec-1',
        courseId: 'course-sec-401',
        title: 'Module 1: Setting Up the Hacking Lab & Network Reconnaissance',
        order: 1,
        lessons: [
          {
            id: 'les-sec-1',
            moduleId: 'mod-sec-1',
            title: '1. Virtual Lab Architecture with Kali Linux & Metasploitable',
            duration: '18:10',
            durationMinutes: 18,
            type: 'video',
            videoUrl: SAMPLE_VIDEOS[3],
            description: 'Safely isolating vulnerable virtual environments with host-only adapters.',
            resources: [
              { title: 'Lab_Setup_Guide.pdf', url: '#', size: '3.6 MB', type: 'PDF' }
            ],
            isPreview: true
          }
        ]
      }
    ]
  },
  {
    id: 'course-free-501',
    title: 'Python for Beginners: From Fundamentals to Real-World Automation',
    subtitle: 'The ultimate free course to learn programming with Python. Write clean code, automate boring daily tasks, and build mini-projects.',
    slug: 'python-for-beginners-automation',
    category: 'Programming & Development',
    instructorId: 'inst-1',
    instructor: INSTRUCTORS[0],
    thumbnail: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&w=1200&q=80',
    previewVideoUrl: SAMPLE_VIDEOS[0],
    price: 0,
    originalPrice: 79.99,
    discountPercent: 100,
    level: 'Beginner',
    duration: '12.0 hours',
    durationHours: 12.0,
    totalLessons: 36,
    rating: 4.93,
    reviewsCount: 5120,
    studentsCount: 68400,
    badge: 'Free',
    isFeatured: true,
    language: 'English',
    updatedAt: 'November 2026',
    description: 'Start your journey into tech with Python, the most popular and versatile programming language in the world. 100% free with lifetime access, hands-on coding exercises, and a verifiable completion certificate.',
    whatYouWillLearn: [
      'Write clean, readable Python scripts using variables, loops, and data structures',
      'Automate Excel spreadsheets, PDF documents, and file management tasks',
      'Web scrape data from live websites using Beautiful Soup and Requests',
      'Handle exceptions, read/write files, and package standalone scripts'
    ],
    requirements: [
      'No prior programming experience required',
      'A computer with internet access'
    ],
    targetAudience: [
      'Anyone curious about learning how to code without upfront financial commitment',
      'Office workers, accountants, and marketers looking to automate repetitive tasks'
    ],
    modules: [
      {
        id: 'mod-py-1',
        courseId: 'course-free-501',
        title: 'Module 1: Python Core Foundations',
        order: 1,
        lessons: [
          {
            id: 'les-py-1',
            moduleId: 'mod-py-1',
            title: '1. Installing Python & Running Your First Script',
            duration: '11:20',
            durationMinutes: 11,
            type: 'video',
            videoUrl: SAMPLE_VIDEOS[0],
            description: 'Step-by-step setup on Mac, Windows, and Linux with interactive shell.',
            resources: [
              { title: 'Python_Cheat_Sheet.pdf', url: '#', size: '1.2 MB', type: 'PDF' }
            ],
            isPreview: true
          },
          {
            id: 'les-py-2',
            moduleId: 'mod-py-1',
            title: '2. Working with Lists, Dictionaries, and Sets',
            duration: '19:40',
            durationMinutes: 20,
            type: 'video',
            videoUrl: SAMPLE_VIDEOS[1],
            description: 'Master Python collection types and list comprehensions.',
            resources: []
          }
        ]
      }
    ]
  },
  {
    id: 'course-fin-601',
    title: 'Financial Analysis, DCF Valuation & Investment Banking Masterclass',
    subtitle: 'Learn Wall Street financial modeling, 3-statement financial models, discounted cash flow (DCF), LBO, and M&A valuation.',
    slug: 'financial-analysis-valuation-masterclass',
    category: 'Finance',
    instructorId: 'inst-5',
    instructor: INSTRUCTORS[4],
    thumbnail: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1200&q=80',
    previewVideoUrl: SAMPLE_VIDEOS[1],
    price: 64.99,
    originalPrice: 159.99,
    discountPercent: 59,
    level: 'Advanced',
    duration: '22.0 hours',
    durationHours: 22.0,
    totalLessons: 52,
    rating: 4.92,
    reviewsCount: 1420,
    studentsCount: 18200,
    badge: 'Trending',
    isFeatured: false,
    language: 'English',
    updatedAt: 'October 2026',
    description: 'Learn the exact quantitative valuation workflows used by bulge-bracket investment banks and private equity megafunds. Includes real Excel templates for Apple, Tesla, and Microsoft historical data.',
    whatYouWillLearn: [
      'Build fully integrated 3-statement financial models (Income, Balance Sheet, Cash Flow)',
      'Perform rigorous Discounted Cash Flow (DCF) with WACC, terminal multiples, and sensitivity tables',
      'Analyze comparable company multiples (Trading Comps) and precedent transactions',
      'Structure Leveraged Buyout (LBO) debt schedules and calculate investor IRR'
    ],
    requirements: [
      'Basic understanding of business terminology',
      'Microsoft Excel or Google Sheets'
    ],
    targetAudience: [
      'Aspiring investment bankers, equity research analysts, and private equity associates',
      'Founders preparing for Series A/B fundraising and corporate valuation'
    ],
    modules: [
      {
        id: 'mod-fin-1',
        courseId: 'course-fin-601',
        title: 'Module 1: Financial Statements & Modeling Best Practices',
        order: 1,
        lessons: [
          {
            id: 'les-fin-1',
            moduleId: 'mod-fin-1',
            title: '1. Financial Statement Mechanics & Circular References',
            duration: '21:10',
            durationMinutes: 21,
            type: 'video',
            videoUrl: SAMPLE_VIDEOS[1],
            description: 'Connecting operating working capital and capital expenditures across sheets.',
            resources: [
              { title: 'DCF_Valuation_Model_Template.xlsx', url: '#', size: '4.8 MB', type: 'Excel' }
            ],
            isPreview: true
          }
        ]
      }
    ]
  },
  {
    id: 'course-mkt-701',
    title: 'Growth Marketing & Viral Customer Acquisition Engine',
    subtitle: 'Scale SaaS and E-commerce products from $0 to $10M ARR using data-driven growth loops, performance ads, and organic SEO.',
    slug: 'growth-marketing-customer-acquisition',
    category: 'Digital Marketing',
    instructorId: 'inst-6',
    instructor: INSTRUCTORS[5],
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    previewVideoUrl: SAMPLE_VIDEOS[2],
    price: 54.99,
    originalPrice: 139.99,
    discountPercent: 61,
    level: 'Intermediate',
    duration: '16.5 hours',
    durationHours: 16.5,
    totalLessons: 42,
    rating: 4.88,
    reviewsCount: 1290,
    studentsCount: 16400,
    badge: 'Bestseller',
    isFeatured: false,
    language: 'English',
    updatedAt: 'November 2026',
    description: 'Move past outdated marketing tactics. Master modern product-led growth (PLG), programmatic SEO, viral invite mechanics, and high-ROI multi-channel paid acquisition with attribution tracking.',
    whatYouWillLearn: [
      'Engineer sustainable customer acquisition loops with low CAC and high LTV',
      'Execute programmatic SEO campaigns that drive millions of monthly organic visits',
      'Optimize Meta and Google Ad creatives using conversion psychology',
      'Construct automated email onboarding sequences that maximize user activation'
    ],
    requirements: [
      'Basic familiarity with digital platforms',
      'No budget required — methods work for bootstrapped founders'
    ],
    targetAudience: [
      'Growth marketers, product managers, and digital agency owners',
      'Startup founders needing customer traction and revenue growth'
    ],
    modules: [
      {
        id: 'mod-mkt-1',
        courseId: 'course-mkt-701',
        title: 'Module 1: The Modern Growth Engine Framework',
        order: 1,
        lessons: [
          {
            id: 'les-mkt-1',
            moduleId: 'mod-mkt-1',
            title: '1. Funnels vs Loops: Why Traditional Marketing is Obsolete',
            duration: '15:45',
            durationMinutes: 16,
            type: 'video',
            videoUrl: SAMPLE_VIDEOS[2],
            description: 'Building compounding self-sustaining growth loops.',
            resources: [],
            isPreview: true
          }
        ]
      }
    ]
  },
  {
    id: 'course-ds-801',
    title: 'Data Science & Predictive Machine Learning with Python & SQL',
    subtitle: 'From exploratory data analysis to production predictive modeling. Master Pandas, NumPy, Scikit-Learn, XGBoost, and SQL databases.',
    slug: 'data-science-machine-learning-python',
    category: 'Data Science',
    instructorId: 'inst-1',
    instructor: INSTRUCTORS[0],
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    previewVideoUrl: SAMPLE_VIDEOS[3],
    price: 74.99,
    originalPrice: 189.99,
    discountPercent: 60,
    level: 'Intermediate',
    duration: '32.0 hours',
    durationHours: 32.0,
    totalLessons: 74,
    rating: 4.95,
    reviewsCount: 2210,
    studentsCount: 31000,
    badge: 'Highest Rated',
    isFeatured: true,
    language: 'English',
    updatedAt: 'October 2026',
    description: 'Transform messy raw real-world datasets into high-impact predictive insights. Learn statistical feature engineering, model cross-validation, and deployment of ML APIs.',
    whatYouWillLearn: [
      'Perform advanced data manipulation and statistical visualization with Pandas & Seaborn',
      'Train, tune, and evaluate classification and regression models with Scikit-Learn and XGBoost',
      'Query and aggregate millions of rows with complex analytical SQL window functions',
      'Detect bias, handle imbalanced datasets, and interpret models with SHAP values'
    ],
    requirements: [
      'Basic Python fundamentals (or complete our free Python course first)',
      'High school level math (basic algebra and statistics)'
    ],
    targetAudience: [
      'Aspiring Data Analysts and Data Scientists',
      'Engineers wanting to incorporate predictive modeling into applications'
    ],
    modules: [
      {
        id: 'mod-ds-1',
        courseId: 'course-ds-801',
        title: 'Module 1: Exploratory Data Analysis & Advanced SQL',
        order: 1,
        lessons: [
          {
            id: 'les-ds-1',
            moduleId: 'mod-ds-1',
            title: '1. Data Wrangling & Outlier Treatment in Pandas',
            duration: '22:15',
            durationMinutes: 22,
            type: 'video',
            videoUrl: SAMPLE_VIDEOS[3],
            description: 'Techniques for handling missing values, imputations, and normalization.',
            resources: [],
            isPreview: true
          }
        ]
      }
    ]
  },
  {
    id: 'course-biz-901',
    title: 'Startup Scaling & Venture Capital: The Founder Playbook',
    subtitle: 'From zero-to-one validation to Series A funding. Learn product-market fit, pitching to VCs, cap tables, and hiring executives.',
    slug: 'startup-scaling-venture-capital',
    category: 'Business & Entrepreneurship',
    instructorId: 'inst-2',
    instructor: INSTRUCTORS[1],
    thumbnail: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80',
    previewVideoUrl: SAMPLE_VIDEOS[0],
    price: 59.99,
    originalPrice: 149.99,
    discountPercent: 60,
    level: 'Beginner',
    duration: '15.0 hours',
    durationHours: 15.0,
    totalLessons: 38,
    rating: 4.90,
    reviewsCount: 940,
    studentsCount: 13800,
    badge: 'Trending',
    isFeatured: false,
    language: 'English',
    updatedAt: 'October 2026',
    description: 'Avoid the fatal pitfalls that kill 90% of early-stage startups. Discover how seasoned founders validate ideas before writing a single line of code, craft irresistible pitch decks, and negotiate clean term sheets.',
    whatYouWillLearn: [
      'Systematically validate customer demand using concierge tests and pre-sales',
      'Create winning 10-slide pitch decks that secure venture capital meetings',
      'Model capitalization tables, SAFE notes, dilution, and option pools',
      'Build scalable hiring funnels to recruit exceptional founding engineers'
    ],
    requirements: [
      'An entrepreneurial drive and a desire to build a scalable business',
      'No prior business degree required'
    ],
    targetAudience: [
      'First-time and repeat startup founders',
      'Engineers and product builders launching commercial SaaS products'
    ],
    modules: [
      {
        id: 'mod-biz-1',
        courseId: 'course-biz-901',
        title: 'Module 1: Validating Your Billion-Dollar Idea',
        order: 1,
        lessons: [
          {
            id: 'les-biz-1',
            moduleId: 'mod-biz-1',
            title: '1. Customer Discovery Interviews: What to Ask & What to Avoid',
            duration: '18:20',
            durationMinutes: 18,
            type: 'video',
            videoUrl: SAMPLE_VIDEOS[0],
            description: 'The Mom Test framework applied to early enterprise sales.',
            resources: [],
            isPreview: true
          }
        ]
      }
    ]
  },
  {
    id: 'course-gd-1001',
    title: 'Brand Identity & Visual Design Mastery in Illustrator & Photoshop',
    subtitle: 'Create memorable logos, brand identity guidelines, vector illustrations, packaging, and commercial brand assets.',
    slug: 'brand-identity-visual-design',
    category: 'Graphic Design',
    instructorId: 'inst-3',
    instructor: INSTRUCTORS[2],
    thumbnail: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=1200&q=80',
    previewVideoUrl: SAMPLE_VIDEOS[1],
    price: 44.99,
    originalPrice: 119.99,
    discountPercent: 62,
    level: 'All Levels',
    duration: '19.0 hours',
    durationHours: 19.0,
    totalLessons: 44,
    rating: 4.93,
    reviewsCount: 1120,
    studentsCount: 14700,
    badge: 'Trending',
    isFeatured: false,
    language: 'English',
    updatedAt: 'October 2026',
    description: 'Learn the principles of timeless branding, color psychology, grid systems, and typography pairings. Deliver complete client brand manuals that command premium four-figure design fees.',
    whatYouWillLearn: [
      'Master pen tool precision, bezier curves, and pathfinder in Adobe Illustrator',
      'Design iconic logo marks, wordmarks, and responsive visual emblems',
      'Develop complete brand style guidelines (color systems, typography scales, imagery rules)',
      'Create realistic 3D mockups in Photoshop for client presentations'
    ],
    requirements: [
      'Adobe Illustrator and Photoshop (free trial or paid subscription)',
      'Drawing tablet is helpful but not mandatory'
    ],
    targetAudience: [
      'Graphic designers looking to specialize in premium brand identity',
      'Illustrators and creators seeking client-ready commercial skills'
    ],
    modules: [
      {
        id: 'mod-gd-1',
        courseId: 'course-gd-1001',
        title: 'Module 1: Principles of Timeless Brand Design',
        order: 1,
        lessons: [
          {
            id: 'les-gd-1',
            moduleId: 'mod-gd-1',
            title: '1. Logo Marks That Stick: The Golden Ratio & Geometric Symmetry',
            duration: '17:30',
            durationMinutes: 18,
            type: 'video',
            videoUrl: SAMPLE_VIDEOS[1],
            description: 'Why simple geometric silhouettes outperform cluttered ornate graphics.',
            resources: [],
            isPreview: true
          }
        ]
      }
    ]
  },
  {
    id: 'course-pd-1101',
    title: 'High-Impact Executive Leadership, Public Speaking & Negotiation',
    subtitle: 'Communicate with executive presence, lead high-performance teams, resolve conflict, and negotiate career-defining compensation.',
    slug: 'executive-leadership-public-speaking-negotiation',
    category: 'Personal Development',
    instructorId: 'inst-6',
    instructor: INSTRUCTORS[5],
    thumbnail: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1200&q=80',
    previewVideoUrl: SAMPLE_VIDEOS[2],
    price: 39.99,
    originalPrice: 99.99,
    discountPercent: 60,
    level: 'All Levels',
    duration: '11.0 hours',
    durationHours: 11.0,
    totalLessons: 28,
    rating: 4.96,
    reviewsCount: 890,
    studentsCount: 11300,
    badge: 'Trending',
    isFeatured: false,
    language: 'English',
    updatedAt: 'November 2026',
    description: 'Hard skills get you in the door; communication and leadership determine how high you climb. Learn executive presence, persuasive storytelling, and win-win negotiation frameworks tested at boardroom levels.',
    whatYouWillLearn: [
      'Deliver persuasive keynote presentations without fear or cognitive fatigue',
      'Command room presence in executive meetings and high-stakes pitch sessions',
      'Apply principled negotiation strategies to boost salary and contract terms',
      'Lead cross-functional teams with psychological safety and clear accountability'
    ],
    requirements: [
      'Openness to practice verbal exercises and recording yourself for self-critique'
    ],
    targetAudience: [
      'Team leads, engineering managers, and directors aspiring to executive roles',
      'Professionals wanting to speak with undeniable clarity and authority'
    ],
    modules: [
      {
        id: 'mod-pd-1',
        courseId: 'course-pd-1101',
        title: 'Module 1: Mastering Executive Presence & Storytelling',
        order: 1,
        lessons: [
          {
            id: 'les-pd-1',
            moduleId: 'mod-pd-1',
            title: '1. The 3 Pillars of Executive Presence: Gravitas, Communication & Appearance',
            duration: '14:50',
            durationMinutes: 15,
            type: 'video',
            videoUrl: SAMPLE_VIDEOS[2],
            description: 'Practical habits to project warmth, competence, and unshakeable confidence.',
            resources: [],
            isPreview: true
          }
        ]
      }
    ]
  }
];

export const REVIEWS: Review[] = [
  {
    id: 'rev-1',
    courseId: 'course-ai-101',
    userId: 'user-std-1',
    userName: 'Karthik Ramanathan',
    userAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    comment: 'This is hands-down the best AI course on the internet. Dr. Sarah Jenkins breaks down complex multi-agent architectures into crystal clear steps. I deployed our company’s internal RAG agent within two weeks of starting this!',
    createdAt: '3 days ago',
    helpfulCount: 42
  },
  {
    id: 'rev-2',
    courseId: 'course-ai-101',
    userId: 'user-std-2',
    userName: 'Jessica Miller',
    userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    comment: 'The section on LangGraph and structured output alone is worth 10x the price of the course. The code samples are clean, modern, and production-tested.',
    createdAt: '1 week ago',
    helpfulCount: 28
  },
  {
    id: 'rev-3',
    courseId: 'course-web-201',
    userId: 'user-std-3',
    userName: 'Liam O’Connor',
    userAvatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    comment: 'Alex Rivera is an incredible instructor. Learning Next.js 15 Server Components and Stripe webhooks with real error handling gave me the confidence to land my first full-stack role!',
    createdAt: '2 weeks ago',
    helpfulCount: 35
  },
  {
    id: 'rev-4',
    courseId: 'course-ux-301',
    userId: 'user-std-4',
    userName: 'Mia Zhang',
    userAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    comment: 'Elena’s Figma design system workflow completely restructured how our design team works. Everything is tokenized and dev-ready. Essential for any product designer!',
    createdAt: '4 days ago',
    helpfulCount: 19
  }
];

export const TESTIMONIALS = [
  {
    id: 'test-1',
    name: 'Rachel Sterling',
    role: 'Staff Machine Learning Engineer at OpenAI Ecosystem Partner',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    quote: 'EDUVERSITY transformed my career trajectory. The depth of the Autonomous AI Agents curriculum went far beyond generic tutorials into true enterprise software architecture.',
    company: 'NeuralSync Technologies'
  },
  {
    id: 'test-2',
    name: 'David Okafor',
    role: 'Senior Full-Stack Developer at Stripe Partner',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    quote: 'I went from struggling with state management in React to architecting multi-tenant SaaS backends with confidence. The hands-on project reviews gave me a portfolio that recruiters noticed immediately.',
    company: 'Fintech Velocity'
  },
  {
    id: 'test-3',
    name: 'Camilla Valenzuela',
    role: 'Lead Product Designer at HealthTech Labs',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    quote: 'The design systems and Figma masterclass helped me standardize UI components across 40+ engineering squads. Worth every single minute.',
    company: 'OmniHealth Global'
  }
];

export const DEMO_USERS: User[] = [
  {
    id: 'user-demo-student',
    email: 'student@eduversity.com',
    name: 'Jordan Hayes',
    role: 'student',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
    title: 'Aspiring AI & Software Engineer',
    bio: 'Lifelong learner enthusiastic about machine learning systems, full-stack web engineering, and product design.',
    enrolledCourseIds: ['course-ai-101', 'course-free-501'],
    wishlistCourseIds: ['course-web-201', 'course-sec-401'],
    completedCourseIds: ['course-free-501'],
    createdAt: '2026-01-15'
  },
  {
    id: 'user-demo-admin',
    email: 'admin@eduversity.com',
    name: 'Eduversity Administrator',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
    title: 'Platform Operations & Dean',
    bio: 'Platform administration and curriculum oversight lead at EDUVERSITY.',
    enrolledCourseIds: ['course-ai-101', 'course-web-201'],
    wishlistCourseIds: [],
    completedCourseIds: ['course-ai-101'],
    createdAt: '2025-10-01'
  }
];
