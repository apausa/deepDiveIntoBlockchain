import React from 'react';

function Mint({ isHuman }: { isHuman: boolean }) {
  return (
    <div className="third my-4">
      <div className="mb-2 d-flex justify-content-center fs-4 fw-bold">Step 3</div>
      <div className="d-flex justify-content-center my-2">
        <button
          type="button"
          className="btn btn-secondary my-2"
          disabled={!isHuman}
        >
          Mint token

        </button>
      </div>
    </div>
  );
}

export default Mint;
