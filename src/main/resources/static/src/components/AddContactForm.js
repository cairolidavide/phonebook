import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import "./AddContactFormStyle.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";


function AddContactForm(props) {
    const [isOpen, setIsOpen] = useState(false);
    const [groups, setGroups] = useState([]);
    const [contactName, setContactName] = useState([]);
    const [contactSurname, setContactSurname] = useState([]);
    const [contactPhoneNumber, setContactPhoneNumber] = useState([]);
    const [contactIsFavorite, setContactFavorite] = useState(false);
    const [contactGroupId, setContactGroupId] = useState([]);
    const [phoneValidateMessage, setPhoneValidateMessage] = useState("");
    const [contactsList, setContactsList] = useState([]);
    


    
    const hideModal = () => {
        setIsOpen(false);
        setPhoneValidateMessage("");
        setContactName("");
        setContactSurname("");
        setContactPhoneNumber("")
        setContactFavorite(false);
        setContactGroupId([]);
    }

    const getAllGroups = () => {
        axios.get("http://localhost:8080/groups")
        .then(res => {
            const groupsList = res.data;
            setGroups(groupsList);
        });
    }

    const getAllContacts = () => {
        axios.get("http://localhost:8080/contacts/all")
        .then(res => {
            const returnedContactsList = res.data;
            setContactsList(returnedContactsList);
        });
    }

    useEffect(() => {
        getAllGroups()
    }, [isOpen]);

    useEffect(() => {
        getAllContacts();
    }, [isOpen]);

    useEffect(() => {
        setIsOpen(props.addContactModalState);
    }, [props.addContactModalState]);


    const validateNumber = (number) => {
        if (number.length > 1) {
            for (let contact of contactsList) {
                if (contact.phoneNumber == number) {
                    setPhoneValidateMessage(`Il numero inserito è già presente come ${contact.name} ${contact.surname}`);
                }
            }
        } else if (number.length == 0) {
            setPhoneValidateMessage("");
        }
    }

    const onSubmitForm = (e) => {
        e.preventDefault();
        if (contactName != "" && contactSurname != "" && contactPhoneNumber != "") {
            axios.get("http://localhost:8080/contacts/phone/" + contactPhoneNumber)
            .then(res => {
                const message = res.data;
                if (message == "") {
                    props.onSubmit(contactName, contactSurname, contactPhoneNumber, contactIsFavorite, contactGroupId);
                    hideModal();
                } else {
                    alert(message);
                }
            });
        } else {
            alert("Compila tutti i campi");
        }
    }

    const changeContactGroupId = (event) => {
        setContactGroupId(event.currentTarget.value);
        console.log(event.currentTarget.value);
    }

    return (
       <>
            <Modal show={isOpen}>
                <div className = "contact-header-title">
                    <Modal.Header>
                        <Modal.Title>Aggiungi un nuovo contatto</Modal.Title>
                        <span className = "close-modal-button" onClick = {hideModal}><FontAwesomeIcon icon = {faTimesCircle} /></span>
                    </Modal.Header>
                </div>
                <Modal.Body>
                    <form className = "add-contact-form">
                        <div className = "row">
                            <div className = "col-6">
                                <label className = "add-contact-label" htmlFor = "contact-name">Nome</label>
                                <input id = "contact-name" className = "add-contact-input" onChange = {(e) => {setContactName(e.target.value);}}></input>
                            </div>
                            <div className = "col-6">
                                <label className = "add-contact-label" htmlFor = "contact-surname">Cognome</label>
                                <input id = "contact-surname" className = "add-contact-input" onChange = {(e) => {setContactSurname(e.target.value);}}></input>
                            </div>
                            <div className = "col-6">
                                <label className = "add-contact-label" htmlFor = "phone-number">Cellulare</label>
                                <input id = "phone-number" className = "add-contact-input" type = "text" onChange = {(e) => {setContactPhoneNumber(e.target.value); validateNumber(e.target.value);}}></input>
                                <p className = "validate-message">{phoneValidateMessage}</p>
                            </div>
                            <div className = "col-6">
                                <label className = "add-contact-label" htmlFor = "group-select">Gruppo</label>
                                <p>
                                    <select id = "group-select" className = "add-contact-input" onChange = {(e) => {changeContactGroupId(e);}}> 
                                        <option>-- scegli un gruppo</option>
                                        {groups.map((group, index) => {
                                            return (
                                                <option key={index} value={group.id}>{group.name}</option>
                                            );
                                        })} 
                                    </select>
                                </p>
                            </div>
                            <div className = "col-12">
                                <label className = "add-contact-label" htmlFor = "preferito">Aggiungi ai preferiti?</label>
                                <p>
                                    <input id = "preferito" type = "checkbox" checked = {contactIsFavorite} onChange={(e) => {setContactFavorite(e.target.checked);}}></input><span className = "check-phrase">{contactIsFavorite ? `${contactName + " " + contactSurname} sarà aggiunto ai preferiti` : `${contactName + " " + contactSurname} NON sarà aggiunto ai preferiti`}</span>
                                </p>
                                
                            </div>
                        </div>  
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <button className={phoneValidateMessage != "" ? "btn disabled" : "contact-save-button"} type="submit" form="add-contact-form" onClick={onSubmitForm}>Salva</button>
                </Modal.Footer>
            </Modal>
       </>
    );
}

export default AddContactForm;