import React from 'react'
import { NavLink } from 'react-router-dom'

const ListView = ({ productDetail }) => {
    const API = process.env.REACT_APP_API;
    return (
        <div className='col-12 listView_section gy-5'>
            {productDetail.map((ele, index) => {
                return (
                    <div className='row listView_row' key={ele._id}>

                        <div className='col-6 listView_images '>
                            <div className='view_img'>
                                <img src={`${API}/${ele.FeaturedImage}`} alt='listpic' />
                            </div>
                        </div>

                        <div className='col-6 listView_content '>
                            <h3>{ele.productName}</h3>
                            <p className='listView_price'>Rs {ele.currentPrice}</p>
                            <p className='listView_description'>
                                {ele.description.slice(0,120)} <strong>...</strong>
                            </p>

                            <NavLink to={`/singleproduct/${ele._id}`} >
                                <button className="btn btn-outline-primary">Read More</button></NavLink>

                        </div>
                    </div>

                )
            })}


        </div>
    )
}

export default ListView
