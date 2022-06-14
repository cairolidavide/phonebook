package com.digitazon.Phonebook.model.dtos;

import com.digitazon.Phonebook.model.entities.Contact;
import com.digitazon.Phonebook.model.entities.Group;

public class ContactDto {

    private int id;
    private String name;
    private String surname;
    private String phoneNumber;
    private boolean favorite;
    private Integer groupId;
    private String groupName;

    public ContactDto() {
    }

    public ContactDto(int id, String name, String surname, String phoneNumber, boolean favorite, Integer groupId, String groupName) {
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.phoneNumber = phoneNumber;
        this.favorite = favorite;
        this.groupId = groupId;
        this.groupName = groupName;
    }

    public static ContactDto fromContact(Contact contact) {
        Group newGroup = new Group();
        if(contact.getGroup() == null) {
            newGroup.setId(null);
            newGroup.setName("");
        } else {
            newGroup.setId(contact.getGroup().getId());
            newGroup.setName(contact.getGroup().getName());
        }
        return new ContactDto(contact.getId(), contact.getName(), contact.getSurname(), contact.getPhoneNumber(),
                contact.isFavorite(), newGroup.getId(), newGroup.getName());
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public boolean isFavorite() {
        return favorite;
    }

    public void setFavorite(boolean favorite) {
        this.favorite = favorite;
    }

    public Integer getGroupId() {
        return groupId;
    }

    public void setGroupId(Integer groupId) {
        this.groupId = groupId;
    }

    public String getGroupName() {
        return groupName;
    }

    public void setGroupName(String groupName) {
        this.groupName = groupName;
    }
}
