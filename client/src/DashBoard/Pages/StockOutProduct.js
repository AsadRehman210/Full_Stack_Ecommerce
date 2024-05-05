import React, { useState } from 'react'
import { useStockOut } from '../../Context/StockOutContext'
import ReactPaginate from 'react-paginate';
import PriceFormate from '../../Helper/PriceFormate'

const StockOutProduct = () => {
    const { Filter_StockOut, Search_input_value, handleInput } = useStockOut();
    const API = process.env.REACT_APP_API;
    const [currentPage, setCurrentPage] = useState(0);
    const [perPage, setPerPage] = useState(10); // Default per page

    const handlePageClick = (selectedPage) => {
        setCurrentPage(selectedPage.selected);
    };

    const handleEntriesChange = (e) => {
        setPerPage(parseInt(e.target.value, 10));
    };

    return (
        <section className='Stock_out_products'>
            <div className='row Stock_out_heading'>
                <div className='col-12'>
                    <div className="form_card" >
                        <div className="form_card-body">
                            <h3>Stock Out Products</h3>
                        </div>
                    </div>
                </div>
            </div>
            <div className='row Stock_out_products_Show'>
                <div className='col-12 Stock_out_products_entries'>
                    <form>
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
                            <input type='text' name="Search_input_value" value={Search_input_value} onChange={handleInput} placeholder='Enter Your Product' />
                        </div>
                    </form>

                </div>

                <div className='col-12 Stock_out_products_entries_show'>
                    <table className="table table-bordered table-striped">
                        <thead>
                            <tr>
                                <th style={{ width: "15%" }}>Image</th>
                                <th >Name</th>
                                <th >Category</th>
                                <th >Company</th>
                                <th style={{ width: "15%" }}>Price</th>
                            </tr>
                        </thead>
                        <tbody className="table-group-divider">
                            {Filter_StockOut.slice(currentPage * perPage, (currentPage + 1) * perPage).map((product) => {
                                return (
                                    <tr key={product._id}>
                                        <td className='col_image'>
                                            <div className='image_declared'>
                                                <img src={`${API}/${product.FeaturedImage}`} alt='logo' />
                                            </div>
                                        </td>
                                        <td className='table_content align-middle'>{product.productName}</td>
                                        <td className='table_content align-middle'>{product.category}</td>
                                        <td className='table_content align-middle'>{product.brandName}</td>
                                        <td className='table_content align-middle'>
                                            <PriceFormate price={product.currentPrice} />
                                        </td>
                                    </tr>

                                )

                            })}



                        </tbody>
                    </table>
                </div>
                <div className='col-12 Stock_Out_Product'>
                    {Filter_StockOut.length === 0 ? null :
                        <ReactPaginate
                            previousLabel="Previous"
                            nextLabel="Next"
                            breakLabel="..."
                            pageCount={Math.ceil(Filter_StockOut.length / perPage)}
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
                    }


                </div>
            </div>
        </section>
    )
}

export default StockOutProduct
