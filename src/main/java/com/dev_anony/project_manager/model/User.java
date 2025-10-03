package com.dev_anony.project_manager.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;

@Entity
@Table(name = "users")
public class User {
    

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String email;

    //Constructor
    public User() {}

    public User(String name, String email){
        this.name = name;
        this.email = email;
    }

    //getters & setters
    public Long getID() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name){
        this.name = name;
    }    

    public String getEmail(){
        return email;
    }

    public void setEmail(String email){
        this.email = email;
    }
}
