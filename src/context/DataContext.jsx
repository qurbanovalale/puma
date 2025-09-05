// import React, { createContext, useEffect, useState } from 'react';
// import { getAllCategories, getAllProducts } from '../../services/pumaServices';
// import { toast } from 'react-toastify'; // Toastify importu əlavə edildi

// export const PumaContext = createContext();

// function DataContext({ children }) {
//   const [data, setData] = useState([]);
//   const [productData, setProductData] = useState([]);
//   const [error, setError] = useState(null);
//   const [loader, setLoader] = useState(true);

//   // ✅ Wishlist (Favorites) state
//   const [favorites, setFavorites] = useState(() => {
//     return JSON.parse(localStorage.getItem('favorites')) || [];
//   });
//   useEffect(() => {
//     localStorage.setItem('favorites', JSON.stringify(favorites));
//   }, [favorites]);

//   // YENİ: Səbət (Cart) üçün state
//   const [cart, setCart] = useState(() => {
//     return JSON.parse(localStorage.getItem('cart')) || [];
//   });

//   // YENİ: Səbətdəki dəyişiklikləri localStorage-ə yazan useEffect
//   useEffect(() => {
//     localStorage.setItem('cart', JSON.stringify(cart));
//   }, [cart]);


//   // Mövcud Wishlist toggle funksiyası
//   const toggleFavorite = (productWithSelectedSize) => {
//     setFavorites(prev => {
//       const exists = prev.find(p => p.id === productWithSelectedSize.id);
//       if (exists) {
//         toast.info(`"${productWithSelectedSize.header}" removed from wishlist.`);
//         return prev.filter(p => p.id !== productWithSelectedSize.id);
//       } else {
//         toast.success(`"${productWithSelectedSize.header}" added to wishlist!`);
//         return [...prev, productWithSelectedSize];
//       }
//     });
//   };

//   // YENİ: Səbətə məhsul əlavə etmək funksiyası
//   const addToCart = (product, size, quantity) => {
//     const existingItem = cart.find(item => item.id === product.id && item.selectedSize === size);

//     if (existingItem) {
//       // Əgər eyni məhsul eyni ölçüdə səbətdə varsa, sayını artır
//       setCart(cart.map(item =>
//         item.id === product.id && item.selectedSize === size
//           ? { ...item, quantity: item.quantity + quantity }
//           : item
//       ));
//       toast.success(`${quantity} more "${product.header}" added to cart!`);
//     } else {
//       // Əgər yoxdursa, yeni məhsul kimi əlavə et
//       const newItem = { ...product, selectedSize: size, quantity: quantity };
//       setCart([...cart, newItem]);
//       toast.success(`"${product.header}" added to cart!`);
//     }
//   };

//   // YENİ: Səbətdən məhsulu silmək
//   const removeFromCart = (productId, size) => {
//     setCart(cart.filter(item => !(item.id === productId && item.selectedSize === size)));
//     toast.info("Item removed from cart.");
//   };

//   // YENİ: Səbətdəki məhsulun sayını dəyişmək
//   const updateCartQuantity = (productId, size, newQuantity) => {
//     setCart(cart.map(item =>
//       item.id === productId && item.selectedSize === size
//         ? { ...item, quantity: newQuantity }
//         : item
//     ));
//   };

//   // YENİ: Səbətdəki məhsulu redaktə etmək (ölçü dəyişmək üçün)
//   const updateCartItem = (productId, oldSize, newSize) => {
//     const itemToUpdate = cart.find(item => item.id === productId && item.selectedSize === oldSize);
//     if (!itemToUpdate) return;

//     // Yeni ölçüdə məhsul səbətdə artıq varmı?
//     const existingItemWithNewSize = cart.find(item => item.id === productId && item.selectedSize === newSize);

//     if (existingItemWithNewSize) {
//       // Əgər varsa, köhnəni sil və mövcud olanın sayını artır (məhsulları birləşdir)
//       const updatedCart = cart
//         .map(item =>
//           item.id === productId && item.selectedSize === newSize
//             ? { ...item, quantity: item.quantity + itemToUpdate.quantity }
//             : item
//         )
//         .filter(item => !(item.id === productId && item.selectedSize === oldSize));
//       setCart(updatedCart);
//     } else {
//       // Əgər yoxdursa, sadəcə ölçünü yenilə
//       setCart(cart.map(item =>
//         item.id === productId && item.selectedSize === oldSize
//           ? { ...item, selectedSize: newSize }
//           : item
//       ));
//     }
//     toast.success("Cart item updated!");
//   };


//   useEffect(() => {
//     setLoader(true);
//     Promise.all([getAllCategories(), getAllProducts()])
//       .then(([categories, products]) => {
//         setData(categories);
//         setProductData(products);
//       })
//       .catch(err => {
//         setError(err);
//         console.error("Failed to fetch data:", err);
//       })
//       .finally(() => {
//         setLoader(false);
//       });
//   }, []);

//   return (
//     <PumaContext.Provider value={{
//       data,
//       productData,
//       error,
//       loader,
//       favorites,
//       toggleFavorite,
//       setFavorites,
//       // YENİ: Səbət üçün bütün state və funksiyaları Provider-a əlavə edirik
//       cart,
//       addToCart,
//       removeFromCart,
//       updateCartQuantity,
//       updateCartItem
//     }}>
//       {children}
//     </PumaContext.Provider>
//   );
// }

// export default DataContext;

import React, { createContext, useEffect, useState } from 'react';
import { getAllCategories, getAllProducts } from '../../services/pumaServices';
import { toast } from 'react-toastify';

export const PumaContext = createContext();

function DataContext({ children }) {
  const [data, setData] = useState([]);
  const [productData, setProductData] = useState([]);
  const [error, setError] = useState(null);
  const [loader, setLoader] = useState(true);

  // ✅ Wishlist (Favorites) state
  const [favorites, setFavorites] = useState(() => {
    return JSON.parse(localStorage.getItem('favorites')) || [];
  });
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Səbət (Cart) üçün state
  const [cart, setCart] = useState(() => {
    return JSON.parse(localStorage.getItem('cart')) || [];
  });

  // Səbətdəki dəyişiklikləri localStorage-ə yazan useEffect
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);


  // ✨ DÜZƏLİŞ: Mövcud Wishlist toggle funksiyası
  const toggleFavorite = (product, selectedSize, quantity = 1) => {
    // Eyni məhsul və ölçünün wishlistdə olub-olmadığını yoxla
    const existingItemIndex = favorites.findIndex(
      (item) => item.id === product.id && item.selectedSize === selectedSize
    );

    if (existingItemIndex !== -1) {
      // Əgər varsa, sayını artır
      const updatedFavorites = [...favorites];
      updatedFavorites[existingItemIndex].quantity += quantity;
      setFavorites(updatedFavorites);
      toast.success(
        `${quantity} more "${product.header}" added to wishlist!`
      );
    } else {
      // Yoxdursa, yeni məhsul kimi əlavə et
      const newItem = { ...product, selectedSize, quantity };
      setFavorites([...favorites, newItem]);
      toast.success(`"${product.header}" added to wishlist!`);
    }
  };


  // Səbətə məhsul əlavə etmək funksiyası
  const addToCart = (product, size, quantity) => {
    const existingItem = cart.find(item => item.id === product.id && item.selectedSize === size);

    if (existingItem) {
      // Əgər eyni məhsul eyni ölçüdə səbətdə varsa, sayını artır
      setCart(cart.map(item =>
        item.id === product.id && item.selectedSize === size
          ? { ...item, quantity: item.quantity + quantity }
          : item
      ));
      toast.success(`${quantity} more "${product.header}" added to cart!`);
    } else {
      // Əgər yoxdursa, yeni məhsul kimi əlavə et
      const newItem = { ...product, selectedSize: size, quantity: quantity };
      setCart([...cart, newItem]);
      toast.success(`"${product.header}" added to cart!`);
    }
  };

  // Səbətdən məhsulu silmək
  const removeFromCart = (productId, size) => {
    setCart(cart.filter(item => !(item.id === productId && item.selectedSize === size)));
    toast.info("Item removed from cart.");
  };

  // Səbətdəki məhsulun sayını dəyişmək
  const updateCartQuantity = (productId, size, newQuantity) => {
    setCart(cart.map(item =>
      item.id === productId && item.selectedSize === size
        ? { ...item, quantity: newQuantity }
        : item
    ));
  };

  // Səbətdəki məhsulu redaktə etmək (ölçü dəyişmək üçün)
  const updateCartItem = (productId, oldSize, newSize) => {
    const itemToUpdate = cart.find(item => item.id === productId && item.selectedSize === oldSize);
    if (!itemToUpdate) return;

    // Yeni ölçüdə məhsul səbətdə artıq varmı?
    const existingItemWithNewSize = cart.find(item => item.id === productId && item.selectedSize === newSize);

    if (existingItemWithNewSize) {
      // Əgər varsa, köhnəni sil və mövcud olanın sayını artır (məhsulları birləşdir)
      const updatedCart = cart
        .map(item =>
          item.id === productId && item.selectedSize === newSize
            ? { ...item, quantity: item.quantity + itemToUpdate.quantity }
            : item
        )
        .filter(item => !(item.id === productId && item.selectedSize === oldSize));
      setCart(updatedCart);
    } else {
      // Əgər yoxdursa, sadəcə ölçünü yenilə
      setCart(cart.map(item =>
        item.id === productId && item.selectedSize === oldSize
          ? { ...item, selectedSize: newSize }
          : item
      ));
    }
    toast.success("Cart item updated!");
  };


  useEffect(() => {
    setLoader(true);
    Promise.all([getAllCategories(), getAllProducts()])
      .then(([categories, products]) => {
        setData(categories);
        setProductData(products);
      })
      .catch(err => {
        setError(err);
        console.error("Failed to fetch data:", err);
      })
      .finally(() => {
        setLoader(false);
      });
  }, []);

  return (
    <PumaContext.Provider value={{
      data,
      productData,
      error,
      loader,
      favorites,
      toggleFavorite,
      setFavorites,
      cart,
      addToCart,
      removeFromCart,
      updateCartQuantity,
      updateCartItem
    }}>
      {children}
    </PumaContext.Provider>
  );
}

export default DataContext;