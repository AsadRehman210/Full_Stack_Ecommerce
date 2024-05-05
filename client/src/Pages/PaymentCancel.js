import React from 'react'
import { RxCrossCircled } from "react-icons/rx";
import { useAuth } from '../Context/store';


const PaymentCancel = () => {
  const {loginUserEmail} = useAuth();
  
  return (
    <section className='paymentCancel'>
      <div className='container'>
        <div className='row paymentCancel_row'>
          <div className='col-12 paymentCancel_col'>
            <div className='payment_card'>
              <div className='card_header'>
                <h4>Sorry</h4>
                <p>{loginUserEmail}</p>

              </div>
              <div className='card_content'>
                <RxCrossCircled style={{ fontWeight: "bolder", fontSize: "10rem", color: "#4e8181" }} />

                <p className='cancel_content'>payment Failed</p>

              </div>
              <div className='card_footer'>
                <p>Your transaction has failed.</p>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PaymentCancel
