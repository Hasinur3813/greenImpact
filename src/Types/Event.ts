export interface Event {
  _id?: string;
  title: string;
  description: string;
  location: string;
  organizer: string;
  time: string;
  volunteersNeeded: number;
  status?: "upcoming" | "completed" | "cancelled";
  image: string;
}
