"use client";

import * as React from "react";
import { Box, Button, Container, Stack, Typography } from "@mui/material";

import BrushRounded from "@mui/icons-material/BrushRounded";
import CodeRounded from "@mui/icons-material/CodeRounded";
import StorageRounded from "@mui/icons-material/StorageRounded";
import GroupsRounded from "@mui/icons-material/GroupsRounded";
import BusinessCenterRounded from "@mui/icons-material/BusinessCenterRounded";
import StarRounded from "@mui/icons-material/StarRounded";
import ArrowForwardRounded from "@mui/icons-material/ArrowForwardRounded";
import RocketLaunchRounded from "@mui/icons-material/RocketLaunchRounded";

const INK = "#0F172A";
const BORDER = "rgba(255,255,255,0.09)";
const BLUE = "#2F63E8";
const ASH_LIGHT = "#F1F2F4";

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const toolCategories = [
  {
    icon: BrushRounded,
    label: "Graphic Design Tools",
    items: "Photoshop, Illustrator, Figma, Canva, PowerPoint",
    bg: ASH_LIGHT,
    color: INK,
  },
  {
    icon: CodeRounded,
    label: "Front End Tools",
    items: "HTML, CSS, JavaScript, Bootstrap, Tailwind, React, Angular, Next",
    bg: ASH_LIGHT,
    color: INK,
  },
  {
    icon: StorageRounded,
    label: "Back End Tools",
    items:
      "Postgres, MySQL, MongoDB, Go, Python, Java, C#, PHP, Django, Node, Express",
    bg: ASH_LIGHT,
    color: INK,
  },
  {
    icon: GroupsRounded,
    label: "Consulting",
    items: "DAST, SAST, VAPT, ISO-27001:2022, CyberSecurity, GenAI, IOT",
    bg: ASH_LIGHT,
    color: INK,
  },
  {
    icon: BusinessCenterRounded,
    label: "Business Domain",
    items: "Manufacturing, Banking, Health care, Education",
    bg: ASH_LIGHT,
    color: INK,
  },
];

const featureCards = [
  {
    variant: "light" as const,
    title: "Customer-Centric Focus",
    desc: "Your satisfaction is our priority. We'll work with you to understand your needs and deliver solutions that align with your goals.",
  },
  {
    variant: "dark" as const,
    title: "End-to-End Solutions",
    desc: "From concept to execution, we offer comprehensive solutions that cover every aspect of your digital journey.",
  },
  {
    variant: "light" as const,
    title: "Innovative Approach",
    desc: "We embrace innovation at every step, constantly seeking out new ways to enhance and optimize our services.",
  },
];

// ---------------------------------------------------------------------------
// Small shared bits
// ---------------------------------------------------------------------------

function StarRating() {
  return (
    <Stack direction="row" spacing={0.25}>
      {[0, 1, 2, 3, 4].map((i) => (
        <StarRounded key={i} sx={{ fontSize: 18, color: BLUE }} />
      ))}
    </Stack>
  );
}

function TitoBadge() {
  return (
    <Box
      sx={{
        display: "inline-flex",
        alignItems: "center",
        px: 1.1,
        py: 0.35,
        borderRadius: 1,
        bgcolor: "rgba(205, 160, 106, 0.10)",
        border: "1px solid rgba(205, 160, 106, 0.35)",
        color: "var(--GOLD)",
        fontSize: 13,
        letterSpacing: 0.5,
      }}
    >
      TITO
    </Box>
  );
}

// ---------------------------------------------------------------------------
// Left column hero illustration
// ---------------------------------------------------------------------------

function HeroIllustration() {
  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        mx: { xs: "auto", md: 0 },
      }}
    >
      <Box
        component="img"
        src="/img/home/idea.webp"
        alt="Our expertise illustration"
        sx={{
          width: "100%",
          height: "auto",
          display: "block",
          objectFit: "contain",
        }}
      />
    </Box>
  );
}

function LeftColumn() {
  return (
    <Box>
      <Stack
        direction="row"
        spacing={0.75}
        sx={{ mb: 1.5, alignItems: "center" }}
      >
        <Stack direction="row" spacing={0.4}>
          <Box
            sx={{
              width: 4,
              height: 4,
              borderRadius: "50%",
              bgcolor: "var(--GOLD)",
            }}
          />
          <Box
            sx={{
              width: 4,
              height: 4,
              borderRadius: "50%",
              bgcolor: "var(--GOLD)",
            }}
          />
        </Stack>
        <Typography
          sx={{
            fontSize: 13,
            fontWeight: 700,
            letterSpacing: 1.5,
            color: "var(--GOLD)",
            textTransform: "uppercase",
          }}
        >
          Our Expertise
        </Typography>

        <Box
          sx={{
            width: { xs: 28, sm: 40, md: 60 },
            height: "1px",
            background: `linear-gradient(to right, transparent, var(--GOLD) 45%, transparent)`,
          }}
        />
      </Stack>

      <Typography
        sx={{
          fontWeight: 800,
          fontSize: { xs: 30, md: 38 },
          letterSpacing: -0.5,
          lineHeight: 1.2,
          color: "var(--TEXT)",
          mb: 2,
        }}
      >
        Tools. Technologies.{" "}
        <Box
          component="span"
          sx={{
            color: "var(--GOLD_SOFT)",
          }}
        >
          Expertise.
        </Box>
      </Typography>

      <Typography
        sx={{
          fontSize: 15,
          color: "rgba(245, 244, 242, 0.72)",
          lineHeight: 1.7,
          mb: 2,
        }}
      >
        We leverage the right tools and deep domain expertise to build secure,
        scalable and future-ready digital solutions.
      </Typography>

      <HeroIllustration />
    </Box>
  );
}

// ---------------------------------------------------------------------------
// Right column: tool category list
// ---------------------------------------------------------------------------

function ToolRow({ tool }: { tool: (typeof toolCategories)[number] }) {
  const Icon = tool.icon;

  return (
    <Stack
      direction="row"
      spacing={2}
      sx={{
        p: 2.25,
        borderRadius: 3,
        border: "1px solid",
        borderColor: BORDER,
        bgcolor: "var(--PANEL)",
        alignItems: "flex-start",
        overflow: "hidden",
        cursor: "pointer",
        transition:
          "transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease",
        "&:hover": {
          transform: "translateY(-6px)",
          boxShadow: "0 16px 32px rgba(17,24,39,0.14)",
          borderColor: "var(--GOLD)",
        },
      }}
    >
      <Box
        className="role-icon"
        sx={{
          width: 46,
          height: 46,
          minWidth: 46,
          borderRadius: 2,
          bgcolor: "rgba(205, 160, 106, 0.10)",
          border: "1px solid rgba(205, 160, 106, 0.35)",
          color: "var(--GOLD)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <Icon fontSize="medium" />
      </Box>

      <Box sx={{ minWidth: 0 }}>
        <Typography
          sx={{
            fontWeight: 700,
            fontSize: 13.5,
            letterSpacing: 0.4,
            color: "var(--TEXT)",
            textTransform: "uppercase",
            mb: 0.4,
          }}
        >
          {tool.label}
        </Typography>
        <Typography sx={{ fontSize: 13.5, color: "#CED4DA", lineHeight: 1.5 }}>
          {tool.items}
        </Typography>
      </Box>
    </Stack>
  );
}

function RightColumn() {
  return (
    <Stack spacing={2}>
      {toolCategories.map((tool) => (
        <ToolRow key={tool.label} tool={tool} />
      ))}
    </Stack>
  );
}

// ---------------------------------------------------------------------------
// Feature cards (bottom row)
// ---------------------------------------------------------------------------

function CustomerCentricIllustration() {
  return (
    <Box
      component="img"
      src="/img/home/customercentric.webp"
      alt="Customer-centric focus illustration"
      sx={{
        width: "100%",
        height: { xs: 190, md: 220 },
        display: "block",
      }}
    />
  );
}

function EndToEndIllustration() {
  return (
    <Box
      component="img"
      src="/img/home/end2end.webp"
      alt="Customer-centric focus illustration"
      sx={{
        width: "100%",
        height: { xs: 190, md: 220 },
        display: "block",
      }}
    />
  );
}

function InnovativeApproachIllustration() {
  return (
    <Box
      component="img"
      src="/img/home/innovative.webp"
      alt="Customer-centric focus illustration"
      sx={{
        width: "100%",
        height: { xs: 190, md: 220 },
        display: "block",
      }}
    />
  );
}

function FeatureCard({
  card,
  illustration,
}: {
  card: (typeof featureCards)[number];
  illustration: React.ReactNode;
}) {
  const isDark = card.variant === "dark";

  return (
    <Box
      sx={{
        borderRadius: 3,
        border: "1px solid",
        borderColor: "rgba(255,255,255,0.09)",
        bgcolor: "var(--PANEL)",
        overflow: "hidden",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        boxShadow: isDark
          ? "0 20px 40px rgba(0,0,0,0.35)"
          : "0 12px 28px rgba(15,23,42,0.08)",
        transition: "transform 0.25s ease, box-shadow 0.25s ease",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: isDark
            ? "0 24px 48px rgba(0,0,0,0.45)"
            : "0 18px 36px rgba(15,23,42,0.12)",
        },
      }}
    >
      <Box sx={{ pb: 0 }}>{illustration}</Box>

      <Box sx={{ p: 3, pt: 2 }}>
        <Box sx={{ mb: 1.5 }}>
          <TitoBadge />
        </Box>

        <Stack
          direction="row"
          sx={{ mb: 1, alignItems: "center", justifyContent: "space-between" }}
        >
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: 14,
              letterSpacing: 0.3,
              textTransform: "uppercase",
              color: "var(--TEXT)",
            }}
          >
            {card.title}
          </Typography>
          <StarRating />
        </Stack>

        <Typography
          sx={{
            fontSize: 13.5,
            lineHeight: 1.6,
            color: "#CED4DA",
          }}
        >
          {card.desc}
        </Typography>
      </Box>
    </Box>
  );
}

// ---------------------------------------------------------------------------
// Contact banner (dark CTA strip below the feature cards)
// ---------------------------------------------------------------------------

function ContactBanner() {
  return (
    <Box
      sx={{
        position: "relative",
        overflow: "hidden",
        borderRadius: 3,
        border: "1px solid",
        borderColor: "rgba(255,255,255,0.09)",
        bgcolor: "var(--PANEL)",
        px: { xs: 3, md: 5 },
        py: { xs: 4, md: 4.5 },
      }}
    >
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={{ xs: 3, md: 4 }}
        sx={{ position: "relative", alignItems: "center" }}
      >
        <Box
          sx={{
            width: 64,
            height: 64,
            minWidth: 64,
            borderRadius: "50%",
            bgcolor: "rgba(205, 160, 106, 0.10)",
            border: "1px solid rgba(205, 160, 106, 0.35)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <RocketLaunchRounded sx={{ fontSize: 28, color: "var(--GOLD)" }} />
        </Box>

        <Box sx={{ flex: 1, textAlign: { xs: "center", md: "left" } }}>
          <Typography
            sx={{
              fontWeight: 800,
              fontSize: { xs: 18, md: 20 },
              color: "var(--TEXT)",
              mb: 0.75,
            }}
          >
            Tailored Solutions for{" "}
            <Box
              component="span"
              sx={{
                color: "var(--GOLD_SOFT)",
              }}
            >
              Every Business
            </Box>
          </Typography>
          <Typography
            sx={{ fontSize: 13.5, color: "#CED4DA", lineHeight: 1.6 }}
          >
            At TITO, we cater to a diverse clientele spanning startups,
            e-commerce companies, entrepreneurs, solopreneurs, retailers, and
            manufacturers. Our flexible and scalable solutions are designed to
            grow with your business, empowering you to stay ahead in today's
            competitive landscape.
          </Typography>
        </Box>

        <Button
          variant="contained"
          endIcon={<ArrowForwardRounded />}
          href="/contact"
          sx={{
            background:
              "linear-gradient(135deg, var(--GOLD_SOFT), var(--GOLD))",
            color: "var(--INK)",
            textTransform: "uppercase",
            fontSize: 13,
            letterSpacing: 0.5,
            px: 3,
            py: 1.4,
            borderRadius: 2,
            whiteSpace: "nowrap",
            boxShadow: "none",
            flexShrink: 0,
            "&:hover": {
              background:
                "linear-gradient(135deg, var(--GOLD), var(--GOLD_SOFT))",
              boxShadow: "none",
            },
          }}
        >
          Contact Us
        </Button>
      </Stack>
    </Box>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export default function OurExpertise() {
  const illustrations = [
    <CustomerCentricIllustration key="c" />,
    <EndToEndIllustration key="e" />,
    <InnovativeApproachIllustration key="i" />,
  ];

  return (
    <Box
      id="expertise"
      component="section"
      sx={{
        width: "100%",
        bgcolor: "var(--INK)",
        scrollMarginTop: { xs: "64px", md: "76px" },
      }}
    >
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 9 } }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "5fr 7fr" },
            gap: { xs: 5, md: 6 },
            alignItems: "start",
          }}
        >
          <LeftColumn />
          <RightColumn />
        </Box>
      </Container>

      <Box sx={{ bgcolor: "var(--INK)", pb: { xs: 5, md: 5 } }}>
        <Container maxWidth="lg">
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "1fr 1fr",
                lg: "repeat(3, 1fr)",
              },
              gap: 3,
            }}
          >
            {featureCards.map((card, i) => (
              <FeatureCard
                key={card.title}
                card={card}
                illustration={illustrations[i]}
              />
            ))}
          </Box>
          <Box sx={{ mt: 3 }}>
            <ContactBanner />
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
