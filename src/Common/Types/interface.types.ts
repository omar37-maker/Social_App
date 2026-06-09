import { Types } from "mongoose";
import jwt, {
  JwtPayload,
  PrivateKey,
  PublicKey,
  Secret,
  SignOptions,
  VerifyOptions,
} from "jsonwebtoken";
import { TOKEN_TYPES } from "./enum.type";


export interface IUser {
  _id: Types.ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  age?: number;
  phoneNumber?: string;
}

export interface IHttpAppError {
  statusCode: number;
  code: string;
  details: unknown;
  message: string;
  stack: string;
}

export interface IGenerateTokenPayload {
  payload: string | Buffer | object;
  secret: Secret | PrivateKey;
  options?: SignOptions;
}

export interface VerifyTokenPayload {
  token: string;
  secret: Secret | PublicKey;
  options?: VerifyOptions;
}

export interface ICreateCredentialsPayload {
  payload: string | Buffer | object;
  options: { access: SignOptions; refresh: SignOptions };
  requiredToken: TOKEN_TYPES;
}

export interface ISignatures {
  accessSignature: string;
  accessExpiration: string | undefined;
  refreshSignature: string;
  refreshExpiration: string | undefined;
}

export interface IGetRolePayload {
  role: string;
  tokenType: TOKEN_TYPES;
  both?: boolean;
}

export interface IDecodedTokenPayload {
  token: string;
  tokenType: TOKEN_TYPES;
}

export interface IDecodedTokenResult {
  user: IUser;
  decodedData: JwtPayload | string;
}