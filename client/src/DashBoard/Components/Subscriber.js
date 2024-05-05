import React, { useState } from 'react'
import { MdDelete } from "react-icons/md";
import ReactPaginate from 'react-paginate';
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert';
import { useSubscriber } from '../../Context/SubscriberContext';
import { useAuth } from '../../Context/store';
import { toast } from 'react-toastify';
import RoleHeading from './RoleHeading';
import { MdMailOutline } from "react-icons/md";




const Subscriber = () => {
    const { permissionArray, authorizationToken } = useAuth();
    const { Filter_email, handleEmail, Search_input, getEmail } = useSubscriber();

    const [currentPage, setCurrentPage] = useState(0);
    const [perPage, setPerPage] = useState(10); // Default per page
    const API = process.env.REACT_APP_API;


    const handleDelete = (id) => {
        if (permissionArray.includes("subscriber delete")) {
            confirmAlert({
                title: 'Confirm Delete',
                message: (<div className='overlay-custom-class-name'>
                    Are you sure you want to Delete this Email?
                </div>),
                buttons: [
                    {
                        label: 'Yes',
                        onClick: async () => {
                            try {
                                await axios.delete(`${API}/subscriber/deletesubs/${id}`, {
                                    headers: {
                                        Authorization: authorizationToken
                                    }

                                })
                                getEmail();
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
                messageStyle: {
                    fontSize: '26px', // Adjust the font size as needed
                    // Add other message styles here if needed
                }
            });
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
        <div className='Subscriber_Section'>
            <RoleHeading
                heading="Subscribers List"
                btnIcon=<MdMailOutline className='me-2' />
                btnContent="send email"
                link={permissionArray.includes("email send to all subscriber") ? "/admin/subscriber/sendMail" : ""}

                onClick={() => {
                    if (!permissionArray.includes("email send to all subscriber")) {
                        toast.error("You are not authorized to perform this action.");
                    }
                }}
            />
            <div className='row Subscriber m-0'>
                <div className='col-12 Subscriber_filter'>
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
                            <input type='text' name="Search_input" value={Search_input} onChange={handleEmail} />
                        </div>
                    </form>

                </div>
                <div className='col-12 subscriber_table'>
                    <table className="table table-bordered table-striped">
                        <thead>
                            <tr>
                                <th >#</th>
                                <th >Email</th>
                                <th style={{ width: "15%" }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody className="table-group-divider">
                            {Filter_email.slice(currentPage * perPage, (currentPage + 1) * perPage).map((ele, index) => {
                                return (
                                    <tr key={ele._id}>
                                        <td className='align-middle subscriber_content'>{index + 1 + (currentPage * perPage)}</td>
                                        <td className='align-middle subscriber_content'>{ele.email}</td>
                                        <td className='align-middle subscriber_delete' >
                                            <button className='m-auto' onClick={() => handleDelete(ele._id)}>
                                                <MdDelete />
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })}




                        </tbody>
                    </table>
                </div>
                <div className='col-12 subcriber_pagination'>
                    <ReactPaginate
                        previousLabel="Previous"
                        nextLabel="Next"
                        breakLabel="..."
                        pageCount={Math.ceil(Filter_email.length / perPage)}
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

        </div>
    )
}

export default Subscriber
