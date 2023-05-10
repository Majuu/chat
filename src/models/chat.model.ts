export class Chat {
  id: string;
  username: string;
  message: string;
  timestamp: string; // or date?

  constructor(
    id: string, // optional?
    username: string,
    message: string,
    timestamp: string // or date?
  ) {
    this.id = id;
    this.username = username;
    this.message = message;
    this.timestamp = timestamp;
  }
}
