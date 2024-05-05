import React from 'react'
import { GrStatusGood } from "react-icons/gr";
import { useAuth } from '../Context/store';


const PaymentSuccess = () => {
  const { loginUserEmail } = useAuth()
  return (
    <section className='paymentSuccess'>
      <div className='container'>
        <div className='row paymentSuccess_row'>
          <div className='col-12 paymentSuccess_col'>
            <div className='payment_card'>
              <div className='card_header'>
                <h4>Thank you</h4>
                <p>{loginUserEmail}</p>

              </div>
              <div className='card_content'>
                <GrStatusGood style={{ fontWeight: "bolder", fontSize: "10rem", color: "#4e8181" }} />

                <p className='succ_content'>Successful payment</p>

              </div>
              <div className='card_footer'>
                <p>You have been successfully charged for this transaction.</p>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PaymentSuccess
