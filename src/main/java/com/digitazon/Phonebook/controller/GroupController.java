package com.digitazon.Phonebook.controller;

import com.digitazon.Phonebook.model.entities.Group;
import com.digitazon.Phonebook.model.exceptions.GroupNotFoundException;
import com.digitazon.Phonebook.model.services.abstractions.GroupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/groups")
@CrossOrigin(origins = "*")
public class GroupController {

    @Autowired
    private GroupService groupService;

    @GetMapping
    public ResponseEntity findAllGroups() {
        List<Group> groups = groupService.findAllGroups();
        return ResponseEntity.ok(groups);
    }

    @PostMapping
    public ResponseEntity addGroup (@RequestBody Group newGroup) {
        Group inserted = groupService.createNewGroup(newGroup);
        return ResponseEntity.ok(inserted);
    }

    @DeleteMapping("{id}")
    public ResponseEntity deleteGroup(@PathVariable int id) {
        try {
            Group deletedGroup = groupService.deleteGroup(id);
            return ResponseEntity.ok(deletedGroup);
        } catch (GroupNotFoundException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
}
