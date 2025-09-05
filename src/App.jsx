import { Route, Routes } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Hero from './components/Hero'
import ProductList from './components/ProductList'
import Detail from './pages/Detail'
import WishList from './pages/WishList'
import { ToastContainer } from 'react-toastify';
import ShoppingCart from './pages/ShoppingCart'


function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<MainLayout />}>
          <Route index element={<Hero />} />
          <Route path="/puma/:categorySlug" element={<ProductList />} />
          <Route path="/puma/:categorySlug/:subcategorySlug" element={<ProductList />} />
          <Route path="/puma/:categorySlug/:subcategorySlug/:childSlug" element={<ProductList />} />
          <Route path="/puma/:categorySlug/:subcategorySlug/:childSlug/:name/:id" element={<Detail />} />
          <Route path="/wishlist" element={<WishList />} />
          <Route path="/cart" element={<ShoppingCart />} />
        </Route>
      </Routes>
        <ToastContainer />
    </>
  )
}

export default App
