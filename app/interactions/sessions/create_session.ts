import type { TOperationResult } from '../../types/interactions/operation_result';
import type { TUser } from '../../types/models/user';
import useDatabase from '../databases/use_database';
import comparePassword from '../systems/compare_password';

interface TSession {
  user:  TUser
  token: string
}

/**
 * Create user session
 * @param opts option
 * @param opts.loginId Login id
 * @param opts.loginPassword Login password
 * @returns Session
 */
export default async function createSession({ loginId, loginPassword }: { loginId: string, loginPassword: string }): TOperationResult<TSession> {
  const user = await useDatabase(client => client.user.findFirst({ where: { loginId } }));
  if (!user) {
    return {
      error: { type: 'base', code: 'failed', options: {} },
    };
  }

  if (!comparePassword(loginPassword, user.loginPassword)) {
    return {
      error: { type: 'base', code: 'failed', options: {} },
    };
  }

  // @todo ログイン処理

  return {
    value: {
      user,
      token: '@todo',
    },
  };
}
