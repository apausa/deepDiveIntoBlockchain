import React, { Dispatch, SetStateAction } from 'react';

function Verify({ setIsHuman }: { setIsHuman: Dispatch<SetStateAction<boolean>> }): JSX.Element {
  const onSubmit: ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void) = (event) => {
    event.preventDefault();

    setIsHuman(true);
  };

  return (
    <div className="second">
      <div className="d-flex justify-content-center">
        <button
          type="button"
          onClick={(
            event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
          ): void => onSubmit(event)}
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
