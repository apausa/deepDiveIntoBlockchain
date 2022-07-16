export interface IResponse {
  success: boolean,
  challenge_ts: Date,
  hostname: string,
  ['error-codes']?: any
}
