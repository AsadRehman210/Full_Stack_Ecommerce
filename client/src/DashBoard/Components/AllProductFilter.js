import React from 'react'
import { useDB } from '../../Context/DashBoardContext'

const AllProductFilter = () => {
    const { DBProductsFilter, DBCompanyFilter, DBColorsFilter, DBOrderFilter, all_DBProducts, ClearFilter, DB_Search:{ categoryFilter, companyFilter, colorFilter, orderFilter } } = useDB();

    let SortingData = (Data, property) => {
        let newVal = Data.map((ele) => {
            return ele[property]
        })
        if (property === "colors") {
            return ([`all ${property}` , ...new Set([].concat(...newVal))])
        } else {
            return ([`all ${property}`, ...new Set(newVal)])

        }

    }
    let Company_SortingValue = SortingData(all_DBProducts, "brandName");
    let Category_SortingValue = SortingData(all_DBProducts, "category");
    let Color_SortingValue = SortingData(all_DBProducts, "colors");

    return (
        <div className='row Product_Filter'>
            <h3>Product Filter :</h3>
            <form>
                <div className='col-12 Product_Filter_Select'>

                    <select name="companyFilter" value={companyFilter} onChange={DBCompanyFilter}>
                        {Company_SortingValue.map((ele, index) => {
                            return (
                                <option value={ele} key={index}>{ele}</option>
                            )
                        })}
                    </select>

                    <select name="categoryFilter" value={categoryFilter}  onChange={DBProductsFilter}>
                        {Category_SortingValue.map((ele, index) => {
                            return (
                                <option value={ele} key={index}>{ele}</option>
                            )
                        })}
                    </select>

                    <select name="colorFilter" value={colorFilter} onChange={DBColorsFilter}>
                        {Color_SortingValue.map((ele, index) => {
                            return (
                                <option value={ele} key={index}>{ele}</option>
                            )
                        })}
                    </select>

                    <select name="orderFilter" value={orderFilter} onChange={DBOrderFilter}>
                        <option value="select">Select Order</option>
                        <option value="lowest">Price(Lowest)</option>
                        <option value="highest">Price(Highest)</option>
                        <option value="a-z">Product(A-Z)</option>
                        <option value="z-a">Product(Z-A)</option>
                    </select>


                </div>
            </form>
            <div className='col-12 clear_filter_btn'>
                <button className='btn btn-primary' onClick={ClearFilter}>Clear Filter</button>
            </div>
        </div>
    )
}

export default AllProductFilter
