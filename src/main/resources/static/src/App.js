import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import axios from 'axios';
import Heading from './components/Heading';
import SearchBarContact from './components/SearchBarContact';
import ContactList from './components/ContactList';
import AddContactForm from './components/AddContactForm';
import ModifyContactForm from './components/ModifyContactForm';
import AddGroupForm from './components/AddGroupForm';


function App() {
  const [newContact, setNewContact] = useState([]);
  const [addContactModalState , setAddContactModalState] = useState(false);
  const [contactId, setContactId] = useState(0);
  const [modifyContactModalState, setModifyContactModalState] = useState(false);
  const [updatedContact, setUpdatedContact] = useState({})
  const [contactSurname, setContactSurname] = useState("");
  const [pageFor, setPageFor] = useState("");
  const [groupModalState, setGroupModalState] = useState(false);
  const [deletedGroupId, setDeleteGropupId] = useState(0);



  
  const searchContactBySurname = (contactSurname, pageForSurnameSearch) => {
    setContactSurname(contactSurname);
    console.log("App" +pageForSurnameSearch);
    setPageFor(pageForSurnameSearch);
  }

  const setReturnedPageForState = (returnedPageFor) => {
    setPageFor(returnedPageFor);
  }

  const setDeletedGroupIdInApp = (id) => {
    setDeleteGropupId(id);
  }

  const addNewContact = (contactName, contactSurname, contactPhoneNumber, contactIsFavorite, contactGroup) => {
    let contact = {};
    if (Array.isArray(contactGroup)) {
      contact = {
        name: contactName,
        surname: contactSurname,
        phoneNumber: contactPhoneNumber,
        favorite: contactIsFavorite
      }
    } else {
      contact = {
        name: contactName,
        surname: contactSurname,
        phoneNumber: contactPhoneNumber,
        favorite: contactIsFavorite,
        group: {
          id: contactGroup
        }
      }
    }
    axios.post("http://localhost:8080/contacts", contact)
    .then(res => {
      const insertedContact = res.data;
      setNewContact(insertedContact);
    });
  }

  const changeAddContactModalState = (modalState) => {
    setAddContactModalState(modalState);
  }


  const setContactIdState = (id) => {
    setContactId(id);
  }

  const changeModifyModalState = (modifyModalState) => {
    setModifyContactModalState(modifyModalState);
  }

  const changeGroupModalSate = (gmState) => {
    setGroupModalState(gmState);
  }

  const updateContact = (contactId, contactName, contactSurname, contactPhoneNumber, contactIsFavorite, contactGroup) => {
    let contact = {};
    if (contactGroup == "") {
        contact = {
          id: contactId,
          name: contactName,
          surname: contactSurname,
          phoneNumber: contactPhoneNumber,
          favorite: contactIsFavorite
      }
    } else {
      contact = {
        id: contactId,
        name: contactName,
        surname: contactSurname,
        phoneNumber: contactPhoneNumber,
        favorite: contactIsFavorite,
        group: {
          id: contactGroup
        }
      }
    }
    axios.put("http://localhost:8080/contacts", contact)
    .then(res => {
      const insertedContact = res.data;
      setUpdatedContact(insertedContact);
    });
  }

  return (
    <div className = "App">
      <div id = "app-container" className = "container">
        <div className = "header">
          <Heading/>
          <SearchBarContact onSubmit = {searchContactBySurname} onShowAddModal = {changeAddContactModalState} onShowGroupModal = {changeGroupModalSate}/>
        </div>
          <AddContactForm onSubmit = {addNewContact} addContactModalState = {addContactModalState}/>
          <ModifyContactForm onSubmit = {updateContact} contactId = {contactId} modifyContactModalState = {modifyContactModalState}/>
          <AddGroupForm groupModalState = {groupModalState} onSubmitBackGroupModalState = {changeGroupModalSate} onSubmitToAppDeletedGroupId = {setDeletedGroupIdInApp}/>
          <ContactList newContact = {newContact} updatedContact = {updatedContact} contactSurname = {contactSurname} pageFor = {pageFor} onSubmitContactId = {setContactIdState} onSubmitModifyModalState = {changeModifyModalState} onSubmitPageForState = {setReturnedPageForState} deletedGroupId = {deletedGroupId}/>
      </div>
        
    </div>
  );
}

export default App;
