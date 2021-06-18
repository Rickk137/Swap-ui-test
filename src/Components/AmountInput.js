function AmountInput({
  value,
  placeholder,
  onChange,
  asset,
  label,
  suffix,
  ...props
}) {
  return (
    <div className='flex flex-col w-full'>
      <label
        htmlFor='name'
        className='mb-1 text-xs sm:text-sm tracking-wide text-gray-600'
      >
        {label}
      </label>

      <div className='relative flex border rounded'>
        <div className='flex border border-transparent left-0 top-0 h-full self-center'>
          <div className='flex items-center justify-center rounded-tl rounded-bl z-10 bg-gray-100 text-gray-600 text-lg h-full w-full'>
            {asset}
          </div>
        </div>

        <input
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          {...props}
          className='text-sm sm:text-base relative placeholder-gray-400 focus:border-indigo-400 focus:outline-none py-4 pr-2 pl-4'
        />
      </div>
      {suffix}
    </div>
  );
}

export default AmountInput;
