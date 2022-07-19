import React, { Dispatch, SetStateAction } from 'react';
import { HashConnect, MessageTypes } from 'hashconnect';

// Utils
import { getItem, setItem } from '../../lib/utils/localStorage';

// Types
import { IData } from '../../lib/types';

// Constants
import APP_METADATA from './connect.constants';

// eslint-disable-next-line max-len
function Connect({ isConnected, setIsConnected }: { isConnected: string, setIsConnected: Dispatch<SetStateAction<string>> }) {
  const hashconnect: HashConnect = new HashConnect();

  const connectWallet = (privKey: string, topic: string, pairingString: string) => {
    hashconnect.connectToLocalWallet(pairingString);

    hashconnect.pairingEvent.once(({ metadata, accountIds }: MessageTypes.ApprovePairing) => {
      const data: IData = {
        privKey, topic, pairingString, metadata, accountIds,
      };

      setItem('hashconnectData', JSON.stringify(data));
      setIsConnected(accountIds[0]);
    });
  };

  const connectLibrary = async (event: any) => {
    event.preventDefault();

    const hashconnectRawData: string | null = await getItem('hashconnectData');

    if (hashconnectRawData) {
      const hashconnectParsedRawData: string = await JSON.parse(hashconnectRawData);
      const hashconnectData: IData = await JSON.parse(hashconnectParsedRawData);

      await hashconnect.init(APP_METADATA, hashconnectData.privKey);
      await hashconnect.connect(hashconnectData.topic, hashconnectData.metadata);

      setIsConnected(hashconnectData.accountIds[0]);
    } else {
      const { privKey }: any = await hashconnect.init(APP_METADATA);
      const state: any = await hashconnect.connect();
      const pairingString: string = hashconnect.generatePairingString(state, 'testnet', true);

      connectWallet(privKey, state.topic, pairingString);
    }
  };

  return (
    <div className="my-4">
      <div className="d-flex justify-content-center">
        <button
          type="button"
          className={(isConnected) ? 'btn btn-success' : 'btn btn-outline-primary'}
          onClick={(event) => connectLibrary(event)}
          disabled={!!isConnected}
        >
          Connect with Hashpack wallet
        </button>
      </div>
      {(isConnected) ? (
        <div className="mt-2 d-flex justify-content-center font-weight-bold">
          Wallet ID:
          {' '}
          {isConnected}
        </div>
      ) : null}
    </div>
  );
}

export default Connect;
