package com.digitazon.Phonebook.model.services.implementations;

import com.digitazon.Phonebook.model.dtos.ContactDto;
import com.digitazon.Phonebook.model.entities.Contact;
import com.digitazon.Phonebook.model.exceptions.ContactNotFoundException;
import com.digitazon.Phonebook.model.exceptions.DuplicateContactException;
import com.digitazon.Phonebook.model.repositories.ContactRepository;
import com.digitazon.Phonebook.model.repositories.GroupRepository;
import com.digitazon.Phonebook.model.services.abstractions.ContactService;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;



import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ContactServiceJpa implements ContactService {

    private ContactRepository contactRepository;
    private GroupRepository groupRepository;

    public ContactServiceJpa(ContactRepository contactRepository, GroupRepository groupRepository) {
        this.contactRepository = contactRepository;
        this.groupRepository = groupRepository;
    }

    @Override
    public List<Contact> findAllContact(Integer pageNo, Integer pageSize) {
        Pageable paging = PageRequest.of(pageNo, pageSize);
        return contactRepository.findAllByOrderByFavoriteDescNameAscSurnameAsc(paging).stream().toList();
    }

    @Override
    public List<Contact> findListOfAllContact() {
        return contactRepository.findAll();
    }

    @Override
    public Contact insertNewContact(Contact newContact) throws DuplicateContactException {
        Optional<Contact> findContactOpt = contactRepository.findByPhoneNumber(newContact.getPhoneNumber());
        if (findContactOpt.isPresent()) {
            throw new DuplicateContactException("esite già un contatto con questo numero di telefono con nome " +
                    findContactOpt.get().getName() + " " + findContactOpt.get().getSurname());
        } else {
            Contact savedContact = contactRepository.save(newContact);
            return savedContact;
        }
    }

    @Override
    public Contact deleteContact(int contactId) throws ContactNotFoundException {
        Optional<Contact> deletedContactOpt = contactRepository.findById(contactId);
        if (deletedContactOpt.isEmpty()) {
            throw new ContactNotFoundException("il contatto con ID " + contactId + " non esiste pertanto non può essere eliminato");
        } else {
            contactRepository.deleteById(contactId);
            return deletedContactOpt.get();
        }
    }

    @Override
    public Contact findContactById(int id) {
        return contactRepository.findById(id).orElseThrow();
    }

    @Override
    public Contact updateContactFavorite(int id) throws ContactNotFoundException {
        Optional<Contact> contact = contactRepository.findById(id);
        if (contact.isPresent()) {
            Contact updatedContact = contact.get();
            updatedContact.setFavorite(!contact.get().isFavorite());
            contactRepository.save(updatedContact);
            return updatedContact;
        } else {
            throw new ContactNotFoundException("Non esiste un contatto con id " + id);
        }
    }

    @Override
    public Contact updateContact(Contact updatedContact) {
        return contactRepository.save(updatedContact);
    }

    @Override
    public List<ContactDto> findContactBySurnameLike(String surname, Integer pageNumber, Integer pageSize) {
        Pageable pageable = PageRequest.of(pageNumber, pageSize);
        String likeSurname = "%" + surname + "%";
        System.out.println(likeSurname);
        List<ContactDto> findContact = contactRepository.findBySurnameLikeOrderByNameAscSurnameAsc(likeSurname, pageable).stream().map(ContactDto::fromContact).collect(Collectors.toList());
        return findContact;
    }

    @Override
    public List<ContactDto> findByStartSurnameCharacter(String character, Integer pageNo, Integer pageSize) {
        Pageable pageable = PageRequest.of(pageNo, pageSize);
        String startCharacter = character + "%";
        List<ContactDto> findContact = contactRepository
                .findBySurnameLikeOrderByNameAscSurnameAsc(startCharacter, pageable).stream()
                .map(ContactDto::fromContact).collect(Collectors.toList());
        return findContact;
    }

    @Override
    public int countContact(String surnameLike) {
        List<Contact> contacts;
        if (surnameLike == null || surnameLike.equals("")) {
            contacts = contactRepository.findAll();
        } else if (surnameLike.length() == 1) {
            contacts = contactRepository.findBySurnameLikeOrderByNameAscSurnameAsc(surnameLike+"%");
        } else {
            contacts = contactRepository.findBySurnameLikeOrderByNameAscSurnameAsc("%" + surnameLike + "%");
        }
        return contacts.size()/10;
    }

    @Override
    public List<Contact> findAllFavoriteContact(Integer pageNo, Integer pageSize) {
        Pageable paging = PageRequest.of(pageNo, pageSize);
        return contactRepository.findAllByFavoriteTrueOrderByNameAscSurnameAsc(paging).stream().toList();
    }

    @Override
    public String findContactByPhoneNumber(String phoneNumber) {
        Optional<Contact> contactOpt = contactRepository.findByPhoneNumber(phoneNumber);
        if(contactOpt.isPresent()) {
            return "Il numero inserito è già presente con nome " + contactOpt.get().getName() + " " + contactOpt.get()
                    .getSurname();
        } else {
            return "";
        }
    }
}
