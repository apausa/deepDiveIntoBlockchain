/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Dispatch, SetStateAction } from 'react';
import { mintNft, transferNft } from './mint.service';

function Mint({ walletId, setIsTransfered }: {
  walletId: string
  setIsTransfered: Dispatch<SetStateAction<boolean>>,
}): JSX.Element {
  const onSubmit = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ): Promise<void> => {
    event.preventDefault();

    await mintNft();
    const isTransfered = await transferNft(walletId);
    if (isTransfered) setIsTransfered(isTransfered);
  };

  return (
    <div className="third">
      <div className="d-flex justify-content-center">
        <button
          type="button"
          onClick={(
            event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
          ): Promise<void> => onSubmit(event)}
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
