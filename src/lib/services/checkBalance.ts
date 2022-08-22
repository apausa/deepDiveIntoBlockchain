import axios from 'axios';
import { IResponse } from '../types/services.types';

// https://uzh.vercel.app/api/balance
// http://localhost:3000/api/balance

export default async function checkBalance(walletId: string): Promise<boolean | undefined> {
  const { data: { isMinted } }: IResponse = await axios.post('http://localhost:3000/api/balance', { walletId });

  return isMinted;
}
