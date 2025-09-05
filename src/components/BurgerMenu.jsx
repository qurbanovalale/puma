import React, { useContext, useState } from 'react';
import { FaSearch } from "react-icons/fa";
import { FaRegUser, FaAngleRight } from "react-icons/fa6";
import { FiShoppingCart } from "react-icons/fi";
import { IoMdClose, IoMdArrowBack } from "react-icons/io";
import { PumaContext } from '../context/DataContext';
import { Link, useNavigate } from 'react-router-dom';

function BurgerMenu({ onClose }) {
    const { data } = useContext(PumaContext);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedSubCategory, setSelectedSubCategory] = useState(null);
    const [breadcrumb, setBreadcrumb] = useState([]);

    const navigate = useNavigate()

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
        setBreadcrumb([category]);
    };

    const handleSubCategoryClick = (sub) => {
        setSelectedSubCategory(sub);
        setBreadcrumb(prev => [...prev, sub]);
    };

    const handleBack = () => {
        if (breadcrumb.length === 2) {
            setSelectedSubCategory(null);
            setBreadcrumb(prev => prev.slice(0, 1));
        } else if (breadcrumb.length === 1) {
            setSelectedCategory(null);
            setBreadcrumb([]);
        }
    };

    return (
        <>
            <div className='absolute z-10 w-full h-screen bg-white overflow-y-auto'>
                {/* Banner */}
                <div className="bg-white p-2 text-center">
                    <p className="text-[#191919] text-[14px] font-bold">
                        FREE SHIPPING ON ORDERS $60+ <span className="underline">LEARN MORE</span>
                    </p>
                </div>

                {/* Header */}
                <div className="p-[25px] flex justify-between items-center lg:hidden">
                    <div className="flex w-[60px] justify-between items-center text-black">
                        <IoMdClose className="text-2xl cursor-pointer" onClick={onClose} />
                        <FaSearch />
                    </div>
                    <div className="text-black">
                        <Link to={`/`}>
                            <svg viewBox="0 0 48 37" xmlns="http://www.w3.org/2000/svg" width={40} height={40}>
                                <path fill="currentColor" d="M47.689.517c-.834-1.066-2.291-.213-2.933.16-4.569 2.692-5.243 7.432-6.834 10.154-1.253 2.178-3.304 3.779-5.159 3.903-1.373.098-2.861-.167-4.338-.81-3.613-1.562-5.56-3.583-6.034-3.94-.973-.739-8.459-8.03-14.559-8.327 0 0-.744-1.5-.93-1.526C6.457.08 6 1.033 5.669 1.133c-.3.105-.825-1.024-1.13-.975C4.233.2 3.936 1.33 3.34 1.913c-.439.425-.973.398-1.275.926-.104.192-.068.53-.186.84-.253.641-1.102.708-1.11 1.394 0 .762.714.907 1.338 1.438.496.425.53.725 1.109.924.515.176 1.264-.374 1.928-.177.553.163 1.085.279 1.204.846.108.513 0 1.316-.682 1.226-.222-.03-1.194-.348-2.395-.22-1.45.154-3.105.618-3.267 2.22-.083.895 1.028 1.942 2.11 1.733.742-.143.392-1.013.797-1.433.535-.541 3.545 1.888 6.344 1.888 1.186 0 2.063-.3 2.935-1.21.078-.057.185-.203.31-.218.113.015.324.128.39.175 2.262 1.793 3.967 5.399 12.26 5.441 1.164.014 2.498.558 3.591 1.553.96.866 1.528 2.251 2.075 3.65.836 2.106 2.322 4.139 4.584 6.407.119.135 1.98 1.561 2.119 1.666.025.021.168.334.106.51-.039 1.38-.245 5.34 2.731 5.506.731.04.549-.463.549-.82-.01-.683-.129-1.371.226-2.08.507-.957-1.051-1.418-1.017-3.513.037-1.567-1.291-1.302-1.969-2.498-.381-.687-.736-1.065-.699-1.894.145-4.76-1.034-7.896-1.61-8.654-.455-.587-.847-.806-.414-1.078 2.481-1.632 3.05-3.15 3.05-3.15 1.32-3.081 2.512-5.89 4.15-7.138.332-.241 1.177-.88 1.703-1.12 1.527-.725 2.346-1.156 2.777-1.576.711-.675 1.27-2.107.588-2.96h-.001z" />
                            </svg>
                        </Link>
                    </div>
                    <div className="flex text-black text-[22px] w-[80px] justify-between">
                        <FaRegUser />
                        <FiShoppingCart />
                    </div>
                </div>

                <div className='w-full bg-gray-200 h-0.5'></div>

                {/* Menu Content */}
                <div className='flex justify-center'>
                    <div className='w-full max-w-md h-full p-2'>

                        {!selectedCategory ? (
                            <>
                                <ul>
                                    {data.map(item => (
                                        <li
                                            key={item.id}
                                            onClick={() => handleCategoryClick(item)}
                                            className='w-full flex justify-between items-center text-[24px] text-[#181818] font-bold p-2 border-b border-gray-200 capitalize cursor-pointer'
                                        >
                                            {item.slug}
                                            <FaAngleRight size={20} />
                                        </li>
                                    ))}
                                    {/* Static Links */}
                                    <li className='text-[16px] text-[#181818] p-2 border-b border-gray-200 cursor-pointer'>
                                        My Account
                                    </li>
                                    <li className='text-[16px] text-[#181818] p-2 border-b border-gray-200 cursor-pointer'>
                                        Initate Return
                                    </li>
                                    <li className='text-[16px] text-[#181818] p-2 border-b border-gray-200 cursor-pointer'>
                                        Order Status
                                    </li>
                                    <li className='text-[16px] text-[#181818] p-2 border-b border-gray-200 cursor-pointer'>
                                        Contact Us
                                    </li>
                                    <li onClick={() => {
                                        navigate("/wishlist")
                                        onClose()
                                    }} className='text-[16px] text-[#181818] p-2 border-b border-gray-200 cursor-pointer'>
                                        Wishlist
                                    </li>
                                    <li className='flex justify-between items-center text-[16px] p-2 border-b border-gray-200 cursor-pointer'>
                                        Language
                                        <div className='flex items-center'>
                                            EN
                                            <img src="https://flagcdn.com/us.svg" alt="USA Flag" className="ml-2 w-6 h-4" />
                                        </div>
                                    </li>
                                </ul>
                            </>
                        ) : !selectedSubCategory ? (
                            <>
                                <div onClick={handleBack} className="flex items-center space-x-2 mb-4 cursor-pointer text-lg font-medium">
                                    <IoMdArrowBack />
                                    <span>Back</span>
                                </div>

                                {selectedCategory.subcategory?.map((sub) => (
                                    <div key={sub.id} className="mb-4">
                                        <p
                                            className="text-[17px] text-[#181818] cursor-pointer flex justify-between p-1 border-b border-gray-200 capitalize"
                                            onClick={() => handleSubCategoryClick(sub)}
                                        >
                                            {sub.categoryName}
                                            <FaAngleRight size={20} />
                                        </p>
                                    </div>
                                ))}

                                {selectedCategory.quickLinks?.length > 0 && (
                                    <div className="mb-6">
                                        <ul className="space-y-1">
                                            {selectedCategory.quickLinks.map((link, i) => (
                                                <li key={i} className="text-base  cursor-pointer text-[17px] text-[#181818] flex justify-between p-2 border-b border-gray-200 capitalize">{link}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </>
                        ) : (
                            <>
                                <div onClick={handleBack} className="flex items-center space-x-2 mb-4 cursor-pointer text-lg font-medium">
                                    <IoMdArrowBack />
                                    <span>Back</span>
                                </div>
                                <p className="text-lg font-bold mb-2">{selectedSubCategory.categoryName}</p>
                                <ul className="space-y-1 pl-2">
                                    {selectedSubCategory.children.map((child) => (
                                        <li key={child.id}>
                                            <Link
                                                to={`/puma/${selectedCategory.slug}/${selectedSubCategory.slug}/${child.slug.split('/').pop()}`}
                                                className="text-base hover:underline cursor-pointer"
                                                onClick={onClose}
                                            >
                                                {child.categoryName}
                                            </Link>
                                        </li>
                                    ))}

                                </ul>
                            </>
                        )}

                        {/* Login / Join */}
                        <div className='mt-8'>
                            <button className='w-full bg-[#181818] text-white py-2 text-[18px] font-bold uppercase rounded-sm mb-4'>Login</button>
                            <button className='w-full border border-[#181818] text-[#181818] py-2 text-[18px] font-bold uppercase rounded-sm'>Join Us</button>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}

export default BurgerMenu;
