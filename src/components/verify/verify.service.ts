import axios, { AxiosResponse } from 'axios';

export default async function postRecaptcha(token: string) {
  try {
    // https://uzh.vercel.app/api/verify
    // http://localhost:3000/api/verify
    const { data: { data } }: AxiosResponse = await axios.post('https://uzh.vercel.app/api/verify', { token });
    return data;
  } catch (error) {
    return error;
  }
}
