import { Box } from "@mui/material";

export default function MarqueeComponent() {
  return (
    <Box
      sx={(theme) => ({
        width: "100%",
        minHeight: "10vh",
        backgroundColor: "#121212",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        ...theme.applyStyles("dark", {}),
      })}
    >
      <gecko-coin-price-marquee-widget coin-ids="" initial-currency="usd" dark-mode="true"></gecko-coin-price-marquee-widget>
    </Box>
  );
}
