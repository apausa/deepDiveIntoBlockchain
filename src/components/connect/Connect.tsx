import React, { Dispatch, SetStateAction } from 'react';
import { HashConnect, MessageTypes } from 'hashconnect';

// Utils
import { getItem, setItem } from '../../lib/utils/localStorage';

// Types
import { IData } from '../../lib/types';

// Constants
import APP_METADATA from '../../lib/constants.ts';

function Connect({ setIsConnected }: {
  setIsConnected: Dispatch<SetStateAction<string>>
}) {
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
      const hashconnectData: IData = await JSON.parse(hashconnectRawData);

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
    <div className="first">
      <div className="d-flex justify-content-center">
        <button
          type="button"
          className="btn btn-outline-primary"
          onClick={(event) => connectLibrary(event)}
        >
          Connect with Hashpack wallet
        </button>
      </div>
      <div className="mt-4 d-flex justify-content-center fw-bold">Wallet disconnected</div>
    </div>
  );
}

export default Connect;
