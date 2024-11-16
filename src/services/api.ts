import axios from "axios";

//function to get balance base on user id
const api = axios.create({
  baseURL: "https://blockchain-money-transfer-production.up.railway.app/api",
});

export const getUserBalance = async (id: number): Promise<number> => {
  try {
    const response = await api.get(`/users/${id}`);
    return response.data.balance;
  } catch (error) {
    console.error(`Error fetching for user id ${id}:`, error);
    throw error;
  }
};

export const sendMoney = async (sender_id: number, receiver_id: number, amount: number): Promise<{ data: { message: string; amount: number; sender_id: number; receiver_id: number; hash: string; signature: string; time: string } }> => {
  try {
    const response = await api.post("/transaction", {
      sender_id,
      receiver_id,
      amount,
    });
    return response.data;
  } catch (error) {
    console.error("Error while sending money:", error);
    throw error;
  }
};

export async function getMempool() {
  try {
    const response = await api.get(`/mempool`);
    return response.data;
  } catch (error) {
    console.error("Failed to get mempool", error);
    throw error;
  }
}

export async function mineTransactions() {
  try {
    const response = await api.get(`/mine`);
    return response.data;
  } catch (error) {
    console.error("Failed to mine transaction", error);
    throw error;
  }
}

export default api;
