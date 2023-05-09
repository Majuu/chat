export class Chat {
  id: string;
  username: string;
  message: string;
  timestamp: Date;

  constructor(
    id: string, // optional?
    username: string,
    message: string,
    timestamp: Date
  ) {
    this.id = id;
    this.username = username;
    this.message = message;
    this.timestamp = timestamp;
  }
}
