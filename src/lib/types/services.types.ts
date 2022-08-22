import { TransactionReceipt } from '@hashgraph/sdk';

export interface IResponse {
  data: Data;
  status: number;
  statusText: string;
  headers: Headers;
  config: Config;
  request: Request;
}

export interface Config {
  transitional: Transitional;
  transformRequest: null[];
  transformResponse: null[];
  timeout: number;
  xsrfCookieName: string;
  xsrfHeaderName: string;
  maxContentLength: number;
  maxBodyLength: number;
  env: Env;
  headers: ConfigHeaders;
  method: string;
  url: string;
  data: string;
}

export interface Env {
  FormData: null;
}

export interface ConfigHeaders {
  Accept: string;
  'Content-Type': string;
}

export interface Transitional {
  silentJSONParsing: boolean;
  forcedJSONParsing: boolean;
  clarifyTimeoutError: boolean;
}

export interface Data {
  success: boolean;
  isMinted?: boolean;
  receipt: TransactionReceipt;
}

export interface Headers {
  connection: string;
  'content-length': string;
  'content-type': string;
  date: string;
  etag: string;
  'keep-alive': string;
  vary: string;
}

export interface Request {
}
