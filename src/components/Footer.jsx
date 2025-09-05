import React from 'react'
import { FaYoutube, FaPinterestP, FaInstagram, FaFacebookF } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";

function Footer() {
    return (
        <>
            <footer className="bg-black text-white text-sm">
                <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* SUPPORT */}
                    <div>
                        <h3 className="font-bold mb-3">SUPPORT</h3>
                        <ul className="space-y-2">
                            <li><a href="#">Contact Us</a></li>
                            <li><a href="#">FAQ</a></li>
                            <li><a href="#">Shipping and Delivery</a></li>
                            <li><a href="#">Return Policy</a></li>
                            <li><a href="#">Terms & Conditions</a></li>
                            <li><a href="#">Privacy Policy</a></li>
                            <li><a href="#">Promotion Exclusions</a></li>
                            <li><a href="#">Do Not Sell or Share My Information</a></li>
                            <li><a href="#">Transparency in Supply Chain</a></li>
                            <li><a href="#">Cookie Settings</a></li>
                        </ul>
                    </div>

                    {/* STORE INFO */}
                    <div>
                        <ul className="space-y-2 mt-8 md:mt-0">
                            <li><a href="#">NYC Flagship Store</a></li>
                            <li><a href="#">Las Vegas Flagship Store</a></li>
                            <li><a href="#">Store Locator</a></li>
                            <li><a href="#">Buy a Gift Card</a></li>
                            <li><a href="#">Gift Card Balance</a></li>
                            <li><a href="#">Service Discount</a></li>
                            <li><a href="#">Student Discount</a></li>
                            <li><a href="#">Refer a Friend</a></li>
                            <li><a href="#">Sitemap</a></li>
                        </ul>
                    </div>

                    {/* ABOUT */}
                    <div>
                        <h3 className="font-bold mb-3">ABOUT</h3>
                        <ul className="space-y-2">
                            <li><a href="#">Company</a></li>
                            <li><a href="#">Corporate News</a></li>
                            <li><a href="#">Press Center</a></li>
                            <li><a href="#">#REFORM</a></li>
                            <li><a href="#">Investors</a></li>
                            <li><a href="#">Sustainability</a></li>
                            <li><a href="#">Careers</a></li>
                        </ul>
                    </div>

                    {/* STAY UP TO DATE */}
                    <div>
                        <h3 className="font-bold mb-3">STAY UP TO DATE</h3>
                        <a href="#" className="block mb-5">Sign Up for Email</a>

                        <h3 className="font-bold mb-3">EXPLORE</h3>
                        <div className="flex gap-4">
                            <button className="bg-transparent border border-white px-4 py-3 rounded-md flex flex-col items-center">
                                <span className="font-bold text-xs">APP</span>
                            </button>
                            <button className="bg-transparent border border-white px-4 py-3 rounded-md flex flex-col items-center">
                                <span className="font-bold text-xs">TRAC</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-700 mt-6" />

                {/* Bottom section */}
                <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
                    {/* Social Icons */}
                    <div className="flex space-x-5 text-xl">
                        <a href="#"><FaYoutube /></a>
                        <a href="#"><RxCross2 /></a>
                        <a href="#"><FaPinterestP /></a>
                        <a href="#"><FaInstagram /></a>
                        <a href="#"><FaFacebookF /></a>
                    </div>

                    {/* Country Selector */}
                    <div className="border border-gray-600 px-6 py-3 rounded-md">
                        <span className="font-bold">UNITED STATES</span>
                    </div>

                    {/* Legal */}
                    <div className="text-xs text-gray-400 text-center md:text-right">
                        © PUMA NORTH AMERICA, INC. <br />
                        IMPRINT AND LEGAL DATA <br />
                        WEB ID: 707 901 641
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer
