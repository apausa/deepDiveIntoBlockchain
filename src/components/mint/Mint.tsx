import React from 'react';

function Mint({ isHuman }: { isHuman: boolean }) {
  return (
    <div className="third my-4">
      <div className="d-flex justify-content-center my-2">
        <button
          type="button"
          className="btn btn-primary my-2"
          disabled={!isHuman}
        >
          Mint token

        </button>
      </div>
    </div>
  );
}

export default Mint;
