import { useFormik } from 'formik';
import { object, string, ref, number } from 'yup';
import { ArrowRight } from 'lucide-react'
import React from 'react'

export default function EditBrand({ brand, setShowModal, updateBrandApi, addBrandApi }) {

    let userSchema = object({
        name: string().required(),
    });

    const formik = useFormik({
        initialValues: {
            name: brand?.name || '',
        },
        validationSchema: userSchema,
        onSubmit: (data) => {
            console.log(data);
            if (brand) {
                updateBrandApi({ ...brand, ...data })
            } else {
                addBrandApi(data)
            }
            setShowModal(false)
        }
    })

    const { errors, getFieldProps } = formik

    return (
        <section>
            <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
                <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
                    <h2 className="text-center text-2xl font-bold leading-tight text-black">
                        {brand ? 'Edit Brand' : 'Add Brand'}
                    </h2>
                    <form noValidate onSubmit={formik.handleSubmit} className="mt-8">
                        <div className="space-y-5">
                            <div>
                                <label htmlFor="name" className="text-base font-medium text-gray-900">
                                    {' '}
                                    Name{' '}
                                </label>
                                <div className="mt-2">
                                    <input
                                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                        type="text"
                                        placeholder="Name"
                                        id="name"
                                        {...getFieldProps('name')}
                                    ></input>
                                </div>
                                {
                                    errors.name &&
                                    <label className="text-sm text-red-700 ">
                                        {errors.name}
                                    </label>
                                }

                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                                >
                                    {brand ? 'Update Brand' : 'Add Brand'} <ArrowRight className="ml-2" size={16} />
                                </button>
                            </div>
                        </div>
                    </form>

                </div>
            </div>
        </section>
    )
}
