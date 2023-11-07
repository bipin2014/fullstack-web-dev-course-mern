import { useFormik, FieldArray, Field, Form, FormikProvider } from 'formik';
import { object, string } from 'yup';
import { ArrowRight } from 'lucide-react'
import React, { useContext, useEffect, useState } from 'react'
import { apiUrl } from '../../../../constants';

export default function EditOrder({ order, setShowModal, updateOrderApi }) {

    console.log(order);
    let userSchema = object({
        status: string().required(),
    });

    const formik = useFormik({
        initialValues: {
            status: order?.status || '',
        },
        validationSchema: userSchema,
        onSubmit: (data) => {
            updateOrderApi({ _id: order._id, ...data })
            setShowModal(false)
        }
    })

    const { getFieldProps, errors } = formik


    return (
        <section>
            <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
                <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
                    <h2 className="text-center text-2xl font-bold leading-tight text-black">
                        Edit Order
                    </h2>
                    <FormikProvider value={formik}>
                        <Form autoComplete='off' noValidate onSubmit={formik.handleSubmit} className="mt-8">
                            {/* <form noValidate onSubmit={formik.handleSubmit} > */}
                            <div className="space-y-5">
                                <div>
                                    <label htmlFor="email" className="text-base font-medium text-gray-900">
                                        {' '}
                                        Status{' '}
                                    </label>
                                    <div className="mt-2">
                                        <select
                                            className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                            placeholder="Brand"
                                            id="brand"
                                            {...getFieldProps('status')}
                                        >
                                            {/* ['created', 'paid and processing', 'shipping', 'delivered'] */}
                                            <option value=""></option>
                                            <option value="created">Created</option>
                                            <option value="paid and processing">Paid and Processing</option>
                                            <option value="shipping">Shipping</option>
                                            <option value="delivered">Delivered</option>
                                        </select>
                                    </div>
                                    {
                                        errors.brand &&
                                        <label className="text-sm text-red-700 ">
                                            {errors.brand}
                                        </label>
                                    }
                                </div>



                                <div>
                                    <button
                                        type="submit"
                                        className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                                    >
                                        Update Order <ArrowRight className="ml-2" size={16} />
                                    </button>
                                </div>
                            </div>
                            {/* </form> */}
                        </Form>
                    </FormikProvider>
                </div>
            </div>
        </section>
    )
}
