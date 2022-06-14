import React from "react";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import "./GroupListStyle.css"
import axios from "axios";



function GroupList(props) {

    const deleteGroup = (id) => {
        axios.delete("http://localhost:8080/groups/" + id)
        .then(res => {
            sendDeletedGroup(id)
        });
    }

    const sendDeletedGroup = (id) => {
        props.onSubmitDeletedGroupId(id);
    }
    
    const groupsList = props.groups.map((group, index) => {
         return (
             <div key = {index} className = "col-4">
                <div className = "group-container">
                    <div className = "row">
                        <div className = "col-8">
                            <p className = "group-list-text">{group.name}</p>
                        </div>
                        <div className = "col-1">
                            <button data-id = {group.id} className = "group-delete" onClick = {(e) => {deleteGroup(e.currentTarget.dataset.id);}}><FontAwesomeIcon icon = {faTrash}/></button>
                        </div>
                    </div>
                </div>
            </div>
        );
    })
    
   return (
        <>
            <div className = "row">
                    {groupsList}
            </div>
        </>
    );
}

export default GroupList;