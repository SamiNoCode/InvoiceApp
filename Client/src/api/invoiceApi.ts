import axios from "axios";
import { getToken } from "../utils/auth";

const API_URL = "http://localhost:3000/api";

export interface Invoice {
  id: string;
  vendor_name: string;
  amount: number;
  due_date: string;
  description: string;
  user_id: string;
  paid: boolean;
  created_at: string;
  updated_at: string;
}

const getAuthHeaders = () => {
  const token = getToken();
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const invoiceApi = {
  getAllInvoices: async (): Promise<Invoice[]> => {
    const response = await axios.get(`${API_URL}/invoices`, getAuthHeaders());
    return response.data;
  },

  getInvoiceById: async (id: string): Promise<Invoice> => {
    const response = await axios.get(
      `${API_URL}/invoices/${id}`,
      getAuthHeaders()
    );
    return response.data;
  },
};
