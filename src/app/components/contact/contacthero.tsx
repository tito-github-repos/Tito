import React from "react";
import { Box, Container, Typography } from "@mui/material";

const ContactHero: React.FC = () => {
  return (
    <Box
      component="section"
      aria-label="Contact us introduction"
      sx={{
        position: "relative",
        isolation: "isolate",
        overflow: "hidden",
        width: "100%",
        display: "flex",
        alignItems: "center",
        bgcolor: "#0b0b0c",
        minHeight: { xs: 280, sm: 320, md: 380, lg: 420, xl: 440 },
      }}
    >
      {/* Background image */}
      <Box
        component="img"
        src="/img/contact/bg-img.png"
        alt=""
        aria-hidden="true"
        sx={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: {
            xs: "65% center",
            sm: "70% center",
            md: "center right",
          },
        }}
      />

      {/* Gradient scrim — keeps text legible over the image, reflows per breakpoint */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          background: {
            xs: "linear-gradient(180deg, rgba(6,6,7,0.92) 0%, rgba(7,7,8,0.90) 55%, rgba(8,8,9,0.78) 100%)",
            sm: "linear-gradient(110deg, rgba(6,6,7,0.95) 0%, rgba(8,8,9,0.88) 45%, rgba(10,10,11,0.50) 78%, rgba(10,10,11,0.40) 100%)",
            md: "linear-gradient(100deg, rgba(6,6,7,0.94) 0%, rgba(8,8,9,0.86) 30%, rgba(10,10,11,0.55) 55%, rgba(10,10,11,0.25) 75%, rgba(10,10,11,0.35) 100%)",
          },
        }}
      />

      <Container
        maxWidth="xl"
        sx={{
          position: "relative",
          zIndex: 1,
          px: { xs: 2.5, sm: 4, md: 6, lg: 8 },
        }}
      >
        <Box
          sx={{
            maxWidth: { xs: "100%", md: 640 },
            py: { xs: 4.5, sm: 5.5, md: 6.5, lg: 7.5 },
          }}
        >
          {/* Eyebrow */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "14px",
              mb: { xs: 2, md: 3 },
            }}
          >
            <Typography
              component="span"
              sx={{
                fontFamily: "'Poppins', 'Segoe UI', system-ui, sans-serif",
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: "0.22em",
                color: "#cda06a",
                whiteSpace: "nowrap",
              }}
            >
              CONTACT US
            </Typography>
            <Box
              component="i"
              sx={{
                display: "block",
                width: 48,
                height: 2,
                bgcolor: "#cda06a",
                flexShrink: 0,
              }}
            />
          </Box>

          {/* Heading */}
          <Typography
            component="h1"
            sx={{
              m: 0,
              mb: { xs: 2, md: 2.75 },
              fontFamily: "'Poppins', 'Segoe UI', system-ui, sans-serif",
              fontWeight: 600,
              fontSize: { xs: 30, sm: 36, md: 44, lg: 52 },
              lineHeight: 1.15,
              letterSpacing: "-0.01em",
              color: "#f5f4f2",
            }}
          >
            Let&apos;s Connect &amp;
            <Box component="br" sx={{ display: { xs: "none", sm: "block" } }} />
            Build{" "}
            <Box component="span" sx={{ color: "#e8caa0" }}>
              Something Great
            </Box>
          </Typography>

          {/* Copy */}
          <Typography
            sx={{
              m: 0,
              maxWidth: { xs: "100%", md: "46ch" },
              fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
              fontSize: { xs: 14.5, md: 15.5, lg: 16.5 },
              lineHeight: 1.7,
              color: "rgba(245, 244, 242, 0.72)",
            }}
          >
            We&apos;re here to answer your questions, hear your ideas, and
            help you find the right solutions for your business. Reach out
            to us and let&apos;s start a conversation.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default ContactHero;