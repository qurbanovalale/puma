import React, { useContext, useState } from 'react';
import { PumaContext } from '../context/DataContext';
import { FaRegTrashAlt, FaPen } from 'react-icons/fa';
import { Link, useParams } from 'react-router-dom';

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
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">MY SHOPPING CART ({cart.reduce((acc, item) => acc + item.quantity, 0)})</h1>
            <div className="lg:flex lg:gap-8">
                {/* Sol Tərəf - Məhsullar */}
                <div className="lg:w-2/3">
                    {cart.map(item => (
                        <div key={`${item.id}-${item.selectedSize}`} className="flex flex-col sm:flex-row gap-4 border-b py-6">
                            <Link to={`/puma/${categorySlug}/${subcategorySlug}/${childSlug}/${encodeURIComponent(item.name)}/${item.id}`}>
                                <img src={item.variations[0].images[0].href} alt={item.name} className="w-full sm:w-32 sm:h-32 object-cover" />
                            </Link>
                            <div className="flex-grow flex flex-col justify-between">
                                <div>
                                    <h3 className="font-bold text-lg">{item.header}</h3>
                                    <p className="text-gray-600">{item.subHeader}</p>
                                    <p className="text-sm">Color: {item.variations[0].colorName}</p>
                                    <p className="text-sm">Size: {item.selectedSize}</p>
                                    <p className="text-sm">Style: {item.variations[0].styleNumber}</p>
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
                <div className="lg:w-1/3 mt-8 lg:mt-0 bg-gray-50 p-6 h-fit sticky top-24">
                    <h2 className="text-xl font-bold border-b pb-4">ORDER SUMMARY</h2>
                    <div className="space-y-2 mt-4">
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
                    <div className="flex justify-between font-bold text-lg border-t mt-4 pt-4">
                        <span>Estimated Total</span>
                        <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <button className="w-full bg-black text-white font-bold py-3 mt-6">CHECKOUT</button>
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