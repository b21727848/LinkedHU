package com.highfive.linkedhu.repository;

import java.util.List;

import com.highfive.linkedhu.model.Post;
import com.highfive.linkedhu.model.User;

import org.springframework.data.jpa.repository.JpaRepository;

public interface PostRepository extends JpaRepository<Post, Long> {
    List<Post> findByOwner(User owner);
}