package com.digitazon.Phonebook.controller;

import com.digitazon.Phonebook.model.dtos.ContactDto;
import com.digitazon.Phonebook.model.entities.Contact;
import com.digitazon.Phonebook.model.entities.Group;
import com.digitazon.Phonebook.model.exceptions.ContactNotFoundException;
import com.digitazon.Phonebook.model.exceptions.DuplicateContactException;
import com.digitazon.Phonebook.model.exceptions.GroupNotFoundException;
import com.digitazon.Phonebook.model.services.abstractions.ContactService;
import com.digitazon.Phonebook.model.services.abstractions.GroupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/contacts")
@CrossOrigin(origins = "*")
public class ContactController {

    @Autowired
    private ContactService contactService;
    @Autowired
    private GroupService groupService;

    @GetMapping
    public ResponseEntity findAllContact(@RequestParam(required = false) String surnameLike,
                                         @RequestParam(defaultValue = "0") Integer pageNo,
                                         @RequestParam(defaultValue = "10") Integer pageSize) {
        List<ContactDto> contacts;
        if (surnameLike == null || surnameLike.equals("")) {
            contacts = contactService.findAllContact(pageNo, pageSize).stream().map(ContactDto::fromContact)
                    .collect(Collectors.toList());
        } else if (surnameLike.length() == 1) {
            contacts = contactService.findByStartSurnameCharacter(surnameLike, pageNo, pageSize);
        } else {
            contacts = contactService.findContactBySurnameLike(surnameLike, pageNo, pageSize);
        }
        return ResponseEntity.ok(contacts);
    }

    @GetMapping("/all")
    public List<Contact> getAllContacts() {
        return contactService.findListOfAllContact();
    }

    @GetMapping("/favorites")
    public ResponseEntity findAllFavoriteContact(@RequestParam(defaultValue = "0") Integer pageNo,
                                                 @RequestParam(defaultValue = "10") Integer pageSize) {
        List<ContactDto> contacts = contactService.findAllFavoriteContact(pageNo, pageSize).stream()
                .map(ContactDto::fromContact).collect(Collectors.toList());
        return ResponseEntity.ok(contacts);
    }

    @GetMapping("/count")
    public int countContact(@RequestParam(required = false) String surnameLike) {
        return contactService.countContact(surnameLike);
    }

    @GetMapping("/{contactId}")
    public ResponseEntity findContactById(@PathVariable int contactId) {
        Contact findContact = contactService.findContactById(contactId);
        return ResponseEntity.ok(findContact);
    }

    @GetMapping("/phone/{contactPhoneNumber}")
    public ResponseEntity findContactByPhoneNumber(@PathVariable String contactPhoneNumber) {
        String message = contactService.findContactByPhoneNumber(contactPhoneNumber);
        return ResponseEntity.ok(message);
    }

    @PostMapping
    public ResponseEntity createNewContact(@RequestBody Contact newContact) {
        try {
            Contact inserted = contactService.insertNewContact(newContact);
            if (newContact.getGroup() != null) {
                Group insertedGroup = groupService.findGroupById(newContact.getGroup().getId());
                inserted.setGroup(insertedGroup);
            }
            return ResponseEntity.ok(inserted);
        } catch (DuplicateContactException | GroupNotFoundException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @DeleteMapping("/{contactId}")
    public ResponseEntity deleteContact(@PathVariable int contactId) {
        try {
            Contact deletedContact = contactService.deleteContact(contactId);
            return ResponseEntity.ok(deletedContact);
        } catch (ContactNotFoundException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PutMapping("{contactId}")
    public ResponseEntity updateContactFavorite(@PathVariable int contactId) {
        try {
            Contact contact = contactService.updateContactFavorite(contactId);
            return ResponseEntity.ok(contact);
        } catch (ContactNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @PutMapping
    public ResponseEntity updateContact(@RequestBody Contact updatedContact) {
        Contact updated = contactService.updateContact(updatedContact);
        return ResponseEntity.ok(updated);
    }
}
