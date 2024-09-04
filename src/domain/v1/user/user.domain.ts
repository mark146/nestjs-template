export class User {
  id: bigint;
  username: string;
  password: string;

  constructor(id: bigint, username: string, password: string) {
    this.id = id;
    this.username = username;
    this.password = password;
  }
}