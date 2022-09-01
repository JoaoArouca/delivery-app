export interface IUser {
  id?: number,
  name: string,
  email: string,
  password: string
}

export interface IUserService {
  // login({
  //   email,
  //   password,
  // }: Partial<Pick<IUser, 'email' | 'password'>>): Promise<
  //   Omit<IUser, 'password'>
  // >;
  register({
    name,
    email,
    password,
  }: Partial<Omit<IUser, 'id'>>): Promise<Omit<IUser, 'password'>>;
}