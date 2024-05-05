import React, { useState } from 'react'
import { useDB } from '../../Context/DashBoardContext'
import { useNavigate } from 'react-router-dom';
import PriceFormate from '../../Helper/PriceFormate'
import ReactPaginate from 'react-paginate';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import the CSS
import axios from 'axios';
import { useAuth } from '../../Context/store';
import { toast } from 'react-toastify';

const AllProductShow = () => {
    const { permissionArray,authorizationToken } = useAuth();
    const { filter_DBProducts, DBSearchingInput, DB_Search: { inputText }, getData } = useDB();
    const [currentPage, setCurrentPage] = useState(0);
    const [perPage, setPerPage] = useState(10); // Default per page
    const [selectedOption, setSelectedOption] = useState("view");
    let API = process.env.REACT_APP_API;



    const navigate = useNavigate()

    const handleActionChange = (e, id) => {
        const action = e.target.value;
        if (permissionArray.includes("product update")) {
            if (action === "update") {
                // navigate(`/admin/UpdateDBProducts/${id}`)
                confirmAlert({
                    title: 'Confirm Update',
                    message: (
                        <p className='overlay-custom-class-name'>
                            Are you sure you want to update this product?
                        </p>
                    ),
                    buttons: [
                        {
                            label: 'Yes',
                            onClick: () => navigate(`/admin/UpdateDBProducts/${id}`)
                        },
                        {
                            label: 'No',
                            onClick: () => {
                                setSelectedOption("view")
                            }
                        }
                    ],
                });
            }

        } else {
            toast.error("You are not authorized to perform this action.")
        }

        if (permissionArray.includes("product delete")) {
            if (action === "delete") {
                confirmAlert({
                    title: 'Confirm Delete',
                    message: (
                        <p className='overlay-custom-class-name'>
                            Are you sure you want to Delete this product?
                        </p>
                    ),
                    buttons: [
                        {
                            label: 'Yes',
                            onClick: async () => {
                                try {
                                    await axios.delete(`${API}/DBproducts/product_Data/Delete/${id}`, {
                                        headers: {
                                            Authorization: authorizationToken
                                        }
                                    })
                                    getData()

                                } catch (error) {
                                    console.error("Error deleting product:", error);

                                }
                            }
                        },
                        {
                            label: 'No',
                            onClick: () => {
                                setSelectedOption("view")
                            }
                        }
                    ],
                });

            }

        } else {
            toast.error("You are not authorized to perform this action.")
        }



    }

    const handlePageClick = (selectedPage) => {
        setCurrentPage(selectedPage.selected);
    };

    const handleEntriesChange = (e) => {
        setPerPage(parseInt(e.target.value, 10));
    };

    return (
        <div className='row All_Product_Show'>
            <div className='col-12 product_entries'>
                <form onSubmit={(e) => e.defaultPrevented()}>
                    <div className='Form_left'>
                        <label>Show</label>
                        <select name="entries" onChange={handleEntriesChange}>
                            <option value="10">10</option>
                            <option value="25">25</option>
                            <option value="50">50</option>
                            <option value="75">75</option>
                            <option value="100">100</option>
                        </select>
                        <label>Entries</label>
                    </div>
                    <div className='Form_Right'>
                        <label>Search:</label>
                        <input
                            type='text'
                            name="inputText"
                            value={inputText}
                            onChange={DBSearchingInput}
                            placeholder='Search Your Product'
                        />
                    </div>
                </form>

            </div>

            <div className='col-12 product_entries_show'>
                <table className="table table-bordered table-striped">
                    <thead>
                        <tr>
                            <th style={{ width: "15%" }}>Image</th>
                            <th >Product Name</th>
                            <th >Category</th>
                            <th >price</th>
                            <th >Company</th>
                            <th style={{ width: "15%" }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody className="table-group-divider">
                        {filter_DBProducts.slice(currentPage * perPage, (currentPage + 1) * perPage).map((product, index) => {
                            return (
                                <tr key={product._id}>
                                    <td className='col_image'>
                                        <div className='image_declared'>
                                            <img src={`${API}/${product.FeaturedImage}`} alt='logo' />
                                        </div>
                                    </td>
                                    <td className='table_content align-middle'>{product.productName}</td>
                                    <td className='table_content align-middle'>{product.category}</td>
                                    <td className='table_content align-middle'>
                                        <PriceFormate price={product.currentPrice} />
                                    </td>
                                    <td className='table_content align-middle'>{product.brandName}</td>
                                    <td className='content_update align-middle'>
                                        <select name="entries" value={selectedOption} onChange={(e) => handleActionChange(e, product._id)}>
                                            <option value="view">View</option>
                                            <option value="update">Update</option>
                                            <option value="delete">Delete</option>



                                        </select>
                                    </td>
                                </tr>

                            )

                        })}





                    </tbody>
                </table>
            </div>
            <div className='col-12 AllProductShow_Pagination'>
                <ReactPaginate
                    previousLabel="Previous"
                    nextLabel="Next"
                    breakLabel="..."
                    pageCount={Math.ceil(filter_DBProducts.length / perPage)}
                    containerClassName='pagination justify-content-center mt-5'
                    pageClassName='page-item'
                    pageLinkClassName='page-link pagination_font'
                    previousClassName='page-item'
                    previousLinkClassName='page-link pagination_font'
                    nextClassName='page-item'
                    nextLinkClassName='page-link pagination_font'
                    breakClassName='page-item'
                    breakLinkClassName='page-link pagination_font'
                    activeClassName='active'
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={3}
                    onPageChange={handlePageClick}
                />
            </div>


        </div>
    )
}

export default AllProductShow
