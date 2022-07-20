import React, { Dispatch, SetStateAction } from 'react';

function Verify({ setIsHuman }: {
  setIsHuman: Dispatch<SetStateAction<boolean>>
}) {
  const onSubmit = (event: any): void => {
    event.preventDefault();

    setIsHuman(true);
  };

  return (
    <div className="second">
      <div className="d-flex justify-content-center">
        <button
          type="button"
          onClick={(event) => onSubmit(event)}
          className="btn btn-outline-primary"
        >
          Submit verfication
        </button>
      </div>
      <div className="mt-4 d-flex justify-content-center fw-bold">Wallet connected</div>
    </div>
  );
}

export default Verify;
