export class UserBuilder {
  id?: bigint;
  username: string = '';
  password: string = '';

  setId(id: bigint): UserBuilder {
    this.id = id;
    return this;
  }

  setUsername(username: string): UserBuilder {
    this.username = username;
    return this;
  }

  setPassword(password: string): UserBuilder {
    this.password = password;
    return this;
  }

  build(): User {
    return new User(this);
  }
}

export class User {
  private id?: bigint;
  private username: string;
  private password?: string;

  constructor(builder: UserBuilder) {
    this.id = builder.id;
    this.username = builder.username;
    this.password = builder.password;
  }

  getId(): bigint | undefined {
    return this.id;
  }

  getUsername(): string {
    return this.username;
  }

  getPassword(): string {
    return this.password;
  }

  static builder(): UserBuilder {
    return new UserBuilder();
  }
}