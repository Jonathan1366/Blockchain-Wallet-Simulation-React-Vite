import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import InputLabel from "@mui/material/InputLabel";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import { visuallyHidden } from "@mui/utils";
// import { styled } from "@mui/material/styles";

// const StyledBox = styled("div")(({ theme }) => ({
//   alignSelf: "center",
//   width: "100%",
//   height: 400,
//   marginTop: theme.spacing(8),
//   borderRadius: theme.shape.borderRadius,
//   outline: "6px solid",
//   outlineColor: "hsla(220, 25%, 80%, 0.2)",
//   border: "1px solid",
//   borderColor: theme.palette.grey[200] || "rgba(255, 255, 255, 0.2)",
//   boxShadow: "0 0 12px 8px hsla(220, 25%, 80%, 0.2)",
//   backgroundSize: "cover",
//   [theme.breakpoints.up("sm")]: {
//     marginTop: theme.spacing(10),
//     height: 700,
//   },
//   ...theme.applyStyles("dark", {
//     boxShadow: "0 0 24px 12px hsla(210, 100%, 25%, 0.2)",
//     outlineColor: "hsla(220, 20%, 42%, 0.1)",
//     borderColor: theme.palette.grey[700],
//   }),
// }));

export default function Hero() {
  return (
    <Box
      id="hero"
      sx={(theme) => ({
        width: "100%",
        minHeight: "100vh",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        ...theme.applyStyles("dark", {}),
      })}
    >
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          pt: { xs: 14, sm: 20 },
          pb: { xs: 8, sm: 12 },
          minHeight: "80vh",
        }}
      >
        <Stack spacing={2} useFlexGap sx={{ alignItems: "center", width: { xs: "100%", sm: "70%" } }}>
          <Typography
            variant="h1"
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              alignItems: "center",
              fontSize: "clamp(3rem, 10vw, 3.5rem)",
            }}
          >
            Your&nbsp;crypto&nbsp;
            <Typography
              component="span"
              variant="h1"
              sx={(theme) => ({
                fontSize: "inherit",
                color: "primary.main",
                ...theme.applyStyles("dark", {
                  color: "primary.light",
                }),
              })}
            >
              products
            </Typography>
          </Typography>
          <Typography
            sx={{
              textAlign: "center",
              color: "text.secondary",
              width: { sm: "100%", md: "80%" },
            }}
          >
            Securely store, trade, and manage your Bitcoin and other cryptocurrencies with our state-of-the-art crypto wallet. Join a growing community of investors and elevate your trading experience with advanced security features and seamless access to the crypto markets.
          </Typography>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={1} useFlexGap sx={{ pt: 2, width: { xs: "100%", sm: "350px" } }}>
            <InputLabel htmlFor="email-hero" sx={visuallyHidden}>
              Email
            </InputLabel>
            <TextField
              id="email-hero"
              hiddenLabel
              size="small"
              variant="outlined"
              aria-label="Enter your email address"
              placeholder="Your email address"
              fullWidth
              slotProps={{
                htmlInput: {
                  autoComplete: "off",
                  "aria-label": "Enter your email address",
                },
              }}
            />
            <Button variant="contained" color="primary" size="small" sx={{ minWidth: "fit-content" }}>
              Start now
            </Button>
          </Stack>
          <Typography variant="caption" color="text.secondary" sx={{ textAlign: "center" }}>
            By clicking &quot;Get started&quot; you agree to our&nbsp;
            <Link href="#" color="primary">
              Terms & Conditions
            </Link>
            .
          </Typography>
          <Box
            sx={{
              width: "100%",
              maxWidth: "800px",
              mt: 4,
              aspectRatio: "16/9",
            }}
          >
            <iframe width="100%" height="100%" src="https://www.youtube.com/embed/MUMy65l-6NE" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
