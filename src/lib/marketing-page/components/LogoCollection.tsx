import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { useTheme } from "@mui/system";

const whiteLogos = [
  "https://logos-world.net/wp-content/uploads/2020/09/Google-Logo.png", // Google
  "https://upload.wikimedia.org/wikipedia/commons/a/ab/Meta-Logo.png", // Meta
  "https://logos-world.net/wp-content/uploads/2020/09/Microsoft-Logo.png", // Microsoft
  "https://logodownload.org/wp-content/uploads/2021/03/binance-logo-1.png", // Binance
  "https://logodownload.org/wp-content/uploads/2017/11/amazon-web-services-logo.png", // Amazon
];

const darkLogos = [
  "https://logos-world.net/wp-content/uploads/2020/09/Google-Logo.png", // Google
  "https://upload.wikimedia.org/wikipedia/commons/a/ab/Meta-Logo.png", // Meta
  "https://logos-world.net/wp-content/uploads/2020/09/Microsoft-Logo.png", // Microsoft
  // OpenAI
  "https://logodownload.org/wp-content/uploads/2021/03/binance-logo-1.png", // Binance
  "https://logodownload.org/wp-content/uploads/2017/11/amazon-web-services-logo.png", // Amazon
];

const logoStyle = {
  width: "110px",
  height: "60px",
  margin: "30px",
  opacity: 10,
};

export default function LogoCollection() {
  const theme = useTheme();
  const logos = theme.palette.mode === "light" ? darkLogos : whiteLogos;

  return (
    <Box id="logoCollection" sx={{ py: 4 }}>
      <Typography component="p" variant="subtitle2" align="center" sx={{ color: "text.secondary" }}>
        Trusted by the best companies
      </Typography>
      <Grid container sx={{ justifyContent: "center", mt: 0.5, opacity: 0.9 }}>
        {logos.map((logo, index) => (
          <Grid item key={index}>
            <img src={logo} alt={`Fake company number ${index + 1}`} style={logoStyle} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
