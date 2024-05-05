import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { IoIosArrowBack } from "react-icons/io";
import { AiOutlineSafetyCertificate } from "react-icons/ai";
import axios from 'axios';
import { useFormik } from "formik";
import { MdDelete } from "react-icons/md";
import { useDB } from '../../Context/DashBoardContext';
import { useAuth } from '../../Context/store';


const UpdateDBProducts = () => {
    const {getData} = useDB();
    const {authorizationToken} = useAuth();
    const[idData, setIdData] = useState({})
    const [Featuredpics,setFeaturedpics] = useState();
    const [galleryPics,setGalleryPics] = useState([])

    const {id} = useParams();
    const API= process.env.REACT_APP_API;
    const navigate = useNavigate();
    const getUpdateInfo = async ()=>{
        try {
            const res = await axios.get(`${API}/DBproducts/product_Data/get/${id}`, {
                headers:{
                    Authorization: authorizationToken
                }
                
            })
            const Data = await res.data.message;
            
            setIdData(Data)
            setFeaturedpics(Data.FeaturedImage);
            setGalleryPics(Data.galleryImages)
        } catch (error) {
            console.log(`error ${error}`)
            
        }

    }

    useEffect(()=>{
        getUpdateInfo()

    },[id])
    const handleImageDelete = (index) => {
        const updatedImages = galleryPics.filter((image, idx) => idx !== index);
        setGalleryPics(updatedImages)
    }
    const handleImageUpload = (e) => {
        const files = e.target.files;
        const uploadedImages = [];
        for (let i = 0; i < files.length; i++) {
            uploadedImages.push(files[i]);
        }
        setGalleryPics([...galleryPics, ...uploadedImages]);
    };
    const initialValues = {
        productName:idData.productName || "",
        brandName:idData.brandName || "",
        FeaturedImage:idData.FeaturedImage || "",
        galleryImages:idData.galleryImages || '',
        description:idData.description || "",
        currentPrice:idData.currentPrice || "",
        previousPrice:idData.previousPrice || "",
        stock:idData.stock || "",
        category:idData.category || "",
        customerReviews:idData.customerReviews || "",
        starRating:idData.starRating || "",
        colors:idData.colors || ""
    }
    const{values, handleSubmit, handleChange}= useFormik({
        enableReinitialize:true,
        initialValues:initialValues,
        onSubmit: async(values, action)=>{
            try {
                await axios.put(`${API}/DBproducts/product_Data/post/${id}`,{
                    productName: values.productName,
                    brandName: values.brandName,
                    FeaturedImage: Featuredpics,
                    galleryImages: galleryPics,
                    description: values.description,
                    currentPrice: values.currentPrice,
                    previousPrice: values.previousPrice,
                    stock: values.stock,
                    category: values.category,
                    customerReviews: values.customerReviews,
                    starRating: values.starRating,
                    colors: values.colors.map(color => color.trim())
                },{
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: authorizationToken
                        
                    }
                })
                navigate("/admin")
                getData()
                
                
            } catch (error) {
                console.log(error)
                
            }
        }

    })
    
    return (
        <section className='Add_Products'>
            <form  onSubmit={handleSubmit}>
                <div className='row'>
                    <div className='col-12'>
                        <div className="form_card mt-0" >
                            <div className="form_card-body d-flex flex-row justify-content-between">
                                <h3>Update Product</h3>
                                <div className='Add_product_btn'>
                                    <button type='submit' className="btn btn-primary me-5">< AiOutlineSafetyCertificate /> Update</button>

                                    <NavLink to="/admin" className="btn btn-primary "><IoIosArrowBack /> Back</NavLink>
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
                                                <img src={`${Featuredpics instanceof Blob ? URL.createObjectURL(Featuredpics) : `${API}/${Featuredpics}`}`} alt="Featured_Image" />
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
                                         />

                                    <p>Image Size Should be 800 x 800 or Square size</p>

                                </div>

                            </div>
                        </div>

                        <div className="form_card" >
                            <div className="form_card-body">
                                <div className="mb-3">
                                    <label className="form-label">Gallery Images *</label>
                                    <div className='gallery_images'>
                                        {galleryPics.map((image, index) => {
                                            return (
                                                <div className='images' key={index+image}>
                                                    <img 
                                                    src={`${image instanceof Blob ? URL.createObjectURL(image) : `${API}/${image}`}`}

                                                    alt={`gallery_${index + 1}`} />
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

export default UpdateDBProducts
