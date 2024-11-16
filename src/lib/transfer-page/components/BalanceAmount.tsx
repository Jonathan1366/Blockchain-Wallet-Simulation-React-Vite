import { Container, Box, Typography, Button, TextField, CircularProgress, Dialog, DialogContent, IconButton, Card, CardContent } from "@mui/material";
import { useState } from "react";
import swapIcon from "duitf2024/src/assets/images/swap.png";
import bitcoin from "duitf2024/src/assets/images/Bitcoin-Logo.png";
import { useBalance } from "../context/BalanceContext";
import { getMempool, mineTransactions, sendMoney } from "../../../services/api";
import CloseIcon from "@mui/icons-material/Close";

export default function BalanceAmount() {
  const { balance, loading, setUserID, userID } = useBalance();
  const [showTextField, setshowTextField] = useState<boolean>(false);
  const [inputID, setInputID] = useState<number | undefined>(undefined); // Set as number or undefined
  const [sendDialogOpen, setSendDialogOpen] = useState(false);
  const [targetUserID, setTargetUserID] = useState<number | undefined>(undefined);
  const [amount, setAmount] = useState<number | undefined>(undefined);
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [successData, setSuccessData] = useState<{ message: string; amount: number; sender_id: number; receiver_id: number; hash: string; signature: string; time: string } | null>(null);
  const [isMining, setIsMining] = useState(false);
  const [mempoolData, setMempoolData] = useState<Transaction[] | null>(null);

  type Transaction = {
    id: number;
    sender_id: number;
    receiver_id: number;
    amount: number;
    signature: string;
    transaction_hash: string;
    waktu: string;
  };

  function handleSwapClick() {
    if (!showTextField) {
      setshowTextField(true);
    } else if (inputID !== undefined) {
      console.log("Stting user ID to:", inputID);
      setUserID(inputID);
      setInputID(undefined); // Clear input after setting
    } else {
      console.error("invalid id input");
    }
  }
  const handleSendClick = async () => {
    setSendDialogOpen(true); //open dialog
  };

  const handleDialogClose = () => {
    setSendDialogOpen(false); //close dialog
  };

  const handleTransaction = async () => {
    if (userID !== null && targetUserID !== undefined && amount !== undefined && amount > 0) {
      setSending(true);
      try {
        const responseData = await sendMoney(userID, targetUserID, amount);
        console.log("Response Data:", responseData); // Add this line to inspect the response
        setSuccessData(responseData.data);
        setSuccess(true);
      } catch (error) {
        console.error("Transaction failed", error);
        alert("Transcation failed. Please try again");
      } finally {
        setSending(false);
        handleDialogClose();
        setTargetUserID(undefined);
        setAmount(undefined);
      }
    } else {
      alert("Please fill in all fields correctly");
    }
  };

  const handleMemPoolAndMine = async () => {
    try {
      setIsMining(true);
      //get mempool
      const mempoolResponse = await getMempool();
      setMempoolData(mempoolResponse.data);

      //mine transaction
      const mineResponse = await mineTransactions();
      alert("Mining completed successfully!");
      console.log("Mining Result: ", mineResponse);
    } catch (error) {
      console.error("Failed to get mempool or mine transactions", error);
      alert("Failed to complete mining process");
    } finally {
      setIsMining(false);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      handleSwapClick();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const parsedValue = parseInt(value, 10);
    if (!isNaN(parsedValue)) {
      setInputID(parsedValue);
    } else {
      setInputID(undefined); // Set to undefined if input is not a valid number
    }
  };

  const handleSucceessClose = () => {
    setSuccess(false);
    setSuccessData(null);
  };

  return (
    <Box
      id="BalanceAmount"
      sx={(theme) => ({
        width: "100%",
        minHeight: "50vh",
        backgroundColor: "#121212",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
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
        <Box
          component="img"
          src={bitcoin}
          alt="Bitcoin"
          sx={{
            width: 135,
            height: 75,
            mb: 2,
          }}
        />
        <Typography variant="h4" align="center" gutterBottom sx={{ color: "yellow" }}>
          {loading ? <CircularProgress color="inherit" size={24} /> : `${balance} BTC`}
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 2,
            mt: 4,
            width: "100%",
          }}
        >
          <Button
            variant="outlined"
            color="primary"
            sx={{
              width: "250px",
              ml: 1,
              borderRadius: "30px",
              borderColor: "gold",
              color: "white",
              backgroundColor: "transparent",
              fontSize: "1rem",
              textTransform: "none",
              "&:hover": {
                backgroundColor: "black",
                color: "white",
              },
            }}
            onClick={handleSendClick}
          >
            Send
          </Button>
          <Button
            variant="outlined"
            color="primary"
            sx={{
              width: "250px",
              height: "50px",
              borderRadius: "40px",
              borderColor: "gold",
              color: "white",
              fontSize: "1rem",
              backgroundColor: "transparent",
              textTransform: "none",
              "&:hover": {
                backgroundColor: "black",
                color: "white",
              },
            }}
            onClick={() => {
              // Handle aksi receive
              console.log("Receive clicked");
            }}
          >
            Receive
          </Button>
          <Button
            variant="outlined"
            color="primary"
            sx={{
              width: "50px",
              height: "50px",
              borderRadius: "100px",
              borderColor: "gold",
              color: "white",
              backgroundColor: "gold",
              "&:hover": {
                backgroundColor: "gold",
              },
            }}
            onClick={handleSwapClick}
          >
            <img src={swapIcon} alt="swap" style={{ width: "60%", height: "60%" }} />
          </Button>
        </Box>
        {showTextField && (
          <TextField
            label="Enter user ID"
            variant="outlined"
            value={inputID !== undefined ? inputID : ""} // Display number or blank
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            sx={{
              mt: 3,
              width: "60%",
              "& .MuiOutlinedInput-root": {
                borderRadius: "30px",
                "& fieldset": {
                  borderColor: "gold",
                },
                "&:hover fieldset": {
                  borderColor: "gold",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "gold",
                },
              },
              "& .MuiInputLabel-root": {
                color: "gold",
              },
              "& .MuiInputBase-input": {
                color: "gold",
              },
            }}
          ></TextField>
        )}
      </Container>
      <Dialog
        open={sendDialogOpen}
        onClose={handleDialogClose}
        maxWidth="md"
        fullScreen
        sx={{
          "& .MultiDialog-paper": {
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            borderRadius: "20px",
            transform: "scale(0.8)",
            transition: "transform 0.3s ease",
          },
          "& .MultiDialog-paper:entering": {
            transform: "scale(1)",
          },
        }}
      >
        <DialogContent
          sx={{
            backgroundColor: "#121212",
            color: "white",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            p: 4,
          }}
        >
          <Typography variant="h4" sx={{ mb: 2 }}>
            Send Bitcoin
          </Typography>
          <TextField
            label="Your ID"
            variant="outlined"
            fullWidth
            value={userID || ""}
            sx={{
              mt: 3,
              width: "60%",
              "& .MuiOutlinedInput-root": {
                borderRadius: "10px",
                "& fieldset": {
                  borderColor: "darkgrey",
                },
                "&:hover fieldset": {
                  borderColor: "gold",
                },

                "&.Mui-focused fieldset": {
                  borderColor: "gold",
                },
              },
              "& .MuiInputLabel-root": {
                color: "darkgrey",
              },
              "& .MuiInputBase-input": {
                color: "white",
              },
            }}
          />
          <Box sx={{ height: "10px" }}></Box>
          <TextField
            label="Set ID target"
            variant="outlined"
            fullWidth
            value={targetUserID || ""}
            onChange={(e) => setTargetUserID(parseInt(e.target.value) || undefined)}
            sx={{
              mt: 3,
              width: "60%",
              "& .MuiOutlinedInput-root": {
                borderRadius: "10px",
                "& fieldset": {
                  borderColor: "darkgrey",
                },
                "&:hover fieldset": {
                  borderColor: "gold",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "gold",
                },
              },
              "& .MuiInputLabel-root": {
                color: "darkgrey",
              },
              "& .MuiInputBase-input": {
                color: "white",
              },
            }}
          />
          <Box sx={{ height: "50px" }}></Box>
          <TextField
            label="Amount"
            variant="outlined"
            fullWidth
            value={amount || ""}
            onChange={(e) => setAmount(parseFloat(e.target.value) || undefined)}
            sx={{
              mt: 3,
              width: "60%",
              "& .MuiOutlinedInput-root": {
                borderRadius: "10px",
                "& fieldset": {
                  borderColor: "darkgrey",
                },
                "&:hover fieldset": {
                  borderColor: "gold",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "gold",
                },
              },
              "& .MuiInputLabel-root": {
                color: "darkgrey",
              },
              "& .MuiInputBase-input": {
                color: "white",
              },
            }}
          />
          <Box sx={{ height: "50px" }}></Box>
          <Button
            variant="outlined"
            color="primary"
            sx={{
              width: "250px",
              ml: 1,
              borderRadius: "30px",
              borderColor: "gold",
              color: "white",
              backgroundColor: "transparent",
              fontSize: "1rem",
              textTransform: "none",
              "&:hover": {
                backgroundColor: "gold",
                color: "black",
              },
            }}
            onClick={handleTransaction}
            disabled={sending} // Close dialog on click
          >
            {sending ? <CircularProgress size={24} color="warning" /> : "Send"}
          </Button>
        </DialogContent>
      </Dialog>
      {success && successData && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            transition: "ease-in",
          }}
        >
          <Card
            sx={{
              minWidth: 300,
              maxWidth: 800,
              maxHeight: 600,
              bgcolor: "#1e1e1e",
              color: "white",
              borderRadius: 2,
              p: 3,
              posisiton: "relative",
            }}
          >
            <IconButton onClick={handleSucceessClose} sx={{ position: "absolute", top: 8, right: 8, color: "white", transition: "ease-out" }}>
              <CloseIcon />
            </IconButton>
            <CardContent>
              <Typography variant="h6"> Transaction Successfull</Typography>
              <Typography>Amount: {successData.amount || "N/A"}</Typography>
              <Typography>Your ID: {successData.sender_id || "N/A"}</Typography>
              <Typography>Receiver ID: {successData.receiver_id || "N/A"}</Typography>
              <Typography>Time: {successData.time ? new Date(successData.time).toLocaleString() : "Invalid Date"}</Typography>

              {mempoolData && (
                <Box sx={{ mt: 3 }}>
                  <Typography variant="h6">Mempool Transactions:</Typography>
                  {mempoolData.map((transaction, index) => (
                    <Box key={index} sx={{ mt: 1 }}>
                      <Typography>Transaction ID: {transaction.id}</Typography>
                      <Typography>Amount: {transaction.amount}</Typography>
                      <Typography>Sender: {transaction.sender_id}</Typography>
                      <Typography>Receiver: {transaction.receiver_id}</Typography>
                    </Box>
                  ))}
                </Box>
              )}
              <Button
                variant="contained"
                color="primary"
                sx={{
                  mt: 3,
                  width: "100%",
                }}
                onClick={handleMemPoolAndMine}
                disabled={isMining}
              >
                {isMining ? <CircularProgress size={24} color="inherit" /> : "Verify and Mine"}
              </Button>
            </CardContent>
          </Card>
        </Box>
      )}
    </Box>
  );
}
