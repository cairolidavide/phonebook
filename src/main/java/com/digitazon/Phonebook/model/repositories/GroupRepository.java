package com.digitazon.Phonebook.model.repositories;

import com.digitazon.Phonebook.model.entities.Contact;
import com.digitazon.Phonebook.model.entities.Group;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface GroupRepository extends JpaRepository<Group, Integer> {
}
