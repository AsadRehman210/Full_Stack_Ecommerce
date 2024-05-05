import React, { useRef } from 'react';
import { IoIosArrowBack } from "react-icons/io";
import { FaPrint } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import ReactToPrint from 'react-to-print';



const OrderHeader = () => {
    const componentRef = useRef();
    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1)

    }
    return (
        <div className='Order_heading'>
            <div className='row Order_heading_row'>
                <div className='col-12 Order_heading_col'>
                    <div className="Order_heading_body">
                        <h3>Order Invoice</h3>
                        <div className='Add_Order_btn'>
                            <button type='button' className="btn btn-primary " onClick={handleBack}><IoIosArrowBack /> Back</button>
                            {/* ReactToPrint component for printing */}
                            <ReactToPrint
                                trigger={() => <button type='button' className="btn btn-primary"><FaPrint className='me-3' /> Print</button>}

                                content={() => componentRef.current} // Specify the component to print
                                documentTitle='new document'
                                pageStyle="print"
                            />

                            {/* <button type='submit' className="btn btn-primary"><FaPrint className='me-3' /> Print</button> */}
                        </div>

                    </div>
                </div>
            </div>

        </div>
        
    )
}

export default OrderHeader
