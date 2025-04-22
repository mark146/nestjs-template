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

  // 게터 메서드
  getId(): bigint | undefined {
    return this.id;
  }

  getUsername(): string {
    return this.username;
  }

  getPassword(): string {
    return this.password;
  }

  validatePassword(password: string): boolean {
    // 실제 구현에서는 암호화된 비밀번호 검증 로직이 포함될 수 있음
    return this.password === password;
  }

  static builder(): UserBuilder {
    return new UserBuilder();
  }
}