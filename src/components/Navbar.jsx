import React, { useContext, useEffect, useState } from "react";
import { PumaContext } from "../context/DataContext";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaSearch } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa6";
import { FiShoppingCart } from "react-icons/fi";
import { FaRegHeart } from "react-icons/fa";
import BurgerMenu from "./BurgerMenu";
import DropdownMenu from "./DropDownMenu";
import { Link, useNavigate } from "react-router-dom";
import Loading from "./Loading";
import SearchModal from "./SearchModal";

function Navbar() {
  const { data, error, loader, favorites, cart } = useContext(PumaContext);
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  const navigate = useNavigate()

  const toggleBurgerMenu = () => {
    setIsBurgerMenuOpen(prev => !prev);
  };
  // Axtarış modalını açmaq üçün
  const handleSearchClick = () => {
    setIsSearchModalOpen(true);
  };

  // Axtarış modalını bağlamaq üçün
  const handleCloseSearchModal = () => {
    setIsSearchModalOpen(false);
  };


  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (loader) return <div>{<Loading />}</div>;
  if (error) return <div>Xəta: {error}</div>;
  const totalFavoriteItems = favorites.reduce((total, item) => total + item.quantity, 0);
  const totalShoppingItems = cart.reduce((total, item) => total + item.quantity, 0);


  return (
    <>
      {/* BurgerMenu componentini şərti göstər */}
      {isBurgerMenuOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-white z-[9999]">
          <BurgerMenu onClose={toggleBurgerMenu} />
        </div>
      )}
      {isSearchModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-[#f6f7f8] z-[999999] overflow-y-auto">
          <SearchModal onClose={handleCloseSearchModal} productData={data} />
        </div>
      )}
      <div >
        {!scrolled && (
          <div className=" bg-white p-2 text-center px-2 relative z-11  w-full">
            <p className=" text-[#191919] text-[14px] font-bold cursor-pointer ">
              FREE SHIPPING ON ORDERS $60+ <span className="underline text-[#181818]"> LEARN MORE</span>
            </p>
          </div>
        )

        }

        <div className={`bg-[#181818] fixed z-100  w-full ${scrolled ? "top-0" : "top-[35px]"}  `} >
          <div className="flex justify-between items-center p-[20px_25px] lg:hidden">
            <div className="flex w-[60px] justify-between items-center lg:hidden">
              <GiHamburgerMenu className="text-white text-xl cursor-pointer" onClick={toggleBurgerMenu} />
              <FaSearch className="text-white text-xl" onClick={handleSearchClick} />
            </div>

            <div className="text-white">
              <svg viewBox="0 0 48 37" xmlns="http://www.w3.org/2000/svg" width={40} height={40}>
                <path fill="currentColor" d="M47.689.517c-.834-1.066-2.291-.213-2.933.16-4.569 2.692-5.243 7.432-6.834 10.154-1.253 2.178-3.304 3.779-5.159 3.903-1.373.098-2.861-.167-4.338-.81-3.613-1.562-5.56-3.583-6.034-3.94-.973-.739-8.459-8.03-14.559-8.327 0 0-.744-1.5-.93-1.526C6.457.08 6 1.033 5.669 1.133c-.3.105-.825-1.024-1.13-.975C4.233.2 3.936 1.33 3.34 1.913c-.439.425-.973.398-1.275.926-.104.192-.068.53-.186.84-.253.641-1.102.708-1.11 1.394 0 .762.714.907 1.338 1.438.496.425.53.725 1.109.924.515.176 1.264-.374 1.928-.177.553.163 1.085.279 1.204.846.108.513 0 1.316-.682 1.226-.222-.03-1.194-.348-2.395-.22-1.45.154-3.105.618-3.267 2.22-.083.895 1.028 1.942 2.11 1.733.742-.143.392-1.013.797-1.433.535-.541 3.545 1.888 6.344 1.888 1.186 0 2.063-.3 2.935-1.21.078-.057.185-.203.31-.218.113.015.324.128.39.175 2.262 1.793 3.967 5.399 12.26 5.441 1.164.014 2.498.558 3.591 1.553.96.866 1.528 2.251 2.075 3.65.836 2.106 2.322 4.139 4.584 6.407.119.135 1.98 1.561 2.119 1.666.025.021.168.334.106.51-.039 1.38-.245 5.34 2.731 5.506.731.04.549-.463.549-.82-.01-.683-.129-1.371.226-2.08.507-.957-1.051-1.418-1.017-3.513.037-1.567-1.291-1.302-1.969-2.498-.381-.687-.736-1.065-.699-1.894.145-4.76-1.034-7.896-1.61-8.654-.455-.587-.847-.806-.414-1.078 2.481-1.632 3.05-3.15 3.05-3.15 1.32-3.081 2.512-5.89 4.15-7.138.332-.241 1.177-.88 1.703-1.12 1.527-.725 2.346-1.156 2.777-1.576.711-.675 1.27-2.107.588-2.96h-.001z" />
              </svg>
            </div>

            <div className="text-white flex justify-between items-center text-[22px] w-[80px] ">
              <FaRegUser />
              <Link to="/cart" className="relative">
                <FiShoppingCart />
                {cart.length > 0 && (
                  <span className="absolute top-[-8px] right-[-8px] bg-red-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                    {cart.length}
                  </span>
                )}
              </Link>
            </div>
          </div>
          <div className="hidden lg:block relative">
            <div className="flex justify-between items-center px-[25px] " >

              <div className="flex justify-between items-center" >
                <div className="text-white mr-[20px] ">
                  <Link to={`/`}>
                    <svg viewBox="0 0 48 37" xmlns="http://www.w3.org/2000/svg" width={40} height={40}>
                      <path fill="currentColor" d="M47.689.517c-.834-1.066-2.291-.213-2.933.16-4.569 2.692-5.243 7.432-6.834 10.154-1.253 2.178-3.304 3.779-5.159 3.903-1.373.098-2.861-.167-4.338-.81-3.613-1.562-5.56-3.583-6.034-3.94-.973-.739-8.459-8.03-14.559-8.327 0 0-.744-1.5-.93-1.526C6.457.08 6 1.033 5.669 1.133c-.3.105-.825-1.024-1.13-.975C4.233.2 3.936 1.33 3.34 1.913c-.439.425-.973.398-1.275.926-.104.192-.068.53-.186.84-.253.641-1.102.708-1.11 1.394 0 .762.714.907 1.338 1.438.496.425.53.725 1.109.924.515.176 1.264-.374 1.928-.177.553.163 1.085.279 1.204.846.108.513 0 1.316-.682 1.226-.222-.03-1.194-.348-2.395-.22-1.45.154-3.105.618-3.267 2.22-.083.895 1.028 1.942 2.11 1.733.742-.143.392-1.013.797-1.433.535-.541 3.545 1.888 6.344 1.888 1.186 0 2.063-.3 2.935-1.21.078-.057.185-.203.31-.218.113.015.324.128.39.175 2.262 1.793 3.967 5.399 12.26 5.441 1.164.014 2.498.558 3.591 1.553.96.866 1.528 2.251 2.075 3.65.836 2.106 2.322 4.139 4.584 6.407.119.135 1.98 1.561 2.119 1.666.025.021.168.334.106.51-.039 1.38-.245 5.34 2.731 5.506.731.04.549-.463.549-.82-.01-.683-.129-1.371.226-2.08.507-.957-1.051-1.418-1.017-3.513.037-1.567-1.291-1.302-1.969-2.498-.381-.687-.736-1.065-.699-1.894.145-4.76-1.034-7.896-1.61-8.654-.455-.587-.847-.806-.414-1.078 2.481-1.632 3.05-3.15 3.05-3.15 1.32-3.081 2.512-5.89 4.15-7.138.332-.241 1.177-.88 1.703-1.12 1.527-.725 2.346-1.156 2.777-1.576.711-.675 1.27-2.107.588-2.96h-.001z" />
                    </svg>
                  </Link>
                </div>
                <div >
                  <ul className="flex items-center justify-between  ">
                    {
                      data.map(item =>
                        <div key={item.id}
                          onMouseEnter={() => setHoveredCategory(item)}
                          onMouseLeave={() => setHoveredCategory(null)}
                        >

                          <li className="py-[25px]" key={item.id}>
                            <Link to={`/puma/${item.slug}`} >
                              <span>
                                <span
                                  className={`text-[16px] font-semibold mx-[15px]   cursor-pointer transition-all duration-200
                              ${hoveredCategory?.id === item.id ? 'text-white opacity-100' : hoveredCategory ? 'text-gray-400 opacity-60' : 'text-white opacity-100'}
                            `}
                                >

                                  {item.categoryName}
                                </span>
                              </span>
                            </Link>
                            <DropdownMenu
                              category={item}
                              isOpen={hoveredCategory?.id === item.id}
                            />
                          </li>

                        </div>
                      )
                    }
                  </ul>
                </div>

              </div>

              <div className="flex items-center  gap-[25px] ">
                <div className="p-2 border-[1px]  border-[#676D75] rounded-[3px] w-[135px] flex items-center gap-[15px]  text-[#fff] font-semibold  cursor-pointer" onClick={handleSearchClick}>
                  <FaSearch className="ml-2 text-l" />
                  SEARCH
                </div>
                <div className="text-white text-[20px] flex items-center gap-[20px]">
                  <div className="relative cursor-pointer" onClick={() => navigate("/wishlist")}>
                    <FaRegHeart />
                    {totalFavoriteItems > 0 && (
                      <span className="absolute top-[-8px] right-[-8px] bg-red-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                        {totalFavoriteItems}
                      </span>
                    )}
                  </div>
                  <Link to="/cart" className="relative cursor-pointer">
                    <FiShoppingCart />
                    {totalShoppingItems > 0 && (
                      <span className="absolute top-[-8px] right-[-8px] bg-red-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                        {totalShoppingItems}
                      </span>
                    )}
                  </Link>
                  <FaRegUser />
                </div>
              </div>
            </div>

          </div>
        </div >
      </div >
    </>
  );
}


export default Navbar;