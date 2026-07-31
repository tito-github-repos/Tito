"use client";

import React from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Stack,
  GlobalStyles,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutlined";
import { useRouter } from "next/navigation";


const GOLD = "#cda06a";
const GOLD_SOFT = "#e8caa0";
const TEXT = "#f5f4f2";
const TEXT_MUTED = "rgba(245,244,242,.72)";

const HomeHero: React.FC = () => {
    const router = useRouter();
  return (
    <Box
      component="section"
      aria-label="Hero Section"
      sx={{
        position: "relative",
        overflow: "hidden",
        isolation: "isolate",

        width: "100%",

        /* Reduced hero height */
        minHeight: { 
          xs: 560,
          lg: 580,
        },

        display: "flex",
        alignItems: "center",
        justifyContent: "center",

        backgroundColor: "#080808",
      }}
    >
      <GlobalStyles
        styles={{
          /* ===============================
             BACKGROUND ANIMATION
          =============================== */

          "@keyframes gradientMove": {
            "0%": {
              backgroundPosition: "0% 50%",
            },
            "50%": {
              backgroundPosition: "100% 50%",
            },
            "100%": {
              backgroundPosition: "0% 50%",
            },
          },

          "@keyframes particleMove": {
            "0%": {
              backgroundPosition: "0 0,120px 80px,280px 200px,450px 120px",
            },
            "100%": {
              backgroundPosition:
                "350px 220px,-150px 280px,600px -150px,-250px -200px",
            },
          },

          "@keyframes dotPulse": {
            "0%,100%": {
              opacity: 0.25,
            },
            "50%": {
              opacity: 0.55,
            },
          },

          /* ===============================
              GLOWING ORBS
          =============================== */

          "@keyframes orbLeft": {
            "0%": {
              transform: "translate(-6%,-5%) scale(1)",
            },
            "50%": {
              transform: "translate(6%,5%) scale(1.08)",
            },
            "100%": {
              transform: "translate(-6%,-5%) scale(1)",
            },
          },

          "@keyframes orbRight": {
            "0%": {
              transform: "translate(5%,6%) scale(1)",
            },
            "50%": {
              transform: "translate(-5%,-6%) scale(1.12)",
            },
            "100%": {
              transform: "translate(5%,6%) scale(1)",
            },
          },

          "@keyframes centerGlow": {
            "0%": {
              transform: "translateY(0px)",
            },
            "50%": {
              transform: "translateY(-25px)",
            },
            "100%": {
              transform: "translateY(0px)",
            },
          },

          /* ===============================
              LIGHT SWEEP
          =============================== */

          "@keyframes sweep": {
            "0%": {
              transform: "translateX(-40%) rotate(10deg)",
              opacity: 0,
            },
            "15%": {
              opacity: 0.55,
            },
            "60%": {
              opacity: 0.55,
            },
            "100%": {
              transform: "translateX(180%) rotate(10deg)",
              opacity: 0,
            },
          },

          /* ===============================
               CONTENT ANIMATION
          =============================== */

          "@keyframes fadeUp": {
            from: {
              opacity: 0,
              transform: "translateY(30px)",
            },
            to: {
              opacity: 1,
              transform: "translateY(0px)",
            },
          },

          "@keyframes floatHeading": {
            "0%": {
              transform: "translateY(0px)",
            },
            "50%": {
              transform: "translateY(-8px)",
            },
            "100%": {
              transform: "translateY(0px)",
            },
          },

          "@keyframes shine": {
            "0%": {
              backgroundPosition: "-300px",
            },
            "100%": {
              backgroundPosition: "300px",
            },
          },

          "@keyframes underlineMove": {
            "0%": {
              backgroundPosition: "0%",
            },
            "100%": {
              backgroundPosition: "200%",
            },
          },
          "@keyframes kenBurns": {
            "0%": {
              transform: "scale(1.05)",
            },

            "100%": {
              transform: "scale(1.12)",
            },
          },
        }}
      />
      {/* =========================
      HERO BACKGROUND IMAGE
========================== */}

      <Box
        sx={{
          position: "absolute",
          inset: 0,

          backgroundImage: "url('/img/contact/bg-img2.png')",

          backgroundSize: "cover",

          backgroundPosition: "center",

          backgroundRepeat: "no-repeat",

          filter: "brightness(1.15) contrast(1.08) saturate(1.1)",

          transform: "scale(1.05)",

          animation: "kenBurns 18s ease-in-out infinite alternate",

          zIndex: 0,
        }}
      />

      {/* =========================
          BACKGROUND DOT GRID
      ========================== */}

      <Box
        sx={{
          position: "absolute",
          inset: 0,
          zIndex: 0,

          backgroundImage:
            "radial-gradient(rgba(205,160,106,.28) 1px, transparent 1.5px)",

          backgroundSize: "28px 28px",

          animation: "dotPulse 6s ease-in-out infinite",
        }}
      />

      {/* =========================
            FLOATING PARTICLES
      ========================== */}

      <Box
        sx={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          opacity: 0.35,

          backgroundImage: `
            radial-gradient(circle at 18% 20%, ${GOLD} 1px, transparent 2px),
            radial-gradient(circle at 82% 18%, ${GOLD_SOFT} 1px, transparent 2px),
            radial-gradient(circle at 25% 82%, ${GOLD} 1px, transparent 2px),
            radial-gradient(circle at 75% 70%, ${GOLD_SOFT} 1px, transparent 2px),
            radial-gradient(circle at 45% 35%, rgba(255,255,255,.9) 1px, transparent 2px)
          `,

          backgroundSize: "260px 260px",

          animation: "particleMove 28s linear infinite",
        }}
      />

      {/* =========================
              LEFT ORB
      ========================== */}

      <Box
        sx={{
          position: "absolute",

          top: "-20%",
          left: "-10%",

          width: {
            xs: 280,
            sm: 340,
            md: 500,
          },

          height: {
            xs: 280,
            sm: 340,
            md: 500,
          },

          borderRadius: "50%",

          background:
            "radial-gradient(circle, rgba(205,160,106,.28), transparent 70%)",

          filter: "blur(35px)",

          animation: "orbLeft 18s ease-in-out infinite",

          zIndex: 0,
        }}
      />

      {/* =========================
              RIGHT ORB
      ========================== */}

      <Box
        sx={{
          position: "absolute",

          right: "-10%",
          bottom: "-20%",

          width: {
            xs: 300,
            sm: 380,
            md: 560,
          },

          height: {
            xs: 300,
            sm: 380,
            md: 560,
          },

          borderRadius: "50%",

          background:
            "radial-gradient(circle, rgba(232,202,160,.22), transparent 70%)",

          filter: "blur(45px)",

          animation: "orbRight 22s ease-in-out infinite",

          zIndex: 0,
        }}
      />

      {/* =========================
            CENTER GLOW
      ========================== */}

      <Box
        sx={{
          position: "absolute",

          left: "50%",
          top: "50%",

          transform: "translate(-50%, -50%)",

          width: {
            xs: 240,
            md: 380,
          },

          height: {
            xs: 240,
            md: 380,
          },

          borderRadius: "50%",

          background:
            "radial-gradient(circle, rgba(255,255,255,.05), transparent 70%)",

          filter: "blur(50px)",

          animation: "centerGlow 12s ease-in-out infinite",

          zIndex: 0,
        }}
      />

      {/* =========================
            LIGHT SWEEP
      ========================== */}

      <Box
        sx={{
          position: "absolute",

          top: "-30%",
          left: 0,

          width: "35%",
          height: "180%",

          background: `
            linear-gradient(
              100deg,
              transparent,
              rgba(255,255,255,.04),
              rgba(205,160,106,.18),
              rgba(255,255,255,.04),
              transparent
            )
          `,

          animation: "sweep 9s linear infinite",

          pointerEvents: "none",

          zIndex: 0,
        }}
      />

      {/* =========================
             VIGNETTE
      ========================== */}

      <Box
        sx={{
          position: "absolute",
          inset: 0,

          background: `
      radial-gradient(
        ellipse at center,
        rgba(8,8,8,.35) 0%,
        rgba(8,8,8,.55) 45%,
        rgba(8,8,8,.78) 78%,
        rgba(8,8,8,.9) 100%
      )
    `,

          zIndex: 1,
        }}
      />

      {/* =========================
             CONTENT
      ========================== */}

      <Container
        maxWidth="md"
        sx={{
          position: "relative",
          zIndex: 5,

          px: {
            xs: 3,
            sm: 4,
          },

          py: {
            xs: 4,
            md: 5,
          },

          display: "flex",
          justifyContent: "center",
          alignItems: "center",

          textAlign: "center",
        }}
      >
        <Stack
          spacing={{ xs: 2, md: 2.25 }}

          sx={{
            width: "100%",
            maxWidth: 850,
            mx: "auto",
            textAlign: "center",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* =========================
          EYEBROW
  ========================== */}

          <Stack
            direction="row"
            spacing={1.5}

            sx={{
              animation: "fadeUp .7s ease forwards",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                width: 32,
                height: 2,
                bgcolor: GOLD,
              }}
            />

            <Typography
              sx={{
                color: GOLD,
                fontWeight: 600,
                fontSize: 13,
                letterSpacing: ".25em",
                fontFamily: "Poppins",
              }}
            >
              WELCOME TO TITO
            </Typography>

            <Box
              sx={{
                width: 32,
                height: 2,
                bgcolor: GOLD,
              }}
            />
          </Stack>

          {/* =========================
            HEADING
  ========================== */}

          <Typography
            component="h1"
            sx={{
              m: 0,

              maxWidth: 900,

              color: TEXT,

              fontFamily: "Poppins",

              fontWeight: 700,

              fontSize: {
                xs: "1.9rem",
                sm: "2.5rem",
                md: "3.1rem",
                lg: "3.5rem",
              },

              lineHeight: 1.1,

              letterSpacing: "-0.03em",

              animation:
                "fadeUp .8s ease .15s both, floatHeading 6s ease-in-out infinite",
            }}
          >
            Empowering Your{" "}
            <Box
              component="span"
              sx={{
                display: "inline-block",

                background: `linear-gradient(
          90deg,
          ${GOLD},
          #fff5dc,
          ${GOLD},
          ${GOLD_SOFT}
        )`,

                backgroundSize: "300px",

                WebkitBackgroundClip: "text",

                WebkitTextFillColor: "transparent",

                animation: "shine 3s linear infinite",
              }}
            >
              Technology
            </Box>{" "}
            Journey
          </Typography>

          {/* =========================
        ANIMATED UNDERLINE
  ========================== */}

          <Box
            sx={{
              width: 130,
              height: 3,

              borderRadius: 10,

              background: `linear-gradient(
        90deg,
        transparent,
        ${GOLD},
        #ffffff,
        ${GOLD},
        transparent
      )`,

              backgroundSize: "200%",

              animation: "underlineMove 4s linear infinite",
            }}
          />

          {/* =========================
         DESCRIPTION
  ========================== */}

          <Typography
            sx={{
              maxWidth: 650,

              color: TEXT_MUTED,

              fontSize: {
                xs: 14,
                sm: 15,
                md: 16,
              },

              lineHeight: 1.7,

              animation: "fadeUp .9s ease .25s both",
            }}
          >
            We help individuals and businesses grow through hands-on IT
            training, real-world projects, and future-ready IT solutions
            designed for today&apos;s technology landscape.
          </Typography>
          {/* =========================
              ACTION BUTTONS
      ========================== */}

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}

            sx={{
              pt: 1,
              animation: "fadeUp 1s ease .4s both",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* Primary Button */}

            <Button
             onClick={() => router.push("/contact")}
              endIcon={<ArrowForwardIcon />}
              sx={{
                minWidth: 170,

                px: 3.5,
                py: 1.25,

                borderRadius: "12px",

                textTransform: "none",

                fontSize: 14.5,

                fontWeight: 600,

                color: "#1b1308",

                background: `linear-gradient(135deg, ${GOLD_SOFT}, ${GOLD})`,

                boxShadow: "0 10px 30px rgba(205,160,106,.30)",

                transition: "all .35s ease",

                "&:hover": {
                  transform: "translateY(-5px)",

                  background: `linear-gradient(135deg, ${GOLD}, ${GOLD_SOFT})`,

                  boxShadow: "0 16px 40px rgba(205,160,106,.45)",
                },
              }}
            >
              Contact Us
            </Button>

            {/* Secondary Button */}

            <Button
              startIcon={<PlayCircleOutlineIcon />}
              sx={{
                minWidth: 180,

                px: 3.5,
                py: 1.25,

                borderRadius: "12px",

                textTransform: "none",

                fontSize: 14.5,

                fontWeight: 600,

                color: TEXT,

                border: "1px solid rgba(255,255,255,.16)",

                background: "rgba(255,255,255,.04)",

                backdropFilter: "blur(10px)",

                transition: "all .35s ease",

                "&:hover": {
                  transform: "translateY(-5px)",

                  borderColor: GOLD,

                  background: "rgba(255,255,255,.08)",
                },
              }}
            >
              Explore Services
            </Button>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default HomeHero;