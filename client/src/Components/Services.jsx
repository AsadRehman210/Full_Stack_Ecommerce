import React from 'react';
import { PiVanFill } from "react-icons/pi";
import { RiSecurePaymentLine } from "react-icons/ri";
import { GiReceiveMoney } from "react-icons/gi";
import { MdOutlineSecurity } from "react-icons/md";




const Services = () => {
    return (
        <section className='Services_section'>
            <div className='container'>
                <div className='row Services_row g-5'>
                    <div className='col-4 Services_cards'>
                        <div className='card'>
                            <div className='card-img'>
                                <PiVanFill />
                            </div>
                            <div className='card_content'>
                                <p>Super Fast and Free Delivery</p>
                            </div>

                        </div>
                    </div>

                    <div className='col-4 Services_cards_2 '>
                        <div className='row Services_cards_row'>
                            <div className='col-12'>
                                <div className='card'>
                                    <div className='card-img'>
                                        <MdOutlineSecurity />
                                    </div>
                                    <div className='card_content'>
                                        <p>Super Fast and Free Delivery</p>
                                    </div>

                                </div>
                            </div>

                        </div>
                        <div className='row Services_cards_row'>
                            <div className='col-12'>
                                <div className='card'>
                                    <div className='card-img'>
                                        <GiReceiveMoney />
                                    </div>
                                    <div className='card_content'>
                                        <p>Money-Back Guaranted</p>
                                    </div>

                                </div>
                            </div>

                        </div>

                    </div>

                    <div className='col-4 Services_cards'>
                        <div className='card'>
                            <div className='card-img'>
                                <RiSecurePaymentLine />
                            </div>
                            <div className='card_content'>
                                <p>Super Secure payment system</p>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Services
