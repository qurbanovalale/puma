import React, { useContext, useState } from 'react';
import { PumaContext } from '../context/DataContext';
import { FaRegTrashAlt, FaPen } from 'react-icons/fa';
import { Link, useParams } from 'react-router-dom';
import { TbTruckDelivery, TbRefresh } from 'react-icons/tb';
import { FaChevronDown } from "react-icons/fa";

const ShoppingCart = () => {
    const { cart, removeFromCart, updateCartQuantity, updateCartItem } = useContext(PumaContext);
    const [editingItem, setEditingItem] = useState(null);
    const [newSize, setNewSize] = useState('');
     const { categorySlug, subcategorySlug, childSlug } = useParams()

    const subtotal = cart.reduce((acc, item) => acc + (item.variations[0].price * item.quantity), 0);

    const handleEditClick = (item) => {
        setEditingItem(item);
        setNewSize(item.selectedSize);
    };

    const handleUpdateItem = () => {
        if (!newSize || newSize === editingItem.selectedSize) return;
        updateCartItem(editingItem.id, editingItem.selectedSize, newSize);
        setEditingItem(null);
    };

    if (cart.length === 0) {
        return (
            <div className="container mx-auto text-center py-20">
                <h1 className="text-3xl font-bold mb-4">YOUR SHOPPING CART IS EMPTY</h1>
                <Link to="/" className="bg-black text-white font-bold py-3 px-8 mt-4 inline-block">CONTINUE SHOPPING</Link>
            </div>
        );
    }

    return (
        <div className=" mx-auto p-[20px_25px]">
            <h1 className="text-[28px] text-[#191919] font-bold mb-6">MY SHOPPING CART ({cart.reduce((acc, item) => acc + item.quantity, 0)})</h1>
            <div className="lg:flex justify-between items-center lg:gap-8">
                {/* Sol Tərəf - Məhsullar */}
                <div className=" flex flex-col gap-[15px] lg:w-2/3">
                    {cart.map(item => (
                        <div key={`${item.id}-${item.selectedSize}`} className="flex flex-col sm:flex-row gap-4 border border-gray-200 p-[30px]">
                            <Link to={`/puma/${categorySlug}/${subcategorySlug}/${childSlug}/${encodeURIComponent(item.name)}/${item.id}`}>
                                <img src={item.variations[0].images[0].href} alt={item.name} className="w-full sm:w-32 sm:h-32 object-cover" />
                            </Link>
                            <div className="flex-grow flex flex-col justify-between">
                                <div>
                                    <h3 className="font-bold text-lg">{item.header}</h3>
                                    <p className="text-gray-600">{item.subHeader}</p>
                                    <p className="text-sm text-[#50565e]">Color: <span className='text-[#191919]'> {item.variations[0].colorName}</span> </p>
                                    <p className="text-sm text-[#50565e]">Size: <span className='text-[#191919]'> {item.selectedSize}</span> </p>
                                    <p className="text-sm text-[#50565e]">Style: <span className='text-[#191919]'>{item.variations[0].styleNumber}</span> </p>
                                </div>
                                <div className="flex items-center gap-4 mt-2">
                                    <select
                                        value={item.quantity}
                                        onChange={(e) => updateCartQuantity(item.id, item.selectedSize, Number(e.target.value))}
                                        className="border p-2 rounded"
                                    >
                                        {[...Array(10).keys()].map(i => (
                                            <option key={i + 1} value={i + 1}>{i + 1}</option>
                                        ))}
                                    </select>
                                    <button onClick={() => handleEditClick(item)} className="text-gray-500 hover:text-black" title="Edit Size"><FaPen /></button>
                                    <button onClick={() => removeFromCart(item.id, item.selectedSize)} className="text-gray-500 hover:text-black" title="Remove Item"><FaRegTrashAlt /></button>
                                </div>
                            </div>
                            <div className="font-bold text-lg text-right sm:text-left mt-4 sm:mt-0">
                                ${ (item.variations[0].price * item.quantity).toFixed(2) }
                            </div>
                        </div>
                    ))}
                </div>

                {/* Sağ Tərəf - Xülasə */}
                <div className="lg:w-1/3 mt-8 lg:mt-0 p-6 h-fit flex flex-col gap-[15px] sticky top-24">
                <div className='flex flex-col gap-[10px]'>
                    <div className='text-[14px] flex gap-[10px] justify-center items-center text-[#008626] font-semibold border border-gray-200 p-[3px_10px] uppercase'>
                          <TbTruckDelivery size={24} className='text-[#008626]' />
                          You’ve earned free shipping
                    </div>
                    <div className='text-[14px]  flex gap-[10px] justify-center items-center text-[#50565e] font-semibold border border-gray-200 p-[3px_10px] uppercase'>
                        <TbRefresh size={24} className='text-[#50565e]' />
                        Free returns on all qualifying orders.
                    </div>
                </div>
                <div className='flex flex-col gap-[12px] border-b border-gray-200 pb-4'>
                    <div className='bg-[#dfe0e1] p-[15px_20px] flex justify-between text-[#191919] text-[20px] items-center uppercase'>
                        Apply a promo code
                        <FaChevronDown />
                    </div>
                    <div className='flex justify-between items-center'>
                        <input type="text" className='p-[20px_50px] border bg-white' placeholder='Enter a promo code' />
                        <div className='text-[#3b4047] bg-[#dfe0e1] p-[20px_30px] ' >Apply</div>
                    </div>
                </div>
                    <div className="space-y-2 mt-4 text-[#50565e] text-[14px] font-semibold">
                        <div className="flex justify-between">
                            <span>Subtotal</span>
                            <span>${subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Shipping</span>
                            <span className='font-semibold text-green-600'>FREE</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Estimated Tax</span>
                            <span>--</span>
                        </div>
                    </div>
                    <div className="flex justify-between font-bold text-lg border-t border-gray-200 mt-4 pt-4 text-[#191919] text-[20px]">
                        <span>Estimated Total</span>
                        <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <button className="w-full bg-[#191919] text-white font-bold py-3 mt-6">CHECKOUT</button>
                </div>
            </div>

            {/* Edit Modal */}
            {editingItem && (
                 <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full">
                        <h3 className="font-bold text-lg mb-4">UPDATE ITEM SIZE</h3>
                        <div className="mb-6">
                            <p className="font-medium mb-2">Select New Size:</p>
                            <div className="grid grid-cols-4 gap-2">
                                {editingItem.productMeasurements.metric.slice(1).map((sizeRow) => {
                                    const size = sizeRow[0];
                                    const stock = sizeRow[sizeRow.length - 1];
                                    const isOutOfStock = stock === "0";
                                    return (
                                        <button key={size} onClick={() => !isOutOfStock && setNewSize(size)} disabled={isOutOfStock}
                                            className={`border rounded py-2 text-center transition-colors ${isOutOfStock ? "bg-gray-200 text-gray-400 line-through cursor-not-allowed" : ""} ${newSize === size ? "border-black font-bold" : "border-gray-300"}`}>
                                            {size}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <button onClick={handleUpdateItem} disabled={!newSize || newSize === editingItem.selectedSize} className="flex-1 bg-black text-white py-2 px-4 rounded disabled:bg-gray-400">UPDATE</button>
                            <button onClick={() => setEditingItem(null)} className="flex-1 border border-gray-300 py-2 px-4 rounded">CANCEL</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ShoppingCart;