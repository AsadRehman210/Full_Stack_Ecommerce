import React from 'react'
import Menu from './menu/Menu'
import { Outlet } from 'react-router-dom'

const DashBoard = () => {
    return (
        <main className='dashBoard'>
            <div className='container-fluid'>
                <div className='row dashBoard_page_row'>
                    <div className='col-lg-2 me-lg-auto col-12 mx-auto'>
                        <Menu />

                    </div>
                    <div className='col-lg-10 col-12 '>
                    <Outlet />

                    </div>
                </div>
            </div>
        </main>
    )
}

export default DashBoard
