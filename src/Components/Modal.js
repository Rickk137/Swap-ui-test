import cn from "classnames";

export default function Modal({ open, onClose, closeIcon, children }) {
  return (
    <div
      className={cn(
        "modal fixed w-full h-full top-0 left-0 flex items-center justify-center",
        {
          "pointer-events-none": !open,
          "opacity-0": !open,
        }
      )}
      style={{ visibility: !open ? "hidden" : "", zIndex: 999 }}
    >
      <div
        onClick={onClose}
        className='modal-overlay absolute w-full h-full bg-gray-900 opacity-50'
      ></div>

      <div className='modal-container bg-white w-11/12 sm:max-w-md md:max-w-xl mx-auto rounded shadow-lg z-50 overflow-y-auto'>
        <div className='modal-content py-4 text-left px-6 relative'>
          {closeIcon && (
            <div
              className='absolute top-4 right-4 modal-close cursor-pointer z-50 opacity-70'
              onClick={onClose}
            >
              <svg
                className='fill-current text-black'
                xmlns='http://www.w3.org/2000/svg'
                width='18'
                height='18'
                viewBox='0 0 18 18'
              >
                <path d='M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z'></path>
              </svg>
            </div>
          )}

          <div>{children}</div>
        </div>
      </div>
    </div>
  );
}
