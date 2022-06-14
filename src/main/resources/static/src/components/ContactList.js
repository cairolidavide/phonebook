import React, {useState, useEffect} from "react";
import './ContactListStyle.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPenToSquare, faStar, faUserFriends} from  '@fortawesome/free-solid-svg-icons';
import {faTrash} from '@fortawesome/free-solid-svg-icons';
import axios from "axios";



function ContactList(props) {
    const [listOfContacts, setContacts] = useState([]);
    const [isFirstLoad, setFirstLoad] = useState(true);
    const [isHiddenBackRow, setHiddenBackRow] = useState("no-display");
    const [modifyModalState, setModifyModalState] = useState([]);
    const [pageNo, setPageNo] = useState(0);
    const [numberOfContactPage, setNumberOfContactPage] = useState(0);
    const [surnameLike, setSurnameLike] = useState("");
    const [pageFor, setPageFor] = useState("all");
    const [hiddenCharSearch, setHiddenCharSearch] = useState("");
    const [deletedContact, setDeletedContact] = useState({});
    const [updatedContact, setUpdatedContact] = useState({});


   

    useEffect( () => {
        loadContactForAllPageFor();
    } ,  [props.newContact, props.updatedContact, pageNo, deletedContact, updatedContact]);

    useEffect(() => {
        countContact(surnameLike);
        props.onSubmitPageForState("returned");
    }, [listOfContacts, pageFor]);

    useEffect(() => {
        if (props.deletedGroupId != 0) {
            let counter = 0;
            for (let contact of listOfContacts) {
                if (contact.groupId == props.deletedGroupId) {
                    counter ++;
                }
            }
            if (counter > 0) {
                loadContactForAllPageFor();
            }
        }
    }, [props.deletedGroupId]);

    useEffect(() => {
        if(!isFirstLoad) {
            setPageNo(0);
            if (props.contactSurname != "") {
                setPageFor("surname");
                setSurnameLike(props.contactSurname);
                setHiddenCharSearch("no-display");
                loadContactForAllPageFor()
            } else {
                loadContactList();
                setPageFor("all");
                setPageNo(0);
                setSurnameLike("");
                setHiddenCharSearch("");
            }
        } else {
            setFirstLoad(false);
        }
    }, [props.pageFor])

    const loadContactForAllPageFor = () => {
        if (pageFor == "all") {
            loadContactList();
        } else if (pageFor == "char") {
            searchContactBySurnameFirstCharacter(surnameLike);
        } else if (pageFor == "surname") {
            if (props.contactSurname != "") {
                searchByContactSurname();
            }
        }
    }

    const loadContactList = () => {
        axios.get("http://localhost:8080/contacts?pageNo=" + pageNo)
        .then(res => {
            const contactsList = res.data;
            setContacts(contactsList);
        });
    }

    const searchByContactSurname = () => {
        axios.get(`http://localhost:8080/contacts?surnameLike=${props.contactSurname}&pageNo=${pageNo}`)
        .then(res => {
            const contactsList = res.data;
            setSurnameLike(props.contactSurname);
            setContacts(contactsList);
        });
    }

    const deleteContact = (e) => {
        axios.delete(`http://localhost:8080/contacts/${e.currentTarget.dataset.id}`)
        .then(res => {
            const deletedContact = res.data;
            setDeletedContact(deletedContact);
        });
    }

    const setFavorite = (e) => {
        axios.put(`http://localhost:8080/contacts/${e.currentTarget.dataset.id}`)
        .then(res => {
            const updateContact = res.data;
            setUpdatedContact(updateContact);
        });
    }

    const countContact = (surnameLike) => {
        if (surnameLike == null) {
            surnameLike = "";
        }
        axios.get("http://localhost:8080/contacts/count?surnameLike=" + surnameLike)
        .then(res => {
            setNumberOfContactPage(res.data);
        });
    }

    const searchContactBySurnameFirstCharacter = (character) => {
        if (character != "*") {
            if (character == "" ) {
                setHiddenBackRow("no-display");
                setPageFor("all");
            } else {
                setHiddenBackRow("");
            }
             axios.get(`http://localhost:8080/contacts?surnameLike=${character}&pageNo=${pageNo}`)
             .then(res => {
                 const contactsList = res.data;
                 setContacts(contactsList);
             });
        } else {
            setHiddenBackRow("");
            axios.get(`http://localhost:8080/contacts/favorites?pageNo=${pageNo}`)
            .then(res => {
                const contactsList = res.data;
                setContacts(contactsList);
            });
        }
    }

    const sendContactId = (id) => {
        props.onSubmitContactId(id);
        sendModifyModalState();
    }

    const setModalState = () => {
        setModifyModalState(true);
        sendModifyModalState();
    }

    const sendModifyModalState = () => {
        props.onSubmitModifyModalState(modifyModalState);
        setModifyModalState([]);
    }

    function pageModifier(e) {
        if (e.target.value == "pre") {
            setPageNo(pageNo-1);
        } else {
            setPageNo(pageNo+1);
        }
    }

    const contactsList = listOfContacts.map((contact, index) => {
        return (
            <div key = {index}>
                <div className = "contact-container">
                    <div className = "row contact-line">
                        <div id = "inital-of-name-col" className = "col-3">
                            <div className = "initial-of-name-container">
                                <p className = "initial-of-name"><span>{contact.name.charAt(0) + contact.surname.charAt(0)}</span></p>
                            </div>
                        </div>
                        <div className = "col-5">
                             <p className = "contact-name">
                                {contact.name} {contact.surname}
                             </p>
                             <p className = "contact-phone">{contact.phoneNumber}</p>
                             <p className = {contact.groupName == "" ? "hidden" : "group-name"}><FontAwesomeIcon icon = {faUserFriends} /><span className = "group-name-text">{contact.groupName}</span></p>  
                        </div>
                        <div className = "col-1 contact-button">
                            <div className = "update-contact-container">
                                <button className = "update-contact-button" data-id = {contact.id} onClick = {(e) => {sendContactId(e.currentTarget.dataset.id); setModalState();}}><FontAwesomeIcon icon = {faPenToSquare}/></button>
                            </div>
                        </div>
                        <div className = "col-1 contact-button">
                            <div className = "delete-container">
                                <button className = "delete-contact" data-id = {contact.id} onClick = {deleteContact}><FontAwesomeIcon icon = {faTrash}/></button>
                            </div>
                        </div>
                        <div className = "col-1 contact-button">
                            <div className = "favorite-container">
                                <button className = {contact.favorite ? "favorite-active" : "favorite"} data-id = {contact.id} onClick = {setFavorite} ><FontAwesomeIcon icon = {faStar} /></button>
                            </div>
                        </div>
                    </div>  
                </div>
            </div>
        );
    })

    const alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
    const alphabetList = alphabet.map((char, index) => {
        return (
            <p key = {index} data-character = {char} className = {surnameLike == char ? "bold-char" : ""}>{char.toLocaleUpperCase()}</p>
        );
    })

    return (
        <div className = "contact-list-container">
            <div className = "row m-0">
                <div className = {hiddenCharSearch == "no-display" ? "col-12" : "col-10"}>
                    <p className = "list-title">I tuoi contatti:</p>
                    {contactsList}
                    <p className = {listOfContacts.length == 0 ? "no-contact-message" : "no-display"}>Non ci sono contatti</p>
                </div>
                <div className = {"col-2 " + hiddenCharSearch}>
                    <div className = "alphabet-search" onClick = {(e) => {searchContactBySurnameFirstCharacter(e.target.dataset.character); setPageFor("char"); setPageNo(0); setSurnameLike(e.target.dataset.character); window.scrollTo({ top: 0, behavior: 'smooth' });}}>
                        <p data-character = "" id = "back-row" className = {isHiddenBackRow}>←</p>
                        <p data-character = "*" id = "star-search" className = {surnameLike == "*" ? "bold-char yellow-star" : ""}>★</p>
                        {alphabetList}
                    </div>
                </div>
            </div>  
            <div className = "button-container">
                <button className = {listOfContacts.length == 0 || pageNo == 0 ? "hidden" : "button-pre"} value = "pre" onClick = {(e) => {e.preventDefault(); pageModifier(e); window.scrollTo({ top: 0, behavior: 'smooth'});}}>ᐸ</button>
                <span className = {numberOfContactPage == 0 ? "no-display" : "page-position"}>{pageNo + 1} - {numberOfContactPage + 1}</span>
                <button className = {listOfContacts.length == 0 || pageNo == numberOfContactPage ? "hidden" : "button-post"} onClick = {(e) => {e.preventDefault(); pageModifier(e); window.scrollTo({ top: 0, behavior: 'smooth'});}}>ᐳ</button>
            </div>
        </div>
    )
}

export default ContactList;
    
        
    
