package com.digitazon.Phonebook.model.exceptions;

public class ContactNotFoundException extends Exception {
    public ContactNotFoundException(String message) {
        super(message);
    }
}
