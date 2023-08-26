import React from 'react'
import Sidebar from '../Sidebar'
import { Outlet } from 'react-router-dom'

export default function Dashboard() {
    return (
        <div className='flex'>
            {/* //sidebar */}
            <Sidebar />
            <div className='flex-1 p-8'>
                <Outlet />
            </div>
        </div>
    )
}
