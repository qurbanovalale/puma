import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { PumaContext } from '../context/DataContext';
import { getProductById } from '../../services/pumaServices';
import Loading from '../components/Loading';
import { TbPointFilled } from "react-icons/tb";
import { FaRegHeart } from "react-icons/fa";
import { TbTruckDelivery, TbRefresh } from 'react-icons/tb';
import { Link } from 'react-scroll';
import FormattedDescription from '../components/FormattedDescription';
import { toast } from 'react-toastify'; // react-toastify'dan toast əlavə et
import 'react-toastify/dist/ReactToastify.css'; // Stil faylını da import et

function Detail() {
    const { id } = useParams();
    const { data, favorites, toggleFavorite, addToCart } = useContext(PumaContext);
    const [product, setProduct] = useState(null);
    const [selectedSize, setSelectedSize] = useState(null);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        getProductById(id).then(item => setProduct(item));
    }, [id]);

    if (!product) {
        return <Loading />;
    }
    console.log(product);

    const handleAddToCart = () => {
        if (!selectedSize) {
            toast.error("Please select a size first!");
            return;
        }
        addToCart(product, selectedSize, quantity);
    };
    const isFavorite = favorites.some(p => p.id === product.id && p.selectedSize === selectedSize);

    const getShortDescriptionText = (htmlString) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlString, 'text/html');
        const textContent = doc.body.textContent || '';
        const words = textContent.split(/\s+/).filter(Boolean);
        const shortText = words.slice(0, 19).join(' ');
        return shortText
    };

    const getCategoryHierarchy = (categories, product) => {
        const category = categories.find(cat => cat.id === product.categoryId);
        if (!category) return [];
        const subcategory = category.subcategory?.find(sub => sub.id === product.subcategoryId);
        if (!subcategory) return [category];
        const child = subcategory.children?.find(c => c.id === product.childrenID);
        if (!child) return [category, subcategory];
        return [category, subcategory, child];
    };

    const categoryHierarchy = getCategoryHierarchy(data, product);
    const images = product.variations[0].images;

    return (
        <div className="container mx-auto p-[25px] md:p-8">
            {/* Breadcrumb Section */}
            <div className="text-[15px] md:text-[17px] text-[#191919] flex flex-wrap items-center gap-[5px] md:gap-[10px] mb-4">
                <p className="font-semibold">Home</p>
                {categoryHierarchy.map((item, index) => (
                    <div key={item.id} className='flex items-center gap-[5px]'>
                        <TbPointFilled className="text-gray-500" size={12} />
                        <p className='font-semibold whitespace-nowrap'>{item.categoryName}</p>
                    </div>
                ))}
                <div className='flex items-center gap-[5px]'>
                    <TbPointFilled className="text-gray-500" size={12} />
                    <p className='text-[#191919] text-[15px] md:text-[17px] font-sans whitespace-nowrap'>{product.name}</p>
                </div>
            </div>

            {/* Product Details Section */}
            <div className="flex flex-col md:flex-row md:gap-8 relative">
                {/* Left side: Images */}
                <div className="md:w-3/5 lg:w-2/3">
                    {/* Image section for mobile (scrollable slider) */}
                    <div className="md:hidden flex overflow-x-auto snap-x snap-mandatory space-x-4 pb-4">
                        {images.map((image, index) => (
                            <div key={index} className="flex-shrink-0 w-full snap-center">
                                <img
                                    src={image.href}
                                    alt={image.alt}
                                    className="w-full object-cover rounded-md"
                                />
                            </div>
                        ))}
                    </div>

                    {/* Image section for tablet and desktop */}
                    <div className="hidden md:block">
                        {/* Tablet */}
                        <div className="lg:hidden grid grid-cols-2 gap-4">
                            <div className="col-span-2">
                                <img src={images[0].href} alt={images[0].alt} className="w-full object-cover rounded-md" />
                            </div>
                            {images.slice(1).map((image, index) => (
                                <div key={index} className="col-span-1">
                                    <img src={image.href} alt={image.alt} className="w-full object-cover rounded-md" />
                                </div>
                            ))}
                        </div>

                        {/* Desktop */}
                        <div className="hidden lg:grid grid-cols-2 gap-4">
                            {images.map((image, index) => (
                                <div key={index} className="col-span-1">
                                    <img src={image.href} alt={image.alt} className="w-full object-cover rounded-md" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right side: Product info */}
                <div className="md:w-2/5 lg:w-1/3 mt-6 md:mt-0">
                    <div className="sticky top-[100px]"> {/* 👈 sticky əlavə etdim */}
                        <h1 className="text-[25px] font-bold text-[#191919]">{product.header}</h1>
                        <h2 className="text-[18px] text-[#676d75] mt-2">{product.subHeader}</h2>
                        <div className="mb-4">
                            {product.variations[0].badges.map((badge, index) => (
                                <span
                                    key={index}
                                    className={`text-white inline-block mt-2 px-3 py-1 text-[10px] font-bold uppercase rounded-[2px] ${badge.label.toUpperCase() === "BEST SELLER" ? "bg-[#0656b6]" : "bg-[#191919]"
                                        }`}
                                >
                                    {badge.label}
                                </span>
                            ))}
                        </div>
                        <p className="text-[24px] text-[#191919] font-bold mt-4">
                            ${product.variations[0].price}.00
                        </p>
                        <p className="text-[12px] text-[#191919] cursor-p mt-1">
                            Or 4 payments of ${(product.variations[0].price / 4).toFixed(2)}
                        </p>
                        <hr className="border-t-1 border-gray-300 my-[20px] " />

                        <div className="mt-8">
                            <h3 className="text-sm font-bold uppercase tracking-wide">Select Fit</h3>
                            <div className="flex flex-wrap gap-2 mt-2">
                                {product.productMeasurements.metric.slice(1).map((sizeRow, index) => {
                                    const sizeIndex = product.productMeasurements.metric[0].indexOf("Size");
                                    const stockIndex = product.productMeasurements.metric[0].indexOf("Stock");
                                    const size = sizeRow[sizeIndex];
                                    const stock = sizeRow[stockIndex];
                                    const isOutOfStock = stock === "0";

                                    return (
                                        <div
                                            key={index}
                                            onClick={() => {
                                                if (!isOutOfStock) {
                                                    setSelectedSize(selectedSize === size ? null : size);
                                                }
                                            }}
                                            className={`w-[61px] h-[61px] flex items-center justify-center text-center font-sans text-[#191919] border border-gray-200 cursor-pointer transition-colors
                        ${isOutOfStock ? "bg-gray-200 text-gray-400 cursor-not-allowed line-through" : ""}
                        ${selectedSize === size && !isOutOfStock ? "bg-[#191919] text-white" : ""}`}
                                        >
                                            {size}
                                        </div>
                                    );
                                })}
                            </div>

                            <a
                                href="#"
                                className="block mt-4 text-sm underline text-gray-600"
                            >
                                Size chart
                            </a>
                        </div>

                        <div className="mt-6">
                            <h3 className="text-sm font-bold uppercase tracking-wide">Quantity</h3>
                            <select
                                value={quantity}
                                onChange={(e) => setQuantity(Number(e.target.value))}
                                className="mt-2 w-24 p-2 border border-gray-300 rounded"
                            >
                                {[...Array(10).keys()].map(i => (
                                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                                ))}
                            </select>
                        </div>
                        <hr className="border-t-1 border-gray-300 my-[20px] " />

                        <div className='flex items-center gap-4 mt-6'>
                            {/* Wishlist Button */}
                            <button
                                onClick={() => {
                                    if (!selectedSize) {
                                        toast.error("Please, Select your size!");
                                        return;
                                    }
                                    // DÜZƏLİŞ: selectedSize və quantity dəyərlərini göndəririk
                                    toggleFavorite(product, selectedSize, quantity);
                                }}
                                className='p-[20px_30px] border border-gray-300 text-gray-700 hover:border-black transition-colors'
                            >
                                <FaRegHeart
                                    size={20}
                                    color={isFavorite ? "red" : "gray"} // Doğru yoxlama
                                />
                            </button>

                            {/* Add to Cart Button */}
                            <button onClick={handleAddToCart} className='flex-1 py-[16px] bg-[#191919] text-white font-bold text-lg  hover:bg-gray-800 transition-colors'>
                                ADD TO CART
                            </button>
                        </div>
                        <div className='flex flex-col gap-3 mt-6 text-[16px]'>
                            {/* Free Shipping Block */}
                            <div className='flex items-center gap-2'>
                                <TbTruckDelivery size={24} className='text-[#4d7d04]' />
                                <p className='text-[#4d7d04] font-bold'>This item qualifies for free shipping!</p>
                            </div>

                            {/* Free Returns Block */}
                            <div className='flex items-center gap-2'>
                                <TbRefresh size={24} className='text-[#676d75]' />
                                <p className='text-[#676d75]'>Free returns on all qualifying orders.</p>
                            </div>
                        </div>

                        <div className='my-4'>
                            <h3 className='text-[20px] text-[#191919] font-bold'>Description</h3>
                            <div className='mb-2'>
                                <p className="text-[16px] text-[#191919] line my-2 ">
                                    {getShortDescriptionText(product.description)}
                                </p>
                                <ul className='list-disc px-4 py-2 text-[#191919] text-[16px]'>
                                    <li>Style: {product.variations[0].styleNumber}</li>
                                    <li>Color: {product.variations[0].colorName}</li>
                                </ul>
                                <Link
                                    to="long-description"
                                    smooth={true}
                                    duration={600}
                                    className="text-sm font-bold underline cursor-pointer mt-2 block"
                                >
                                    READ MORE
                                </Link>
                            </div>
                        </div>
                        <div className='my-[30px]'>
                            <h3 className='text-[20px] pb-[5px] text-[#191919] font-semibold'>Shipping and Returns</h3>
                            <p className="text-[16px] text-[#191919] line my-2 ">
                                Free standard shipping on orders over $60 before tax, plus free returns on all qualifying orders.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* uzun description hissəsi */}
            <div id="long-description" className="mt-12 w-full bg-[#eeeeeeb3] p-[40px] rounded-m text-[#191919]">
                <FormattedDescription htmlContent={product.productStory?.longDescription} />
            </div>
        </div>
    );
}

export default Detail;
