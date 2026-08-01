"use client";

import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Container,
  Typography,
  Button,
  Stack,
  Menu,
  MenuItem,
  IconButton,
  Drawer,
  Divider,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";

const GOLD = "#cda06a";
const GOLD_SOFT = "#e8caa0";
const TEXT = "#f5f4f2";
const TEXT_MUTED = "rgba(245,244,242,.72)";

interface NavLink {
  label: string;
  path: string;
}

const NAV_LINKS: NavLink[] = [
  { label: "Services", path: "/#services" },
  { label: "Projects", path: "/ourProjects" },
  { label: "Products", path: "/ourProducts" },
];

const COMPANY_LINKS: NavLink[] = [
  { label: "Our Team", path: "/#team" },
  { label: "Our Expertise", path: "/#expertise" },
];

const Header: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();

  const [scrolled, setScrolled] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileCompanyOpen, setMobileCompanyOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const companyOpen = Boolean(anchorEl);
  const handleCompanyEnter = (e: React.MouseEvent<HTMLElement>) =>
    setAnchorEl(e.currentTarget);
  const handleCompanyClose = () => setAnchorEl(null);

  const go = (path: string) => {
    const [target, hash] = path.split("#");
    const targetPath = target || "/";

    if (hash) {
      if (pathname === targetPath) {
        // already on the right page — just scroll, don't re-navigate
        const el = document.getElementById(hash);
        el?.scrollIntoView({ behavior: "smooth", block: "start" });
        window.history.replaceState(null, "", `${targetPath}#${hash}`);
      } else {
        // different page — navigate fresh, hash included from the start
        router.push(`${targetPath}#${hash}`);
      }
    } else {
      router.push(targetPath);
    }

    handleCompanyClose();
    setMobileOpen(false);
  };

  //   const isActive = (path: string) => pathname?.startsWith(path);

  const isActive = (path: string) => pathname?.startsWith(path);
  const isProjectsPage = pathname === "/ourProjects";
  const showSolidHeader = scrolled || isProjectsPage;

  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  useEffect(() => {
    if (isDesktop && mobileOpen) {
      setMobileOpen(false);
    }
  }, [isDesktop, mobileOpen]);

  return (
    <div>
      <AppBar
        component="header"
        elevation={0}
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1200,

          backgroundColor: showSolidHeader ? "rgba(8,8,8,.85)" : "transparent",
          backdropFilter: showSolidHeader ? "blur(14px)" : "none",
          borderBottom: showSolidHeader
            ? "1px solid rgba(205,160,106,.18)"
            : "1px solid transparent",
          boxShadow: showSolidHeader ? "0 8px 30px rgba(0,0,0,.35)" : "none",

          transition:
            "background-color .35s ease, backdrop-filter .35s ease, border-color .35s ease, box-shadow .35s ease",
        }}
      >
        {/* <AppBar
        component="header"
        elevation={0}
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1200,

          backgroundColor: scrolled ? "rgba(8,8,8,.85)" : "transparent",
          backdropFilter: scrolled ? "blur(14px)" : "none",
          borderBottom: scrolled
            ? "1px solid rgba(205,160,106,.18)"
            : "1px solid transparent",
          boxShadow: scrolled ? "0 8px 30px rgba(0,0,0,.35)" : "none",

          transition:
            "background-color .35s ease, backdrop-filter .35s ease, border-color .35s ease, box-shadow .35s ease",
        }}
      > */}
        <Container maxWidth="lg">
          <Toolbar
            disableGutters
            sx={{
              minHeight: { xs: 64, md: 76 },
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {/* ================= LOGO ================= */}
            <Box
              onClick={() => go("/")}
              sx={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              <Image
                src="/img/home/logo.webp"
                alt="TITO logo"
                width={140}
                height={40}
                priority
                style={{
                  height: "auto",
                  width: "auto",
                  maxHeight: 50,
                }}
              />
            </Box>

            {/* ================= DESKTOP NAV ================= */}
            <Stack
              direction="row"
              spacing={1}
              sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}
            >
              {NAV_LINKS.map((link) => (
                <Button
                  key={link.path}
                  onClick={() => go(link.path)}
                  sx={{
                    px: 2,
                    py: 1,
                    textTransform: "none",
                    fontFamily: "Poppins",
                    fontSize: 14.5,
                    fontWeight: 500,
                    borderRadius: "8px",
                    color: isActive(link.path) ? GOLD : TEXT,
                    position: "relative",
                    "&:hover": {
                      color: GOLD,
                      backgroundColor: "rgba(205,160,106,.08)",
                    },
                  }}
                >
                  {link.label}
                </Button>
              ))}

              {/* Our Company dropdown */}
              <Box
                onMouseEnter={handleCompanyEnter}
                onMouseLeave={handleCompanyClose}
              >
                <Button
                  endIcon={
                    <KeyboardArrowDownIcon
                      sx={{
                        transition: "transform .25s ease",
                        transform: companyOpen
                          ? "rotate(180deg)"
                          : "rotate(0deg)",
                      }}
                    />
                  }
                  sx={{
                    px: 2,
                    py: 1,
                    textTransform: "none",
                    fontFamily: "Poppins",
                    fontSize: 14.5,
                    fontWeight: 500,
                    borderRadius: "8px",
                    color: companyOpen ? GOLD : TEXT,
                    "&:hover": {
                      color: GOLD,
                      backgroundColor: "rgba(205,160,106,.08)",
                    },
                  }}
                >
                  Our Company
                </Button>

                <Menu
                  anchorEl={anchorEl}
                  open={companyOpen}
                  onClose={handleCompanyClose}
                  disableScrollLock
                  anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                  transformOrigin={{ vertical: "top", horizontal: "left" }}
                  slotProps={{
                    list: {
                      onMouseLeave: handleCompanyClose,
                      sx: { py: 1 },
                    },
                    paper: {
                      sx: {
                        mt: 1,
                        minWidth: 190,
                        backgroundColor: "rgba(12,12,12,.96)",
                        backdropFilter: "blur(14px)",
                        border: "1px solid rgba(205,160,106,.18)",
                        borderRadius: "10px",
                        boxShadow: "0 20px 45px rgba(0,0,0,.5)",
                      },
                    },
                  }}
                >
                  {COMPANY_LINKS.map((link) => (
                    <MenuItem
                      key={link.path}
                      onClick={() => go(link.path)}
                      sx={{
                        fontFamily: "Poppins",
                        fontSize: 14,
                        fontWeight: 500,
                        color: TEXT_MUTED,
                        py: 1.1,
                        px: 2.5,
                        "&:hover": {
                          color: GOLD,
                          backgroundColor: "rgba(205,160,106,.08)",
                        },
                      }}
                    >
                      {link.label}
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            </Stack>

            {/* ================= CONTACT CTA (desktop) ================= */}
            <Box sx={{ display: { xs: "none", md: "block" } }}>
              <Button
                onClick={() => go("/contact")}
                sx={{
                  px: 3,
                  py: 1.1,
                  borderRadius: "10px",
                  textTransform: "none",
                  fontFamily: "Poppins",
                  fontSize: 14,
                  fontWeight: 600,
                  color: "#1b1308",
                  background: `linear-gradient(135deg, ${GOLD_SOFT}, ${GOLD})`,
                  boxShadow: "0 8px 22px rgba(205,160,106,.28)",
                  transition: "all .3s ease",
                  "&:hover": {
                    transform: "translateY(-3px)",
                    boxShadow: "0 12px 30px rgba(205,160,106,.4)",
                    background: `linear-gradient(135deg, ${GOLD}, ${GOLD_SOFT})`,
                  },
                }}
              >
                Contact Us
              </Button>
            </Box>

            {/* ================= MOBILE MENU BUTTON ================= */}
            <IconButton
              onClick={() => setMobileOpen(true)}
              sx={{
                display: { xs: "flex", md: "none" },
                color: TEXT,
                border: "1px solid rgba(255,255,255,.14)",
                borderRadius: "8px",
              }}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>

      {/* ================= MOBILE DRAWER ================= */}
      <Drawer
        anchor="right"
        open={mobileOpen && !isDesktop}
        onClose={() => setMobileOpen(false)}
        slotProps={{
          paper: {
            sx: {
              width: 280,
              backgroundColor: "#0a0a0a",
              backgroundImage: "none",
              borderLeft: "1px solid rgba(205,160,106,.18)",
              p: 3,
            },
          },
        }}
      >
        <Stack
          direction="row"
          sx={{ mb: 3, justifyContent: "space-between", alignItems: "center" }}
        >
          <Typography
            sx={{
              fontFamily: "Poppins",
              fontWeight: 700,
              fontSize: 18,
              color: TEXT,
            }}
          >
            Menu
          </Typography>
          <IconButton onClick={() => setMobileOpen(false)} sx={{ color: TEXT }}>
            <CloseIcon />
          </IconButton>
        </Stack>

        <Stack spacing={0.5}>
          {NAV_LINKS.map((link) => (
            <Button
              key={link.path}
              onClick={() => go(link.path)}
              sx={{
                justifyContent: "flex-start",
                textTransform: "none",
                fontFamily: "Poppins",
                fontSize: 15,
                fontWeight: 500,
                py: 1.2,
                color: isActive(link.path) ? GOLD : TEXT,
              }}
            >
              {link.label}
            </Button>
          ))}

          <Button
            onClick={() => setMobileCompanyOpen((v) => !v)}
            endIcon={
              <KeyboardArrowDownIcon
                sx={{
                  transition: "transform .25s ease",
                  transform: mobileCompanyOpen
                    ? "rotate(180deg)"
                    : "rotate(0deg)",
                }}
              />
            }
            sx={{
              justifyContent: "space-between",
              textTransform: "none",
              fontFamily: "Poppins",
              fontSize: 15,
              fontWeight: 500,
              py: 1.2,
              color: TEXT,
            }}
          >
            Our Company
          </Button>

          {mobileCompanyOpen && (
            <Stack spacing={0.5} sx={{ pl: 2 }}>
              {COMPANY_LINKS.map((link) => (
                <Button
                  key={link.path}
                  onClick={() => go(link.path)}
                  sx={{
                    justifyContent: "flex-start",
                    textTransform: "none",
                    fontFamily: "Poppins",
                    fontSize: 14,
                    fontWeight: 500,
                    py: 1,
                    color: TEXT_MUTED,
                  }}
                >
                  {link.label}
                </Button>
              ))}
            </Stack>
          )}

          <Divider sx={{ my: 2, borderColor: "rgba(255,255,255,.1)" }} />

          <Button
            onClick={() => go("/contact")}
            sx={{
              py: 1.2,
              borderRadius: "10px",
              textTransform: "none",
              fontFamily: "Poppins",
              fontSize: 14.5,
              fontWeight: 600,
              color: "#1b1308",
              background: `linear-gradient(135deg, ${GOLD_SOFT}, ${GOLD})`,
            }}
          >
            Contact Us
          </Button>
        </Stack>
      </Drawer>
    </div>
  );
};

export default Header;
