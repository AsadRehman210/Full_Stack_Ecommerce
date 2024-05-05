import React from 'react'
import GridView from './GridView';
import ListView from './ListView';
import { useFilter } from '../Context/FilterContext';

const SelectProductView = () => {
    const { filter_Products, grid_view} = useFilter();

    if(grid_view === true){
        return <GridView productDetail={filter_Products}/>
    }
    if(grid_view === false){
        return <ListView productDetail={filter_Products}/>
    }

}

export default SelectProductView
