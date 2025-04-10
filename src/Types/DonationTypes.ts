export interface Donation {
  _id?: string;
  donor?: {
    name: string;
    email: string;
  };
  donorName?: string;
  donorEmail?: string;
  date?: string;
  amount: number;
  eventTitle: string;
  transactionId: string;
  message?: string;
}
