function Card({ children }) {
  return (
    <div className='max-w-md p-8 bg-white shadow-lg rounded-lg my-20 text-black'>
      {children}
    </div>
  );
}

export default Card;
