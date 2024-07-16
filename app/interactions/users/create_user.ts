import type { TOperationResult } from "../../types/interactions/operation_result";
import type { IUser } from "../../types/models/user";
import useDatabase from "../databases/use_database";
import encryptPassword from "../passwords/encrypt_password";

export default async function createUser({ name, password }: { name: string, password: string }): TOperationResult<IUser> {
  if (name.length < 3 || 16 < name.length) {
    return {
      error: { type: "name", code: "invalid_length", options: {} }
    };
  }

  if (password.length < 8 || 1024 < password.length) {
    return {
      error: { type: "password", code: "invalid_length", options: {} }
    };
  }

  const isDuplicated = await useDatabase((client) => client.user.count({ where: { name: name } })) !== 0;
  if (isDuplicated) {
    return {
      error: { type: "name", code: "duplicated", options: {} }
    };
  }

  const user = await useDatabase((client) => client.user.create({
    data: {
      name,
      password: encryptPassword(password)
    }
  }));

  return {
    value: user
  };
}
