export interface Event {
  _id?: string; // MongoDB ObjectId
  title: string; // Event title
  description: string; // Event description
  location: string; // Event location
  organizer: string; // Organizer name
  time: string; // Event date/time in ISO format
  volunteersNeeded: number; // Number of volunteers required
  volunteersJoined?: number; // Number of volunteers joined (optional)
  status?: "upcoming" | "completed" | "cancelled"; // Event status
  image: string; // Image URL
  createdAt?: string; // ISO date string for creation timestamp (optional)
  updatedAt?: string; // ISO date string for update timestamp (optional)
  __v?: number; // Version key from MongoDB (optional)
}
