import axios, { AxiosResponse } from 'axios';

export default async function postRecaptcha(token: string) {
  try {
    const { data: { data } }: AxiosResponse = await axios.post('http://localhost:3000/api/recaptcha', { token });
    return data;
  } catch (error) {
    return error;
  }
}
