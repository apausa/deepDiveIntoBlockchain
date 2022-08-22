/* eslint-disable max-len */
import React, { Dispatch, SetStateAction } from 'react';
import { HashConnect, HashConnectTypes, MessageTypes } from 'hashconnect';

// Utils
import { getItem, setItem } from '../../lib/utils/localStorage';

// Types
import { IHashconnectData } from './connect.types';

// Constants
import APP_METADATA from './connect.constants';

function Connect({ setWalletId }: {
  setWalletId: Dispatch<SetStateAction<string>>
}): JSX.Element {
  const hashconnect: HashConnect = new HashConnect();

  const connectWallet = (privKey: string, topic: string, pairingString: string): void => {
    hashconnect.connectToLocalWallet(pairingString);

    hashconnect.pairingEvent.once(({ metadata, accountIds }: MessageTypes.ApprovePairing): void => {
      const data: IHashconnectData = {
        privKey, topic, pairingString, metadata, accountIds,
      };

      setItem('hashconnectData', JSON.stringify(data));
      setWalletId(accountIds[0]);
    });
  };

  const connectLibrary = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): Promise<void> => {
    event.preventDefault();
    const hashconnectRawData: string | null = await getItem('hashconnectData');

    if (hashconnectRawData) {
      const hashconnectData: IHashconnectData = await JSON.parse(hashconnectRawData);
      await hashconnect.init(APP_METADATA, hashconnectData.privKey);
      await hashconnect.connect(hashconnectData.topic, hashconnectData.metadata);

      setWalletId(hashconnectData.accountIds[0]);
    } else {
      const { privKey }: HashConnectTypes.InitilizationData = await hashconnect.init(APP_METADATA);
      const state: HashConnectTypes.ConnectionState = await hashconnect.connect();
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
          onClick={(
            event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
          ): Promise<void> => connectLibrary(event)}
        >
          Connect with Hashpack wallet
        </button>
      </div>
      <div className="mt-4 d-flex justify-content-center fw-bold">Wallet disconnected</div>
    </div>
  );
}

export default Connect;
