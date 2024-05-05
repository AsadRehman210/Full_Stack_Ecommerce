import React from 'react'
import { NavLink } from 'react-router-dom';

const RoleHeading = ({ heading, btnIcon, btnContent, link, btnDisplay, onClick }) => {
    return (
        <div className='row order_heading mx-0'>
            <div className='col-12 order_heading_content'>
                <h3>{heading}</h3>
                <NavLink
                    to={link} className="btn btn-primary"
                    onClick={onClick}
                    style={{ display: btnDisplay }}
                >
                    {btnIcon} {btnContent}
                </NavLink>
            </div>

        </div>
    )
}

export default RoleHeading;
