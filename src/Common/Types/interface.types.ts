import { Types } from "mongoose";
import jwt, {
  JwtPayload,
  PrivateKey,
  PublicKey,
  Secret,
  SignOptions,
  VerifyOptions,
} from "jsonwebtoken";
import { GENDER, PROVIDERS, STATUS, TOKEN_TYPES, USER_ROLES } from "./enum.type";


export interface IWorkExperience { 
  company: string;
  position: string;
  startDate?: Date | string;
  endDate: Date | string;
  currentlyWorking: boolean;
}

export interface IOTP { 
  value: string;
  expiresAt: Date;
  channel: string;
}


export interface IUser {
  _id: Types.ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  age?: number;
  phoneNumber?: string | undefined;
  role: USER_ROLES;
  gender: GENDER
  status: STATUS;
  profilePicture?: string;
  coverPicture?: string[];
  isEmailVerified?: boolean;
  OTPs?: IOTP[]
  workExperience?: IWorkExperience[]
  provider: PROVIDERS;
  googleSub?: string;
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
  requiredToken?: TOKEN_TYPES;
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