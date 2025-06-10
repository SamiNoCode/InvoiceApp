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
