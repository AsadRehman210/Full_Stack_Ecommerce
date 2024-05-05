import React from 'react'
import { IoMdStar, IoMdStarHalf, IoMdStarOutline } from "react-icons/io";


const Stars = ({ star, review }) => {
    const ratingStar = Array.from({ length: 5 }, (ele, index) => {
        const number = index + 0.5;
        return (
            <span key={index}>
                {
                    star >= index + 1 ? (<IoMdStar />) : star >= number ? (<IoMdStarHalf />) : (<IoMdStarOutline />)

                }
            </span>
        )

    })

    return (
        
        <div className='customer_review'>
        <p className='star_review'>
            {ratingStar}
        </p>
              <p className='numb_reviews'>({review} customer reviews)</p>
            </div>
    )
}

export default Stars
