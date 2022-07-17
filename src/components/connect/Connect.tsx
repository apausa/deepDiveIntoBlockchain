import React, {
  Dispatch, SetStateAction, useEffect, useState,
} from 'react';
import { HashConnect, MessageTypes } from 'hashconnect';
import APP_METADATA from './connect.constants';
import { getItem, setItem } from '../../lib/utils/localStorage';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function Connect() {
  const hashconnect: HashConnect = new HashConnect();
  const [firstTimeData, setFirstTimeData]: [any, Dispatch<SetStateAction<any>>] = useState({});

  const firstTime = async () => {
    const { privKey }: any = await hashconnect.init(APP_METADATA);
    const state: any = await hashconnect.connect();
    const pairingString: string = hashconnect.generatePairingString(state, 'testnet', true);

    setFirstTimeData({ privKey, topic: state.topic, pairingString });
  };

  const onGetKey = async (event: any): Promise<void> => {
    event.preventDefault();

    const hashconnectRawData: any = getItem('hashconnectData');
    const hashconnectData: any = JSON.parse(hashconnectRawData);

    if (hashconnectData) {
      await hashconnect.init(APP_METADATA, hashconnectData.key);
      await hashconnect.connect(hashconnectData.topic, hashconnectData.metadata);
    } else firstTime();
  };

  const connectWallet = () => {
    const { privKey, topic, pairingString } = firstTimeData;

    hashconnect.connectToLocalWallet(pairingString);
    hashconnect.pairingEvent.once(({ metadata, accountIds }: MessageTypes.ApprovePairing) => {
      setItem('hashconnectData', {
        privKey, topic, pairingString, metadata, accountIds,
      });
    });
  };

  useEffect(() => { connectWallet(); }, [firstTimeData]);

  return (
    <div>
      <button type="button" onClick={(event) => onGetKey(event)}>Connect wallet</button>
    </div>
  );
}

export default Connect;

// @todo disable if hashconnect.foundExtensionEvent.once((walletMetadata) => {
// @todo send to service?
