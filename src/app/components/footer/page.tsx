"use client";

import * as React from "react";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import {
  Box,
  Container,
  Stack,
  Typography,
  Link as MuiLink,
} from "@mui/material";
import Link from "next/link";

import EmailRounded from "@mui/icons-material/EmailRounded";
import CallRounded from "@mui/icons-material/CallRounded";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import XIcon from "@mui/icons-material/X";

// ---------------------------------------------------------------------------
// Palette
// ---------------------------------------------------------------------------

const TEXT_MUTED = "#8E8E93";
const BORDER = "rgba(255,255,255,0.09)";

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const companyLinks = [
  { label: "About Us", href: "/#team" },
  { label: "What We Do", href: "/#expertise" },
  { label: "Products", href: "/#products" },
  { label: "Projects", href: "/#projects" },
  { label: "Services", href: "/#services" },
  { label: "Contact Us", href: "/contact" },
];

const serviceLinks = [
  { label: "Web Design", href: "/#services" },
  { label: "Web App Development", href: "/#services" },
  { label: "Mobile App Development", href: "/#services" },
  { label: "CyberSecurity", href: "/#services" },
  { label: "Testing & QA", href: "/#services" },
  { label: "Digital Marketing", href: "/#services" },
];

const socialLinks = [
  {
    icon: InstagramIcon,
    href: "https://www.instagram.com/titoitco?igsh=eGlvZzR4b2U2Z3A5",
    label: "Instagram",
  },
  {
    icon: LinkedInIcon,
    href: "https://www.linkedin.com/company/think-in-think-out/",
    label: "LinkedIn",
  },
  {
    icon: FacebookIcon,
    href: "https://www.facebook.com/thinkinthinkout2022?mibextid=ZbWKwL",
    label: "Facebook",
  },
  { icon: XIcon, href: "https://x.com/think_in_out", label: "X" },
];

// ---------------------------------------------------------------------------
// Sub components
// ---------------------------------------------------------------------------

function FooterColumnTitle({ children }: { children: React.ReactNode }) {
  return (
    <Box sx={{ mb: 2.5 }}>
      <Typography
        sx={{
          fontSize: 13,
          fontWeight: 700,
          letterSpacing: 1.2,
          color: "var(--GOLD)",
          textTransform: "uppercase",
          mb: 0.75,
        }}
      >
        {children}
      </Typography>
      <Box
        sx={{ width: 26, height: 2, bgcolor: "var(--GOLD)", borderRadius: 1 }}
      />
    </Box>
  );
}

// FooterLink handles two cases:
// 1. Different page -> "/#section" (e.g. from /contact): let Next.js Link do a
//    normal navigation to "/", the browser then jumps to the hash on load.
// 2. Same page already ("/" clicking "/#services" again, even repeatedly):
//    the URL doesn't change, so Next.js/the browser never fires a scroll on
//    its own. We detect that case and manually scrollIntoView every time.
function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const [linkPath, hash] = href.split("#");
    const targetPath = linkPath || "/";

    if (hash && pathname === targetPath) {
      e.preventDefault();
      const el = document.getElementById(hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        window.history.replaceState(null, "", `${targetPath}#${hash}`);
      }
    }
    // otherwise: different page, let NextLink navigate normally
  };

  return (
    <MuiLink
      component={NextLink}
      href={href}
      onClick={handleClick}
      underline="none"
      sx={{
        display: "block",
        fontSize: 14,
        color: TEXT_MUTED,
        mb: 1.5,
        transition: "color 0.2s ease",
        "&:hover": { color: "var(--TEXT)" },
      }}
    >
      {children}
    </MuiLink>
  );
}

function SocialIcon({ icon: Icon, href, label }: (typeof socialLinks)[number]) {
  return (
    <Box
      component="a"
      href={href}
      aria-label={label}
      target="_blank"
      rel="noopener noreferrer"
      sx={{
        width: 38,
        height: 38,
        borderRadius: "50%",
        border: "1px solid",
        borderColor: "rgba(242,169,61,0.4)",
        color: "var(--GOLD)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "background-color 0.2s ease, color 0.2s ease",
        textDecoration: "none",
        "&:hover": {
          bgcolor: "var(--GOLD)",
          color: "var(--INK)",
          "& svg": { fill: "var(--INK)" },
        },
      }}
    >
      <Icon sx={{ fontSize: 18 }} />
    </Box>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{ bgcolor: "var(--INK)", position: "relative" }}
    >
      {/* top glow line */}
      <Box
        sx={{
          height: "1px",
          width: "100%",
          background:
            "linear-gradient(to right, transparent, rgba(242,169,61,0.05) 20%, rgba(242,169,61,0.9) 50%, rgba(242,169,61,0.05) 80%, transparent)",
        }}
      />

      <Container
        maxWidth="lg"
        sx={{ pt: { xs: 5, md: 7 }, pb: { xs: 3, md: 4 } }}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "1fr 1fr",
              md: "1.4fr 1fr 1fr 1fr",
            },
            gap: { xs: 4, md: 3 },
          }}
        >
          {/* Logo + tagline */}
          <Box>
            <Link
              href="/"
              style={{ textDecoration: "none", display: "inline-block" }}
            >
              <Box
                sx={{
                  width: 80,
                  height: 80,
                  borderRadius: "50%",
                  border: "1px solid rgba(255,255,255,0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mb: 2,
                  cursor: "pointer",
                }}
              >
                <Box
                  component="img"
                  src="/img/home/logo.webp"
                  alt="Logo"
                  sx={{
                    width: "80%",
                    height: "80%",
                    objectFit: "contain",
                  }}
                />
              </Box>
            </Link>

            <Typography
              sx={{
                fontSize: 14,
                color: TEXT_MUTED,
                lineHeight: 1.6,
                maxWidth: 220,
              }}
            >
              TITO: IT solutions in Chennai, specializing in UI/UX, website
              applications, mobile applications, cybersecurity, IOT, AI and
              digital marketing.{" "}
            </Typography>
          </Box>

          {/* Company */}
          <Box>
            <FooterColumnTitle>Company</FooterColumnTitle>
            {companyLinks.map((link) => (
              <FooterLink key={link.label} href={link.href}>
                {link.label}
              </FooterLink>
            ))}
          </Box>

          {/* Services */}
          <Box>
            <FooterColumnTitle>Services</FooterColumnTitle>
            {serviceLinks.map((link) => (
              <FooterLink key={link.label} href={link.href}>
                {link.label}
              </FooterLink>
            ))}
          </Box>

          {/* Connect — email, phone, then social icons below */}
          <Box>
            <FooterColumnTitle>Connect</FooterColumnTitle>

            <Stack
              direction="row"
              spacing={1.25}
              sx={{ mb: 1.5, alignItems: "center" }}
            >
              <EmailRounded sx={{ fontSize: 18, color: "var(--GOLD)" }} />
              <Typography sx={{ fontSize: 14, color: TEXT_MUTED }}>
                info@tito.org.in
              </Typography>
            </Stack>

            <Stack
              direction="row"
              spacing={1.25}
              sx={{ mb: 2.5, alignItems: "center" }}
            >
              <CallRounded sx={{ fontSize: 18, color: "var(--GOLD)" }} />
              <Typography sx={{ fontSize: 14, color: TEXT_MUTED }}>
                +91 9499953256
              </Typography>
            </Stack>

            <Box sx={{ mb: 1 }}>
              <Typography
                sx={{
                  fontSize: 14,
                  fontWeight: 700,
                  letterSpacing: 0.5,
                  color: "var(--GOLD)",
                  mb: 0.75,
                }}
              >
                Follow us on
              </Typography>
            </Box>

            <Stack direction="row" spacing={1.25}>
              {socialLinks.map((social) => (
                <SocialIcon key={social.label} {...social} />
              ))}
            </Stack>
          </Box>
        </Box>

        {/* divider */}
        <Box sx={{ height: "1px", bgcolor: BORDER, my: { xs: 4, md: 5 } }} />

        {/* bottom bar */}
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={{ xs: 1.5, sm: 2 }}
          sx={{ alignItems: "center", justifyContent: "space-between" }}
        >
          <Typography sx={{ fontSize: 13, color: TEXT_MUTED }}>
            © 2026 TITO. All Rights Reserved.
          </Typography>

          <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
            <MuiLink
              component={NextLink}
              href="/privacy-policy"
              underline="none"
              sx={{
                fontSize: 13,
                color: TEXT_MUTED,
                "&:hover": { color: "var(--TEXT)" },
              }}
            >
              Privacy Policy
            </MuiLink>
            <Box
              sx={{ width: 4, height: 4, borderRadius: "50%", bgcolor: BORDER }}
            />
            <MuiLink
              component={NextLink}
              href="/terms-and-conditions"
              underline="none"
              sx={{
                fontSize: 13,
                color: TEXT_MUTED,
                "&:hover": { color: "var(--TEXT)" },
              }}
            >
              Terms & Conditions
            </MuiLink>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
