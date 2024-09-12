export class User {
  private constructor(
    public readonly username?: string,
    public readonly password?: string,
    public readonly id?: bigint
  ) {}

  static readonly Builder = class UserBuilder {
    public username = '';
    public password = '';
    public id: bigint;

    setUsername(username: string): this {
      this.username = username;
      return this;
    }

    setPassword(password: string): this {
      this.password = password;
      return this;
    }

    setId(id: bigint): this {
      this.id = id;
      return this;
    }

    build(): User {
      if (!this.username || !this.password) {
        throw new Error('Username and password are required');
      }
      return new User(this.username, this.password, this.id);
    }
  }
}