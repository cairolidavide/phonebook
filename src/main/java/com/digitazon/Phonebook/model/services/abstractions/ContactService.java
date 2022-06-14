package com.digitazon.Phonebook.model.services.abstractions;

import com.digitazon.Phonebook.model.dtos.ContactDto;
import com.digitazon.Phonebook.model.entities.Contact;
import com.digitazon.Phonebook.model.exceptions.ContactNotFoundException;
import com.digitazon.Phonebook.model.exceptions.DuplicateContactException;


import java.util.List;

public interface ContactService {

    List<Contact> findAllContact(Integer pageNo, Integer pageSize);
    List<Contact> findListOfAllContact();
    Contact insertNewContact(Contact newContact) throws DuplicateContactException;
    Contact deleteContact(int contactId) throws ContactNotFoundException;
    Contact findContactById(int id);
    Contact updateContactFavorite(int id) throws ContactNotFoundException;
    Contact updateContact(Contact updatedContact);
    List<ContactDto> findContactBySurnameLike(String surname, Integer pageNo, Integer pageSize);
    String findContactByPhoneNumber(String phoneNumber);
    List<ContactDto> findByStartSurnameCharacter(String character, Integer pageNo, Integer pageSize);
    int countContact(String surnameLike);
    List<Contact> findAllFavoriteContact(Integer pageNo, Integer pageSize);
}
