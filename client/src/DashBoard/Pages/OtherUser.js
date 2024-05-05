import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useOtherUser } from '../../Context/OtherUserContext';
import ReactPaginate from 'react-paginate';
import RoleHeading from '../Components/RoleHeading';
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert';
import { useAuth } from '../../Context/store';
import { toast } from 'react-toastify';



const OtherUser = () => {
  const { permissionArray, authorizationToken } = useAuth();
  const { filter_OtherUser, handleSearch, getOtherUserData } = useOtherUser();
  const API = process.env.REACT_APP_API;
  const [currentPage, setCurrentPage] = useState(0);
  const [perPage, setPerPage] = useState(10); // Default per page


  const handleDelete = (id) => {
    if (permissionArray.includes("other user delete")) {
      confirmAlert({
        title: 'Confirm Delete',
        message: <p>Are you sure you want to Delete this User?</p>,
        buttons: [
          {
            label: 'Yes',
            onClick: async () => {
              try {
                await axios.delete(`${API}/API/deleteIndividualUser/${id}`, {
                  headers:{
                      Authorization: authorizationToken
                  }
              });
                getOtherUserData();

              } catch (error) {
                console.error("Error deleting Other User:", error);

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
      toast.error("You are not authorized to perform this action.")
    }

  }



  // Pageination function
  const handlePageClick = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };
  const handleEntriesChange = (e) => {
    setPerPage(parseInt(e.target.value, 10));
  };
  return (
    <section className='All_OtherUser_details'>
      <RoleHeading
        heading="Other User Detail"
        btnDisplay="none"
      />
      <div className='row OtherUser_Show mx-0'>
        <div className='col-12 OtherUser_entries'>
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
              <input type='text' name="OtherUser_Search" onChange={handleSearch} />
            </div>
          </form>

        </div>

        <div className='col-12 OtherUser_entries_show'>
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th >Name</th>
                <th >Role</th>
                <th >Email</th>
                <th >Phone</th>
                <th >Actions</th>
              </tr>
            </thead>
            <tbody className="table-group-divider">
              {filter_OtherUser.slice(currentPage * perPage, (currentPage + 1) * perPage).map((ele, index) => {
                return (
                  <tr key={ele._id}>
                    <td className='table_content align-middle'>
                      {ele.name}
                    </td>
                    <td className='table_content align-middle'>
                      {ele.role}
                    </td>
                    <td className='table_content text-lowercase align-middle'>
                      {ele.email}
                    </td>
                    <td className='table_content align-middle gap-3'>
                      {ele.phone}

                    </td>

                    <td className='table_content align-middle'>
                      <div className="button-container">
                        <NavLink
                          to={permissionArray.includes("admin user update") ? `/admin/OtherUser/OtherUserUpdate/${ele._id}` : ""}
                          onClick={() => {
                            if (!permissionArray.includes("other user update")) {
                              toast.error("You are not authorized to perform this action.");
                            }
                          }}
                          className='btn btn-primary me-3'>
                          <FaEdit />
                        </NavLink>
                        <button className='btn btn-danger'
                          onClick={() => handleDelete(ele._id)}
                        ><MdDelete /></button>
                      </div>
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
            pageCount={Math.ceil(filter_OtherUser.length / perPage)}
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

export default OtherUser;
