package com.highfive.linkedhu.repository;

import com.highfive.linkedhu.model.User;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByUsername(String username);

    Page<User> findByNameContains(String name, Pageable pageable);
}
