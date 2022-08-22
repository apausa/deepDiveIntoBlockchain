import axios from 'axios';
import { IResponse } from '../types/services.types';

export default async function checkBalance(walletId: string): Promise<boolean | undefined> {
  const { data: { isMinted } }: IResponse = await axios.post('https://uzh.vercel.app/api/balance', { walletId });

  return isMinted;
}
