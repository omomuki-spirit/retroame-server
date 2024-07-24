import type { TOperationResult } from "../../types/interactions/operation_result";
import type { IUser } from "../../types/models/user";
import useDatabase from "../databases/use_database";
import comparePassword from "../passwords/compare_password";

interface ISession {
  user: IUser,
  token: string
}

export default async function createSession({ loginId, loginPassword }: { loginId: string, loginPassword: string }): TOperationResult<ISession> {
  const user = await useDatabase((client) => client.user.findFirst({ where: { loginId } }));
  if (!user) {
    return {
      error: { type: "base", code: "failed", options: {} }
    };
  }

  if (!comparePassword(loginPassword, user.loginPassword)) {
    return {
      error: { type: "base", code: "failed", options: {} }
    };
  }

  // @todo ログイン処理

  return {
    value: {
      user,
      token: "@todo"
    }
  };
}
