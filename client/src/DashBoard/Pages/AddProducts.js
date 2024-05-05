import React, { useState } from 'react'
import {  useNavigate } from 'react-router-dom';
import { IoIosArrowBack } from "react-icons/io";
import { AiOutlineSafetyCertificate } from "react-icons/ai";
import { useFormik } from "formik";
import axios from 'axios';
import { MdDelete } from "react-icons/md";
import { useDB } from '../../Context/DashBoardContext';
import { useAuth } from '../../Context/store';

const AddProducts = () => {
    const {authorizationToken} = useAuth();
    const {getData} = useDB()
    const API = process.env.REACT_APP_API;
    const [gallerypics, setGallerypics] = useState([]);
    const [Featuredpics, setFeaturedpics] = useState(null);
    const initialValues = {
        productName: "",
        brandName: "",
        FeaturedImage: "",
        galleryImages: '',
        description: "",
        currentPrice: "",
        previousPrice: "",
        stock: "",
        category: "",
        customerReviews: "",
        starRating: "",
        colors: ""
    }
    const handleImageUpload = (e) => {
        const files = e.target.files;
        const uploadedImages = [];
        for (let i = 0; i < files.length; i++) {
            uploadedImages.push(files[i]);
        }
        setGallerypics([...gallerypics, ...uploadedImages]);
    };


    const { values, handleChange, handleSubmit } = useFormik({
        initialValues: initialValues,
        onSubmit: async (values, action) => {
            try {
                 await axios.post(`${API}/DBproducts/product_Data/post`, {
                    productName: values.productName,
                    brandName: values.brandName,
                    FeaturedImage: Featuredpics,
                    galleryImages: gallerypics,
                    description: values.description,
                    currentPrice: values.currentPrice,
                    previousPrice: values.previousPrice,
                    stock: values.stock,
                    category: values.category,
                    customerReviews: values.customerReviews,
                    starRating: values.starRating,
                    colors: values.colors.split(',').map(color => color.trim())
                }, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: authorizationToken
                    }
                })
                // const Data = res.data;
                // console.log(Data.message)
                setGallerypics([])
                setFeaturedpics(null)
                action.resetForm();
                getData()

            } catch (error) {
                console.log(error)
            }
        }
    })
    const handleImageDelete = (index) => {
        const updatedImages = gallerypics.filter((image, idx) => idx !== index);
        setGallerypics(updatedImages)
    }

    const navigate = useNavigate()
    const handleBack = ()=>{
        getData();
        navigate(-1)

    }

    return (
        <section className='Add_Products'>
            <form onSubmit={handleSubmit} >
                <div className='row'>
                    <div className='col-12'>
                        <div className="form_card mt-0" >
                            <div className="form_card-body d-flex flex-row justify-content-between">
                                <h3>Add Product</h3>
                                <div className='Add_product_btn'>
                                    <button type='submit' className="btn btn-primary me-5">< AiOutlineSafetyCertificate /> Submit</button>

                                    <button type='button'  className="btn btn-primary " onClick={handleBack}><IoIosArrowBack /> Back</button>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className='col-8'>
                        <div className="form_card" >
                            <div className="form_card-body">
                                <div className="mb-3">
                                    <label className="form-label">Product Name *</label>
                                    <input type="text"
                                        name="productName"
                                        value={values.productName}
                                        onChange={handleChange}
                                        className="form-control simple_input"
                                        placeholder="Enter Product Name"
                                        required />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Brand Name *</label>
                                    <input type="text"
                                        name="brandName"
                                        value={values.brandName}
                                        onChange={handleChange}
                                        className="form-control simple_input"
                                        placeholder="Enter Brand Name"
                                        required />
                                </div>
                            </div>
                        </div>

                        <div className="form_card" >
                            <div className="form_card-body">
                                <div className="mb-3">
                                    <label className="form-label">Featured Image *</label>
                                    <div className='featured_images'>
                                        {Featuredpics && (
                                            <div className='images'>
                                                <img src={URL.createObjectURL(Featuredpics)} alt="Featured_Image" />
                                                <button type="button" onClick={() => setFeaturedpics(null)}>
                                                    <MdDelete />
                                                </button>
                                            </div>
                                        )}

                                    </div>
                                    <input
                                        className="form-control w-50 upload_input"
                                        type="file"
                                        name="FeaturedImage"
                                        onChange={(e) => setFeaturedpics(e.target.files[0])}
                                        accept="image/*"
                                        required />

                                    <p>Image Size Should be 800 x 800 or Square size</p>

                                </div>

                            </div>
                        </div>

                        <div className="form_card" >
                            <div className="form_card-body">
                                <div className="mb-3">
                                    <label className="form-label">Gallery Images *</label>
                                    <div className='gallery_images'>
                                        {gallerypics.map((image, index) => {
                                            return (
                                                <div className='images' key={index}>
                                                    <img src={URL.createObjectURL(image)} alt={`gallery_${index + 1}`} />
                                                    <button type="button" onClick={() => handleImageDelete(index)}>
                                                        <MdDelete /> </button>
                                                </div>
                                            )

                                        })}

                                    </div>
                                    <input
                                        className="form-control w-50 upload_input"
                                        type="file"
                                        name="galleryImages"
                                        onChange={handleImageUpload}
                                        accept="image/*"
                                        multiple
                                        required
                                    />

                                    <p>Image Size Should be 800 x 800 or Square size</p>

                                </div>

                            </div>
                        </div>

                        <div className="form_card" >
                            <div className="form_card-body">
                                <div className="mb-3">
                                    <label className="form-label">Description *</label>
                                    <textarea
                                        type="text"
                                         rows="6"
                                        className="form-control simple_input"
                                        placeholder="Enter Product Description"
                                        name="description"
                                        value={values.description}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                            </div>
                        </div>


                    </div>
                    <div className='col-4'>

                        <div className="form_card" >
                            <div className="form_card-body">
                                <div className="mb-3">
                                    <label className="form-label">Current Price *</label>
                                    <div className="input-group mb-3 span_input">
                                        <span className="input-group-text" >Rs</span>
                                        <input
                                            type="number"
                                            className="form-control"
                                            placeholder="Current Price"
                                            name="currentPrice"
                                            value={values.currentPrice}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Previous Price *</label>
                                    <div className="input-group mb-3 span_input">
                                        <span className="input-group-text" >Rs</span>
                                        <input
                                            type="number"
                                            className="form-control"
                                            placeholder="Previous Price"
                                            name="previousPrice"
                                            value={values.previousPrice}
                                            onChange={handleChange}
                                            required />
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="form_card" >
                            <div className="form_card-body">
                                <div className="mb-3">
                                    <label className="form-label">Available Stock *</label>
                                    <input
                                        type="number"
                                        className="form-control simple_input"
                                        placeholder="Enter Available Stock"
                                        name="stock"
                                        value={values.stock}
                                        onChange={handleChange}
                                        required />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Category *</label>
                                    <input
                                        type="text"
                                        className="form-control simple_input"
                                        placeholder="Enter Category"
                                        name="category"
                                        value={values.category}
                                        onChange={handleChange}
                                        required />
                                </div>

                            </div>
                        </div>
                        <div className="form_card" >
                            <div className="form_card-body">
                                <div className="mb-3">
                                    <label className="form-label">Customer Reviews</label>
                                    <input
                                        type="number"
                                        className="form-control simple_input"
                                        placeholder="Enter Customer Reviews"
                                        name="customerReviews"
                                        value={values.customerReviews}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Star Rating Between 0-5 *</label>
                                    <input
                                        type="number"
                                        min="0"
                                        max="5"
                                        className="form-control simple_input"
                                        placeholder="Enter Star Reviews"
                                        name="starRating"
                                        value={values.starRating}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>


                            </div>
                        </div>

                        <div className="form_card" >
                            <div className="form_card-body">
                                <div className="mb-3">
                                    <label className="form-label">Available Product Colors</label>
                                    <input
                                        type="text"
                                        className="form-control simple_input"
                                        placeholder="Available Product Colors"
                                        name="colors"
                                        value={values.colors}
                                        onChange={handleChange}
                                        required />
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </form>

        </section>
    )
}

export default AddProducts
