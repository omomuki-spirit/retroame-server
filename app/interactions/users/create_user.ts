import { IUser } from "../../types/models/user";
import useDatabase from "../databases/use_database";
import encryptPassword from "../password/encrypt_password";

export default async function createUser({ name, password }: { name: string, password: string }): Promise<IUser> {
  const encryptedPassword = encryptPassword(password);

  return useDatabase((client) => client.user.create({
    data: {
      name,
      password: encryptedPassword
    }
  }));
}
