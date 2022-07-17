import React, {
  Dispatch, SetStateAction, useEffect, useState,
} from 'react';
import { IResponse } from '../../lib/types';
import postRecaptcha from './verify.service';

function Verify({ isConnected, isHuman, setIsHuman }: {
  isConnected: boolean,
  isHuman: boolean,
  setIsHuman: Dispatch<SetStateAction<boolean>>
}) {
  const [token, setToken]: [string, Dispatch<SetStateAction<string>>] = useState('');
  const { SITE_KEY } = process.env;

  const onGetResponse = (event: any): void => {
    event.preventDefault();
    const response: string = grecaptcha.getResponse();
    setToken(response);
  };

  const postResponse = async (): Promise<void> => {
    const { success }: IResponse = await postRecaptcha(token);
    setIsHuman(success);
  };

  useEffect(() => { if (token) postResponse(); }, [token]);

  return (
    <div>
      <form>
        <div className="g-recaptcha" data-sitekey={`${SITE_KEY}`} />
        {(isConnected && !isHuman) ? (<div>You are not verified</div>) : null}
        {(isHuman) ? (<div>You are already verified</div>) : null}
        <button
          type="button"
          onClick={(event) => onGetResponse(event)}
          disabled={!isConnected || isHuman}
        >
          Submit verfication
        </button>
      </form>
    </div>
  );
}

export default Verify;
