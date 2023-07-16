import React from 'react'

const Homepage = () => {
    return (
        <div className="mx-auto grid w-full max-w-7xl items-center space-y-4 px-2 py-10 md:grid-cols-2 md:gap-6 md:space-y-0 lg:grid-cols-4">
            {Array.from({ length: 10 }).map((_, i) => (
                <div key={i} className="rounded-md border">
                    <img
                        src="https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1372&q=80"
                        alt="Laptop"
                        className="aspect-[16/9] w-full rounded-md md:aspect-auto md:h-[300px] lg:h-[200px]"
                    />
                    <div className="p-4">
                        <h1 className="inline-flex items-center text-lg font-semibold">Nike Airmax v2</h1>
                        <p className="mt-3 text-sm text-gray-600">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi, debitis?
                        </p>

                        <div className="mt-5 flex items-center space-x-2">
                            <span className="block text-sm font-semibold">Size : </span>
                            <span className="block cursor-pointer rounded-md border border-gray-300 p-1 px-2 text-xs font-medium">
                                8 UK
                            </span>
                            <span className="block cursor-pointer rounded-md border border-gray-300 p-1 px-2 text-xs font-medium">
                                9 UK
                            </span>
                            <span className="block cursor-pointer rounded-md border border-gray-300 p-1 px-2 text-xs font-medium">
                                10 UK
                            </span>
                        </div>
                        <button
                            type="button"
                            className="mt-4 w-full rounded-sm bg-black px-2 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Homepage
