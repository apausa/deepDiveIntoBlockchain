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
    <div className="second my-4">
      <div className="mb-2 d-flex justify-content-center fs-4 fw-bold">Step 2</div>
      <div className="g-recaptcha d-flex justify-content-center" data-sitekey={`${SITE_KEY}`} />
      <div className="mt-2 d-flex justify-content-center">
        <button
          type="button"
          onClick={(event) => onGetResponse(event)}
          className={(isHuman) ? 'btn btn-success' : 'btn btn-secondary'}
          disabled={!isConnected || isHuman}
        >
          Submit verfication
        </button>
      </div>
    </div>
  );
}

export default Verify;
