package com.digitazon.Phonebook.model.services.abstractions;

import com.digitazon.Phonebook.model.entities.Group;
import com.digitazon.Phonebook.model.exceptions.GroupNotFoundException;

import java.util.List;


public interface GroupService {

    List<Group> findAllGroups();
    Group findGroupById(int id) throws GroupNotFoundException;
    Group createNewGroup(Group newGroup);
    Group deleteGroup(int id) throws GroupNotFoundException;
}
