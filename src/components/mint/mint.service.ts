import axios from 'axios';
import { IResponse } from '../../lib/types/services.types';

// https://uzh.vercel.app/api/mint
// http://localhost:3000/api/mint

export async function mintNft(): Promise<boolean> {
  const { data: { success } }: IResponse = await axios.get('http://localhost:3000/api/mint');

  return success;
}

// https://uzh.vercel.app/api/transfer
// http://localhost:3000/api/transfer

export async function transferNft(walletId: string): Promise<boolean> {
  const { data: { success } }: IResponse = await axios.post('http://localhost:3000/api/transfer', { walletId });

  return success;
}
