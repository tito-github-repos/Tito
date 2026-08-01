"use client";

import { useEffect, useState } from "react";
import { Fab, Zoom } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const ScrollToTop = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Zoom in={show}>
      <Fab
        color="primary"
        size="medium"
        onClick={handleClick}
        sx={{
          position: "fixed",
          bottom: 30,
          right: 30,
          zIndex: 9999,

          bgcolor: "#cda06a",
          color: "#111",

          "&:hover": {
            bgcolor: "#e8caa0",
          },

          boxShadow: "0 10px 30px rgba(205,160,106,0.35)",
        }}
      >
        <KeyboardArrowUpIcon />
      </Fab>
    </Zoom>
  );
};

export default ScrollToTop;