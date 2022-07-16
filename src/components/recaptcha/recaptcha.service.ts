import axios, { AxiosResponse } from 'axios';

export default async function postRecaptcha(token: string) {
  try {
    const { data: { data } }: AxiosResponse = await axios.post('https://uzh.vercel.app/api/recaptcha', { token });
    return data;
  } catch (error) {
    return error;
  }
}
