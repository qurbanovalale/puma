
import React from 'react';
import { Link } from 'react-router-dom';

function DropdownMenu({ category, isOpen }) {
  if (!category) return null; // yalnız data yoxdursa göstərmə

  return (
    <div
      className={`
        absolute top-full left-0 w-full bg-white shadow-md z-50 px-10  flex justify-between
        transform origin-top transition-all duration-300 ease-out
        ${isOpen ? "opacity-100 scale-y-100 translate-y-0 py-6" : "opacity-0 scale-y-95 -translate-y-2 py-0 pointer-events-none"}
      `}
    >
      {/* Sürətli Keçidlər - sol sütun */}
      <div>
        <ul className="space-y-2">
          {category.quickLinks?.map((link, i) => (
            <li
              key={i}
              className="text-[18px] text-[#6c6c6c] font-semibold hover:underline cursor-pointer"
            >
              {link}
            </li>
          ))}
        </ul>
      </div>

      {/* Alt kateqoriyalar - sağ sütun */}
      <div className="w-[80%] grid grid-cols-4 gap-6">
        {category.subcategory?.map((sub) => (
          <div key={sub.id}>
            <h4 className="font-semibold text-[#181818] text-[20px] border-b pb-1 mb-2">
              <Link to={`/puma/${category.slug}/${sub.slug}`}>
                {sub.categoryName}
              </Link>
            </h4>
            <ul className="space-y-1">
              {sub.children?.map((child) => (
                <li
                  key={child.id}
                >
                  <Link to={`/puma/${category.slug}/${sub.slug}/${child.slug.split('/').pop()}`}
                    className="text-[14px] text-[#6c6c6c] hover:underline cursor-pointer"
                  >
                    {child.categoryName}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DropdownMenu;
