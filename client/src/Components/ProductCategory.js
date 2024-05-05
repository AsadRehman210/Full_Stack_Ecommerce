import React from 'react'
import { useFilter } from '../Context/FilterContext';
import { TiTick } from "react-icons/ti";
import PriceFormate from "../Helper/PriceFormate"

const ProductCategory = () => {
    const { all_Products, CategoryValue, Search_Filter: { categoryFilter, colorFilter, Price, maxPrice, minPrice, companyFilter }, CompanyValue, ColorValue, rangeValue, ClearFilter } = useFilter();

    let sortoutData = (sorting, property) => {
        let newVal = sorting.map((ele) => {
            return ele[property];
            
        })
        if (property === "colors") {
            return (["all", ...new Set([].concat(...newVal))]);
        } else {
            return (["all", ...new Set(newVal)])
        }
    }
    let Product_Category = sortoutData(all_Products, "category");
    let Product_Company = sortoutData(all_Products, "brandName")
    let Product_Color = sortoutData(all_Products, "colors");


    return (
        <>
            <div className='col-12 product_category_section'>
                <h3>Category</h3>
                <div className='category_btn'>
                    {
                        Product_Category.map((ele, index) => {
                            return (
                                <button type='button' className={ele === categoryFilter ? "btn text-decoration-underline text-primary" : "btn"} key={index} name="categoryFilter"
                                    value={ele.toLowerCase()}
                                    onClick={CategoryValue}>
                                    {ele}
                                </button>
                            )

                        })
                    }

                </div>

            </div>
            {/* =============Company Section============= */}

            <div className='col-12 Product_Company_Section'>
                <h3>Company</h3>
                <form onSubmit={(e) => e.defaultPrevented()}>
                    <div className=" company_selection">
                        <select
                            onChange={CompanyValue}
                            name="companyFilter" value={companyFilter}>

                            {
                                Product_Company.map((ele, index) => {
                                    return (
                                        <option
                                            key={index}
                                            value={ele}
                                        >
                                            {ele}
                                        </option>
                                    )
                                })
                            }

                        </select>
                    </div>
                </form>


            </div>
            {/* =============Color Section============= */}
            <div className='col-12 Product_Color_Section'>
                <h3>Color</h3>
                <div className='btn_color'>
                    {
                        Product_Color.map((curColor, index) => {
                            if (curColor === "all") {
                                return (
                                    <button
                                        key={index}
                                        name="colorFilter"
                                        value={curColor}
                                        className='btn d-flex justify-content-center align-content-center'
                                        onClick={ColorValue}>
                                        All
                                    </button>

                                )
                            }

                            return (
                                <button type='button'
                                    style={{ background: curColor, 
                                        boxShadow: curColor === 'white' ? '0 0 5px rgba(0, 0, 0, 0.5)' : 'none',}}
                                    key={index}
                                    name="colorFilter"
                                    value={curColor}
                                    onClick={ColorValue}>

                                    {curColor === colorFilter ?
                                        <TiTick style={{ color: curColor === 'black' ? "white" : "black" }} />
                                        : ""}

                                </button>
                            )

                        })
                    }

                </div>


            </div>

            {/* =============Price Range Section============= */}
            <div className='col-12 Product_Price_Range_Section'>
                <h3>Price</h3>
                <p>
                    <PriceFormate price={Price} />
                </p>
                <input type="range" className='slider' min={minPrice} max={maxPrice} name="Price" value={Price} onChange={rangeValue} />

            </div>
            {/* =============Clear Filter Section============= */}
            <div className='col-12 Clear_Filter_Section'>
                <button className='btn btn-danger' onClick={ClearFilter}>Clear Filter</button>
            </div>
        </>
    )
}

export default ProductCategory
