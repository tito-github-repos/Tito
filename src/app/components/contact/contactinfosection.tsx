import React, { useState, useRef, type ChangeEvent } from "react";
import * as yup from "yup";
import {
  Alert,
  Box,
  Container,
  Grid,
  Typography,
  TextField,
  Button,
  InputAdornment,
  Divider,
} from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import PlaceIcon from "@mui/icons-material/Place";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PersonOutlineIcon from "@mui/icons-material/PersonOutlined";
import MailOutlineIcon from "@mui/icons-material/MailOutlined";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import NotesIcon from "@mui/icons-material/Notes";
import SendIcon from "@mui/icons-material/Send";
import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";

/* ---------------------------------------------------------------------- */
/* Shared design tokens (match ContactHero)                               */
/* ---------------------------------------------------------------------- */
const GOLD = "#cda06a";
const GOLD_SOFT = "#e8caa0";
const INK = "#0b0b0c";
const PANEL = "#141416";
const TEXT = "#f5f4f2";
const TEXT_MUTED = "rgba(245, 244, 242, 0.68)";

/* ---------------------------------------------------------------------- */
/* Validation                                                              */
/* ---------------------------------------------------------------------- */
const isRepeatedDigits = (value: string) => /^(\d)\1{9}$/.test(value);

const isSequential = (value: string) => {
  const ascending = "01234567890123456789"; // covers wrap-around sequences
  const descending = "98765432109876543210";
  return ascending.includes(value) || descending.includes(value);
};

const contactSchema = yup.object({
  name: yup
    .string()
    .required("Full name is required")
    .matches(/^[A-Za-z ]+$/, "Only alphabets are allowed")
    .min(3, "Name must be at least 3 characters"),

  email: yup
    .string()
    .required("Email address is required")
    .matches(/^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/, "Enter a valid email address"),

  mobile: yup
    .string()
    .required("Mobile number is required")
    .matches(/^[6-9]\d{9}$/, "Enter a valid 10-digit phone number")
    .test(
      "no-repeated-digits",
      "Mobile number cannot be all the same digit",
      (value) => !value || !isRepeatedDigits(value),
    )
    .test(
      "no-sequential-digits",
      "Mobile number cannot be a sequential number",
      (value) => !value || !isSequential(value),
    ),

  note: yup
    .string()
    .required("Please leave a note")
    .min(10, "Note must be at least 10 characters"),
});

/* ---------------------------------------------------------------------- */
/* Info row — now a horizontal item: icon left, label+value stacked right */
/* ---------------------------------------------------------------------- */
interface InfoRowProps {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
  isLast?: boolean;
}

const InfoRow: React.FC<InfoRowProps> = ({ icon, label, children, isLast }) => (
  <Box>
    <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2, py: 2.25 }}>
      <Box
        sx={{
          flexShrink: 0,
          width: 46,
          height: 46,
          borderRadius: "50%",
          bgcolor: "rgba(205,160,106,0.10)",
          border: "1px solid rgba(205,160,106,0.35)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: GOLD,
          fontSize: 20,
        }}
      >
        {icon}
      </Box>
      <Box sx={{ pt: 0.25 }}>
        <Typography
          sx={{
            fontFamily: "'Poppins','Segoe UI',system-ui,sans-serif",
            fontWeight: 600,
            fontSize: 15.5,
            color: TEXT,
            mb: 0.4,
          }}
        >
          {label}
        </Typography>
        <Typography
          sx={{
            fontFamily: "'Inter','Segoe UI',system-ui,sans-serif",
            fontSize: 14,
            lineHeight: 1.65,
            color: TEXT_MUTED,
          }}
        >
          {children}
        </Typography>
      </Box>
    </Box>
    {!isLast && <Divider sx={{ borderColor: "rgba(255,255,255,0.08)" }} />}
  </Box>
);

/* ---------------------------------------------------------------------- */
/* Form state                                                             */
/* ---------------------------------------------------------------------- */
interface ContactFormValues {
  name: string;
  email: string;
  mobile: string;
  note: string;
}

const ContactInfoSection: React.FC = () => {
  const [values, setValues] = useState<ContactFormValues>({
    name: "",
    email: "",
    mobile: "",
    note: "",
  });
  const [errors, setErrors] = useState<ContactFormValues>({
    name: "",
    email: "",
    mobile: "",
    note: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  // --- Anti-spam additions ---
  // Honeypot: real users never see or fill this. Bots that auto-fill every
  // input on the page will populate it, which lets the server reject them.
  const [honeypot, setHoneypot] = useState("");

  // Cloudflare Turnstile token, produced once the widget verifies the visitor.
  const [turnstileToken, setTurnstileToken] = useState("");
  const [turnstileError, setTurnstileError] = useState("");
  const turnstileRef = useRef<TurnstileInstance>(null);

  // Debounce timers per field, so validation doesn't re-run on every
  // keystroke — this also reduces render churn that can trip React's
  // "Maximum update depth" guard when a browser extension (Grammarly,
  // spell-checkers, autofill) mutates a controlled textarea's DOM node.
  const validateTimers = useRef<Partial<Record<keyof ContactFormValues, ReturnType<typeof setTimeout>>>>({});

  const validateField = async (
    field: keyof ContactFormValues,
    updatedValues: ContactFormValues,
  ) => {
    try {
      await contactSchema.validateAt(field, updatedValues);
      setErrors((prev) => ({ ...prev, [field]: "" }));
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        setErrors((prev) => ({ ...prev, [field]: err.message }));
      }
    }
  };

  const handleChange =
    (field: keyof ContactFormValues) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const rawValue = e.target.value;
      const nextValue =
        field === "mobile"
          ? rawValue.replace(/\D/g, "").slice(0, 10)
          : rawValue;

      const updatedValues = { ...values, [field]: nextValue };
      setValues(updatedValues);

      // Debounce validation per field (250ms)
      if (validateTimers.current[field]) {
        clearTimeout(validateTimers.current[field]);
      }
      validateTimers.current[field] = setTimeout(() => {
        validateField(field, updatedValues);
      }, 250);
    };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSuccess(false);
    setTurnstileError("");

    if (!turnstileToken) {
      setTurnstileError("Please complete the verification check.");
      return;
    }

    setSubmitting(true);

    try {
      await contactSchema.validate(values, { abortEarly: false });

      setErrors({
        name: "",
        email: "",
        mobile: "",
        note: "",
      });

      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...values,
          honeypot, // should always be empty for real users
          turnstileToken,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        alert(result.message || "Something went wrong. Please try again.");
        // Reset the widget so the user can retry with a fresh token
        turnstileRef.current?.reset();
        setTurnstileToken("");
        return;
      }

      setSuccess(true);

      setValues({
        name: "",
        email: "",
        mobile: "",
        note: "",
      });
      setHoneypot("");
      turnstileRef.current?.reset();
      setTurnstileToken("");
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        const formErrors: ContactFormValues = {
          name: "",
          email: "",
          mobile: "",
          note: "",
        };

        err.inner.forEach((validationError) => {
          if (validationError.path) {
            formErrors[validationError.path as keyof ContactFormValues] =
              validationError.message;
          }
        });

        setErrors(formErrors);
      } else {
        console.error(err);
        alert("Something went wrong. Please try again.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  /** Shared style for the dark, rounded text fields used in the form */
  const fieldSx = {
    "& .MuiOutlinedInput-root": {
      bgcolor: "rgba(255,255,255,0.03)",
      borderRadius: "10px",
      color: TEXT,
      "& fieldset": { borderColor: "rgba(255,255,255,0.14)" },
      "&:hover fieldset": { borderColor: "rgba(205,160,106,0.5)" },
      "&.Mui-focused fieldset": { borderColor: GOLD },
    },
    "& .MuiInputBase-input::placeholder": {
      color: TEXT_MUTED,
      opacity: 1,
    },
  };

  return (
    <Box
      component="section"
      sx={{ bgcolor: INK, pt: { xs: 3, md: 4 }, pb: { xs: 6, md: 9 } }}
    >
      <Container maxWidth="xl" sx={{ px: { xs: 2.5, sm: 4, md: 6, lg: 8 } }}>
        {/* ================= TOP: info list (left) + form (right) ================= */}
        <Grid
          container
          spacing={{ xs: 5, md: 6 }}
          sx={{ mb: { xs: 5, md: 7 } }}
        >
          {/* ---------------- LEFT: info list ---------------- */}
          <Grid size={{ xs: 12, md: 6, lg: 5 }}>
            <Box
              sx={{
                bgcolor: PANEL,
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "16px",
                p: { xs: 2.5, md: 3 },
                height: "100%",
              }}
            >
              <Typography
                sx={{
                  fontFamily: "'Poppins','Segoe UI',system-ui,sans-serif",
                  fontSize: 13,
                  fontWeight: 600,
                  letterSpacing: "0.18em",
                  color: GOLD,
                  mb: 1,
                }}
              >
                GET IN TOUCH
              </Typography>
              <Typography
                sx={{
                  fontFamily: "'Poppins','Segoe UI',system-ui,sans-serif",
                  fontWeight: 600,
                  fontSize: { xs: 19, md: 21 },
                  color: TEXT,
                  mb: 1,
                }}
              >
                Contact Information
              </Typography>

              <InfoRow
                icon={<PhoneIcon fontSize="inherit" />}
                label="Phone No."
              >
                +91 94999 53256
              </InfoRow>
              <InfoRow icon={<EmailIcon fontSize="inherit" />} label="E-mail">
                info@tito.org.in
              </InfoRow>
              <InfoRow icon={<PlaceIcon fontSize="inherit" />} label="Address">
                Chennai TITO, #5 Sundararajan Street, Abhiramapuram, Chennai -
                600018
                <br />
                USA - 7253 W Sunset Ave, Suite C, Springdale AR 72762.
              </InfoRow>
              <InfoRow
                icon={<AccessTimeIcon fontSize="inherit" />}
                label="Opening Hours"
                isLast
              >
                Monday - Friday
                <br />
                (9:00 AM to 6:00 PM)
              </InfoRow>
            </Box>
          </Grid>

          {/* ---------------- RIGHT: message form ---------------- */}
          <Grid size={{ xs: 12, md: 6, lg: 7 }}>
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{
                bgcolor: PANEL,
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "16px",
                p: { xs: 3, md: 4 },
                height: "100%",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                  mb: 0.5,
                }}
              >
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    bgcolor: "rgba(205,160,106,0.12)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: GOLD,
                  }}
                >
                  <MailOutlineIcon fontSize="small" />
                </Box>
                <Typography
                  sx={{
                    fontFamily: "'Poppins','Segoe UI',system-ui,sans-serif",
                    fontWeight: 600,
                    fontSize: { xs: 19, md: 21 },
                    color: TEXT,
                  }}
                >
                  Send Us a Message
                </Typography>
              </Box>

              <Typography
                sx={{
                  fontFamily: "'Inter','Segoe UI',system-ui,sans-serif",
                  fontSize: 13.5,
                  color: TEXT_MUTED,
                  mb: 3,
                }}
              >
                Fill in the form below and our team will get back to you.
              </Typography>

              {success && (
                <Alert
                  severity="success"
                  sx={{ mb: 2.5, borderRadius: "10px" }}
                >
                  Your message has been sent successfully. We&apos;ll get back
                  to you soon.
                </Alert>
              )}

              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    name="name"
                    placeholder="Your Name"
                    value={values.name}
                    onChange={handleChange("name")}
                    error={!!errors.name}
                    helperText={errors.name}
                    sx={fieldSx}
                    slotProps={{
                      input: {
                        startAdornment: (
                          <InputAdornment position="start">
                            <PersonOutlineIcon
                              sx={{ color: GOLD, fontSize: 20 }}
                            />
                          </InputAdornment>
                        ),
                      },
                    }}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    name="email"
                    placeholder="Your E-mail"
                    value={values.email}
                    onChange={handleChange("email")}
                    error={!!errors.email}
                    helperText={errors.email}
                    sx={fieldSx}
                    slotProps={{
                      input: {
                        startAdornment: (
                          <InputAdornment position="start">
                            <MailOutlineIcon
                              sx={{ color: GOLD, fontSize: 20 }}
                            />
                          </InputAdornment>
                        ),
                      },
                    }}
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    name="mobile"
                    placeholder="Mobile Number"
                    value={values.mobile}
                    onChange={handleChange("mobile")}
                    error={!!errors.mobile}
                    helperText={errors.mobile}
                    sx={fieldSx}
                    slotProps={{
                      htmlInput: {
                        maxLength: 10,
                        inputMode: "numeric",
                      },
                      input: {
                        startAdornment: (
                          <InputAdornment position="start">
                            <PhoneIphoneIcon
                              sx={{ color: GOLD, fontSize: 20 }}
                            />
                          </InputAdornment>
                        ),
                      },
                    }}
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    multiline
                    minRows={4}
                    name="note"
                    placeholder="Leave a Note"
                    value={values.note}
                    onChange={handleChange("note")}
                    error={!!errors.note}
                    helperText={errors.note}
                    sx={fieldSx}
                    slotProps={{
                      htmlInput: {
                        spellCheck: false,
                        "data-gramm": "false",
                        "data-gramm_editor": "false",
                        "data-enable-grammarly": "false",
                      },
                      input: {
                        startAdornment: (
                          <InputAdornment
                            position="start"
                            sx={{ alignSelf: "flex-start", mt: 1.25 }}
                          >
                            <NotesIcon sx={{ color: GOLD, fontSize: 20 }} />
                          </InputAdornment>
                        ),
                      },
                    }}
                  />
                </Grid>

                {/* ---------------- Honeypot field (hidden from real users) ---------------- */}
                <Box
                  sx={{
                    position: "absolute",
                    left: "-9999px",
                    width: "1px",
                    height: "1px",
                    overflow: "hidden",
                  }}
                  aria-hidden="true"
                >
                  <TextField
                    name="company_website"
                    label="Company Website"
                    tabIndex={-1}
                    autoComplete="off"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                  />
                </Box>

                {/* ---------------- Cloudflare Turnstile widget ---------------- */}
                <Grid size={{ xs: 12 }}>
                  <Turnstile
                    ref={turnstileRef}
                    siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
                    onSuccess={(token) => {
                      setTurnstileToken(token);
                      setTurnstileError("");
                    }}
                    onExpire={() => setTurnstileToken("")}
                    onError={() =>
                      setTurnstileError("Verification failed. Please retry.")
                    }
                  />
                  {turnstileError && (
                    <Typography
                      sx={{
                        color: "#f28b82",
                        fontSize: 12.5,
                        mt: 1,
                      }}
                    >
                      {turnstileError}
                    </Typography>
                  )}
                </Grid>

                <Grid size={{ xs: 12 }}>
                  <Button
                    type="submit"
                    fullWidth
                    disabled={submitting}
                    endIcon={<SendIcon />}
                    sx={{
                      mt: 4,
                      py: 1.5,
                      borderRadius: "10px",
                      textTransform: "none",
                      fontFamily: "'Poppins','Segoe UI',system-ui,sans-serif",
                      fontWeight: 600,
                      fontSize: 15,
                      color: "#1a1408",
                      background: `linear-gradient(135deg, ${GOLD_SOFT}, ${GOLD})`,
                      boxShadow: "none",
                      "&:hover": {
                        background: `linear-gradient(135deg, ${GOLD}, ${GOLD_SOFT})`,
                        boxShadow: "none",
                      },
                    }}
                  >
                    {submitting ? "Sending..." : "Send Message"}
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>

        {/* ================= BOTTOM: maps, full width ================= */}
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Box
              sx={{
                borderRadius: "12px",
                overflow: "hidden",
                border: "1px solid rgba(255,255,255,0.08)",
                lineHeight: 0,
              }}
            >
              <iframe
                title="TITO Chennai location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.112059697217!2d80.17555687471508!3d13.02853531362822!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5261629a0e3859%3A0x4989aba0fb39a0ae!2sLumieres%20Enclave!5e0!3m2!1sen!2sin!4v1750402386050!5m2!1sen!2sin"
                width="100%"
                height="320"
                style={{ border: 0, display: "block" }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
            </Box>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Box
              sx={{
                borderRadius: "12px",
                overflow: "hidden",
                border: "1px solid rgba(255,255,255,0.08)",
                lineHeight: 0,
              }}
            >
              <iframe
                title="TITO Springdale location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3220.645110901764!2d-94.21394842458756!3d36.17518970268252!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x87c96d38f1a6b179%3A0x91d6f064a4ecdb0f!2s7253%20W%20Sunset%20Ave%2C%20Springdale%2C%20AR%2072762%2C%20USA!5e0!3m2!1sen!2sin!4v1749826510725!5m2!1sen!2sin"
                width="100%"
                height="320"
                style={{ border: 0, display: "block" }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ContactInfoSection;