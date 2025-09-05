// import React from 'react'
// import { IoSearch } from "react-icons/io5";
// import { IoMdClose } from "react-icons/io";

// function SearchModal(  ) {
//   return (
//     <>
//     <div className='absolute top-0 left-0 w-full z-999999 p-[30px] bg-[#f6f7f8] flex justify-center items-center gap-[40px] '>
//        <div className='relative'>
//          <input type="text" className='p-[15px_56px_15px_16px] border w-[900px] bg-white outline-none'  placeholder='SEARCH PUMA.COM' />
//         <IoSearch className='absolute right-[10px] top-[15px]' size={20} />
//        </div>
//        <IoMdClose size={25} />
//     </div>
//     </>
//   )
// }

// export default SearchModal

import React, { useState, useEffect, useContext } from 'react';
import { IoSearch } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import { Link, useParams } from "react-router-dom";
import { PumaContext } from '../context/DataContext';

function SearchModal({ onClose }) {
  const [inputValue, setInputValue] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const { productData } = useContext(PumaContext)
    const { categorySlug, subcategorySlug, childSlug } = useParams()

  useEffect(() => {
    if (!inputValue) {
      setFilteredProducts([]);
      return;
    }

    const results = productData.filter(product => {
      const searchTerm = inputValue.toLowerCase();
      const productName = product.name?.toLowerCase() || '';
      const productHeader = product.header?.toLowerCase() || '';
      const productSubHeader = product.subHeader?.toLowerCase() || '';

      return (
        productName.includes(searchTerm) ||
        productHeader.includes(searchTerm) ||
        productSubHeader.includes(searchTerm)
      );
    });

    setFilteredProducts(results);
  }, [inputValue, productData]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  
  // Inputu təmizləmək üçün yeni funksiya
  const handleClearInput = () => {
    setInputValue('');
  };

  return (
    <div className='absolute top-0 left-0 w-full min-h-screen z-[999999] p-4 sm:p-[30px] bg-[#f6f7f8] flex flex-col items-center'>
      {/* Search Input və Close Button */}
      <div className='w-full max-w-[900px] flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-[40px]'>
        <div className='relative w-full'>
          <input
            type="text"
            className='p-[15px_56px_15px_16px] border w-full bg-white outline-none'
            placeholder='SEARCH PUMA.COM'
            value={inputValue}
            onChange={handleInputChange}
          />
          <IoSearch className='absolute right-[10px] top-1/2 -translate-y-1/2 text-gray-500' size={20} />
          
          {/* Clear yazısı və funksionallığı */}
          {inputValue && (
            <p 
              className='absolute right-[40px] top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-800 transition-colors cursor-pointer text-sm font-semibold'
              onClick={handleClearInput}
            >
              Clear
            </p>
          )}
        </div>
        <IoMdClose
          size={25}
          className='cursor-pointer text-gray-500 hover:text-gray-800 transition-colors'
          onClick={onClose}
        />
      </div>

      {/* Dinamik Axtarış Nəticələri */}
      {inputValue && (
        <div className='w-full max-w-[900px] mt-4 p-4 sm:p-6 bg-white border border-gray-200 shadow-lg rounded-md grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {filteredProducts.length > 0 ? (
            filteredProducts.map(product => (
              <Link to={`/puma/${categorySlug}/${subcategorySlug}/${childSlug}/${encodeURIComponent(product.name)}/${product.id}`} key={product.id} onClick={onClose}>
                <div className='flex items-start gap-4 p-2 cursor-pointer hover:bg-gray-100 rounded-md transition-colors'>
                  <div className='w-24 h-24 flex-shrink-0'>
                    {product.image && (
                      <img src={product.image.href} alt={product.name} className='w-full h-full object-contain' />
                    )}
                  </div>
                  <div className='flex-1'>
                    <h4 className='font-semibold text-sm'>{product.header}</h4>
                    <p className='text-xs text-gray-500'>{product.subHeader}</p>
                    <p className='mt-1 font-bold text-sm'>${product.variations?.[0]?.price || 'N/A'}</p>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className='col-span-full text-center text-gray-500 p-4'>
              Axtarışa uyğun məhsul tapılmadı.
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchModal;