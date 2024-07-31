import type { TOperationResult } from "../../types/interactions/operation_result";
import type { IUser } from "../../types/models/user";
import useDatabase from "../databases/use_database";
import encryptPassword from "../systems/encrypt_password";

export default async function createUser({ name, loginId, loginPassword }: { name: string, loginId: string, loginPassword: string }): TOperationResult<IUser> {
  if (name.length < 1 || 16 < name.length) {
    return {
      error: { type: "name", code: "invalid", options: {} }
    };
  }

  if (loginId.length < 4 || 32 < loginId.length || !/^[a-z0-9_-]+$/i.test(loginId) ) {
    return {
      error: { type: "loginId", code: "invalid", options: {} }
    };
  }

  if (loginPassword.length < 8 || 1024 < loginPassword.length) {
    return {
      error: { type: "loginPassword", code: "invalid", options: {} }
    };
  }

  if (await useDatabase((client) => client.user.count({ where: { name } })) !== 0) {
    return {
      error: { type: "name", code: "duplicated", options: {} }
    };
  }

  if (await useDatabase((client) => client.user.count({ where: { loginId } })) !== 0) {
    return {
      error: { type: "loginId", code: "duplicated", options: {} }
    };
  }

  const user = await useDatabase((client) => client.user.create({
    data: {
      name,
      loginId,
      loginPassword: encryptPassword(loginPassword)
    }
  }));

  return {
    value: user
  };
}
