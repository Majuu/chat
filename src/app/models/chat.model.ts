import { User } from "./user.model";

export class Chat {
  id: string;
  user: User;
  message: string;
  timestamp: string;

  constructor(
    id: string,
    user: User,
    message: string,
    timestamp: string
  ) {
    this.id = id;
    this.user = user;
    this.message = message;
    this.timestamp = timestamp;
  }
}
