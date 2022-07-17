import React, {
  Dispatch, SetStateAction, useEffect, useState,
} from 'react';
import { HashConnect } from 'hashconnect';
import APP_METADATA from './connect.constants';
import { getItem } from '../../lib/utils/localStorage';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function Connect({ setIsConnected }: { setIsConnected: Dispatch<SetStateAction<boolean>> }) {
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
      // Is connectWallet function neccessary on second time?
      await hashconnect.init(APP_METADATA, hashconnectData.key);
      await hashconnect.connect(hashconnectData.topic, hashconnectData.walletMetadata);
    } else firstTime();
  };

  // @important
  const connectWallet = () => {
    const { pairingString } = firstTimeData;

    hashconnect.connectToLocalWallet(pairingString);
    hashconnect.pairingEvent.once((pairingData) => {
      // example
      console.log(pairingData);
      // setItem('hashconnectData', {
      //   privKey, topic, pairingString,
      // });
      // setIsConnected(true);
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
