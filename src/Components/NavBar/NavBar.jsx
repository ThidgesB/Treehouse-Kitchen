import React, { useState } from 'react';


const NavBar = (props) => {
    return (

        <div className='navBar'>
            <div className="row"  >
                <NavSiteIcon siteIcon={"THK"}></NavSiteIcon>
                {NavContent.map((object, i) => <NavItemContiner text={object} />)}
            </div>
            
        </div>
    )

}
const NavContent = ["test", "test1", "test2"]
const NavItemContiner = (props) => {

    return (
        <div className='col-md-2'>
            { props.text}
        </div>
    )
}

const NavSiteIcon = (props) => {
    return (
        <div className="col-md-2">
            <h1>{props.siteIcon}</h1>
        </div>
        )
}



export default NavBar