function AssetSelect({ value, onChange, options }) {
  return (
    <div className='relative inline-flex items-center'>
      <div className='absolute top-0 bottom-0 right-0 flex items-center'>
        <svg
          className='w-2 h-2 pointer-events-none'
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 412 232'
        >
          <path
            d='M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z'
            fill='#648299'
            fillRule='nonzero'
          />
        </svg>
      </div>

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className=' text-gray-600 px-2 bg-white  focus:outline-none appearance-none text-sm'
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.text}
          </option>
        ))}
      </select>
    </div>
  );
}

export default AssetSelect;
