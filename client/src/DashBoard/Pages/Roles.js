import React, { useState } from 'react'
import RoleHeading from '../Components/RoleHeading'
import { MdAdd } from "react-icons/md";
import { useRole } from '../../Context/RolesContext';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert';
import ReactPaginate from 'react-paginate';
import { useAuth } from '../../Context/store';
import { toast } from 'react-toastify';


const Roles = () => {
  const { permissionArray, authorizationToken } = useAuth();
  const { Filter_Permission, getRole, handleChange } = useRole();
  const [currentPage, setCurrentPage] = useState(0);
  const [perPage, setPerPage] = useState(10); // Default per page
  const API = process.env.REACT_APP_API;

  const handleDelete = (id, role) => {
    // Check if the user's role is admin
    if (role === "admin") {
      toast.error("Admin role cannot be deleted.");
      return;
    }

    // Check if the user has permission to delete roles
    if (permissionArray.includes("role delete")) {
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
                await axios.delete(`${API}/API/Permission/deletePermission/${id}`, {
                  headers: {
                    Authorization: authorizationToken
                  }
                })
                getRole()

              } catch (error) {
                console.error("Error deleting Permission:", error);

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
    <section className='All_user_details'>
      <RoleHeading
        heading="Managed Roles"
        btnIcon=<MdAdd className='me-2' />
        btnContent="add"
        link={permissionArray.includes("role create") ? "/admin/roles/CreatePermissions" : ""}
        onClick={() => {
          if (!permissionArray.includes("role create")) {
            toast.error("You are not authorized to perform this action.");
          }
        }}
      />
      <div className='row user_Show mx-0'>
        <div className='col-12 user_entries'>
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
              <input type='text' name='Permission_input' onChange={handleChange} />
            </div>
          </form>

        </div>

        <div className='col-12 user_entries_show'>
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th style={{ width: "30%" }}>Name</th>
                <th >Permission</th>
                <th style={{ width: "20%" }}>Actions</th>
              </tr>
            </thead>
            <tbody className="table-group-divider">
              {Filter_Permission.slice(currentPage * perPage, (currentPage + 1) * perPage).map((ele, index) => {
                return (
                  <tr key={ele._id}>
                    <td className='table_content align-middle'>
                      {ele.role}
                    </td>
                    <td className='table_content-permission align-middle gap-3'>
                      {ele.permissions.map((ele, index) => {
                        return (
                          <span className="badge rounded-pill text-bg-primary m-2" key={index}>{ele}</span>
                        )

                      })}


                    </td>

                    <td className='table_content align-middle'>
                      <div className="button-container">

                        <NavLink
                          to={permissionArray.includes("role update") ? `/admin/roles/UpdatePermissions/${ele._id}` : ""}
                          onClick={() => {
                            if (!permissionArray.includes("role update")) {
                              toast.error("You are not authorized to perform this action.");
                            }
                          }}

                          className='btn btn-primary me-3'>
                          <FaEdit />
                        </NavLink>


                        <button className='btn btn-danger' onClick={() => handleDelete(ele._id, ele.role)}><MdDelete /></button>
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
            pageCount={Math.ceil(Filter_Permission.length / perPage)}
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

export default Roles
