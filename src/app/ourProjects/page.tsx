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

const PLACEHOLDER_IMG = "/img/contact/hero-bg1.png";

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
    title: "Sizing Software",
    client: "FCC",
    industry: "Valve Manufacturing (India)",
    duration: "2022",
    categories: ["Enterprise Solutions"],
    tagline:
      "An engineering sizing tool that helps valve manufacturing teams calculate and validate specifications faster and with fewer errors.",
    overview:
      "FCC needed a way to move valve sizing calculations out of scattered spreadsheets and into a single, reliable tool their engineers could trust. We built a desktop-friendly sizing application that encodes the manufacturer's own engineering formulas, validates inputs as they're entered, and produces consistent, exportable sizing reports — cutting down the manual back-and-forth between engineering and sales teams.",
    highlights: [
      "Replaced spreadsheet-based sizing calculations with a validated, repeatable workflow",
      "Built-in checks catch invalid input combinations before they reach a quote",
      "Exportable reports standardized across the engineering team",
    ],
    techStack: [".NET", "C#", "SQL Server", "WinForms"],
    image: PLACEHOLDER_IMG,
  },
  {
    id: 2,
    title: "Data Normalization Platform",
    client: "Nitto",
    industry: "RO Membrane Manufacturing (MNC)",
    duration: "2023 – 2025",
    categories: ["Data Engineering", "Enterprise Solutions"],
    tagline:
      "A large-scale data normalization pipeline that reconciles manufacturing data across regions into one consistent, query-ready format.",
    overview:
      "Nitto's RO membrane manufacturing operations produced data across multiple regional systems, each with its own formats, units, and naming conventions. Over a multi-year engagement, we designed and progressively expanded a normalization pipeline that ingests raw manufacturing and quality data, reconciles it against a shared schema, and makes it queryable for reporting and analytics teams — without requiring the source systems themselves to change.",
    highlights: [
      "Unified data from multiple regional plants into one consistent schema",
      "Pipeline built to scale as new data sources were added over the engagement",
      "Reduced manual reconciliation work for downstream reporting teams",
    ],
    techStack: ["Python", "Apache Airflow", "PostgreSQL", "AWS"],
    image: PLACEHOLDER_IMG,
  },
  {
    id: 3,
    title: "GCP Proof of Concept",
    client: "Confidential US Client",
    industry: "Enterprise Cloud",
    duration: "2023",
    categories: ["Cloud Solutions"],
    tagline:
      "A proof of concept demonstrating a Google Cloud migration path for a US company evaluating a move off legacy infrastructure.",
    overview:
      "Before committing to a full migration, this client wanted evidence that their core workloads would perform well on Google Cloud Platform. We scoped and built a focused proof of concept covering the client's most critical services, benchmarked performance and cost against their existing setup, and documented a migration path the client's internal team could execute against with confidence.",
    highlights: [
      "Validated feasibility of migrating core workloads to GCP",
      "Delivered a cost and performance comparison against the existing setup",
      "Produced a migration roadmap for the client's internal engineering team",
    ],
    techStack: [
      "Google Cloud Platform",
      "Terraform",
      "Kubernetes",
      "Cloud SQL",
    ],
    image: PLACEHOLDER_IMG,
  },
  {
    id: 4,
    title: "Legaleey",
    client: "US Legal-Tech Startup",
    industry: "Legal Technology / AI",
    duration: "2024 – 2026",
    categories: ["AI Solutions", "Web Application"],
    tagline:
      "An AI-powered legal product for case tracking, document management, and client communication built for a US legal-tech startup.",
    overview:
      "Legaleey set out to give legal teams a single system for managing cases, documents, billing, and client communication, backed by AI assistance rather than bolted onto it. As an ongoing engagement, we've built out the core case and document management platform and are progressively layering in AI-assisted document review and workflow automation as the product matures.",
    highlights: [
      "Centralized case tracking, document management, and billing in one platform",
      "AI-assisted document review layered into existing legal workflows",
      "Built as a long-term, iteratively evolving product rather than a one-off delivery",
    ],
    techStack: ["Next.js", "TypeScript", "Prisma", "MySQL", "AWS"],
    image: PLACEHOLDER_IMG,
  },
  {
    id: 5,
    title: "Portal26",
    client: "US Cybersecurity Company",
    industry: "Cybersecurity / QA Automation",
    duration: "2025",
    categories: ["AI Solutions", "Enterprise Solutions"],
    tagline:
      "AI-assisted test automation tooling built for a US cybersecurity company to speed up and broaden their QA coverage.",
    overview:
      "This cybersecurity company needed to expand automated test coverage without proportionally expanding their QA team. We built AI-assisted automation tooling that generates and maintains test cases from existing product flows, flags flaky or redundant tests, and integrates directly into their existing CI pipeline.",
    highlights: [
      "AI-assisted generation and maintenance of automated test cases",
      "Integrated directly into the client's existing CI/CD pipeline",
      "Reduced manual effort required to keep test coverage current",
    ],
    techStack: ["Python", "Playwright", "OpenAI API", "GitHub Actions"],
    image: PLACEHOLDER_IMG,
  },
  {
    id: 6,
    title: "VAPT Security Assessment",
    client: "Indian Banking-Domain IT Company",
    industry: "Banking & Finance / Security",
    duration: "2025",
    categories: ["Security", "Enterprise Solutions"],
    tagline:
      "A vulnerability assessment and penetration testing engagement for a banking-domain IT company in India.",
    overview:
      "Ahead of a compliance milestone, this banking-domain IT company needed an independent security assessment of their applications and infrastructure. We conducted a structured VAPT engagement — covering application, network, and infrastructure layers — and delivered a prioritized remediation report the client's internal security team used to close out findings ahead of their deadline.",
    highlights: [
      "Full VAPT coverage across application, network, and infrastructure layers",
      "Findings prioritized by severity and exploitability, not just raw count",
      "Remediation guidance delivered in a format the internal team could act on directly",
    ],
    techStack: ["Burp Suite", "Nmap", "Metasploit", "OWASP ZAP"],
    image: PLACEHOLDER_IMG,
  },
  {
    id: 7,
    title: "Banking Product Outsourcing",
    client: "Indian Banking-Domain IT Company",
    industry: "Banking & Finance",
    duration: "2026",
    categories: ["Enterprise Solutions", "Web Application"],
    tagline:
      "An outsourced product development engagement supporting a banking-domain IT company's product roadmap.",
    overview:
      "This engagement covers outsourced development for a banking product line, with our team working as an extension of the client's own to deliver features against their existing roadmap and compliance requirements — from planning through delivery.",
    highlights: [
      "Working as an extension of the client's product and engineering teams",
      "Delivery aligned to the client's existing banking compliance requirements",
      "Ongoing engagement covering planning through release",
    ],
    techStack: ["Java", "Spring Boot", "Oracle DB", "Angular"],
    image: PLACEHOLDER_IMG,
  },
  {
    id: 8,
    title: "Baskara Energy",
    client: "Baskara Energy",
    industry: "Renewable Energy",
    duration: "Website",
    categories: ["Web Application"],
    tagline:
      "A corporate website for a renewable energy company, built to present their services and projects clearly to prospective clients.",
    overview:
      "Baskara Energy needed a web presence that reflected the scale and credibility of their renewable energy projects. We designed and built a corporate website covering their services, project portfolio, and company information, with a content structure their team can update independently.",
    highlights: [
      "Clear presentation of services and project portfolio",
      "Content structure the client's team can update without developer support",
      "Fast-loading, responsive design across devices",
    ],
    techStack: ["Next.js", "Tailwind CSS", "Strapi", "Vercel"],
    image: PLACEHOLDER_IMG,
  },
  {
    id: 9,
    title: "SpudWeb",
    client: "SpudWeb",
    industry: "Food & Restaurant",
    duration: "Website",
    categories: ["Web Application"],
    tagline:
      "A restaurant-facing website for SpudWeb, presenting their menu, ordering information, and brand online.",
    overview:
      "SpudWeb needed a website that matched the experience of their food brand — clear menu presentation, straightforward ordering information, and a design that felt as inviting online as the food itself.",
    highlights: [
      "Menu and ordering information presented clearly for customers",
      "Design built to reflect the SpudWeb brand identity",
      "Fully responsive across mobile and desktop",
    ],
    techStack: ["Next.js", "Tailwind CSS", "Node.js"],
    image: PLACEHOLDER_IMG,
  },
  {
    id: 10,
    title: "Rumango",
    client: "Rumango",
    industry: "Web Application",
    duration: "Website",
    categories: ["Web Application"],
    tagline: "A website engagement delivered for Rumango.",
    overview:
      "As part of our web application work, we delivered a website engagement for Rumango, covering the design and development of their online presence.",
    highlights: [
      "Custom website design and development",
      "Responsive layout across devices",
    ],
    techStack: ["Next.js", "Tailwind CSS"],
    image: PLACEHOLDER_IMG,
  },
];

const FILTERS = [
  "All Projects",
  "Web Application",
  "Enterprise Solutions",
  "AI Solutions",
  "Cloud Solutions",
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
        {project.techStack.slice(0, 4).map((t) => (
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
      <Box sx={{ pt: 1 }}>
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
      </Box>
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
        pt: { xs: 10, md: 13 },   // reduced top padding
        pb: { xs: 7, md: 6 },   // keep bottom padding
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
