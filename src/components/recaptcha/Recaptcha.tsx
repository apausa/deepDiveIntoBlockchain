import React, {
  Dispatch, SetStateAction, useEffect, useState,
} from 'react';
import { IResponse } from '../../lib/types';
import postRecaptcha from './recaptcha.service';

function Recaptcha() {
  const { SITE_KEY } = process.env;
  const [token, setToken]: [string, Dispatch<SetStateAction<string>>] = useState('');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  const onGetResponse: any = (event: any) => {
    event.preventDefault();

    const response: string = grecaptcha.getResponse();
    setToken(response);
  };

  const postResponse: any = async () => {
    const { success }: IResponse = await postRecaptcha(token);
    console.log(success);
  };

  useEffect(() => { if (token) postResponse(); }, [token]);

  return (
    <div>
      <form>
        <div className="g-recaptcha" data-sitekey={`${SITE_KEY}`} />
        <button
          type="button"
          onClick={(event) => onGetResponse(event)}
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default Recaptcha;
