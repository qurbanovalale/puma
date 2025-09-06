import React, { useContext } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Outlet } from 'react-router-dom'
import { PumaContext } from '../context/DataContext'
import Loading from '../components/Loading'

const MainLayout = () => {
    const { loader } = useContext(PumaContext)

    if (loader){
        return <Loading />
    }
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
