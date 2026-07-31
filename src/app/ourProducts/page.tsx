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
import CategoryIcon from "@mui/icons-material/Category";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AppsIcon from "@mui/icons-material/Apps";

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
/* Data — our own in-house products (not client engagements)          */
/* ------------------------------------------------------------------ */

interface Product {
  id: number;
  title: string;
  brand: string; // product/brand name shown instead of "client"
  category: string; // one-line product category shown instead of "industry"
  status: string; // e.g. "Live", "In Development", "Beta"
  categories: string[]; // used for filter chips
  tagline: string; // short line shown on the card
  overview: string; // longer paragraph shown in the modal
  highlights: string[];
  techStack: string[];
  image: string;
}

const PRODUCTS: Product[] = [
  //   {
  //     id: 1,
  //     title: "PDF Conversion Suite",
  //     brand: "PDF Converter",
  //     category: "Document Utility Tool",
  //     status: "Live",
  //     categories: ["SaaS Tools"],
  //     tagline:
  //       "A fast, browser-based PDF toolkit for converting, compressing, merging, and splitting documents without installing any software.",
  //     overview:
  //       "Built as a self-serve utility, this product lets anyone convert files to and from PDF — Word, Excel, images, and more — along with merging, splitting, and compressing documents in the browser. The focus is speed and simplicity: drag a file in, get a clean result out, with no signup friction for casual users and account-based history for regular ones.",
  //     highlights: [
  //       "Multi-format conversion: PDF to/from Word, Excel, PPT, and images",
  //       "Client-side processing for common operations to keep files private",
  //       "Batch conversion and compression for high-volume users",
  //     ],
  //     techStack: ["Next.js", "Node.js", "pdf-lib", "AWS S3"],
  //     image: PLACEHOLDER_IMG,
  //   },
  //   {
  //     id: 2,
  //     title: "Route Optimisation Platform",
  //     brand: "Logistics Suite",
  //     category: "Logistics & Fleet Management",
  //     status: "Live",
  //     categories: ["Logistics", "IoT"],
  //     tagline:
  //       "A route optimisation engine that helps logistics teams plan smarter delivery routes, cut fuel costs, and track fleets in real time.",
  //     overview:
  //       "This product tackles the day-to-day problem logistics dispatchers face: too many stops, too little time, and rising fuel costs. It computes optimised multi-stop routes factoring in vehicle capacity, delivery windows, and live traffic, while giving fleet managers a real-time map view of every vehicle on the road.",
  //     highlights: [
  //       "Multi-stop route optimisation factoring in traffic, capacity, and time windows",
  //       "Live GPS fleet tracking with geofenced alerts",
  //       "Analytics dashboard for fuel usage, delivery times, and driver performance",
  //     ],
  //     techStack: ["Python", "OR-Tools", "Google Maps API", "React", "PostgreSQL"],
  //     image: PLACEHOLDER_IMG,
  //   },
  //   {
  //     id: 3,
  //     title: "CRM Platform",
  //     brand: "CRM Suite",
  //     category: "Customer Relationship Management",
  //     status: "Live",
  //     categories: ["SaaS Tools", "Enterprise Solutions"],
  //     tagline:
  //       "A lightweight CRM that helps sales and support teams track leads, manage pipelines, and stay on top of every customer conversation.",
  //     overview:
  //       "Built for small and mid-sized teams who found existing CRMs bloated, this product keeps the essentials front and center: pipeline tracking, contact history, task reminders, and reporting — all in one clean workspace, without the setup overhead of enterprise-grade tools.",
  //     highlights: [
  //       "Visual pipeline management with customizable deal stages",
  //       "Unified contact timeline across calls, emails, and notes",
  //       "Built-in reporting on conversion rates and team activity",
  //     ],
  //     techStack: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Redis"],
  //     image: PLACEHOLDER_IMG,
  //   },
  //   {
  //     id: 4,
  //     title: "Smart Car Parking System",
  //     brand: "Car Parking IoT",
  //     category: "IoT / Smart Infrastructure",
  //     status: "Live",
  //     categories: ["IoT"],
  //     tagline:
  //       "An IoT-based smart parking solution that detects free slots in real time and guides drivers straight to them.",
  //     overview:
  //       "Using low-cost IoT sensors installed per parking bay, this product gives facility operators a live map of slot occupancy and gives drivers turn-by-turn guidance to the nearest open space through a companion app or on-site display — cutting down the time spent circling for parking.",
  //     highlights: [
  //       "Real-time slot-level occupancy detection via IoT sensors",
  //       "Driver-facing app and digital signage showing free slots live",
  //       "Operator dashboard for occupancy trends and revenue tracking",
  //     ],
  //     techStack: ["ESP32", "MQTT", "Node.js", "React Native", "InfluxDB"],
  //     image: PLACEHOLDER_IMG,
  //   },
  {
    id: 5,
    title: "PrelimsPass",
    brand: "PrelimsPass",
    category: "MCQ-Based Exam Assessment",
    status: "Live",
    categories: ["EdTech"],
    tagline:
      "An MCQ-based exam preparation and assessment platform that helps students practice, track progress, and simulate real exam conditions.",
    overview:
      "PrelimsPass gives students a structured way to prepare for competitive exams through timed MCQ tests, subject-wise practice sets, and detailed performance analytics. It's designed to mirror real exam conditions so students walk in prepared, with progress tracking that highlights weak areas over time.",
    highlights: [
      "Timed mock tests that simulate real exam conditions",
      "Subject and topic-wise performance analytics",
      "Question bank with difficulty-based practice sets",
    ],
    techStack: ["Next.js", "TypeScript", "MySQL", "Prisma"],
    image: "/img/products/prelimspass.webp",
  },
  {
    id: 6,
    title: "2212",
    brand: "2212",
    category: "Mental Calisthenics — Kids App",
    status: "Live",
    categories: ["Kids Apps"],
    tagline:
      "A mental calisthenics app for kids that builds focus, memory, and problem-solving through short, game-like daily exercises.",
    overview:
      "2212 turns cognitive training into something kids actually want to do — short, playful daily exercises that build attention, memory, and logical thinking. Parents get simple progress tracking, while kids get a friendly, game-like experience designed to keep them coming back without screen-time guilt.",
    highlights: [
      "Bite-sized daily brain exercises tuned to a child's age group",
      "Playful, reward-driven progression to keep kids engaged",
      "Parent dashboard to track focus, memory, and problem-solving growth",
    ],
    techStack: ["Next.js", "TypeScript", "MySQL", "Prisma"],
    image: "/img/products/2212.webp",
  },
  {
    id: 7,
    title: "MenmaiFoods",
    brand: "MenmaiFoods",
    category: "E-Commerce — Food Retail",
    status: "Live",
    categories: ["E-Commerce"],
    tagline:
      "An e-commerce storefront for food retail, built for browsing, ordering, and fast checkout on any device.",
    overview:
      "MenmaiFoods needed an online store that felt as good as walking into the shop — clear product presentation, fast browsing, and a checkout flow with no friction. We built a full e-commerce platform covering catalog management, cart and checkout, and order tracking, backed by an admin panel the team runs day to day.",
    highlights: [
      "Full storefront with catalog, cart, and secure checkout",
      "Order tracking and notifications from purchase to delivery",
      "Admin panel for inventory, pricing, and promotions",
    ],
    techStack: ["Next.js", "TypeScript", "MySQL", "Prisma"],
    image: "/img/products/menmaifoods.webp",
  },
  {
    id: 8,
    title: "Drill Daily",
    brand: "Drill Daily",
    category: "Daily Fitness & Skill Drills",
    status: "Live",
    categories: ["Fitness"],
    tagline:
      "A daily drills app that keeps users consistent with short, focused fitness and skill-building routines.",
    overview:
      "Drill Daily is built around one idea: consistency beats intensity. It delivers a short, focused drill every day — fitness, mobility, or skill-based — with streak tracking and reminders that keep users showing up, rather than overwhelming them with long, complex programs.",
    highlights: [
      "Daily rotating drills with adjustable difficulty",
      "Streak tracking and reminders to build consistent habits",
      "Progress history so users can see improvement over time",
    ],
    techStack: ["Next.js", "TypeScript", "MySQL", "Prisma"],
    image: "/img/products/drilldaily.webp",
  },
  {
    id: 9,
    title: "Saturday Workshops",
    brand: "Saturday Workshops",
    category: "Community Learning & Events",
    status: "Live",
    categories: ["Community & Learning"],
    tagline:
      "A platform for discovering and booking weekend workshops, connecting learners with instructors running hands-on sessions.",
    overview:
      "Saturday Workshops makes it simple for people to find and book hands-on weekend sessions — from crafts to technology — and for instructors to list workshops, manage bookings, and reach a steady stream of local learners without running their own booking system.",
    highlights: [
      "Searchable workshop listings with instructor profiles",
      "Built-in booking, scheduling, and payment collection",
      "Instructor dashboard for managing sessions and attendees",
    ],
    techStack: ["Next.js", "TypeScript", "MySQL", "Prisma"],
    image: "/img/products/saturdayworkshops.webp",
  },
];

const FILTERS = [
  "All Products",
  //   "SaaS Tools",
  //   "Logistics",
  //   "IoT",
  "EdTech",
  "Kids Apps",
  "E-Commerce",
  "Fitness",
  "Community & Learning",
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
/* Product detail modal                                               */
/* ------------------------------------------------------------------ */

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, onClose }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  if (!product) return null;

  return (
    <Dialog
      open={Boolean(product)}
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
        src={product.image}
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
            {product.categories.map((c) => (
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
            <Chip
              label={product.status}
              size="small"
              sx={{
                bgcolor: "rgba(255,255,255,0.06)",
                color: TEXT,
                fontWeight: 600,
                fontSize: 11.5,
                letterSpacing: "0.02em",
              }}
            />
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
            {product.title}
          </Typography>
        </Stack>

        <Stack
          spacing={1.2}
          sx={{ mb: 3, animation: "fadeUp 0.5s ease-out 0.1s both" }}
        >
          <Stack direction="row" spacing={1.2} sx={{ alignItems: "center" }}>
            <AppsIcon sx={{ fontSize: 18, color: GOLD }} />
            <Typography sx={{ fontSize: 14, color: TEXT_MUTED }}>
              <Box component="span" sx={{ color: TEXT, fontWeight: 600 }}>
                {product.brand}
              </Box>
            </Typography>
          </Stack>
          <Stack direction="row" spacing={1.2} sx={{ alignItems: "center" }}>
            <CategoryIcon sx={{ fontSize: 18, color: GOLD }} />
            <Typography sx={{ fontSize: 14, color: TEXT_MUTED }}>
              {product.category}
            </Typography>
          </Stack>
          <Stack direction="row" spacing={1.2} sx={{ alignItems: "center" }}>
            <CalendarMonthIcon sx={{ fontSize: 18, color: GOLD }} />
            <Typography sx={{ fontSize: 14, color: TEXT_MUTED }}>
              {product.status}
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
          {product.overview}
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
          {product.highlights.map((h, i) => (
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
          {product.techStack.map((t) => (
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
/* Product row (alternating image/text)                                */
/* ------------------------------------------------------------------ */

interface ProductRowProps {
  product: Product;
  index: number;
  onKnowMore: (p: Product) => void;
}

const ProductRow: React.FC<ProductRowProps> = ({
  product,
  index,
  onKnowMore,
}) => {
  const imageFirst = index % 2 === 0;
  const { ref, visible } = useRevealOnScroll<HTMLDivElement>();

  const ImageBlock = (
    <Box
      className="product-image-frame"
      sx={{
        borderRadius: "12px",
        overflow: "hidden",
        border: `1px solid ${BORDER}`,
        bgcolor: "#000",
        boxShadow: "0 20px 40px rgba(0,0,0,0.35)",
        transition: "box-shadow 0.4s ease, border-color 0.4s ease",
      }}
    >
      {/* <Box
        component="img"
        src={product.image}
        alt={`${product.title} preview`}
        sx={{
          width: "100%",
          height: { xs: 220, sm: 280, md: 320 },
          objectFit: "cover",
          objectPosition: "top center",
          display: "block",
          transition: "transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
          ".product-row:hover &": {
            transform: "scale(1.06)",
          },
        }}
      /> */}
      <Box
        component="img"
        src={product.image}
        alt={`${product.title} preview`}
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
        {product.title}
      </Typography>
      <Typography
        sx={{
          fontSize: 12.5,
          fontWeight: 600,
          letterSpacing: "0.03em",
          color: GOLD_SOFT,
        }}
      >
        {product.category}
      </Typography>
      <Typography
        sx={{
          fontSize: 14.5,
          lineHeight: 1.7,
          color: TEXT_MUTED,
          maxWidth: 480,
        }}
      >
        {product.tagline}
      </Typography>
      <Stack
        direction="row"
        spacing={1}
        useFlexGap
        sx={{ pt: 0.5, flexWrap: "wrap" }}
      >
        {product.techStack.slice(0, 4).map((t) => (
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
          onClick={() => onKnowMore(product)}
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
      className="product-row"
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
        "&:hover .product-image-frame": {
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

const OurProducts: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>("All Products");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const filteredProducts = useMemo(() => {
    if (activeFilter === "All Products") return PRODUCTS;
    return PRODUCTS.filter((p) => p.categories.includes(activeFilter));
  }, [activeFilter]);

  return (
    <Box
      component="section"
      sx={{
        bgcolor: INK,
        width: "100%",
        pt: { xs: 10, md: 13 },
        pb: { xs: 7, md: 6 },
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
                WHAT WE BUILD
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
                Products
              </Box>
            </Typography>
            <Typography
              sx={{
                width: "100%",
                textAlign: "center",
                fontSize: { xs: 14.5, md: 16 },
                color: TEXT_MUTED,
                maxWidth: 560,
                mx: "auto",
              }}
            >
              In-house products spanning Community & Learning, education, fitness, and
              e-commerce — built and maintained by our own team.
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

        {/* Product list */}
        <Box>
          {filteredProducts.map((product, i) => (
            <ProductRow
              key={product.id}
              product={product}
              index={i}
              onKnowMore={setSelectedProduct}
            />
          ))}
        </Box>
      </Container>

      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </Box>
  );
};

export default OurProducts;
