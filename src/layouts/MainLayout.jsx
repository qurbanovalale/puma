import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Outlet } from 'react-router-dom'

const MainLayout = () => {
    return (
        <>
            <Navbar />
            <main className='pt-[66px]' >
                <Outlet />
            </main>
            <Footer />
        </>
    )
}

export default MainLayout
