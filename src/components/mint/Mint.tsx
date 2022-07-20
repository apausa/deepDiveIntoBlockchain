/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Dispatch, SetStateAction, useEffect } from 'react';
import { checkBalance, mintNft, transferNft } from './mint.service';

function Mint({ isConnected, setIsMinted }: {
  isConnected: string
  setIsMinted: Dispatch<SetStateAction<boolean>>,
}) {
  const onSubmit = async (event: any) => {
    event.preventDefault();

    await mintNft();
    const isTransfered = await transferNft(isConnected);
    setIsMinted(isTransfered);
  };

  return (
    <div className="third">
      <div className="d-flex justify-content-center">
        <button
          type="button"
          onClick={(event) => onSubmit(event)}
          className="btn btn-outline-primary"
        >
          Mint token
        </button>
      </div>
      <div className="mt-4 d-flex justify-content-center fw-bold">You are now verified</div>
    </div>
  );
}

export default Mint;
