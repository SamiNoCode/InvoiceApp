import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { invoiceApi } from "../../api/invoiceApi";
import type { Invoice } from "../../api/invoiceApi";

interface InvoiceState {
  invoices: Invoice[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: InvoiceState = {
  invoices: [],
  status: "idle",
  error: null,
};

export const fetchInvoices = createAsyncThunk("invoices/fetchAll", async () => {
  return await invoiceApi.getAllInvoices();
});

const invoiceSlice = createSlice({
  name: "invoices",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchInvoices.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchInvoices.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.invoices = action.payload;
      })
      .addCase(fetchInvoices.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch invoices";
      });
  },
});

export default invoiceSlice.reducer;
