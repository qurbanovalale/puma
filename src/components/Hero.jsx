import React from 'react'
import { FaAngleRight } from "react-icons/fa6";

function Hero() {
    return (
        <>
            <div className="relative w-full h-[60vh] lg:h-full ">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className='object-cover object-center h-full w-full'

                >
                    <source src='https://images.puma.com/video/upload/f_auto:video,fl_keep_dar,w_2000/cms/videos/75400d3cd1a8ee32fac1683a40c4a806dc0f927d?_a=BAMAK+eA0' type="video/mp4" />

                </video>
                <div className=' absolute  bottom-[45px] left-[30px] hidden md:block ' >
                    <div >
                        <h1 className='text-white text-[48px] font-bold'>SPEEDCAT</h1>
                        <p className='text-white text-[24px] mb-[10px] '>FAST AND FEARLESS</p>
                        <button className='text-black p-[7px_15px] bg-white outline-hidden text-[17px] font-semibold'>SHOP NOW</button>
                    </div>
                </div>
            </div>

            <div className='flex justify-center items-center text-center flex-col p-2 md:hidden '>
                <h1 className='text-black text-[45px] font-semibold'>SPEEDCAT</h1>
                <p className='text-black text-[22px] mb-[10px] '>FAST AND FEARLESS</p>
                <button className='text-white p-[7px_15px] bg-black outline-hidden text-[17px] font-semibold'>SHOP NOW</button>
            </div>

            <div className=' p-[25px] flex flex-wrap items-center justify-between gap-[25px] sm:flex-nowrap '>
                <div>
                    <div><img src="https://images.puma.com/image/upload/c_scale,f_auto,q_auto:good,w_1536/cms/images/7a283b584af2fa1ca65b0011dc88df67dc7c43a6?_a=BAMAK+eA0%201536w,%20https://images.puma.com/image/upload/c_scale,f_auto,q_auto:good,w_1280/cms/images/7a283b584af2fa1ca65b0011dc88df67dc7c43a6?_a=BAMAK+eA0%201280w" alt="img" /></div>
                    <div className=' flex flex-col justify-between items-center text-center gap-[7px] text-[#191919]' >
                        <h3 className=' text-[20px] font-semibold '>FENTY x PUMA</h3>
                        <p className=' text-[12px]'>A NEW COLLECTION BY RIHANNA</p>
                        <div className='flex flex-col gap-[7px]'>
                            <button className='p-[8px_16px] text-[16px] text-white bg-[#181818] outline-none font-semibold'>SHOP THE COLLECTION</button>
                            <button className='p-[8px_16px] text-[16px] text-white bg-[#181818] outline-none font-semibold' >SHOP THE BEST SELLERS</button>
                        </div>
                    </div>
                </div>
                <div>
                    <div><img src="https://images.puma.com/image/upload/c_scale,f_auto,q_auto:good,w_1536/cms/images/41801fa5e1f1b2c4a6dc08c799aa76de4d86a392?_a=BAMAK+eA0%201536w,%20https://images.puma.com/image/upload/c_scale,f_auto,q_auto:good,w_1280/cms/images/41801fa5e1f1b2c4a6dc08c799aa76de4d86a392?_a=BAMAK+eA0%201280w" alt="img" /></div>
                    <div className=' flex flex-col justify-between items-center text-center gap-[7px] text-[#191919]' >
                        <h3 className=' text-[20px] font-semibold '>LAFRANCÉ RNR</h3>
                        <p className=' text-[12px]'  >NEW COLORS FROM LAMELO BALL</p>
                        <div className='flex flex-col gap-[7px]'>
                            <button className='p-[8px_16px] text-[16px] text-white bg-[#181818] outline-none font-semibold'>SHOP LAFRANCÉ</button>
                            <button className='p-[8px_16px] text-[16px] text-white bg-[#181818] outline-none font-semibold'>SHOP NEW ARRIVALS</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className='py-[20px]'>
                <div className='relative w-full'>
                    <img className='object-cover object-center' src="https://images.puma.com/image/upload/c_scale,f_auto,q_auto:good,w_2000/cms/images/9bf59ef6f2b1ccde78c9a4f31d27c86a1a887b39?_a=BAMAK+eA0%202000w,%20https://images.puma.com/image/upload/c_scale,f_auto,q_auto:good,w_1920/cms/images/9bf59ef6f2b1ccde78c9a4f31d27c86a1a887b39?_a=BAMAK+eA0%201920w,%20https://images.puma.com/image/upload/c_scale,f_auto,q_auto:good,w_1280/cms/images/9bf59ef6f2b1ccde78c9a4f31d27c86a1a887b39?_a=BAMAK+eA0%201280w" alt="img" />
                    <div className='absolute top-[30%] left-[5%] hidden md:block'>
                        <h3 className='text-[28px] text-white font-bold lg:text-[48px]' >MAKE YOUR MOVE</h3>
                        <p className='text-[18px] text-white lg:text-[18px]' >GO BACK TO SCHOOL WITH PUMA</p>
                        <div className='flex gap-[15px] items-center mt-[15px]'>
                            <button className='p-[8px_20px] bg-white outline-none text-[16px] font-semibold'>SHOP MEN</button>
                            <button className='p-[8px_20px] bg-white outline-none text-[16px] font-semibold'>SHOP WOMEN</button>
                            <button className='p-[8px_20px] bg-white outline-none text-[16px] font-semibold'>SHOP KIDS</button>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col justify-center items-center text-center p-[20px] md:hidden '>
                    <h3 className='text-[24px] text-black font-bold ' >MAKE YOUR MOVE</h3>
                    <p className='text-[14px] text-black ' >GO BACK TO SCHOOL WITH PUMA</p>
                    <div className='flex gap-[15px] items-center mt-[15px]'>
                        <button className='p-[8px_20px] bg-black text-white outline-none text-[16px] font-semibold'>SHOP MEN</button>
                        <button className='p-[8px_20px] bg-black  text-white  outline-none text-[16px] font-semibold'>SHOP WOMEN</button>
                        <button className='p-[8px_20px] bg-black  text-white  outline-none text-[16px] font-semibold'>SHOP KIDS</button>
                    </div>
                </div>
            </div>

            <div className="p-[25px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[15px]">
                {/* Card 1 */}
                <div className="w-full min-h-[519px] bg-gray-100 flex flex-col">
                    <div className="flex-shrink-0">
                        <img
                            className="w-full h-[300px] object-cover"
                            src="https://assets-manager.abtasty.com/2df40c2acabd6f9cf3388199e17e4ce4/25aw_ecom_sp_skepta_aug_epdp_library-image_desk-tab-mob_2000x2000px.jpg"
                            alt="img"
                        />
                    </div>
                    <div className="flex flex-col justify-between flex-1 p-[15px]">
                        <div className="p-[14px_16px] text-[#191919]">
                            <h3 className="text-[18px] font-bold">PREMIUM PUMA</h3>
                            <p className="text-[14px]">
                                High quality, high comfort shoes and clothing to elevate any wardrobe.
                            </p>
                        </div>
                        <div className="text-[#191919] font-bold text-[16px] flex justify-end items-center gap-[6px] w-full p-[10px_16px]">
                            SHOP NOW <FaAngleRight />
                        </div>
                    </div>
                </div>

                {/* Card 2 */}
                <div className="w-full min-h-[519px] bg-gray-100 flex flex-col">
                    <div className="flex-shrink-0">
                        <img
                            className="w-full h-[300px] object-cover"
                            src="https://assets-manager.abtasty.com/2df40c2acabd6f9cf3388199e17e4ce4/25aw_ecomm_sp_animal-print_curated-sotry_site_full-bleed-hero_tabmob_1536x1536px_1.jpg"
                            alt="img"
                        />
                    </div>
                    <div className="flex flex-col justify-between flex-1 p-[15px]">
                        <div className="p-[14px_16px] text-[#191919]">
                            <h3 className="text-[18px] font-bold">ANIMAL PRINT</h3>
                            <p className="text-[14px]">Stay spotted with styles that roar.</p>
                        </div>
                        <div className="text-[#191919] font-bold text-[16px] flex justify-end items-center gap-[6px] w-full p-[10px_16px]">
                            SHOP NOW <FaAngleRight />
                        </div>
                    </div>
                </div>

                {/* Card 3 */}
                <div className="w-full min-h-[519px] bg-gray-100 flex flex-col">
                    <div className="flex-shrink-0">
                        <img
                            className="w-full h-[300px] object-cover"
                            src="https://assets-manager.abtasty.com/2df40c2acabd6f9cf3388199e17e4ce4/25aw_ts_football_man-city_away_homepage_trending-inline_desk-tab-mob_1536x1536px_product.jpg"
                            alt="img"
                        />
                    </div>
                    <div className="flex flex-col justify-between flex-1 p-[15px]">
                        <div className="p-[14px_16px] text-[#191919]">
                            <h3 className="text-[18px] font-bold">JERSEYS</h3>
                            <p className="text-[14px]">
                                Jerseys for those who carry the soccer legacy not only on their shirt
                                but in their soul.
                            </p>
                        </div>
                        <div className="text-[#191919] font-bold text-[16px] flex justify-end items-center gap-[6px] w-full p-[10px_16px]">
                            SHOP NOW <FaAngleRight />
                        </div>
                    </div>
                </div>

                {/* Card 4 */}
                <div className="w-full min-h-[519px] bg-gray-100 flex flex-col">
                    <div className="flex-shrink-0">
                        <img
                            className="w-full h-[300px] object-cover"
                            src="https://assets-manager.abtasty.com/2df40c2acabd6f9cf3388199e17e4ce4/25aw_ecom_train_hyrox_homepage_full-bleed-hero_tab-mob_1536x1536px_womens.jpg"
                            alt="img"
                        />
                    </div>
                    <div className="flex flex-col justify-between flex-1 p-[15px]">
                        <div className="p-[14px_16px] text-[#191919]">
                            <h3 className="text-[18px] font-bold">ACTIVEWEAR</h3>
                            <p className="text-[14px]">
                                Wake up your workout with styles that take your training to the top.
                            </p>
                        </div>
                        <div className="text-[#191919] font-bold text-[16px] flex justify-end items-center gap-[6px] w-full p-[10px_16px]">
                            SHOP NOW <FaAngleRight />
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Hero
