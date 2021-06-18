import Modal from "./Modal";
import { useState } from "react";

function SwapConfirm({
  sourceAsset,
  sourceAmount,
  targetAsset,
  targetAmount,
  onClose,
  open,
}) {
  const [step, setStep] = useState("confirm");
  const handleClose = () => {
    setStep("confirm");
    onClose();
  };
  return (
    <Modal open={open} onClose={handleClose} closeIcon>
      {step === "confirm" && (
        <div className='w-full pt-9'>
          <h3 className='font-bold text-purple-700'>Confirm Swap</h3>
          <p className='py-4 text-sm text-gray-400'>
            Are you sure you want to swap {sourceAmount} {sourceAsset} to{" "}
            {targetAmount} {targetAsset}?
          </p>
          <div className='py-4 flex space-x-4'>
            <div
              onClick={handleClose}
              className='cursor-pointer w-1/2 px-4 py-3 text-center bg-gray-100 text-gray-400 hover:bg-gray-200 hover:text-black font-bold rounded-lg text-sm'
            >
              Cancel
            </div>
            <div
              onClick={() => {
                setStep("pending");
                setTimeout(() => {
                  setStep("success");
                }, 2000);
              }}
              className='cursor-pointer w-1/2 px-4 py-3 text-center text-pink-100 bg-purple-600 rounded-lg hover:bg-purple-700 hover:text-white font-bold text-sm'
            >
              Swap
            </div>
          </div>
        </div>
      )}

      {step === "pending" && (
        <div className='w-full pt-4 text-center'>
          <h3 className='font-bold text-purple-700 text-center'>
            Transaction Pending
          </h3>

          <div class='lds-ripple mt-4'>
            <div></div>
            <div></div>
          </div>
        </div>
      )}

      {step === "success" && (
        <div className='w-full pt-4 text-center'>
          <h3 className='font-bold text-purple-700 text-center mb-4'>
            Swap Complete
          </h3>

          <div className='success-checkmark '>
            <div className='check-icon'>
              <span className='icon-line line-tip'></span>
              <span className='icon-line line-long'></span>
              <div className='icon-circle'></div>
              <div className='icon-fix'></div>
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
}

export default SwapConfirm;
