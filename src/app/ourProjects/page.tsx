"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Stack,
  Chip,
  Dialog,
  DialogContent,
  IconButton,
  Grow,
  GlobalStyles,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import type { TransitionProps } from "@mui/material/transitions";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CloseIcon from "@mui/icons-material/Close";
import BusinessIcon from "@mui/icons-material/Business";
import CategoryIcon from "@mui/icons-material/Category";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

const GOLD = "#cda06a";
const GOLD_SOFT = "#e8caa0";
const INK = "#0b0b0c";
const CARD_BG = "#131313";
const TEXT = "#f5f4f2";
const TEXT_MUTED = "rgba(245, 244, 242, 0.7)";
const BORDER = "rgba(255,255,255,0.08)";

/* ------------------------------------------------------------------ */
/* Scroll-reveal hook — fades/rises each row in once as it enters view */
/* ------------------------------------------------------------------ */

function useRevealOnScroll<T extends HTMLElement>(threshold = 0.15) {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      const frameId = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(frameId);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -80px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, visible };
}

/* ------------------------------------------------------------------ */
/* Data                                                                */
/* ------------------------------------------------------------------ */

interface Project {
  id: number;
  title: string;
  client: string;
  industry: string;
  duration: string;
  year: string; 
  categories: string[]; // used for filter chips
  tagline: string; // short line shown on the card
  overview: string; // longer paragraph shown in the modal
  highlights: string[];
  techStack: string[];
  image: string;
}

const PROJECTS: Project[] = [
  {
    id: 1,
    title: "Valve Sizing Application",
    client: "Flow Control Commune (FCC)",
    industry: "Valve Manufacturing",
    duration: "2022",
    year: "2022",  
    categories: ["Enterprise Solutions"],
    tagline:
      "An engineering application for control valve sizing, CFD analysis, and noise prediction to support accurate valve selection and performance evaluation.",

    overview:
      "Developed a web-based Valve Sizing Application for Flow Control Commune (FCC), a leading control valve manufacturer in Chennai. The platform enables engineers to perform valve sizing calculations, Computational Fluid Dynamics (CFD) analysis, and noise prediction using industry-standard engineering formulas. Built with Python and Flask, the application simplifies complex engineering calculations, improves sizing accuracy, and assists engineering teams in evaluating valve performance for industrial process applications.",

    highlights: [
      "Automated control valve sizing using engineering calculations",
      "Integrated CFD and noise analysis for valve performance evaluation",
      "Web-based engineering platform built with Python and Flask",
      "Improved engineering accuracy while reducing manual calculation effort",
      "Responsive interface for configuring and validating valve specifications",
    ],

    techStack: ["Python", "Flask", "CFD", "Engineering Calculations"],

    image: "/img/projects/control-valve.webp",
  },
  {
    id: 2,
    title: "Data Normalization",
    client: "Nitto Hydranautics",
    industry: "Water Treatment & Industrial Manufacturing",
    year: "2023 – 2025",  
    duration: "2023 – 2025",
    categories: ["Enterprise Solutions", "Data Engineering"],
    tagline:
      "An engineering platform for water treatment plant configuration, PLC data visualization, and ERP-based operational management.",

    overview:
      "Nitto Hydra Save is an engineering platform developed for Nitto Hydranautics to simplify water treatment plant configuration and operational monitoring. The application enables engineers to configure plant parameters, capture and analyze PLC-generated operational data, and visualize complex metrics through interactive charts and tabular reports. The platform also includes ERP capabilities for managing engineering workflows while providing real-time insights for plant assessment and performance analysis.",

    highlights: [
      "Interactive dashboards with graphical and tabular visualization of PLC operational data",
      "Water treatment plant configuration and engineering workflow management",
      "ERP modules with responsive UI, routing, and comprehensive form validation",
      "Backend API development using Django with reliable frontend integration",
      "Bug fixing, code reviews, and modular architecture for maintainability and scalability",
    ],

    techStack: [
      "Next.js",
      "React Bootstrap",
      "React.js",
      "Python",
      "Django",
      "MySQL",
      "Mongo DB",
    ],
    image: "/img/projects/data-normalaization.webp",
  
  },
  // {
  //   id: 3,
  //   title: "GCP Proof of Concept",
  //   client: "Confidential US Client",
  //   industry: "Enterprise Cloud",
  
  //   duration: "2023",
  //   categories: ["Cloud Solutions"],
  //   tagline:
  //     "A proof of concept demonstrating a Google Cloud migration path for a US company evaluating a move off legacy infrastructure.",
  //   overview:
  //     "Before committing to a full migration, this client wanted evidence that their core workloads would perform well on Google Cloud Platform. We scoped and built a focused proof of concept covering the client's most critical services, benchmarked performance and cost against their existing setup, and documented a migration path the client's internal team could execute against with confidence.",
  //   highlights: [
  //     "Validated feasibility of migrating core workloads to GCP",
  //     "Delivered a cost and performance comparison against the existing setup",
  //     "Produced a migration roadmap for the client's internal engineering team",
  //   ],
  //   techStack: [
  //     "Google Cloud Platform",
  //     "Terraform",
  //     "Kubernetes",
  //     "Cloud SQL",
  //   ],
  //   image: "/img/projects/image_2.jpg",
  // },
  {
    id: 4,
    title: "AI-Powered Document Management Platform",
    client: "US Legal-Tech Startup",
    industry: "Document Management & Automation",
    year: "2024 – 2026",  
    duration: "2024 – 2026",
    categories: ["AI Solutions", "Web Application"],
    tagline:
      "An AI-powered LegalTech platform for intelligent contract analysis, secure document management, and conversational document search.",

    overview:
      "Legaleey is an AI-powered LegalTech SaaS platform built to help legal professionals and businesses securely manage, organize, analyze, and search legal documents. Powered by the LLaMA 4 model and a conversational AI interface, the platform streamlines contract review through intelligent document analysis, custom extraction templates, full-text search, and secure cloud-based document management. The application leverages AWS services for authentication, file storage, and scalable cloud infrastructure while delivering a modern, responsive user experience.",

    highlights: [
      "AI-powered contract analysis using conversational AI and the LLaMA 4 model",
      "Secure document management with cloud-based storage and advanced full-text search",
      "Custom legal extraction templates for faster document review and information retrieval",
      "AWS-powered authentication, secure file uploads, and scalable cloud infrastructure",
      "Responsive full-stack application built with modern web technologies",
    ],

    techStack: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "shadcn/ui",
      "React Context",
      "AWS Amplify",
      "AWS Cognito",
      "AWS S3",
      "AWS Lambda",
      "IAM",
      "Drizzle ORM",
      "Neon PostgreSQL",
      "LLaMA 4",
      "CI/CD",
      "OCR",
    ],

    image: "/img/projects/legaleey.png",
  },
  {
    id: 5,
    title: "Enterprise AI Security Testing & Automation Platform",
    client: "US Cybersecurity Company",
    industry: "Cybersecurity / Test Automation",
    year: "June 2025 – December 2025",  
    duration: "June 2025 – December 2025",
    categories: ["Security", "Enterprise Solutions"],
    tagline:
      "A security testing and automation engagement for an enterprise platform protecting AI-powered web and desktop applications.",
    overview:
      "Contributed to Portal26, an enterprise cybersecurity platform that securely routes application traffic through a local endpoint agent to the GenAI Gateway for proxy-based inspection and prompt logging. The engagement involved validating AI-enabled applications across Windows environments through comprehensive manual testing and Python-based automation using Playwright. Testing covered AI tools such as OpenAI, Claude, Gemini, and GitHub Copilot while ensuring secure traffic routing, prompt logging, and reliable platform behavior.",
    highlights: [
      "Manual testing of AI-powered applications across Chrome, Edge, and Firefox on Windows",
      "Python and Playwright automation framework with reusable, JSON-driven test execution",
      "Validation of prompt logging, security headers, and endpoint traffic routing",
      "GitHub Actions integration with consolidated HTML reporting for automated test execution",
    ],
    techStack: [
      "Python",
      "Playwright",
      "GitHub Actions",
      "Excel",
      "OpenAI",
      "Claude",
      "Gemini",
      "GitHub Copilot",
    ],
    image: "/img/projects/portal-26.webp",
  },
  {
    id: 6,
    title: "Application Security Assessment",
    client: "Indian Banking-Domain IT Company",
    industry: "Banking & Finance / Cybersecurity",
    year: "2025",  
    duration: "2025",
    categories: ["Security", "Enterprise Solutions"],
    tagline:
      "A comprehensive application security assessment covering web, mobile, APIs, and WhatsApp-integrated banking services.",
    overview:
      "Conducted a comprehensive Vulnerability Assessment and Penetration Testing (VAPT) engagement for a banking platform covering up to 20 functional modules across web, Android, iOS, and WhatsApp-integrated services. The assessment focused on identifying security vulnerabilities, validating exploitability, assessing runtime behavior, testing APIs, and delivering prioritized remediation guidance to improve the overall security posture of the banking ecosystem.",
    highlights: [
      "Application security assessment across web, Android, iOS, and WhatsApp platforms",
      "Threat surface analysis, manual penetration testing, and API security validation",
      "Dynamic runtime analysis, security misconfiguration review, and risk categorization",
      "Detailed security reporting with remediation recommendations and retesting support",
    ],
    techStack: [
      "Burp Suite",
      "OWASP ZAP",
      "Nmap",
      "Postman",
      "Mobile Security Testing",
      "J2EE"
    ],
    image: "/img/projects/vapt.webp",
  },
  {
    id: 7,
    title: "Digital Banking Platform Development",
    client: "Indian Banking-Domain IT Company",
    industry: "Banking & Finance",
    year: "2026",  
    duration: "2026",
    categories: ["Enterprise Solutions", "Web Application"],
    tagline:
      "An enterprise banking application developed to support secure digital banking operations and customer-facing financial services.",
    overview:
      "Worked as an extended engineering team to develop and enhance an enterprise digital banking platform. The engagement focused on building scalable banking modules, integrating secure backend services, improving user experience, and delivering features aligned with the client's product roadmap and banking compliance standards.",
    highlights: [
      "Development of enterprise banking modules and customer-facing features",
      "Secure backend integration with scalable application architecture",
      "Responsive web interfaces for banking operations and administration",
      "Continuous feature enhancements, testing, and production support",
    ],
    techStack: ["J2EE", "Spring Boot", "Oracle Database", "Angular"],
    image: "/img/projects/bank.webp",
  },
  {
    id: 8,
    title: "Industrial Engineering Corporate Website",
    client: "Bhaskara Energy System LLP",
    industry: "Industrial Engineering & Process Equipment",
    year: "2023",  
    duration: "Corporate Website",
    categories: ["Web Application"],
    tagline:
      "A professional corporate website showcasing expertise in process equipment, application engineering, CFD analysis, and industrial solutions for critical process industries.",
    overview:
      "Bhaskara Energy System LLP required a modern corporate website to strengthen its digital presence and showcase over 25 years of expertise in supplying process equipment for petroleum refineries, petrochemical, chemical, fertilizer, food, and other industrial sectors. The website highlights the company's engineering capabilities, represented global brands, CFD services, industry expertise, and end-to-end support—from application engineering and commissioning to customer training and after-sales service.",
    highlights: [
      "Professional presentation of industrial solutions and engineering expertise",
      "Dedicated sections for services, CFD analysis, industries served, and represented global brands",
      "Responsive, user-friendly design optimized for desktop, tablet, and mobile devices",
      "Clear navigation with structured company, service, and client information",
      "Built to strengthen the company's digital presence and generate business enquiries",
    ],
    techStack: ["HTML5", "CSS3", "Bootstrap 5", "JavaScript"],
    image: "/img/projects/baskara.png",
  },
  {
    id: 9,
    title: "IT Infrastructure & Cloud Services Website",
    client: "SpudWeb",
    industry: "IT Infrastructure & Cloud Services",
    year: "2025",  
    duration: "Corporate Website",
    categories: ["Web Application"],
    tagline:
      "A technology-focused on 5C Framework—Components, Cloud, Connectivity, Consulting, and Cybersecurity—with a clean, modern user experience.",
    overview:
      "SpudWeb required a responsive corporate website to highlight its technology solutions, service offerings, industry expertise, and trusted partnerships. The website was designed with a clean, modern interface that strengthens the company's digital presence while making it easy for visitors to explore services and contact the team.",
    highlights: [
      "Professional corporate website showcasing IT infrastructure and cloud services",
      "Responsive design optimized for desktop, tablet, and mobile devices",
      "Service-focused layout with clear navigation and engaging user experience",
      "Modern UI aligned with the company's technology-driven brand identity",
      "Fast-loading static website with clean and maintainable code",
    ],
    techStack: ["HTML5", "CSS3", "Bootstrap 5", "JavaScript"],
    image: "/img/projects/spudweb2.png",
  },
  {
    id: 10,
    title: "E-Commerce Food Ordering Platform",
    client: "Menmai Foods",
    year: "2026",
    industry: "E-Commerce — Food Retail",
      
    duration: "Website",
    categories: ["Web Application"],
    tagline:
      "An e-commerce storefront for food retail, built for browsing, ordering, and fast checkout on any device.",
    overview:
      "MenmaiFoods needed an online store that felt as good as walking into the shop — clear product presentation, fast browsing, and a checkout flow with no friction. We built a full e-commerce platform covering catalog management, cart and checkout, and order tracking, backed by an admin panel the team runs day to day.",
    highlights: [
      "Full storefront with catalog, cart, and secure checkout",
      "Order tracking and notifications from purchase to delivery",
      "Admin panel for inventory, pricing, and promotions",
    ],
    techStack: ["Next.js","Material UI", "TypeScript", "MySQL", "Prisma"],
    image: "/img/projects/e-commerce.png",
  },
];

const FILTERS = [
  "All Projects",
  "Web Application",
  "Enterprise Solutions",
  "AI Solutions",
  // "Cloud Solutions",
  "Data Engineering",
  "Security",
];

/* ------------------------------------------------------------------ */
/* Modal transition — soft grow instead of MUI's default snap-fade      */
/* ------------------------------------------------------------------ */

const ModalTransition = React.forwardRef(function ModalTransition(
  props: TransitionProps & { children: React.ReactElement },
  ref: React.Ref<unknown>,
) {
  return <Grow ref={ref} timeout={320} {...props} />;
});

/* ------------------------------------------------------------------ */
/* Project detail modal                                               */
/* ------------------------------------------------------------------ */

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  if (!project) return null;

  return (
    <Dialog
      open={Boolean(project)}
      onClose={onClose}
      fullScreen={fullScreen}
      maxWidth="sm"
      fullWidth
      keepMounted
      slots={{ transition: ModalTransition }}
      slotProps={{
        paper: {
          sx: {
            bgcolor: CARD_BG,
            backgroundImage: "none",
            borderRadius: fullScreen ? 0 : "16px",
            border: `1px solid ${BORDER}`,
          },
        },
      }}
    >
      <IconButton
        onClick={onClose}
        aria-label="Close"
        sx={{
          position: "absolute",
          top: 12,
          right: 12,
          zIndex: 2,
          color: TEXT,
          bgcolor: "rgba(255,255,255,0.06)",
          "&:hover": { bgcolor: "rgba(255,255,255,0.12)" },
        }}
      >
        <CloseIcon fontSize="small" />
      </IconButton>

      <Box
        component="img"
        src={project.image}
        alt=""
        aria-hidden="true"
        sx={{
          width: "100%",
          height: { xs: 160, sm: 200 },
          objectFit: "cover",
          display: "block",
          animation: "modalImageIn 0.6s ease-out both",
        }}
      />

      <DialogContent sx={{ p: { xs: 3, sm: 4 } }}>
        <Stack
          spacing={1}
          sx={{ mb: 2, animation: "fadeUp 0.5s ease-out 0.05s both" }}
        >
          <Stack
            direction="row"
            spacing={1}
            useFlexGap
            sx={{ flexWrap: "wrap" }}
          >
            {project.categories.map((c) => (
              <Chip
                key={c}
                label={c}
                size="small"
                sx={{
                  bgcolor: "rgba(205,160,106,0.12)",
                  color: GOLD_SOFT,
                  fontWeight: 600,
                  fontSize: 11.5,
                  letterSpacing: "0.02em",
                }}
              />
            ))}
          </Stack>
          <Typography
            component="h2"
            sx={{
              fontFamily: "'Poppins','Segoe UI',system-ui,sans-serif",
              fontWeight: 600,
              fontSize: { xs: 24, sm: 28 },
              color: TEXT,
            }}
          >
            {project.title}
          </Typography>
        </Stack>

        <Stack
          spacing={1.2}
          sx={{ mb: 3, animation: "fadeUp 0.5s ease-out 0.1s both" }}
        >
          <Stack direction="row" spacing={1.2} sx={{ alignItems: "center" }}>
            <BusinessIcon sx={{ fontSize: 18, color: GOLD }} />
            <Typography sx={{ fontSize: 14, color: TEXT_MUTED }}>
              <Box component="span" sx={{ color: TEXT, fontWeight: 600 }}>
                {project.client}
              </Box>
            </Typography>
          </Stack>
          <Stack direction="row" spacing={1.2} sx={{ alignItems: "center" }}>
            <CategoryIcon sx={{ fontSize: 18, color: GOLD }} />
            <Typography sx={{ fontSize: 14, color: TEXT_MUTED }}>
              {project.industry}
            </Typography>
          </Stack>
          <Stack direction="row" spacing={1.2} sx={{ alignItems: "center" }}>
            <CalendarMonthIcon sx={{ fontSize: 18, color: GOLD }} />
            <Typography sx={{ fontSize: 14, color: TEXT_MUTED }}>
              {project.duration}
            </Typography>
          </Stack>
        </Stack>

        <Typography
          sx={{
            fontSize: 14.5,
            lineHeight: 1.75,
            color: TEXT_MUTED,
            mb: 3,
            animation: "fadeUp 0.5s ease-out 0.15s both",
          }}
        >
          {project.overview}
        </Typography>

        <Typography
          sx={{
            fontSize: 12.5,
            fontWeight: 700,
            letterSpacing: "0.1em",
            color: GOLD,
            mb: 1.2,
            animation: "fadeUp 0.5s ease-out 0.2s both",
          }}
        >
          KEY HIGHLIGHTS
        </Typography>
        <Stack
          spacing={1}
          sx={{ mb: 3, animation: "fadeUp 0.5s ease-out 0.22s both" }}
        >
          {project.highlights.map((h, i) => (
            <Stack
              key={i}
              direction="row"
              spacing={1.2}
              sx={{ alignItems: "flex-start" }}
            >
              <Box
                sx={{
                  mt: "7px",
                  width: 5,
                  height: 5,
                  flexShrink: 0,
                  borderRadius: "50%",
                  bgcolor: GOLD,
                }}
              />
              <Typography
                sx={{ fontSize: 14, lineHeight: 1.6, color: TEXT_MUTED }}
              >
                {h}
              </Typography>
            </Stack>
          ))}
        </Stack>

        <Typography
          sx={{
            fontSize: 12.5,
            fontWeight: 700,
            letterSpacing: "0.1em",
            color: GOLD,
            mb: 1.2,
            animation: "fadeUp 0.5s ease-out 0.26s both",
          }}
        >
          TECH STACK
        </Typography>
        <Stack
          direction="row"
          spacing={1}
          useFlexGap
          sx={{ animation: "fadeUp 0.5s ease-out 0.3s both", flexWrap: "wrap" }}
        >
          {project.techStack.map((t) => (
            <Chip
              key={t}
              label={t}
              size="small"
              sx={{
                bgcolor: "rgba(255,255,255,0.05)",
                color: TEXT,
                border: `1px solid ${BORDER}`,
                fontSize: 12,
                mb: 1,
              }}
            />
          ))}
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

/* ------------------------------------------------------------------ */
/* Project row (alternating image/text)                                */
/* ------------------------------------------------------------------ */

interface ProjectRowProps {
  project: Project;
  index: number;
  onKnowMore: (p: Project) => void;
}

const ProjectRow: React.FC<ProjectRowProps> = ({
  project,
  index,
  onKnowMore,
}) => {
  const imageFirst = index % 2 === 0;
  const { ref, visible } = useRevealOnScroll<HTMLDivElement>();

  const ImageBlock = (
    <Box
      className="project-image-frame"
      sx={{
        borderRadius: "12px",
        overflow: "hidden",
        border: `1px solid ${BORDER}`,
        bgcolor: "#000",
        boxShadow: "0 20px 40px rgba(0,0,0,0.35)",
        transition: "box-shadow 0.4s ease, border-color 0.4s ease",
      }}
    >
      <Box
        component="img"
        src={project.image}
        alt={`${project.title} preview`}
        sx={{
          width: "100%",
          height: { xs: 220, sm: 280, md: 320 },
          objectFit: "cover",
          objectPosition: "top center",
          display: "block",
          transition: "transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
          ".project-row:hover &": {
            transform: "scale(1.06)",
          },
        }}
      />
    </Box>
  );

  const TextBlock = (
    <Stack spacing={1.5} sx={{ height: "100%", justifyContent: "center" }}>
      <Typography
        component="h3"
        sx={{
          fontFamily: "'Poppins','Segoe UI',system-ui,sans-serif",
          fontWeight: 600,
          fontSize: { xs: 24, sm: 27 },
          color: TEXT,
        }}
      >
        {project.title}
      </Typography>
      <Typography
        sx={{
          fontSize: 12.5,
          fontWeight: 600,
          letterSpacing: "0.03em",
          color: GOLD_SOFT,
        }}
      >
        {project.industry}
      </Typography>
       <Typography
        sx={{
          fontSize: 12.5,
          fontWeight: 600,
          letterSpacing: "0.03em",
          color: GOLD_SOFT,
        }}
      >
        {project.year}
      </Typography>
      <Typography
        sx={{
          fontSize: 14.5,
          lineHeight: 1.7,
          color: TEXT_MUTED,
          maxWidth: 480,
        }}
      >
        {project.tagline}
      </Typography>
      <Stack
        direction="row"
        spacing={1}
        useFlexGap
        sx={{ pt: 0.5, flexWrap: "wrap" }}
      >
        {project.techStack.slice(0, 20).map((t) => (
          <Chip
            key={t}
            label={t}
            size="small"
            sx={{
              bgcolor: "rgba(255,255,255,0.05)",
              color: TEXT,
              border: `1px solid ${BORDER}`,
              fontSize: 11.5,
              transition:
                "background-color 0.25s ease, border-color 0.25s ease, transform 0.25s ease",
              "&:hover": {
                bgcolor: "rgba(205,160,106,0.12)",
                borderColor: "rgba(205,160,106,0.4)",
                transform: "translateY(-1px)",
              },
            }}
          />
        ))}
      </Stack>
      {/* <Box sx={{ pt: 1 }}>
        <Button
          onClick={() => onKnowMore(project)}
          endIcon={
            <ArrowForwardIcon
              className="know-more-arrow"
              sx={{
                transition: "transform 0.3s cubic-bezier(0.22, 1, 0.36, 1)",
              }}
            />
          }
          sx={{
            px: 3,
            py: 1.1,
            borderRadius: "10px",
            textTransform: "none",
            fontFamily: "'Poppins','Segoe UI',system-ui,sans-serif",
            fontWeight: 600,
            fontSize: 14,
            color: "#1a1408",
            background: `linear-gradient(135deg, ${GOLD_SOFT}, ${GOLD})`,
            boxShadow: "0 8px 24px rgba(205,160,106,0.22)",
            transition:
              "box-shadow 0.3s ease, transform 0.3s ease, background 0.3s ease",
            "&:hover": {
              background: `linear-gradient(135deg, ${GOLD}, ${GOLD_SOFT})`,
              boxShadow: "0 10px 28px rgba(205,160,106,0.32)",
              transform: "translateY(-2px)",
              "& .know-more-arrow": {
                transform: "translateX(4px)",
              },
            },
          }}
        >
          Know More
        </Button>
      </Box> */}
    </Stack>
  );

  return (
    <Box
      ref={ref}
      className="project-row"
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
        gap: { xs: 3, md: 6 },
        alignItems: "center",
        py: { xs: 3, md: 5 },
        borderBottom: `1px solid ${BORDER}`,
        "&:last-of-type": { borderBottom: "none" },
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(36px)",
        transition:
          "opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1), transform 0.7s cubic-bezier(0.22, 1, 0.36, 1)",
        transitionDelay: visible ? `${Math.min(index, 4) * 0.08}s` : "0s",
        "&:hover .project-image-frame": {
          boxShadow: "0 24px 48px rgba(205,160,106,0.18)",
          borderColor: "rgba(205,160,106,0.35)",
        },
      }}
    >
      {/* On desktop, alternate which side the image sits on.
          On mobile, image always comes first regardless of index. */}
      <Box
        sx={{
          order: { xs: 1, md: imageFirst ? 1 : 2 },
          overflow: "hidden",
          borderRadius: "12px",
        }}
      >
        {ImageBlock}
      </Box>
      <Box sx={{ order: { xs: 2, md: imageFirst ? 2 : 1 } }}>{TextBlock}</Box>
    </Box>
  );
};

/* ------------------------------------------------------------------ */
/* Page                                                                 */
/* ------------------------------------------------------------------ */

const OurProjects: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>("All Projects");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = useMemo(() => {
    if (activeFilter === "All Projects") return PROJECTS;
    return PROJECTS.filter((p) => p.categories.includes(activeFilter));
  }, [activeFilter]);

  return (
    <Box
      component="section"
      sx={{
        bgcolor: INK,
        width: "100%",
        pt: { xs: 10, md: 13 }, // reduced top padding
        pb: { xs: 7, md: 6 }, // keep bottom padding
      }}
    >
      <GlobalStyles
        styles={{
          "@keyframes fadeUp": {
            "0%": { opacity: 0, transform: "translateY(14px)" },
            "100%": { opacity: 1, transform: "translateY(0)" },
          },
          "@keyframes modalImageIn": {
            "0%": { opacity: 0, transform: "scale(1.08)" },
            "100%": { opacity: 1, transform: "scale(1)" },
          },
        }}
      />
      <Container maxWidth="lg" sx={{ px: { xs: 3, sm: 4 } }}>
        {/* Header */}
        <Box sx={{ width: "100%", textAlign: "center", mb: { xs: 4, md: 6 } }}>
          <Stack
            spacing={2}
            sx={{ width: "100%", alignItems: "center", textAlign: "center" }}
          >
            <Stack
              direction="row"
              spacing={1.5}
              sx={{ alignItems: "center", justifyContent: "center" }}
            >
              <Box sx={{ width: 28, height: 2, bgcolor: GOLD }} />
              <Typography
                sx={{
                  fontFamily: "'Poppins','Segoe UI',system-ui,sans-serif",
                  fontSize: 13,
                  fontWeight: 600,
                  letterSpacing: "0.22em",
                  color: GOLD,
                }}
              >
                OUR WORK
              </Typography>
              <Box sx={{ width: 28, height: 2, bgcolor: GOLD }} />
            </Stack>
            <Typography
              component="h1"
              sx={{
                m: 0,
                width: "100%",
                textAlign: "center",
                fontFamily: "'Poppins','Segoe UI',system-ui,sans-serif",
                fontWeight: 600,
                fontSize: { xs: 34, sm: 42, md: 48 },
                color: TEXT,
              }}
            >
              Our{" "}
              <Box component="span" sx={{ color: GOLD_SOFT }}>
                Projects
              </Box>
            </Typography>
            <Typography
              sx={{
                width: "100%",
                textAlign: "center",
                fontSize: { xs: 14.5, md: 16 },
                color: TEXT_MUTED,
                maxWidth: 520,
                mx: "auto",
              }}
            >
              Real engagements across manufacturing, banking, AI, and cloud —
              delivered for clients in India and the US.
            </Typography>
          </Stack>
        </Box>

        {/* Filters */}
        <Box
          sx={{
            display: "flex",
            gap: 1.2,
            overflowX: { xs: "auto", md: "visible" },
            flexWrap: { xs: "nowrap", md: "wrap" },
            justifyContent: { md: "center" },
            pb: { xs: 1, md: 0 },
            mb: { xs: 3, md: 3 },
            "&::-webkit-scrollbar": { display: "none" },
          }}
        >
          {FILTERS.map((f) => {
            const active = f === activeFilter;
            return (
              <Chip
                key={f}
                label={f}
                onClick={() => setActiveFilter(f)}
                sx={{
                  flexShrink: 0,
                  px: 1,
                  py: 2.2,
                  fontSize: 13,
                  fontWeight: 600,
                  color: active ? "#1a1408" : TEXT,
                  bgcolor: active ? GOLD : "rgba(255,255,255,0.04)",
                  border: `1px solid ${active ? GOLD : BORDER}`,
                  transition:
                    "background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease, transform 0.2s ease",
                  "&:hover": {
                    bgcolor: active ? GOLD : "rgba(255,255,255,0.08)",
                    transform: "translateY(-1px)",
                  },
                  "&:active": {
                    transform: "translateY(0) scale(0.97)",
                  },
                }}
              />
            );
          })}
        </Box>

        {/* Project list */}
        <Box>
          {filteredProjects.map((project, i) => (
            <ProjectRow
              key={project.id}
              project={project}
              index={i}
              onKnowMore={setSelectedProject}
            />
          ))}
        </Box>
      </Container>

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </Box>
  );
};

export default OurProjects;
