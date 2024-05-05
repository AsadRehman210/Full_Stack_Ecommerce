import React, { useState } from 'react'
import OrderHeading from '../Components/OrderHeading';
import { NavLink } from 'react-router-dom';
import { GrView } from "react-icons/gr";
import { MdDelete } from "react-icons/md";
import PriceFormate from '../../Helper/PriceFormate'
import { usePendingOrder } from '../../Context/PendingOrderContext';
import ReactPaginate from 'react-paginate';
import { useAuth } from '../../Context/store';
import { toast } from 'react-toastify';
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert';

const PendingOrder = () => {
  const { permissionArray, authorizationToken } = useAuth();
  const { Filter_PendingOrder, handleSearch, getAllPendingOrder } = usePendingOrder();
  const API = process.env.REACT_APP_API;
  const [currentPage, setCurrentPage] = useState(0);
  const [perPage, setPerPage] = useState(10); // Default per page

  const handleDelete = (id) => {
    if (permissionArray.includes("order delete")) {
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
                await axios.delete(`${API}/API/Order/deleteIndividualOrderData/${id}`, {
                  headers: {
                    Authorization: authorizationToken
                  }
                })
                getAllPendingOrder();
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

  // Pageination function
  const handlePageClick = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };
  const handleEntriesChange = (e) => {
    setPerPage(parseInt(e.target.value, 10));
  };
  return (
    <section className='All_order_details'>

      <OrderHeading
        heading="Pending Order Details"
      />
      <div className='row order_Show mx-0'>
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
              <input type='text' name="AllPendingOrder_Search" onChange={handleSearch} />
            </div>
          </form>

        </div>

        <div className='col-12 order_entries_show'>
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th >Order ID</th>
                <th >User</th>
                <th >Total Amount</th>
                <th >Payment Status</th>
                <th >Order Status</th>
                <th >Actions</th>
              </tr>
            </thead>
            <tbody className="table-group-divider">
              {Filter_PendingOrder.slice(currentPage * perPage, (currentPage + 1) * perPage).map((product, index) => {
                return (
                  <tr key={product._id}>
                    <td className='table_content align-middle' style={{ textTransform: "none" }}>
                      {product.orderId}
                    </td>
                    <td className='table_content align-middle'>{product.shipping.name}</td>
                    <td className='table_content align-middle'>
                      {/* {product.total} */}
                      <PriceFormate price={product.total/100} />
                    </td>
                    <td className='table_content align-middle'>{product.payment_status}</td>
                    <td className='table_content align-middle'>{product.delivery_status}</td>
                    <td className='table_btn align-middle'>
                      <NavLink to={`/admin/pendingOrders/orderInvoice/${product._id}`} className="btn btn-primary btn-sm button">
                        <GrView />
                      </NavLink>
                      <button className='btn btn-danger' onClick={() => handleDelete(product._id)}>
                        <MdDelete />

                      </button>
                    </td>
                  </tr>
                )

              })}



            </tbody>
          </table>
        </div>

        <div className='col-12'>
          <ReactPaginate
            previousLabel="Previous"
            nextLabel="Next"
            breakLabel="..."
            pageCount={Math.ceil(Filter_PendingOrder.length / perPage)}
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

export default PendingOrder
