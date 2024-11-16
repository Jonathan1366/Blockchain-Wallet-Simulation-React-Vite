import { useState, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export default function WalletPage() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch("api/transaction");
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.log("Error fetching transfer data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "transparent",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }
  return (
    <Box sx={{ p: 2 }}>
      <h1>Transferpage</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </Box>
  );
}
