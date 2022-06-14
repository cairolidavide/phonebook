package com.digitazon.Phonebook.model.services.implementations;

import com.digitazon.Phonebook.model.entities.Contact;
import com.digitazon.Phonebook.model.entities.Group;
import com.digitazon.Phonebook.model.exceptions.GroupNotFoundException;
import com.digitazon.Phonebook.model.repositories.ContactRepository;
import com.digitazon.Phonebook.model.repositories.GroupRepository;
import com.digitazon.Phonebook.model.services.abstractions.GroupService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class GroupServiceJpa implements GroupService {

    private GroupRepository groupRepository;
    private ContactRepository contactRepository;

    public GroupServiceJpa(GroupRepository groupRepository, ContactRepository contactRepository) {
        this.groupRepository = groupRepository;
        this.contactRepository = contactRepository;
    }


    @Override
    public List<Group> findAllGroups() {
        return groupRepository.findAll();
    }

    @Override
    public Group findGroupById(int id) throws GroupNotFoundException {
        Optional<Group> foundGroupOpt = groupRepository.findById(id);
        if (foundGroupOpt.isPresent()) {
            return foundGroupOpt.get();
        } else {
            throw new GroupNotFoundException("Non esiste nessun gruppo con id " + id);
        }
    }

    @Override
    public Group createNewGroup(Group newGroup) {
        return groupRepository.save(newGroup);
    }

    @Override
    public Group deleteGroup(int id) throws GroupNotFoundException {
        Optional<Group> foundGroup = groupRepository.findById(id);
        if(foundGroup.isEmpty()) {
            throw new GroupNotFoundException("Il gruppo con id " + id + " non esiste");
        } else {
            List<Contact> contacts = contactRepository.findByGroupId(id);
            if (!contacts.isEmpty()) {
                for(Contact contact : contacts) {
                    contact.setGroup(null);
                }
            }
            groupRepository.delete(foundGroup.get());
            return foundGroup.get();
        }
    }
}
