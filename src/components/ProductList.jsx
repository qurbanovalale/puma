import React, { useContext, useState, useEffect, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { PumaContext } from "../context/DataContext";
import { TbPointFilled } from "react-icons/tb";
import { FaChevronDown } from "react-icons/fa";
import { HiAdjustmentsHorizontal } from "react-icons/hi2";
import { MdGridView } from "react-icons/md";
import { BsFillGrid3X3GapFill } from "react-icons/bs";
import { FaRegSquare } from "react-icons/fa";
import { TfiLayoutGrid4Alt } from "react-icons/tfi";
import Filter from "./Filter";
import SortDropdown from "./SortDropdown";

function ProductList() {
  const { categorySlug, subcategorySlug, childSlug } = useParams();
  const { data, productData } = useContext(PumaContext);
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [gridType, setGridType] = useState("grid2");
  const [sortOption, setSortOption] = useState("Sort by");

  // ✅ resize ilə gridType sinxronlaşdırmaq
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setGridType("grid2"); // xs - 2 column
      } else if (window.innerWidth < 1024) {
        setGridType("grid3"); // md - 3 column
      } else {
        setGridType("grid4"); // lg və yuxarı - 4 column
      }
    };

    handleResize(); // səhifə ilk açılarkən işləsin
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { currentCategory, currentSubcategory, currentChild } = useMemo(() => {
    if (!data.length) return {};

    const category = data.find((cat) => cat.slug === categorySlug);
    if (!category) return {};

    const subcategory = subcategorySlug
      ? category.subcategory?.find((sub) => sub.slug === subcategorySlug)
      : null;

    const child = subcategory && childSlug
      ? subcategory.children?.find((ch) => ch.slug.split("/").pop() === childSlug)
      : null;

    return { currentCategory: category, currentSubcategory: subcategory, currentChild: child };
  }, [data, categorySlug, subcategorySlug, childSlug]);

  // YENİLƏNMİŞ MƏNTİQ: Məhsulların ilkin filtrlənməsi
  const initialFilteredProducts = useMemo(() => {
    if (!currentCategory) return [];

    return productData.filter((p) => {
      const categoryMatch = String(p.categoryId) === String(currentCategory.id);

      // Əgər subcategorySlug yoxdursa, bu yoxlama ötürülür (həmişə true olur)
      const subcategoryMatch = !currentSubcategory || String(p.subcategoryId) === String(currentSubcategory.id);

      // Əgər childSlug yoxdursa, bu yoxlama ötürülür (həmişə true olur)
      const childMatch = !currentChild || String(p.clidrenID) === String(currentChild.id);

      return categoryMatch && subcategoryMatch && childMatch;
    });
  }, [currentCategory, currentSubcategory, currentChild, productData]);

  // DƏYİŞİKLİK BURADAN BAŞLAYIR
  // ===================================

  // 1. Seçilmiş filtrləri (selectedFilters) ilkin olaraq ümumi qiymət diapazonu ilə təyin edirik.
  const [selectedFilters, setSelectedFilters] = useState({
    styles: [],
    colors: [],
    categories: [],
    price: { from: 0, to: Infinity } // Başlanğıc dəyərlərini daha ümumi edirik
  });

  // 2. Kaskadlı filtrləmə üçün dinamik filterOptions yaradırıq.
  const filterOptions = useMemo(() => {
    const {
      styles: selectedStyles,
      colors: selectedColors,
      categories: selectedCategories,
      price: selectedPrice
    } = selectedFilters;

    // ===================================
    // ESAS DƏYİŞİKLİK BURADADIR
    // ===================================

    // DİGƏR FİLTRLƏRİ HESABLAMAQDAN ƏVVƏL, MƏHSULLARI SEÇİLMİŞ QİYMƏT ARALIĞINA GÖRƏ FİLTRLƏYİRİK
    const productsInPriceRange = initialFilteredProducts.filter(p => {
      const productPrice = p.variations[0].price;
      return productPrice >= selectedPrice.from && productPrice <= selectedPrice.to;
    });

    // ARTIQ BÜTÜN HESABLAMALARI YUXARIDA QİYMƏTƏ GÖRƏ FİLTRLƏDİYİMİZ SİYAHI ÜZƏRİNDƏ APARIRIQ

    // Kateqoriya seçimlərini yaratmaq üçün digər filtrləri tətbiq et
    const categoryFiltered = productsInPriceRange.filter(p =>
      (selectedStyles.length === 0 || selectedStyles.includes(p.subHeader)) &&
      (selectedColors.length === 0 || selectedColors.includes(p.variations[0].colorName.replace(/PUMA\s+/i, "").trim()))
    );
    const availableCategories = [...new Set(categoryFiltered.map(item => item.productDivision).filter(Boolean))];

    // Stil seçimlərini yaratmaq üçün digər filtrləri tətbiq et
    const styleFiltered = productsInPriceRange.filter(p =>
      (selectedCategories.length === 0 || selectedCategories.includes(p.productDivision)) &&
      (selectedColors.length === 0 || selectedColors.includes(p.variations[0].colorName.replace(/PUMA\s+/i, "").trim()))
    );
    const availableStyles = [...new Set(styleFiltered.map(item => item.subHeader).filter(Boolean))];

    // Rəng seçimlərini yaratmaq üçün digər filtrləri tətbiq et
    const colorFiltered = productsInPriceRange.filter(p =>
      (selectedCategories.length === 0 || selectedCategories.includes(p.productDivision)) &&
      (selectedStyles.length === 0 || selectedStyles.includes(p.subHeader))
    );
    const availableColors = [...new Set(colorFiltered.map(item => item.variations[0].colorName.replace(/PUMA\s+/i, "").trim()).filter(Boolean))];

    // Qiymət diapazonunu da digər filtrlərə uyğun hesabla (bu olduğu kimi qalır)
    const priceFiltered = initialFilteredProducts.filter(p =>
      (selectedCategories.length === 0 || selectedCategories.includes(p.productDivision)) &&
      (selectedStyles.length === 0 || selectedStyles.includes(p.subHeader)) &&
      (selectedColors.length === 0 || selectedColors.includes(p.variations[0].colorName.replace(/PUMA\s+/i, "").trim()))
    );

    let minPrice = priceFiltered.length > 0 ? Math.min(...priceFiltered.map(p => p.variations[0].price || 0)) : 0;
    let maxPrice = priceFiltered.length > 0 ? Math.max(...priceFiltered.map(p => p.variations[0].price || Infinity)) : 0;

    // react-range xətasının qarşısını alır
    if (minPrice >= maxPrice) {
      maxPrice = minPrice + 5;
    }

    const prices = {
      min: minPrice,
      max: maxPrice,
    };

    return {
      styles: availableStyles,
      colors: availableColors,
      categories: availableCategories,
      prices
    };
  }, [initialFilteredProducts, selectedFilters]);


  // 3. Kateqoriya dəyişəndə filtrləri sıfırlayan useEffect-i yeniləyirik.
  useEffect(() => {
    // Səhifə ilk yüklənəndə qiymət diapazonunu bütün məhsullara görə təyin et
    if (initialFilteredProducts.length > 0) {
      const minPrice = Math.min(...initialFilteredProducts.map(p => p.variations[0].price || 0));
      const maxPrice = Math.max(...initialFilteredProducts.map(p => p.variations[0].price || Infinity));

      setSelectedFilters({
        styles: [],
        colors: [],
        categories: [],
        price: { from: minPrice, to: maxPrice }
      });
    }
  }, [categorySlug, subcategorySlug, childSlug, initialFilteredProducts]); // initialFilteredProducts-dan asılı edirik

  // =================================
  // DƏYİŞİKLİK BURADA BİTİR



  // YENİ: Filter dəyişikliklərini idarə edən funksiya
  const handleFilterChange = (type, value) => {
    setSelectedFilters(prevFilters => {
      if (type === 'price') {
        return { ...prevFilters, price: value };
      }

      // Checkboxlar üçün (array-lər)
      const currentValues = prevFilters[type];
      const newValues = currentValues.includes(value)
        ? currentValues.filter(item => item !== value) // əgər varsa, çıxar
        : [...currentValues, value]; // əgər yoxdursa, əlavə et

      return { ...prevFilters, [type]: newValues };
    });
  };

  // YENİ: Bütün filtrləri təmizləyən funksiya
  const clearAllFilters = () => {
    setSelectedFilters({
      styles: [],
      colors: [],
      categories: [],
      price: { from: filterOptions.prices.min, to: filterOptions.prices.max }
    });
  }

  const filteredProducts = useMemo(() => {
    let products = initialFilteredProducts.filter(product => {
      const { styles, colors, categories, price } = selectedFilters;
      const productPrice = product.variations[0].price;
      const productColor = product.variations[0].colorName.replace(/PUMA\s+/i, "").trim();

      const styleMatch = styles.length === 0 || styles.includes(product.subHeader);
      const colorMatch = colors.length === 0 || colors.includes(productColor);
      const categoryMatch = categories.length === 0 || categories.includes(product.productDivision);
      const priceMatch = productPrice >= price.from && productPrice <= price.to;

      return styleMatch && colorMatch && categoryMatch && priceMatch;
    });

    // Sort hissəsi
    if (sortOption === "Price Low To High") {
      products = [...products].sort((a, b) => a.variations[0].price - b.variations[0].price);
    } else if (sortOption === "Price High To Low") {
      products = [...products].sort((a, b) => b.variations[0].price - a.variations[0].price);
    } else if (sortOption === "Top Sellers") {
      products = [...products].sort((a, b) => {
        const aBadge = a.variations[0]?.badges?.some(b => b.label?.toUpperCase() === "BEST SELLER") ? 1 : 0;
        const bBadge = b.variations[0]?.badges?.some(b => b.label?.toUpperCase() === "BEST SELLER") ? 1 : 0;
        return bBadge - aBadge; // Best Seller yuxarıda
      });
    } else if (sortOption === "Newest") {
      products = [...products].sort((a, b) => {
        const aBadge = a.variations[0]?.badges?.some(b => b.label?.toUpperCase() === "NEW") ? 1 : 0;
        const bBadge = b.variations[0]?.badges?.some(b => b.label?.toUpperCase() === "NEW") ? 1 : 0;
        return bBadge - aBadge; // NEW yuxarıda
      });
    }

    return products;
  }, [initialFilteredProducts, selectedFilters, sortOption]);



  // YENİLƏNMİŞ MƏNTİQ: Səhifə başlığını və "breadcrumb"-i təyin etmək
  const pageTitle = currentChild?.categoryName || currentSubcategory?.categoryName || currentCategory?.categoryName;

  const handleSort = (option) => {
    setSortOption(option);
  };


  if (!currentCategory) {
    return <div className="p-10">Belə bir kateqoriya tapılmadı</div>;
  }

  return (
    <>
      <div className="p-[30px_0]">
        {/* Breadcrumb */}
        <div className="p-[10px_25px]">
          <div className="flex flex-col text-left sm:flex-row gap-[10px]">
            <p className="text-[16px] text-[#191919] font-semibold capitalize">
              home
            </p>
            {/* Kateqoriyanı göstər */}
            {currentCategory && (
              <p className="text-[16px] flex items-center gap-[4px] text-[#191919] font-semibold capitalize">
                <TbPointFilled className="text-gray-600" size={13} />
                {currentCategory.categoryName}
              </p>
            )}
            {/* Sub-kateqoriya varsa göstər */}
            {currentSubcategory && (
              <p className="text-[16px] flex items-center gap-[4px] text-[#191919] font-semibold capitalize">
                <TbPointFilled className="text-gray-600" size={13} />
                {currentSubcategory.categoryName}
              </p>
            )}
            {/* Child-kateqoriya varsa göstər */}
            {currentChild && (
              <p className="text-[16px] flex items-center gap-[4px] text-[#191919]">
                <TbPointFilled className="text-gray-600" size={13} />
                {currentChild.categoryName}
              </p>
            )}
          </div>
        </div>

        <hr className="border-t-1 border-gray-200 mb-1 " />

        {/* Filters & Sort */}
        <div className="p-[15px_25px] flex justify-between items-center">
          <div
            onClick={() => setIsFilterOpen(true)}
            className="flex items-center uppercase cursor-pointer gap-[7px] text-[#191919] p-[7px_20px] border-gray-400 border-1 ">
            <span className="font-semibold text-[16px]"> filters</span>
            <HiAdjustmentsHorizontal size={20} />
          </div>
          <div className="flex justify-end ">
            <SortDropdown onSelect={handleSort} />
          </div>
        </div>

        <hr className="border-t-1 border-gray-200 mb-1 " />

        {/* Product count + Grid switcher */}
        <div className=" p-[20px_25px] flex justify-between items-center ">
          <h3 className="text-[23px] text-[#191919] font-semibold uppercase">
            {filteredProducts.length} products
          </h3>
          <div className="flex gap-[10px] items-center">
            {/* xs */}
            <FaRegSquare
              size={22}
              className={`cursor-pointer block md:hidden ${gridType === "grid1" ? "text-black" : "text-gray-400"
                }`}
              onClick={() => setGridType("grid1")}
            />
            <MdGridView
              size={25}
              className={`cursor-pointer block md:hidden ${gridType === "grid2" ? "text-black" : "text-gray-400"
                }`}
              onClick={() => setGridType("grid2")}
            />

            {/* md */}
            <MdGridView
              size={25}
              className={`cursor-pointer hidden md:block lg:hidden ${gridType === "grid2" ? "text-black" : "text-gray-400"
                }`}
              onClick={() => setGridType("grid2")}
            />
            <BsFillGrid3X3GapFill
              size={22}
              className={`cursor-pointer hidden md:block lg:hidden ${gridType === "grid3" ? "text-black" : "text-gray-400"
                }`}
              onClick={() => setGridType("grid3")}
            />

            {/* lg */}
            <BsFillGrid3X3GapFill
              size={22}
              className={`cursor-pointer hidden lg:block xl:hidden ${gridType === "grid3" ? "text-black" : "text-gray-400"
                }`}
              onClick={() => setGridType("grid3")}
            />
            <TfiLayoutGrid4Alt
              size={22}
              className={`cursor-pointer hidden lg:block xl:hidden ${gridType === "grid4" ? "text-black" : "text-gray-400"
                }`}
              onClick={() => setGridType("grid4")}
            />

            {/* xl */}
            <BsFillGrid3X3GapFill
              size={22}
              className={`cursor-pointer hidden xl:block ${gridType === "grid3" ? "text-black" : "text-gray-400"
                }`}
              onClick={() => setGridType("grid3")}
            />
            <TfiLayoutGrid4Alt
              size={22}
              className={`cursor-pointer hidden xl:block ${gridType === "grid4" ? "text-black" : "text-gray-400"
                }`}
              onClick={() => setGridType("grid4")}
            />
          </div>
        </div>

        {/* Products */}
        {filteredProducts.length === 0 ? (
          <p>Bu kateqoriyada məhsul yoxdur</p>
        ) : (
          <div
            className={`grid gap-6 p-[10px_25px]
            ${gridType === "grid1" ? "grid-cols-1" : ""}
            ${gridType === "grid2" ? "grid-cols-2" : ""}
            ${gridType === "grid3" ? "grid-cols-3" : ""}
            ${gridType === "grid4" ? "grid-cols-4" : ""}
          `}
          >
            {filteredProducts.map((item, i) => (
              <Link to={`/puma/${categorySlug}/${subcategorySlug}/${childSlug}/${encodeURIComponent(item.name)}/${item.id}`}
                key={i}
              >
                <div key={i} className="group cursor-pointer ">
                  <div className="w-full overflow-hidden bg-[#f7f7f7]">
                    <img
                      src={item.image.href}
                      alt={item.image.alt}
                      className="w-full  object-cover"
                    />
                  </div>
                  <p className="text-xs text-gray-500 py-[20px]">
                    
                  </p>
                  <div className="flex justify-between items-start mt-1 text-[16px] text-[#191919]">
                    <h2 className="text-sm font-bold">{item.header}</h2>
                    <p className=" font-medium">${item.variations[0].price}.00</p>
                  </div>
                  {item.variations?.[0]?.badges?.length > 0 && (
                    <span
                      className={`inline-block mt-2 px-3 py-1 text-[10px] font-bold uppercase rounded-[2px]
                ${item.variations[0].badges[0].label.toUpperCase() === "NEW"
                          ? "bg-[#191919] text-white"
                          : item.variations[0].badges[0].label.toUpperCase() ===
                            "BEST SELLER"
                            ? "bg-[#0656b6] text-white"
                            : "bg-gray-200 text-gray-800"
                        }`}
                    >
                      {item.variations[0].badges[0].label}
                    </span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
      {isFilterOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setIsFilterOpen(false)}
          ></div>

          <Filter
            setIsFilterOpen={setIsFilterOpen}
            options={filterOptions} // Bütün filter seçimləri
            selectedFilters={selectedFilters} // Hazırda hansı filtrlər seçilib
            onFilterChange={handleFilterChange} // Filteri dəyişmək üçün funksiya
            clearAllFilters={clearAllFilters} // Bütün filtrləri təmizləmək üçün funksiya
            productCount={filteredProducts.length} // Filtrə uyğun məhsul sayı
          />
        </>
      )}
    </>
  );
}

export default ProductList;



