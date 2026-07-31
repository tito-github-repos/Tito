"use client";

import { useState } from "react";
import { Box, Container, Stack, Typography, Collapse } from "@mui/material";

import CloudQueueRoundedIcon from "@mui/icons-material/CloudQueueRounded";
import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";
import StorageRoundedIcon from "@mui/icons-material/StorageRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import LayersRoundedIcon from "@mui/icons-material/LayersRounded";
import PersonOutlineRoundedIcon from "@mui/icons-material/PersonOutlineRounded";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";

// ---------------------------------------------------------------------------
// Palette — black / white / ash only
// ---------------------------------------------------------------------------

const ASH = "#9CA3AF"; // mid ash — dividers, secondary accents
const LINE_COLOR = "#D9DCE1"; // dashed connector lines

// ---------------------------------------------------------------------------
// Diagram geometry
// ---------------------------------------------------------------------------

const DIAGRAM_W = 955;

const CARD_W = 287;
const CARD_H = 140;

const ROW_CY = [70, 221.7, 371.2];

const HUB_CX = 477;
const HUB_CY = 221.7;

const HUB_R = 127;
const HEX_R = 59;

const CENTER_CARD_W = 287;
const CENTER_CARD_H = 120;
const CENTER_GAP = 40;
const CENTER_ROW_TOP = ROW_CY[2] + CARD_H / 2 + CENTER_GAP;

const DIAGRAM_H = CENTER_ROW_TOP + CENTER_CARD_H + 12;

function pct(value: number, total: number) {
  return `${(value / total) * 100}%`;
}

function ringPoint(deg: number) {
  const rad = (deg * Math.PI) / 180;

  return {
    x: HUB_CX + HUB_R * Math.cos(rad),
    y: HUB_CY - HUB_R * Math.sin(rad),
  };
}

// ---------------------------------------------------------------------------
// Roles — all cards share the same ash/ink treatment now
// ---------------------------------------------------------------------------

const roles = [
  {
    icon: CloudQueueRoundedIcon,
    title: "Cloud Architect",
    experience: "20+ Years Experience",
    desc: "Designing scalable, reliable and future-ready cloud solutions.",
    col: "left" as const,
    row: 0,
    ringAngle: 135,
  },
  {
    icon: StorageRoundedIcon,
    title: "Data Architect",
    experience: "20+ Years Experience",
    desc: "Building intelligent data platforms that drive better decisions.",
    col: "left" as const,
    row: 1,
    ringAngle: 180,
  },
  {
    icon: LayersRoundedIcon,
    title: "Solution Architect",
    experience: "20+ Years Experience",
    desc: "Crafting innovative solutions tailored to complex business challenges.",
    col: "left" as const,
    row: 2,
    ringAngle: 225,
  },
  {
    icon: ShieldOutlinedIcon,
    title: "Security Architect",
    experience: "20+ Years Experience",
    desc: "Ensuring security, compliance and resilience in every solution we build.",
    col: "right" as const,
    row: 0,
    ringAngle: 45,
  },
  {
    icon: EditRoundedIcon,
    title: "Technical Writer",
    experience: "6+ Years Experience",
    desc: "Simplifying complex ideas and delivering clear, impactful documentation.",
    col: "right" as const,
    row: 1,
    ringAngle: 0,
  },
  {
    icon: PersonOutlineRoundedIcon,
    title: "Project Manager",
    experience: "20+ Years Experience",
    desc: "Leading projects with precision ensuring on-time, on-budget delivery.",
    col: "right" as const,
    row: 2,
    ringAngle: 315,
  },
];

const centerRole = {
  icon: GroupsRoundedIcon,
  title: "Team Members",
  experience: "Full-time|1-6 Years Experience",
  desc: "Dedicated full-time team members growing their expertise across projects.",
};

// All 7 cards, in the order they should read on mobile: the two columns
// interleaved row by row (matches the visual "closest to hub" ordering of
// the desktop diagram), then the center card last.
const mobileRoles = [
  roles[0],
  roles[3],
  roles[1],
  roles[4],
  roles[2],
  roles[5],
  centerRole,
];

type Role = (typeof roles)[number];
type CenterRole = typeof centerRole;

// ---------------------------------------------------------------------------
// Role Card (desktop diagram)
// ---------------------------------------------------------------------------

function RoleCard({ role }: { role: Role }) {
  const Icon = role.icon;

  return (
    <Box
      sx={{
        position: "absolute",
        left: pct(role.col === "left" ? 0 : DIAGRAM_W - CARD_W, DIAGRAM_W),
        top: pct(ROW_CY[role.row] - CARD_H / 2, DIAGRAM_H),
        width: pct(CARD_W, DIAGRAM_W),
        height: pct(CARD_H, DIAGRAM_H),
        boxSizing: "border-box",
      }}
    >
      <Stack
        direction="row"
        spacing={1.75}
        sx={{
          width: "100%",
          height: "100%",
          boxSizing: "border-box",
          p: 2.25,
          borderRadius: 3,
          border: "1px solid",
          borderColor: "rgba(255, 255, 255, 0.08)",
          bgcolor: "var(--PANEL)",
          textAlign: "left",
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
            width: 50,
            height: 50,
            minWidth: 50,
            borderRadius: "50%",
            bgcolor: "var(--INK)",
            border: "1px solid rgba(205, 160, 106, 0.35)",
            color: "VAR(--GOLD)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            transition: "background-color 0.25s ease, color 0.25s ease",
            "&:hover": {
              bgcolor: "rgba(205, 160, 106, 0.10)",
            },
          }}
        >
          <Icon fontSize="medium" />
        </Box>

        <Box sx={{ minWidth: 0, flex: 1 }}>
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: 16,
              lineHeight: 1.25,
              color: "var(--TEXT)",
              mb: 0.35,
            }}
          >
            {role.title}
          </Typography>
          <Typography
            sx={{
              fontSize: 12.5,
              fontWeight: 700,
              color: "#CED4DA",
              lineHeight: 1.3,
              mb: 0.5,
            }}
          >
            {role.experience}
          </Typography>
          <Typography
            sx={{
              fontSize: 13,
              color: "rgba(245, 244, 242, 0.68)",
              lineHeight: 1.45,
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {role.desc}
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
}

function CenterCard() {
  const Icon = centerRole.icon;

  return (
    <Box
      sx={{
        position: "absolute",
        left: pct(HUB_CX - CENTER_CARD_W / 2, DIAGRAM_W),
        top: pct(CENTER_ROW_TOP, DIAGRAM_H),
        width: pct(CENTER_CARD_W, DIAGRAM_W),
        // height: pct(CENTER_CARD_H, DIAGRAM_H),
        boxSizing: "border-box",
      }}
    >
      <Stack
        direction="row"
        spacing={1.75}
        sx={{
          width: "100%",
          height: "100%",
          boxSizing: "border-box",
          p: 2.25,
          borderRadius: 3,
          border: "1px solid",
          borderColor: "rgba(255, 255, 255, 0.08)",
          bgcolor: "var(--PANEL)",
          textAlign: "left",
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
            width: 50,
            height: 50,
            minWidth: 50,
            borderRadius: "50%",
            bgcolor: "var(--INK)",
            border: "1px solid rgba(205, 160, 106, 0.35)",
            color: "VAR(--GOLD)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            transition: "background-color 0.25s ease, color 0.25s ease",
          }}
        >
          <Icon fontSize="medium" />
        </Box>

        <Box sx={{ minWidth: 0, flex: 1 }}>
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: 16,
              lineHeight: 1.25,
              color: "var(--TEXT)",
              mb: 0.35,
            }}
          >
            {centerRole.title}
          </Typography>
          <Typography
            sx={{
              fontSize: 12.5,
              fontWeight: 700,
              color: "#CED4DA",
              lineHeight: 1.3,
              mb: 0.5,
            }}
          >
            {centerRole.experience}
          </Typography>
          <Typography
            sx={{
              fontSize: 13,
              color: "rgba(245, 244, 242, 0.68)",
              lineHeight: 1.45,
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {centerRole.desc}
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
}

// ---------------------------------------------------------------------------
// Header
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
          spacing={{ xs: 1, md: 1.5 }}
          sx={{
            mb: { xs: 1.5, md: 1.75 },
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              width: { xs: 28, sm: 40, md: 60 },
              height: "1px",
              background: `linear-gradient(to right, transparent, var(--GOLD) 55%, transparent)`,
            }}
          />

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
            Our Team
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
            fontSize: { xs: 25, sm: 32, md: 42 },
            letterSpacing: -0.5,
            lineHeight: 1.15,
            color: "var(--TEXT)",
            mb: { xs: 1, md: 1.25 },
          }}
        >
          Experts. Experience.{" "}
          <Box
            component="span"
            sx={{
              color: "var(--GOLD_SOFT)",
            }}
          >
            Excellence.
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
          A team of specialists with deep expertise, working together to deliver
          exceptional digital solutions.
        </Typography>
      </Box>
    </Container>
  );
}

// ---------------------------------------------------------------------------
// Diagram (md and up)
// ---------------------------------------------------------------------------

function TeamDiagram() {
  const hubBottom = ringPoint(270);

  return (
    <Box
      sx={{
        display: { xs: "none", md: "block" },
        width: "100%",
        overflowX: { xs: "auto", md: "visible" },
        mt: { xs: 5, md: 7 },
        pb: { xs: 2, md: 0 },
      }}
    >
      <Box
        sx={{
          position: "relative",
          width: { xs: DIAGRAM_W, md: "100%" },
          maxWidth: { xs: "none", md: `${DIAGRAM_W}px` },
          minWidth: { xs: `${DIAGRAM_W}px`, md: 0 },
          margin: "0 auto",
          aspectRatio: `${DIAGRAM_W} / ${DIAGRAM_H}`,
        }}
      >
        {/* --------------------------------------------------------------- */}
        {/* SVG CONNECTORS                                                  */}
        {/* --------------------------------------------------------------- */}

        <Box
          component="svg"
          viewBox={`0 0 ${DIAGRAM_W} ${DIAGRAM_H}`}
          preserveAspectRatio="xMidYMid meet"
          sx={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
          }}
        >
          <defs>
            {/* soft fade for the 4 diagonal spokes (top row + bottom row) — same
                "dissolve at the ends" treatment used on the eyebrow dividers */}
            <linearGradient
              id="spokeFadeLeft"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor={LINE_COLOR} stopOpacity={0} />
              <stop offset="55%" stopColor={LINE_COLOR} stopOpacity={1} />
              <stop offset="100%" stopColor={LINE_COLOR} stopOpacity={0.15} />
            </linearGradient>
            <linearGradient
              id="spokeFadeRight"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor={LINE_COLOR} stopOpacity={0.15} />
              <stop offset="45%" stopColor={LINE_COLOR} stopOpacity={1} />
              <stop offset="100%" stopColor={LINE_COLOR} stopOpacity={0} />
            </linearGradient>
          </defs>

          {/* Outer dashed ring */}
          <circle
            cx={HUB_CX}
            cy={HUB_CY}
            r={HUB_R}
            fill="none"
            stroke={LINE_COLOR}
            strokeWidth={1.5}
            strokeDasharray="2 5"
          />

          {/* Spokes */}
          {roles.map((role) => {
            const isLeft = role.col === "left";
            const cardX = isLeft ? CARD_W : DIAGRAM_W - CARD_W;
            const cardY = ROW_CY[role.row];
            const ring = ringPoint(role.ringAngle);
            const isDiagonal = role.row !== 1; // top + bottom rows only — mid row stays a plain solid line
            const stroke = isDiagonal
              ? `url(#${isLeft ? "spokeFadeLeft" : "spokeFadeRight"})`
              : LINE_COLOR;

            return (
              <line
                key={`line-${role.title}`}
                x1={cardX}
                y1={cardY}
                x2={ring.x}
                y2={ring.y}
                stroke={stroke}
                strokeWidth={1.5}
                strokeDasharray="2 5"
              />
            );
          })}

          {/* 7th spoke: straight down from the hub's bottom dot to the centered card */}
          <line
            x1={hubBottom.x}
            y1={hubBottom.y}
            x2={HUB_CX}
            y2={CENTER_ROW_TOP}
            stroke={LINE_COLOR}
            strokeWidth={1.5}
            strokeDasharray="2 5"
          />

          {/* top-center dot on the 7th card */}
          <circle cx={HUB_CX} cy={CENTER_ROW_TOP} r={4} fill="var(--GOLD)" />

          {/* Ring dots */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((degree) => {
            const point = ringPoint(degree);
            return (
              <circle
                key={`ring-dot-${degree}`}
                cx={point.x}
                cy={point.y}
                r={4}
                fill="var(--GOLD)"
              />
            );
          })}

          {/* Card edge dots */}
          {roles.map((role) => {
            const isLeft = role.col === "left";
            const cardX = isLeft ? CARD_W : DIAGRAM_W - CARD_W;
            const cardY = ROW_CY[role.row];
            return (
              <circle
                key={`card-dot-${role.title}`}
                cx={cardX}
                cy={cardY}
                r={4}
                fill="var(--GOLD)"
              />
            );
          })}

          {/* Sparks: travel from the hub outward to each card, on a loop */}
          {roles.map((role, i) => {
            const isLeft = role.col === "left";
            const cardX = isLeft ? CARD_W : DIAGRAM_W - CARD_W;
            const cardY = ROW_CY[role.row];
            const ring = ringPoint(role.ringAngle);
            const delay = (i * 2.4) / 7;

            return (
              <circle key={`spark-${role.title}`} r={1.5} fill="var(--GOLD)">
                <animate
                  attributeName="cx"
                  values={`${ring.x};${cardX}`}
                  dur="2.4s"
                  begin={`${delay}s`}
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="cy"
                  values={`${ring.y};${cardY}`}
                  dur="2.4s"
                  begin={`${delay}s`}
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  values="0;1;1;0"
                  keyTimes="0;0.15;0.85;1"
                  dur="2.4s"
                  begin={`${delay}s`}
                  repeatCount="indefinite"
                />
              </circle>
            );
          })}

          {/* Spark for the 7th spoke (hub -> centered card) */}
          <circle r={1.5} fill="var(--GOLD)">
            <animate
              attributeName="cx"
              values={`${hubBottom.x};${HUB_CX}`}
              dur="2.4s"
              begin="1.9s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="cy"
              values={`${hubBottom.y};${CENTER_ROW_TOP}`}
              dur="2.4s"
              begin="1.9s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="0;1;1;0"
              keyTimes="0;0.15;0.85;1"
              dur="2.4s"
              begin="1.9s"
              repeatCount="indefinite"
            />
          </circle>
        </Box>

        {/* --------------------------------------------------------------- */}
        {/* SOFT HALO                                                      */}
        {/* --------------------------------------------------------------- */}

        <Box
          sx={{
            position: "absolute",
            left: pct(HUB_CX - HUB_R * 0.72, DIAGRAM_W),
            top: pct(HUB_CY - HUB_R * 0.72, DIAGRAM_H),
            width: pct(HUB_R * 1.44, DIAGRAM_W),
            height: pct(HUB_R * 1.44, DIAGRAM_H),
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(241,242,244,0.9), rgba(255,255,255,0))",
            pointerEvents: "none",
          }}
        />

        {/* --------------------------------------------------------------- */}
        {/* CENTER HEXAGON                                                  */}
        {/* --------------------------------------------------------------- */}

        <Box
          sx={{
            position: "absolute",
            left: pct(HUB_CX - HEX_R, DIAGRAM_W),
            top: pct(HUB_CY - HEX_R, DIAGRAM_H),
            width: pct(HEX_R * 2, DIAGRAM_W),
            height: pct(HEX_R * 2, DIAGRAM_H),
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: "100%",
              bgcolor: "#000",
              boxShadow: "0 12px 28px rgba(17,24,39,0.14)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              clipPath:
                "polygon(25% 6%, 75% 6%, 100% 50%, 75% 94%, 25% 94%, 0% 50%)",
            }}
          >
            <Box
              component="img"
              src="/img/home/logo.webp"
              alt="TITO Logo"
              sx={{
                width: { xs: 55, md: 70 },
                height: "auto",
                objectFit: "contain",
                display: "block",
              }}
            />
          </Box>
        </Box>

        {/* --------------------------------------------------------------- */}
        {/* ROLE CARDS                                                      */}
        {/* --------------------------------------------------------------- */}

        {roles.map((role) => (
          <RoleCard key={role.title} role={role} />
        ))}

        {/* 7th card */}
        <CenterCard />
      </Box>
    </Box>
  );
}

// ---------------------------------------------------------------------------
// Mobile list (below md) — hub logo up top, roles as an expandable list.
// One item open at a time; tap the chevron (or the row) to reveal the desc.
// ---------------------------------------------------------------------------

// Same proportions as the desktop hub (HUB_R / HEX_R ratio), just scaled
// down to a size that reads well stacked above a single-column list.
const MOBILE_HUB_R = 92;
const MOBILE_HEX_R = HEX_R * (MOBILE_HUB_R / HUB_R);
const MOBILE_PAD = 10;
const MOBILE_HUB_SIZE = MOBILE_HUB_R * 2 + MOBILE_PAD * 2;
const MOBILE_HUB_C = MOBILE_HUB_SIZE / 2;

function mobileRingPoint(deg: number) {
  const rad = (deg * Math.PI) / 180;
  return {
    x: MOBILE_HUB_C + MOBILE_HUB_R * Math.cos(rad),
    y: MOBILE_HUB_C - MOBILE_HUB_R * Math.sin(rad),
  };
}

function MobileHub() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        my: 2,
      }}
    >
      <Box
        sx={{
          position: "relative",
          width: MOBILE_HUB_SIZE,
          height: MOBILE_HUB_SIZE,
        }}
      >
        {/* halo — same treatment as the desktop hub */}
        <Box
          sx={{
            position: "absolute",
            left: MOBILE_HUB_C - MOBILE_HUB_R * 0.72,
            top: MOBILE_HUB_C - MOBILE_HUB_R * 0.72,
            width: MOBILE_HUB_R * 1.44,
            height: MOBILE_HUB_R * 1.44,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(241,242,244,0.9), rgba(255,255,255,0))",
            pointerEvents: "none",
          }}
        />

        {/* dashed ring + ring dots, matching the desktop diagram's SVG treatment */}
        <Box
          component="svg"
          viewBox={`0 0 ${MOBILE_HUB_SIZE} ${MOBILE_HUB_SIZE}`}
          sx={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
          }}
        >
          <circle
            cx={MOBILE_HUB_C}
            cy={MOBILE_HUB_C}
            r={MOBILE_HUB_R}
            fill="none"
            stroke={LINE_COLOR}
            strokeWidth={1.5}
            strokeDasharray="2 5"
          />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((degree) => {
            const point = mobileRingPoint(degree);
            return (
              <circle
                key={`mobile-ring-dot-${degree}`}
                cx={point.x}
                cy={point.y}
                r={3}
                fill="var(--GOLD)"
              />
            );
          })}
        </Box>

        {/* center hexagon — identical construction to the desktop version */}
        <Box
          sx={{
            position: "absolute",
            left: MOBILE_HUB_C - MOBILE_HEX_R,
            top: MOBILE_HUB_C - MOBILE_HEX_R,
            width: MOBILE_HEX_R * 2,
            height: MOBILE_HEX_R * 2,
            bgcolor: "#000",
            boxShadow: "0 12px 28px rgba(17,24,39,0.14)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            clipPath:
              "polygon(25% 6%, 75% 6%, 100% 50%, 75% 94%, 25% 94%, 0% 50%)",
          }}
        >
          <Box
            component="img"
            src="/img/home/logo.webp"
            alt="TITO Logo"
            sx={{
              width: MOBILE_HEX_R * 0.93,
              height: "auto",
              objectFit: "contain",
              display: "block",
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}

function MobileRoleItem({
  role,
  isOpen,
  onToggle,
}: {
  role: Role | CenterRole;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const Icon = role.icon;

  return (
    <Box
      sx={{
        borderRadius: 3,
        border: "1px solid",
        borderColor: isOpen ? "var(--GOLD)" : "rgba(255, 255, 255, 0.08)",
        bgcolor: "var(--PANEL)",
        overflow: "hidden",
        transition: "border-color 0.2s ease",
      }}
    >
      <Stack
        direction="row"
        spacing={1.5}
        onClick={onToggle}
        role="button"
        aria-expanded={isOpen}
        sx={{
          alignItems: "center",
          p: 1.85,
          cursor: "pointer",
        }}
      >
        <Box
          sx={{
            width: 44,
            height: 44,
            minWidth: 44,
            borderRadius: "50%",
            bgcolor: "var(--INK)",
            border: "1px solid rgba(205, 160, 106, 0.35)",
            color: "VAR(--GOLD)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            transition: "background-color 0.2s ease, color 0.2s ease",
          }}
        >
          <Icon fontSize="small" />
        </Box>

        <Box sx={{ minWidth: 0, flex: 1 }}>
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: 15,
              lineHeight: 1.25,
              color: "var(--TEXT)",
            }}
          >
            {role.title}
          </Typography>
          <Typography
            sx={{
              fontSize: 12,
              fontWeight: 700,
              color: "#CED4DA",
              lineHeight: 1.3,
            }}
          >
            {role.experience}
          </Typography>
        </Box>

        <ExpandMoreRoundedIcon
          sx={{
            color: isOpen ? ASH : ASH,
            flexShrink: 0,
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.2s ease, color 0.2s ease",
          }}
        />
      </Stack>

      <Collapse in={isOpen} timeout={200} unmountOnExit>
        <Box sx={{ px: 1.85, pb: 1.85, pl: "70px" }}>
          <Typography
            sx={{
              fontSize: 13.5,
              color: "rgba(245, 244, 242, 0.68)",
              lineHeight: 1.55,
            }}
          >
            {role.desc}
          </Typography>
        </Box>
      </Collapse>
    </Box>
  );
}

function MobileTeamList() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <Box
      sx={{
        display: { xs: "block", md: "none" },
      }}
    >
      <MobileHub />

      <Container maxWidth="sm" disableGutters sx={{ px: 2 }}>
        <Stack spacing={1.25}>
          {mobileRoles.map((role, i) => (
            <MobileRoleItem
              key={role.title}
              role={role}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </Stack>
      </Container>
    </Box>
  );
}

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------

export default function TeamSectionHeader() {
  return (
    <div>
      <Box
        id="team"
        component="section"
        sx={{
          width: "100%",
          overflow: "hidden",
          py: { xs: 5, md: 8 },
          backgroundColor: "var(--INK)",
          borderBottom: "1px solid rgba(205, 160, 106, 0.35)",
        }}
      >
        <SectionHeader />
        <TeamDiagram />
        <MobileTeamList />
      </Box>
    </div>
  );
}
