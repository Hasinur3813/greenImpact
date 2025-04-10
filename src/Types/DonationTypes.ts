export interface Donation {
  donor?: string;
  amount: number;
  eventTitle: string;
  transactionId: string;
  message?: string;
}
