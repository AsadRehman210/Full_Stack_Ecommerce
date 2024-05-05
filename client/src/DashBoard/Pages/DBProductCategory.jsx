import React, { useState } from 'react'
import OrderHeading from '../Components/OrderHeading';
import { MdDelete } from "react-icons/md";
import { useDBCategory } from '../../Context/DBCategory';
import ReactPaginate from 'react-paginate';
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert';
import { useAuth } from '../../Context/store';
import { toast } from 'react-toastify';

const DBProductCategory = () => {
  const { permissionArray, authorizationToken } = useAuth();
  const { filter_DB_Category, handleCategory, inputSearch, getData } = useDBCategory();
  const API = process.env.REACT_APP_API;

  const [currentPage, setCurrentPage] = useState(0);
  const [perPage, setPerPage] = useState(10); // Default per page

  let sortingOrder = (a, b) => {
    return a.category.localeCompare(b.category)
  }
  const handlePageClick = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };
  const handleEntriesChange = (e) => {
    setPerPage(parseInt(e.target.value, 10));
  };

  const handleDelete = (id) => {
    if (permissionArray.includes("category delete")) {
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
                await axios.delete(`${API}/DBproducts/product_Data/Category/Delete/${id}`, {
                  headers:{
                      Authorization: authorizationToken
                  }
              })
                getData();
              } catch (error) {
                console.error("Error deleting product:", error);
              }
            }
          },
          {
            label: 'No',
            onClick: () => { }
          }
        ],
      });
    } else {
      toast.error('You are not authorized to perform this action.');
    }
  };

  return (
    <section className='DB_Product_Category'>
      <OrderHeading
        heading="Product Catorgory"
      />

      <div className='row order_Show m-0'>
        <div className='col-12 order_entries'>

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
              <input
                type='text'
                name="inputSearch"
                value={inputSearch}
                onChange={handleCategory}
                placeholder='Enter Your Co/Cat' />
            </div>
          </form>

        </div>

        <div className='col-12 order_entries_show'>
          <table className="table table-bordered table-striped ">
            <thead>
              <tr>
                <th style={{ width: "10%" }}>SR #</th>
                <th >Category</th>
                <th >company</th>
                <th style={{ width: "10%" }}>Actions</th>
              </tr>
            </thead>
            <tbody className="table-group-divider">
              {filter_DB_Category.slice(currentPage * perPage, (currentPage + 1) * perPage).sort(sortingOrder).map((product, index) => {
                return (
                  <tr key={product._id}>
                    <td className='table_content align-middle'>{index + 1 + (currentPage * perPage)}</td>
                    <td className='table_content align-middle'>{product.category}</td>
                    <td className='table_content align-middle'>{product.brandName}</td>
                    <td className='align-middle Product_category_delete'>
                      <button className='m-auto'
                        onClick={() => handleDelete(product._id)}>
                        <MdDelete />

                      </button>

                    </td>
                  </tr>
                )

              })}



            </tbody>
          </table>
        </div>
        <div className='col-12 Category_pagination'>
          <ReactPaginate
            previousLabel="Previous"
            nextLabel="Next"
            breakLabel="..."
            pageCount={Math.ceil(filter_DB_Category.length / perPage)}
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

    </section>
  )
}

export default DBProductCategory
