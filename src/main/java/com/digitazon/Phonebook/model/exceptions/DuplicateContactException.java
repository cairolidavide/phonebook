package com.digitazon.Phonebook.model.exceptions;

public class DuplicateContactException extends Exception {
    public DuplicateContactException(String message) {
        super(message);
    }
}
