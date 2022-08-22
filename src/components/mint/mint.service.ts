import axios from 'axios';
import { IResponse } from '../../lib/types/services.types';

export async function mintNft(): Promise<boolean> {
  const { data: { success } }: IResponse = await axios.get('https://uzh.vercel.app/api/mint');

  return success;
}

export async function transferNft(walletId: string): Promise<boolean> {
  const { data: { success } }: IResponse = await axios.post('https://uzh.vercel.app/api/transfer', { walletId });

  return success;
}
