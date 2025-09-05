import React, { useContext, useState } from 'react';
import { PumaContext } from '../context/DataContext';
import { Link, useParams } from 'react-router-dom';
import { FaRegTrashAlt, FaPen, FaHeart, FaShoppingCart } from 'react-icons/fa';
import { toast } from 'react-toastify';

function WishList() {
  const { favorites, setFavorites, addToCart } = useContext(PumaContext);
  const [editingProduct, setEditingProduct] = useState(null);
  const [newSize, setNewSize] = useState('');
  const { categorySlug, subcategorySlug, childSlug } = useParams()

  const handleDelete = (productId, selectedSize) => {
    setFavorites(favorites.filter(p => !(p.id === productId && p.selectedSize === selectedSize)));
    toast.info("Məhsul wishlist-dən silindi.");
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setNewSize(product.selectedSize || '');
  };

  const handleUpdateSize = () => {
    const existingProductWithNewSize = favorites.find(
      p => p.id === editingProduct.id && p.selectedSize === newSize
    );

    if (existingProductWithNewSize) {
      const updatedFavorites = favorites
        .map(item =>
          item.id === editingProduct.id && item.selectedSize === newSize
            ? { ...item, quantity: item.quantity + editingProduct.quantity }
            : item
        )
        .filter(item => !(item.id === editingProduct.id && item.selectedSize === editingProduct.selectedSize));
      setFavorites(updatedFavorites);
      toast.success("Məhsulun ölçüsü birləşdirildi.");
    } else {
      setFavorites(favorites.map(p =>
        p.id === editingProduct.id && p.selectedSize === editingProduct.selectedSize
          ? { ...p, selectedSize: newSize }
          : p
      ));
      toast.success("Məhsulun ölçüsü yeniləndi.");
    }

    setEditingProduct(null);
    setNewSize('');
  };

  // ✅ DƏYİŞİKLİK: Məhsulu səbətə əlavə edir, amma wishlist-dən sİLMİR
  const handleAddToCart = (product) => {
    addToCart(product, product.selectedSize, product.quantity);
    toast.success(`"${product.header}" səbətə əlavə edildi.`);
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-6xl">
      <div className="sm:p-[15px] sm:border sm:border-gray-200 sm:rounded-xl">
        {/* Başlıq */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">MY WISHLIST</h1>
          <p className="text-gray-600">{favorites.reduce((total, item) => total + item.quantity, 0)} items</p>
        </div>

        <hr className="border-gray-300 my-4" />

        {favorites.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-6">
            <div className="text-gray-400 mb-4">
              <FaHeart size={60} />
            </div>
            <p className="text-[#191919] text-lg mb-8">Your Wishlist is Empty</p>
          </div>
        ) : (
          <div className="flex flex-col gap-6 mt-8">
            {favorites.map(product => (
              <div key={`${product.id}-${product.selectedSize}`} className="flex flex-col">
                {/* Şəkil + Mətnlər yan-yana */}
                <div className="flex items-center">
                  {/* Şəkil */}
                  <div className="relative w-[128px] h-[128px] sm:w-[208px] sm:h-[208px] md:w-[256px] md:h-[256px] flex-shrink-0">
                    <Link to={`/puma/${categorySlug}/${subcategorySlug}/${childSlug}/${encodeURIComponent(product.name)}/${product.id}`}>
                      <img
                        src={product.variations[0].images[0].href}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </Link>
                  </div>

                  {/* Mətnlər */}
                  <div className="p-4 md:w-2/3 flex flex-col justify-between">
                    <div>
                      <h3 className="font-semibold text-[#191919] text-[12px] sm:text-[16px] md:text-[20px]">{product.header}</h3>
                      <p className="text-[#676d75] text-[12px] sm:text-[16px] md:text-[20px]">{product.subHeader}</p>
                      <p className="text-[#191919] text-[12px] sm:text-[16px] md:text-[18px]">{product.variations[0].colorName}</p>
                      <span className="font-semibold text-[14px] text-[#191919]">
                        SIZE: <span className="font-normal">{product.selectedSize}</span>
                      </span>
                      {product.quantity > 1 && (
                        <span className="ml-2 font-semibold text-[14px] text-gray-500">
                          (X{product.quantity})
                        </span>
                      )}
                      <p className="text-[14px] text-[#191919] font-semibold">
                        PRICE: <span className="font-normal">${(product.variations[0].price * product.quantity).toFixed(2)}</span>
                      </p>
                      <p className="text-[14px] text-[#191919] font-semibold">
                        STYLE NUMBER: <span className="font-normal">{product.variations[0].styleNumber}</span>
                      </p>
                    </div>

                    <div className="flex gap-[30px] m-[10px_0]">
                      <button
                        onClick={() => handleEdit(product)}
                        className="ml-2 text-gray-500 hover:text-gray-700"
                      >
                        <FaPen size={20} />
                      </button>
                      <button
                        onClick={() => handleDelete(product.id, product.selectedSize)}
                        className="p-2 bg-white hover:bg-gray-100 transition-colors"
                      >
                        <FaRegTrashAlt size={20} className="text-gray-600" />
                      </button>
                    </div>

                    <button
                      onClick={() => handleAddToCart(product)}
                      className="hidden md:flex bg-black text-white py-2 px-4 rounded items-center justify-center w-auto"
                    >
                      <FaShoppingCart className="mr-2" />
                      ADD TO CART
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => handleAddToCart(product)}
                  className="flex md:hidden bg-black text-white py-2 px-4 rounded items-center justify-center w-full mt-4"
                >
                  <FaShoppingCart className="mr-2" />
                  ADD TO CART
                </button>

                {/* Edit Modal */}
                {editingProduct && editingProduct.id === product.id && editingProduct.selectedSize === product.selectedSize && (
                  <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full">
                      <h3 className="font-bold text-lg mb-4">UPDATE ITEM</h3>
                      <div className="mb-4">
                        <p className="text-sm text-gray-600">{editingProduct.styleCode}</p>
                        <h4 className="font-bold">{editingProduct.header}</h4>
                        <p className="text-gray-600">{editingProduct.variations[0].colorDescription}</p>
                        <p className="text-sm mt-1">BIG KIDS</p>
                      </div>

                      <div className="mb-6">
                        <p className="font-medium mb-2">Select Size:</p>
                        <div className="grid grid-cols-4 gap-2">
                          {editingProduct.productMeasurements.metric.slice(1).map((sizeRow, index) => {
                            const sizeIndex = editingProduct.productMeasurements.metric[0].indexOf("Size");
                            const stockIndex = editingProduct.productMeasurements.metric[0].indexOf("Stock");

                            const size = sizeRow[sizeIndex];
                            const stock = sizeRow[stockIndex];
                            const isOutOfStock = stock === "0";

                            return (
                              <button
                                key={index}
                                onClick={() => !isOutOfStock && setNewSize(size)}
                                disabled={isOutOfStock}
                                className={`border rounded py-2 text-center transition-colors
                                                                    ${isOutOfStock ? "bg-gray-200 text-gray-400 line-through cursor-not-allowed" : ""}
                                                                    ${newSize === size && !isOutOfStock ? "border-black font-bold" : "border-gray-300"}`}
                              >
                                {size}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={handleUpdateSize}
                          className="flex-1 bg-black text-white py-2 px-4 rounded"
                          disabled={!newSize}
                        >
                          UPDATE ITEM
                        </button>
                        <button
                          onClick={() => setEditingProduct(null)}
                          className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded"
                        >
                          CANCEL
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default WishList;