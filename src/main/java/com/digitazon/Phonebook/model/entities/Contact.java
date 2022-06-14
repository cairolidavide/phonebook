package com.digitazon.Phonebook.model.entities;

import javax.persistence.*;

@Entity
@Table(name = "contacts")
public class Contact {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "contact_generator")
    @SequenceGenerator(name = "contact_generator", sequenceName = "contacts_id_seq",
            allocationSize = 1)
    private int id;
    private String name;
    private String surname;
    @Column(name = "phone_number")
    private String phoneNumber;
    private boolean favorite;
    @ManyToOne
    @JoinColumn(name = "group_id")
    private Group group;

    public Contact() {
    }

    public Contact(int id, String name, String surname, String phoneNumber, boolean favorite, Group group) {
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.phoneNumber = phoneNumber;
        this.favorite = favorite;
        this.group = group;
    }

    public Group getGroup() {
        return group;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public boolean isFavorite() {
        return favorite;
    }

    public void setFavorite(boolean favorite) {
        this.favorite = favorite;
    }

    public void setGroup(Group group) {
        this.group = group;
    }

    @Override
    public String toString() {
        return "Contact{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", surname='" + surname + '\'' +
                ", phoneNumber='" + phoneNumber + '\'' +
                ", favorite=" + favorite +
                ", group=" + group +
                '}';
    }
}
