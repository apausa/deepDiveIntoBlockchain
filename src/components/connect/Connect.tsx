/* eslint-disable max-len */
import React, {
  Dispatch, SetStateAction,
} from 'react';
import { HashConnect, HashConnectTypes } from 'hashconnect';
import { IData } from './connect.types';

function Connect({ setIsConnected }: { setIsConnected: Dispatch<SetStateAction<boolean>> }) {
  const hashconnect: HashConnect = new HashConnect();
  const appMetadata: HashConnectTypes.AppMetadata = {
    name: 'dApp Example',
    description: 'An example hedera dApp',
    icon: 'https://www.hashpack.app/img/logo.svg',
  };

  const setItem = (name: string, data: IData): void => localStorage.setItem(name, JSON.stringify(data));
  const getItem = (name: string): any => localStorage.getItem(name);

  const onGetKey = async (event: any): Promise<void> => {
    event.preventDefault();
    const hashconnectRawData: any = getItem('hashconnectData');

    if (!hashconnectRawData) {
      const { privKey } = await hashconnect.init(appMetadata);
      const state = await hashconnect.connect();
      const { topic } = state;
      const pairingString = hashconnect.generatePairingString(state, 'testnet', true);

      hashconnect.findLocalWallets();
      hashconnect.foundExtensionEvent.once((walletMetadata) => {
        console.log('walletMetadata', walletMetadata);
        hashconnect.connectToLocalWallet(pairingString);
        setItem('hashconnectData', {
          privKey,
          topic,
          pairingString,
          walletMetadata,
        // pairedAccounts,
        });
        setIsConnected(true);
      });
    } else {
      const { privKey, topic, pairedWalletData }: any = JSON.parse(hashconnectRawData);

      await hashconnect.init(appMetadata, privKey);
      await hashconnect.connect(topic, pairedWalletData);
      setIsConnected(true);
    }
  };

  return (
    <div>
      <button type="button" onClick={(event) => onGetKey(event)}>Connect wallet</button>
    </div>
  );
}

export default Connect;
