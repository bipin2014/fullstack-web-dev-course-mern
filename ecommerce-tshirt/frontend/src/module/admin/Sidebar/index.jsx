import React from 'react'
import { BarChart, User2, Shirt, Radar } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Sidebar() {

    const sideBarList = [
        {
            label: 'Dashboard',
            to: '/admin/dashboard',
            icon: <BarChart />
        },
        {
            label: 'Users',
            to: '/admin/users',
            icon: <User2 />
        },
        {
            label: 'Products',
            to: '/admin/products',
            icon: <Shirt />
        },
        {
            label: 'Brands',
            to: '/admin/brands',
            icon: <Radar />
        },
        {
            label: 'Order',
            to: '/admin/orders',
            icon: <Radar />
        }
    ]

    return (
        <aside className="flex h-screen w-64 flex-col overflow-y-auto border-r bg-white px-5 py-8">

            <div className="mt-6 flex flex-1 flex-col justify-between">
                <nav className="-mx-3 space-y-6 ">
                    <div className="space-y-3 ">
                        <label className="px-3 text-xs font-semibold uppercase text-gray-900">Admin Dashboard</label>
                        {sideBarList.map(sideBar => <Link
                            className="flex transform items-center rounded-lg px-3 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
                            to={sideBar.to}
                        >
                            {sideBar.icon}
                            <span className="mx-2 text-sm font-medium">{sideBar.label}</span>
                        </Link>)}
                    </div>

                </nav>
            </div>
        </aside>
    )
}
