"use client";

import { Box, Container, Stack, Typography, Button } from "@mui/material";

import BrushRounded from "@mui/icons-material/BrushRounded";
import CodeRounded from "@mui/icons-material/CodeRounded";
import PhoneIphoneRounded from "@mui/icons-material/PhoneIphoneRounded";
import ShieldRounded from "@mui/icons-material/ShieldRounded";
import PestControlIcon from "@mui/icons-material/PestControl";
import CampaignRounded from "@mui/icons-material/CampaignRounded";

// ---------------------------------------------------------------------------
// Palette — black / white / ash only
// ---------------------------------------------------------------------------
const BORDER = "rgba(255,255,255,0.09)";

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const services = [
  {
    icon: BrushRounded,
    title: "Web Design",
    desc: "Create stunning, user-centric designs that engage and inspire. Our UI/UX experts craft responsive and brand-aligned visuals that work across all devices.",
    items: [
      "UI/UX Design (Figma, Adobe XD)",
      "Mobile & Responsive Design",
      "Wireframing & Prototyping (Balsamiq)",
      "Branding and Visual Identity (Adobe Illustrator, Canva)",
    ],
  },
  {
    icon: CodeRounded,
    title: "Web Application Development",
    desc: "We build robust, scalable websites using clean code and modern tools — from landing pages to full-stack apps tailored to your business needs.",
    items: [
      "Frontend (React, Angular)",
      "Backend (Node.js, Django)",
      "CMS Integration",
      "API Development",
    ],
  },
  {
    icon: PhoneIphoneRounded,
    title: "Mobile App Development",
    desc: "From concept to deployment, we build high-performance mobile apps that scale. Native or cross-platform, we tailor apps to your business goals.",
    items: [
      "Android & iOS Development",
      "Flutter, React Native",
      "API Integration",
      "Store Deployment",
    ],
  },
  {
    icon: ShieldRounded,
    title: "Cybersecurity",
    desc: "Protect your digital assets with our robust cybersecurity solutions. We offer proactive threat detection, compliance consulting, and vulnerability assessments.",
    items: ["VAPT, DAST & SAST", " ISO 27001 Compliance", "Risk Consulting"],
  },
  {
    icon: PestControlIcon,
    title: "Testing & QA",
    desc: "We ensure your app is flawless before launch with manual and automated testing for performance, bugs, and cross-device compatibility.",
    items: [
      "Functional & Regression Testing",
      "Cross-Device Testing",
      "Performance Testing",
      "Automation (Selenium, Cypress)",
    ],
  },
  {
    icon: CampaignRounded,
    title: "Digital Marketing",
    desc: "Boost visibility and drive conversions with data-driven strategies.",
    items: ["SEO & SMM", "Google & Meta Ads", "Content & Email Marketing"],
  },
];

type Service = (typeof services)[number];

// ---------------------------------------------------------------------------
// Section header
// ---------------------------------------------------------------------------

function SectionHeader() {
  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          px: { xs: 2, sm: 3, md: 0 },
        }}
      >
        {/* Eyebrow */}
        <Stack
          direction="row"
          spacing={1.25}
          sx={{
            mb: { xs: 1.5, md: 1.75 },
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Stack direction="row" sx={{ alignItems: "center" }} spacing={0.75}>
            <Box
              sx={{
                width: { xs: 28, sm: 40, md: 60 },
                height: "1px",
                background: `linear-gradient(to right, transparent, var(--GOLD) 55%, transparent)`,
              }}
            />
          </Stack>

          <Typography
            sx={{
              fontSize: { xs: 11, sm: 12, md: 13 },
              fontWeight: 700,
              letterSpacing: { xs: 1.5, md: 2 },
              color: "var(--GOLD)",
              textTransform: "uppercase",
              whiteSpace: "nowrap",
            }}
          >
            Our Services
          </Typography>

          <Box
            sx={{
              width: { xs: 28, sm: 40, md: 60 },
              height: "1px",
              background: `linear-gradient(to right, transparent, var(--GOLD) 45%, transparent)`,
            }}
          />
        </Stack>

        {/* Heading */}
        <Typography
          align="center"
          sx={{
            width: "100%",
            fontWeight: 800,
            fontSize: { xs: 26, sm: 34, md: 44 },
            letterSpacing: -0.5,
            lineHeight: 1.15,
            color: "var(--TEXT)",
            mb: { xs: 1, md: 1.5 },
          }}
        >
          Solutions Designed for{" "}
          <Box
            component="span"
            sx={{
              color: "var(--GOLD_SOFT)",
            }}
          >
            Your Success
          </Box>
        </Typography>

        {/* Subtitle */}
        <Typography
          align="center"
          sx={{
            fontSize: { xs: 14, sm: 15, md: 16 },
            color: "rgba(245, 244, 242, 0.72)",
            maxWidth: 520,
            mx: "auto",
            lineHeight: 1.6,
          }}
        >
          We deliver end-to-end digital solutions to help your business
          innovate, grow and stay ahead.
        </Typography>
      </Box>
    </Container>
  );
}

// ---------------------------------------------------------------------------
// Service card
// ---------------------------------------------------------------------------

function ServiceCard({ service }: { service: Service }) {
  const Icon = service.icon;

  return (
    <Box
      sx={{
        height: "100%",
        boxSizing: "border-box",
        p: 3,
        borderRadius: 3,
        border: "1px solid",
        borderColor: BORDER,
        bgcolor: "var(--PANEL)",
        transition:
          "background-color 0.25s ease, border-color 0.25s ease, transform 0.25s ease",
        cursor: "pointer",
        "&:hover": {
          boxShadow: "0 16px 32px rgba(17,24,39,0.14)",
          borderColor: "var(--GOLD)",
          transform: "translateY(-4px)",
        },
      }}
    >
      <Stack
        direction="row"
        spacing={1.75}
        sx={{ mb: 2, alignItems: "center" }}
      >
        <Box
          className="service-icon"
          sx={{
            width: 45,
            height: 45,
            borderRadius: 2.5,
            bgcolor: "rgba(205, 160, 106, 0.10)",
            border: "1px solid rgba(205, 160, 106, 0.35)",
            color: "var(--GOLD)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            transition: "background-color 0.25s ease, color 0.25s ease",
          }}
        >
          <Icon fontSize="medium" />
        </Box>

        <Box sx={{ minWidth: 0 }}>
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: 17,
              lineHeight: 1.3,
              color: "var(--TEXT)",
            }}
          >
            {service.title}
          </Typography>
        </Box>
      </Stack>

      <Typography
        sx={{
          fontSize: 13.5,
          color: "#CED4DA",
          lineHeight: 1.55,
          mb: 2.25,
        }}
      >
        {service.desc}
      </Typography>

      <Typography
        sx={{
          fontSize: 11.5,
          fontWeight: 700,
          letterSpacing: 0.8,
          color: "var(--TEXT)",
          textTransform: "uppercase",
          mb: 1.25,
        }}
      >
        What We Offer:
      </Typography>

      <Stack spacing={0.9}>
        {service.items.map((item) => (
          <Stack
            key={item}
            direction="row"
            spacing={1}
            sx={{ alignItems: "center" }}
          >
            <Box
              sx={{
                width: 4,
                height: 4,
                borderRadius: "50%",
                bgcolor: "var(--GOLD_SOFT)",
                mt: "8px",
                flexShrink: 0,
              }}
            />
            <Typography
              sx={{ fontSize: 13, color: "#CED4DA", lineHeight: 1.5 }}
            >
              {item}
            </Typography>
          </Stack>
        ))}
      </Stack>
    </Box>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export default function OurServices() {
  return (
    <Box
      id="services"
      component="section"
      sx={{
        scrollMarginTop: { xs: "64px", md: "76px" },
        width: "100%",
        bgcolor: "var(--INK)",
        py: { xs: 6, md: 10 },
        borderBottom: "1px solid rgba(205, 160, 106, 0.35)",
      }}
    >
      <SectionHeader />

      <Container maxWidth="lg" sx={{ mt: { xs: 4, md: 6 } }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "1fr 1fr",
              lg: "repeat(3, 1fr)",
            },
            gap: 2.5,
            mb: { xs: 4, md: 1 },
          }}
        >
          {services.map((service) => (
            <ServiceCard key={service.title} service={service} />
          ))}
        </Box>
      </Container>
    </Box>
  );
}
