import React, { useEffect } from 'react'
import { ArrowRight } from 'lucide-react'
import { object, string, ref, number } from 'yup';
import { useFormik } from 'formik';

export default function EditUser({ user, setShowModal, updateUserApi }) {
    let userSchema = object({
        name: string().required(),
        email: string().required().email(),
        role: number().required(),

    });

    const formik = useFormik({
        validationSchema: userSchema,
        initialValues: {
            name: user.name,
            email: user.email,
            role: user.role,
        },
        onSubmit: (data) => {
            console.log(data);
            updateUserApi({ ...data, userId: user._id })
            setShowModal(false)
            // signupApiCall(data)
        }
    })

    const { errors, getFieldProps } = formik


    console.log(user);

    return (
        <section>
            <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
                <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">

                    <h2 className="text-center text-2xl font-bold leading-tight text-black">
                        Update User
                    </h2>

                    <form noValidate onSubmit={formik.handleSubmit} className="mt-8">
                        <div className="space-y-5">
                            <div>
                                <label htmlFor="name" className="text-base font-medium text-gray-900">
                                    {' '}
                                    Full Name{' '}
                                </label>
                                <div className="mt-2">
                                    <input
                                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                        type="text"
                                        placeholder="Full Name"
                                        id="name"
                                        {...getFieldProps('name')}
                                    ></input>
                                </div>
                                {
                                    errors.name &&
                                    <label className="text-sm text-red-700">
                                        {errors.name}
                                    </label>
                                }
                            </div>
                            <div>
                                <label htmlFor="email" className="text-base font-medium text-gray-900">
                                    {' '}
                                    Email address{' '}
                                </label>
                                <div className="mt-2">
                                    <input
                                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                        type="email"
                                        placeholder="Email"
                                        disabled
                                        id="email"
                                        {...getFieldProps('email')}
                                    ></input>
                                </div>
                                {
                                    errors.email &&
                                    <label className="text-sm text-red-700 ">
                                        {errors.email}
                                    </label>
                                }
                            </div>
                            <div>
                                <label htmlFor="email" className="text-base font-medium text-gray-900">
                                    {' '}
                                    Role{' '}
                                </label>
                                <div className="mt-2">
                                <select
                                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                        placeholder="Role"
                                        id="role"
                                        {...getFieldProps('role')}
                                    >
                                        <option value="0">User</option>
                                        <option value="1">Admin</option>

                                    </select>
                                </div>
                                {
                                    errors.role &&
                                    <label className="text-sm text-red-700 ">
                                        {errors.role}
                                    </label>
                                }
                            </div>


                            <div>
                                <button
                                    type="submit"
                                    className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                                >
                                    Update User <ArrowRight className="ml-2" size={16} />
                                </button>
                            </div>
                        </div>
                    </form>

                </div>
            </div>
        </section>
    )
}
