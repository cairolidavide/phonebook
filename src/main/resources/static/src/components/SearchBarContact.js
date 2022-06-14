import React,{useEffect, useState} from "react";
import './SearchBarContactStyle.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faArrowLeft, faPlus, faSearch, faUserFriends, faX} from '@fortawesome/free-solid-svg-icons';
import {faUserPlus} from '@fortawesome/free-solid-svg-icons';


function SearchBarContact(props) {
    const [contactSurname, setContactSurname] = useState("");
    const [showModal, setShowModal] = useState([]);
    const [searchButtonState, setSearchButtonState] = useState("");
    const [backButtonState, setBackButtonState] = useState("no-display");
    const [addButtonState, setAddButtonState] = useState("no-display");

    const searchButtonSwitch = (e) => {
        if(e.currentTarget.id == "back-button") {
            setSearchButtonState("");
            setBackButtonState("no-display");
        } else {
            if (contactSurname != "") {
                setSearchButtonState("no-display");
                setBackButtonState("");
            }
        }
        SearchContactBySurname(e);
    }

    const SearchContactBySurname = (e) => {
        e.preventDefault();
        let page = "";
        if (e.currentTarget.id == "search-button" && contactSurname != "" || e.currentTarget.id == "search-button" && contactSurname != "" && props.backButtonState == "hidden") {
            page = "surname";
        }
        props.onSubmit(contactSurname, page);
        setContactSurname("");
    }

    const setShowModalState = () => {
        setShowModal(true);
        showAddModal();
    }

    const showAddModal = () => {
        props.onShowAddModal(showModal);
        setShowModal([]);
    }

    const changeAddButtonState = () => {
        setAddButtonState("");
    }

    const showGroupModal = () => {
        props.onShowGroupModal(true);
    }


    return (
        <div className = "search-container">
            <div className = "row m-0">
                <div className = "col-8 p-0">
                    <form id = "contact-search-form">
                        <label id = "search-title" htmlFor = "surname-input">Cerca:</label>
                        <input id = "surname-input" type = "text" placeholder = "Inserisci cognome o parte di esso..." value = {contactSurname} onClick = {(e) => {setBackButtonState("no-display"); setSearchButtonState("");}} onChange = {(e) => {setContactSurname(e.target.value);}}></input>         
                    </form>
                </div>
                <div className = "col-1 p-0">
                    <div className = "search-button-container">
                        <button id = "search-button" className = {searchButtonState} type = "submit" form = "contact-search-form" onClick = {(e) => {searchButtonSwitch(e);}}><FontAwesomeIcon icon = {faSearch} /></button>
                        <button id = "back-button" className = {backButtonState} type = "submit" onClick = {(e) => {searchButtonSwitch(e);}}><FontAwesomeIcon icon = {faArrowLeft} /></button>
                    </div>
                </div>
                <div className = "col-3 p-0">
                    <div className = "add-contact-button-container">
                        <div className = {addButtonState == "" ? "no-display" : ""}>
                            <button id = "add-button" onClick = {changeAddButtonState}><FontAwesomeIcon icon = {faPlus}/></button>
                        </div>
                        <div className = {addButtonState == "no-display" ? "no-display" : "row m-0"}>
                            <div className = "col-lg">
                                <button id = "add-button-exit" className = {addButtonState} onClick = {() => {setAddButtonState("no-display");}}><FontAwesomeIcon icon = {faX}/></button>
                            </div>
                            <div className = "col-lg">
                                <button id = "add-contact-button" className = {addButtonState} onClick = {() => {setShowModalState(); setAddButtonState("no-display");}}><FontAwesomeIcon icon = {faUserPlus}/></button>
                            </div>
                            <div className = "col-lg">
                                <button id = "add-category-button" className = {addButtonState} onClick = {() => {showGroupModal(); setAddButtonState("no-display");}}><FontAwesomeIcon icon = {faUserFriends}/></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SearchBarContact;