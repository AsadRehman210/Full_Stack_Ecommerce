import React from 'react'
import SelectProductView from './SelectProductView';
import { GiHamburgerMenu } from "react-icons/gi";
import { CgMenuGridO } from "react-icons/cg";
import { useFilter } from '../Context/FilterContext';


const ProductList = () => {
  const { filter_Products, grid_view, SET_Grid_Review, SET_List_Review, Sorting, Sorting_Value } = useFilter();

  return (
    <>
      <div className='row Product_List_Row'>
        <div className='col-12 Product_List_col'>
          <div className='product_List_btn'>
            <button
              className={grid_view ? "btn btn-primary me-5" : "btn btn-light me-5"}
              onClick={SET_Grid_Review}>
              <CgMenuGridO />

            </button>
            <button className={grid_view ? "btn btn-light" : "btn btn-primary"}
              onClick={SET_List_Review}>
              <GiHamburgerMenu />
            </button>
          </div>

          <div className='product_length'>
            {filter_Products.length} Total Product
          </div>

          <div className='sort_selection'>
            {/* <form> */}
            <div className="input-group">
              <select onChange={Sorting} value={Sorting_Value}>
                <option value="choose">Choose...</option>
                <option value="lowest">Price(lowest)</option>
                <option value="highest">Price(highest)</option>
                <option value="a-z">Product(a-z)</option>
                <option value="z-a">Product(z-a)</option>
              </select>
            </div>
            {/* </form> */}
          </div>

        </div>
      </div>
      <div className='row d-flex justify-content-between Product_Show'>
        <SelectProductView />


      </div>
    </>
  )
}

export default ProductList
