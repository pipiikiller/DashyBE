import jwt from 'jsonwebtoken';
import { v4 } from 'uuid';
import HttpException from '../exceptions/HttpException';
import { UserDocument } from '../models/user.model';

export const uuid = v4;

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

const ISSUER = 'Win Han Ltd';

const getRefreshTokenSecret = (user: UserDocument) => {
  return process.env.SECRET_2;
};

export const createTokens = async (user: UserDocument, session = null): Promise<AuthTokens> => {
  const { _id, roles } = user;
  const claims = {
    _id,
    session,
    ISSUER,
    AUTHORITIES: roles,
  };

  /**
   * Create token that lives for 1 day
   */
  const createToken = jwt.sign(claims, process.env.SECRET, {
    expiresIn: '1d',
    jwtid: uuid(),
  });
  /**
   * Create refresh token that lives for 7 days
   */
  const createRefreshToken = jwt.sign(claims, getRefreshTokenSecret(user), {
    expiresIn: '7d',
    jwtid: uuid(),
  });

  const [token, refreshToken] = await Promise.all([createToken, createRefreshToken]);

  return {
    accessToken: token,
    refreshToken,
  };
};

// export const signIn = async (accessCode: string, apiKey: string) => {

//     const secret = getSecret(apiKey)
//     console.log(accessCode)
//     if (secret && accessCode === process.env.ACCESS_CODE) {

//         return createTokens(secret, null)
//     }

//     throw new InvalidAuthenticationError(apiKey)
// }

export const refreshTokens = async (refreshToken: string): Promise<AuthTokens> => {
  const claims = jwt.decode(refreshToken) as Record<string, any>;
  const id = claims?.apiKey?.secret;

  if (!id) {
    throw new Error('Internal server error');
  }

  const refreshSecret = getRefreshTokenSecret(claims?.apiKey.secret);
  /**
   * Verify token's signature.
   *
   * This will throw if token is corrupted
   */
  jwt.verify(refreshToken, refreshSecret);

  return createTokens(claims.apiKey, null);
};

export const verifyAccessToken = (token: string) => {
  return jwt.verify(token, process.env.SECRET);
};

class InvalidAuthenticationError extends HttpException {
  constructor(apiKey: string) {
    super(401, `Invalid apiKey or accessCode for ${apiKey}`);
  }
}

// const getSecret = (secret: string) => {
//     if (!apiKeys.has(secret)) {
//         throw new InvalidAuthenticationError(secret)
//     }
//     return apiKeys.get(secret)
// }

export default {
//   signIn,
  createTokens,
  refreshTokens,
  verifyAccessToken,
};
