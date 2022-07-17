import React from 'react';

function Mint({ isHuman }: { isHuman: boolean }) {
  return (
    <div>
      <button type="button" disabled={!isHuman}>Mint token</button>
    </div>
  );
}

export default Mint;
