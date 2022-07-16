import axios, { AxiosResponse } from 'axios';

export default async function postRecaptcha(token: string) {
  try {
    const { DOMAIN } = process.env;
    const url: string = `${DOMAIN}/api/recaptcha`;

    const { data: { data } }: AxiosResponse = await axios.post(url, { token });
    return data;
  } catch (error) {
    return error;
  }
}
