import React, { Dispatch, SetStateAction } from 'react';
import mintAndTransferNft from './mint.service';

function Mint({ isConnected, setIsMinted }: {
  isConnected: string
  setIsMinted: Dispatch<SetStateAction<boolean>>,
}) {
  const onSubmit = async (event: any) => {
    event.preventDefault();

    const status: string = await mintAndTransferNft(isConnected);
    console.log(status);
    setIsMinted((status === 'SUCCESS'));
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
