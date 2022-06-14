package com.digitazon.Phonebook.model.repositories;

import com.digitazon.Phonebook.model.entities.Contact;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ContactRepository extends JpaRepository<Contact, Integer> {
    @Query("select c from Contact c where upper(c.surname) like upper(:surname) order by c.surname asc, c.name asc")
    Page<Contact> findBySurnameLikeOrderByNameAscSurnameAsc(String surname, Pageable pageable);
    @Query("select c from Contact c where upper(c.surname) like upper(:surname) order by c.surname asc, c.name asc")
    List<Contact> findBySurnameLikeOrderByNameAscSurnameAsc(String surname);
    Page<Contact> findAllByOrderByFavoriteDescNameAscSurnameAsc(Pageable pageable);
    @Query("select c from Contact c where c.phoneNumber like :phoneNumber")
    Optional<Contact> findByPhoneNumber(String phoneNumber);
    List<Contact> findByGroupId(int id);
    Page<Contact> findAllByFavoriteTrueOrderByNameAscSurnameAsc(Pageable pageable);
}
