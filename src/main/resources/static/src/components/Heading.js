import React from "react";
import './HeadingStyle.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAddressBook } from '@fortawesome/free-solid-svg-icons'

function Heading() {
    return (
        <div>
            <h1 className = "page-title"><FontAwesomeIcon icon = {faAddressBook}/> PhoneBook</h1>
        </div>
    );
}

export default Heading;