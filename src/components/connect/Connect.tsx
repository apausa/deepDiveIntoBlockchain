/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable max-len */
import React, {
  Dispatch, SetStateAction, useEffect, useState,
} from 'react';
import { HashConnect, MessageTypes } from 'hashconnect';

// Utils
import { getItem, setItem } from '../../lib/utils/localStorage';

// Types
import { IData } from '../../lib/types';

// Constants
import APP_METADATA from './connect.constants';

function Connect({ isConnected, setIsConnected }: {
  isConnected: boolean,
  setIsConnected: Dispatch<SetStateAction<boolean>> }) {
  const hashconnect: HashConnect = new HashConnect();
  const [key, setKey]: [string, Dispatch<SetStateAction<string>>] = useState('');
  const [topic, setTopic]: [string, Dispatch<SetStateAction<string>>] = useState('');
  const [pairing, setPairing]: [string, Dispatch<SetStateAction<string>>] = useState('');
  const [isFound, setIsFound]: [boolean, Dispatch<SetStateAction<boolean>>] = useState(false);

  const connectWallet = () => {
    hashconnect.connectToLocalWallet(pairing);
    hashconnect.pairingEvent.once(({ metadata, accountIds }: MessageTypes.ApprovePairing) => {
      const data: IData = {
        privKey: key, topic, pairingString: pairing, metadata, accountIds,
      };

      // Bug in jSON stringify
      console.log('data', data);
      setItem('hashconnectData', JSON.stringify(data));
      setIsConnected(true);
    });
  };

  const findExtension = () => {
    hashconnect.findLocalWallets();
    hashconnect.foundExtensionEvent.once((walletMetadata) => {
      if (walletMetadata) setIsFound(true);
    });
  };

  const connectLibrary = async (event: any) => {
    event.preventDefault();

    const hashconnectRawData: any = getItem('hashconnectData');
    const hashconnectData: IData = JSON.parse(hashconnectRawData);

    if (hashconnectData) {
      await hashconnect.init(APP_METADATA, hashconnectData.privKey);
      await hashconnect.connect(hashconnectData.topic, hashconnectData.metadata);

      setIsConnected(true);
    } else {
      const { privKey }: any = await hashconnect.init(APP_METADATA);
      const state: any = await hashconnect.connect();
      const pairingString: string = hashconnect.generatePairingString(state, 'testnet', true);

      setKey(privKey);
      setTopic(state.topic);
      setPairing(pairingString);
    }

    findExtension();
  };

  useEffect(() => { connectWallet(); }, [pairing]);

  return (
    <div className="my-4">
      <div className="mb-2 d-flex justify-content-center fs-4 fw-bold">Step 1</div>

      <div className="d-flex justify-content-center">
        <button
          type="button"
          className={(isConnected) ? 'btn btn-success' : 'btn btn-secondary'}
          onClick={(event) => connectLibrary(event)}
          disabled={isConnected}
        >
          Connect wallet
        </button>
      </div>
    </div>
  );
}

export default Connect;

// { (!isFound) ? (<div className="mb-2 d-flex justify-content-center">Hashpack extension not found</div>) : null; }
// { (isFound) ? (<div className="mb-2 d-flex justify-content-center">Hashpack extension found</div>) : null; }
