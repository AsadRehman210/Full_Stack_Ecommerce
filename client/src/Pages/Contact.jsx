import React from 'react'

const Contact = () => {
  return (
    <main>
      <section className='contact_section'>
        <h2 className='text-center'>Contact Information</h2>
        <div className='map-container'>
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d27037.710637184904!2d74.85952823476563!3d32.1040191!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39195509146330e5%3A0x8707d3908749601e!2sMasjid%20Data%20Ali%20Hajwairi!5e0!3m2!1sen!2s!4v1709132936897!5m2!1sen!2s"
            // width="100%"
            // height="350"
            style={{ border: "0"}}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title='Google Map'></iframe>
        </div>

        <div className='container'>
          <div className='row form_row'>
            <div className='col-12 form_col'>
              <form action='https://formspree.io/f/mleqbaen' method="POST">

                <input type="text" name='Name' placeholder="Enter Your Name" required />
                <input type="email" name='Email' placeholder="Email address" required />
                <textarea type="text" name="Message" placeholder="Enter Your Message" rows="5" required />
                <input type='submit' value="Submit Now" className='btn btn-primary form_btn w-25' />


              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Contact
