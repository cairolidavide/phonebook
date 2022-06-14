import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./ModifyContactFormStyle.css"
import axios from "axios";
import { Modal } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

function ModifyContactForm(props) {
    const [isOpen, setIsOpen] = useState(false);
    const [isFirstLoad, setFirstLoad] = useState(true);
    const [groups, setGroups] = useState([]);
    const [contactId, setContactId] = useState(0);
    const [contactName, setContactName] = useState("");
    const [contactSurname, setContactSurname] = useState("");
    const [contactPhoneNumber, setContactPhoneNumber] = useState("");
    const [contactIsFavorite, setContactFavorite] = useState(false);
    const [contactGroupId, setContactGroupId] = useState("");
    

    const hideModal = () => {
        setIsOpen(false);
    }

    const resetModal = () => {
        setGroups([]);
        setContactName("");
        setContactSurname("");
        setContactPhoneNumber("");
        setContactFavorite(false);
        setContactGroupId("");
        hideModal();
    }

    const getAllGroups = () => {
        axios.get("http://localhost:8080/groups")
        .then(res => {
            const groupsList = res.data;
            setGroups(groupsList);
        });
    }

    useEffect(() => {
        getAllGroups();
    }, [contactGroupId, isOpen]);

    useEffect(() => {
        if (isFirstLoad == false) {
           setIsOpen(props.modifyContactModalState);
           getContactById(); 
        }
        setFirstLoad(false);
    }, [props.modifyContactModalState]);

    const changeContactGroupId = (event) => {
        setContactGroupId(event.currentTarget.value);
    }

    const getContactById = () => {
        axios.get("http://localhost:8080/contacts/" + props.contactId)
        .then(res => {
            const contact = res.data;
            setContactData(contact);
        });
    }

    const setContactData = (contact) => {
        setContactId(contact.id);
        setContactName(contact.name);
        setContactFavorite(contact.favorite);
        setContactSurname(contact.surname);
        setContactPhoneNumber(contact.phoneNumber);
        let group = contact.group;
        setContactGroupId(group == null ? "" : group.id);
    }

    const onSubmitModifyForm = (e) => {
        e.preventDefault(); 
        props.onSubmit(contactId, contactName, contactSurname, contactPhoneNumber, contactIsFavorite, contactGroupId);
        resetModal();
    }

    const getGroupName = (groupId, groups) => {
        for(let group of groups) {
            if (group.id == groupId) {
                return group.name;
            }
        }
    }

    return (
       <>
            <Modal show = {isOpen}>
                <div className = "modify-contact-header-title">
                    <Modal.Header>
                        <Modal.Title>Modifica il contatto</Modal.Title>
                        <span className = "modify-close-modal-button" onClick = {resetModal}><FontAwesomeIcon icon = {faTimesCircle} /></span>
                    </Modal.Header>
                </div>
                <Modal.Body>
                    <form className = "modify-contact-form">
                        <div className = "row">
                            <div className = "col-6">
                                <label className = "modify-contact-label" htmlFor = "modify-contact-name">Nome</label>
                                <input id = "modify-contact-name" className = "modify-contact-input" defaultValue = {contactName} onChange = {(e) => {setContactName(e.target.value);}}></input>
                            </div>
                            <div className = "col-6">
                                <label className = "modify-contact-label" htmlFor = "modify-contact-surname">Cognome</label>
                                <input id = "modify-contact-surname" className = "modify-contact-input" defaultValue = {contactSurname} onChange = {(e) => {setContactSurname(e.target.value);}}></input>
                            </div>
                            <div className = "col-6">
                                <label className = "modify-contact-label" htmlFor = "modify-phone-number">Cellulare</label>
                                <input id = "modify-phone-number" className = "modify-contact-input" type = "text" defaultValue = {contactPhoneNumber} onChange = {(e) => {setContactPhoneNumber(e.target.value);}}></input>
                            </div>
                            <div className = "col-6">
                                <label className = "modify-contact-label" htmlFor = "modify-group-select">Gruppo</label>
                                <p>
                                    <select id = "modify-group-select" className = "modify-contact-input" onChange = {(e) => {changeContactGroupId(e);}}> 
                                        <option value = {contactGroupId}>{getGroupName(contactGroupId, groups) == null ? "-- Nessun gruppo --" : getGroupName(contactGroupId, groups)}</option>
                                        {groups.map((group, index) => {
                                            if (group.id != contactGroupId) {
                                                return (
                                                    <option key = {index} value = {group.id}>{group.name}</option>
                                                );
                                            }
                                        })} 
                                        <option className = {getGroupName(contactGroupId, groups) == null ? "modify-no-display" : ""} value={""}>-- Nessun gruppo --</option>
                                    </select>
                                </p>
                            </div>
                            <div className = "col-12">
                                <label className = "modify-contact-label" htmlFor = "modify-favorite">Aggiungi ai preferiti?</label>
                                <p>
                                    <input id = "modify-favorite" type = "checkbox" checked = {contactIsFavorite} onChange = {(e) => {setContactFavorite(e.target.checked);}}></input><span className = "modify-check-phrase">{contactIsFavorite ? `${contactName + " " + contactSurname} è tra i preferiti` : `${contactName + " " + contactSurname} NON non è tra i preferiti`}</span>
                                </p>
                            </div>
                        </div>  
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <button className = "btn modify-contact-save-button" type = "submit" form = "modify-contact-form" onClick={onSubmitModifyForm}>Salva</button>
                </Modal.Footer>
            </Modal>
       </>
    )
}

export default ModifyContactForm;