import React, { useContext, useEffect, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { object, string, number } from 'yup';
import { useFormik, Form, Field, FieldArray, FormikProvider } from 'formik';
import { apiUrl } from '../../../../constants';
import { ToastContext } from '../../../../context/toast/ToastContext';
import axios from 'axios';
import { UploadContext } from '../../../../context/uploadfile/UploadContext';

export default function EditProduct({ user, product, setShowModal, updateProductApi, addProductApi }) {
    let userSchema = object({
        title: string().required(),
        description: string().required(),
        price: number().required(),
        discounted_price: number().required()

    });
    const { showToast } = useContext(ToastContext)
    const { uploadFileToServer, uploadFile } = useContext(UploadContext)

    const [brands, setBrands] = useState([])

    useEffect(() => {
        getBrandsFromApi()
    }, [])

    const getBrandsFromApi = () => {
        let token = localStorage.getItem('token');
        axios.get(`${apiUrl}/api/brands/${user._id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(res => {
            console.log(res.data);
            setBrands(res.data)
        }).catch(err => {
            console.log(err);
            showToast({ show: true, title: 'Error', message: err.response?.data.error || 'Server Error', type: 'error' })

        })
    }

    const formik = useFormik({
        validationSchema: userSchema,
        initialValues: {
            title: product?.title || '',
            description: product?.description || '',
            brand: product?.brand || undefined,
            price: product?.price || 0,
            discounted_price: product?.discounted_price || 0,
            image: product?.image || '',
            sizes: product?.sizes || [],
        },
        onSubmit: (data) => {
            console.log(data);
            if (product) {
                updateProductApi({ ...product, ...data })
            } else {
                addProductApi(data)
            }
            setShowModal(false)
            // signupApiCall(data)
        }
    })

    const { errors, getFieldProps, values, setValues } = formik

    useEffect(() => {
        console.log(uploadFile);
        if (uploadFile) {
            setValues({ ...values, [uploadFile.field_name]: uploadFile.url })
        }
    }, [uploadFile])

    console.log(errors);

    const inputFileHandler = (e) => {
        console.log(e.target.name);

        let name = e.target.name

        const payload = {
            file: e.target.files[0],
            name: name
        }
        console.log(payload);
        uploadFileToServer(payload, user)
    };

    return (
        <section>
            <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
                <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">

                    <h2 className="text-center text-2xl font-bold leading-tight text-black">
                        {product ? 'Edit Product' : 'Add Product'}
                    </h2>
                    <FormikProvider value={formik}>
                        <Form noValidate onSubmit={formik.handleSubmit} className="mt-8">
                            <div className="space-y-5">
                                <div>
                                    <label htmlFor="title" className="text-base font-medium text-gray-900">
                                        {' '}
                                        Title{' '}
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                            type="text"
                                            placeholder="Title"
                                            id="title"
                                            {...getFieldProps('title')}
                                        ></input>
                                    </div>
                                    {
                                        errors.title &&
                                        <label className="text-sm text-red-700 ">
                                            {errors.title}
                                        </label>
                                    }

                                </div>
                                <div>
                                    <label htmlFor="description" className="text-base font-medium text-gray-900">
                                        {' '}
                                        Description{' '}
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                            type="text"
                                            placeholder="Description"
                                            id="description"
                                            {...getFieldProps('description')}
                                        ></input>
                                    </div>
                                    {
                                        errors.description &&
                                        <label className="text-sm text-red-700 ">
                                            {errors.description}
                                        </label>
                                    }
                                </div>
                                <div>
                                    <label htmlFor="price" className="text-base font-medium text-gray-900">
                                        {' '}
                                        Price{' '}
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                            type="number"
                                            placeholder="Price"
                                            id="price"
                                            {...getFieldProps('price')}
                                        ></input>
                                    </div>
                                    {
                                        errors.price &&
                                        <label className="text-sm text-red-700 ">
                                            {errors.price}
                                        </label>
                                    }
                                </div>
                                <div>
                                    <label htmlFor="discounted_price" className="text-base font-medium text-gray-900">
                                        {' '}
                                        Discounted Price{' '}
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                            type="number"
                                            placeholder="Discounted Price"
                                            id="discounted_price"
                                            {...getFieldProps('discounted_price')}
                                        ></input>
                                    </div>
                                    {
                                        errors.discounted_price &&
                                        <label className="text-sm text-red-700 ">
                                            {errors.discounted_price}
                                        </label>
                                    }
                                </div>

                                <div>
                                    <label htmlFor="email" className="text-base font-medium text-gray-900">
                                        {' '}
                                        Brand{' '}
                                    </label>
                                    <div className="mt-2">
                                        <select
                                            className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                            placeholder="Brand"
                                            id="brand"
                                            {...getFieldProps('brand')}
                                        >
                                            <option value=""></option>
                                            {brands.map(brand => <option value={brand._id}>{brand.name}</option>)}


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
                                    <label htmlFor="email" className="text-base font-medium text-gray-900">
                                        {' '}
                                        Sizes{' '}
                                    </label>
                                    <div className="mt-2">
                                        <FieldArray
                                            name='sizes'
                                            render={arrayHelpers => (
                                                <div>
                                                    {values.sizes && values.sizes.length > 0 ? (
                                                        values.sizes.map((_, index) => (
                                                            <div key={index} className='flex items-center justify-between'>
                                                                <Field
                                                                    className="flex h-10 rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                                                    name={`sizes.${index}`} />
                                                                <button
                                                                    className="inline-flex  items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                                                                    type="button"
                                                                    onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
                                                                >
                                                                    -
                                                                </button>
                                                                <button
                                                                    className="inline-flex  items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                                                                    type="button"
                                                                    onClick={() => arrayHelpers.insert(index + 1, '')} // insert an empty string at a position
                                                                >
                                                                    +
                                                                </button>
                                                            </div>
                                                        ))
                                                    ) : (
                                                        <button
                                                            className='inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80'
                                                            type="button" onClick={() => arrayHelpers.push('')}>
                                                            {/* show this when user has removed all friends from the list */}
                                                            Add a Size
                                                        </button>
                                                    )}

                                                </div>)}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="discounted_price" className="text-base font-medium text-gray-900">
                                        {' '}
                                        Image{' '}
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                            type="file"
                                            placeholder="Image"
                                            id="image"
                                            name='image'
                                            onChange={inputFileHandler}
                                        />
                                    </div>
                                    {values.image && <img src={`${apiUrl}/api/${values.image}`} height={100} width={100} />}

                                </div>


                                <div>
                                    <button
                                        type="submit"
                                        className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                                    >
                                        {product ? 'Edit Product' : 'Add Product'} <ArrowRight className="ml-2" size={16} />
                                    </button>
                                </div>
                            </div>
                        </Form>
                    </FormikProvider>
                </div>
            </div>
        </section>
    )
}
