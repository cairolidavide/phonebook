import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import "./AddGroupFormStyle.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import GroupList from "./GroupList";

function AddGroupForm(props) {

    const [groups, setGroups] = useState([]);
    const [groupName, setGroupName] = useState("");
    const [deletedGroupId, setDeletedGroupId] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const [savedGroup, setSavedGroup] = useState({});



    
    useEffect(() => {
        getAllGroups();
        if(deletedGroupId != 0) {
            props.onSubmitToAppDeletedGroupId(deletedGroupId);
        }
    }, [deletedGroupId, savedGroup]);

    useEffect(() => {
        if (props.groupModalState) {
            setIsOpen(props.groupModalState);
            props.onSubmitBackGroupModalState(false);
        }
    }, [props.groupModalState]);

    const getAllGroups = () => {
        axios.get("http://localhost:8080/groups")
        .then(res => {
            const groupsList = res.data;
            setGroups(groupsList);
        });
    }

    const setDeletedGroup = (id) => {
        setDeletedGroupId(id);
    }

    const saveNewGroup = () => {
        const newGroup = {
            name: groupName
        }
        axios.post("http://localhost:8080/groups", newGroup)
        .then(res => {
            const addedGroup = res.data;
            setSavedGroup(addedGroup)
        });
    }

    return (
        <>
            <Modal show = {isOpen}>
                <div className = "group-header-title">
                    <Modal.Header>
                        <Modal.Title>Aggiungi/Elimina un gruppo</Modal.Title>
                        <span className = "close-group-modal-button" onClick = {() => {setIsOpen(false);}}><FontAwesomeIcon icon = {faTimesCircle} /></span>
                    </Modal.Header>
                </div>
                <Modal.Body>
                    <p className = "all-groups-title">I tuoi gruppi:</p>
                    <GroupList groups = {groups} onSubmitDeletedGroupId = {setDeletedGroup}/>
                    <hr className = "separate-row"/>
                    <p id = "add-group-title">Aggiungi un nuovo gruppo:</p>
                    <form className = "add-group-form">
                        <label id = "new-group-name-label" htmlFor = "new-group-name">Nome:</label>
                        <input id = "new-group-name" type = "text" value = {groupName} maxLength = "10" onChange = {(e) => {setGroupName(e.target.value);}}></input>
                        <span id = "maxlength-text">max 10 caratteri</span>
                        <div className = "save-category-button-container">
                            <button type = "submit" className = {groupName == "" ? "btn unclickable" : "btn btn-secondary save-category-button"} onClick = {(e) => {e.preventDefault(); saveNewGroup(); setGroupName("");}}>Salva</button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default AddGroupForm;