package com.highfive.linkedhu.repository;

import java.util.List;

import com.highfive.linkedhu.model.Comment;
import com.highfive.linkedhu.model.Post;
import com.highfive.linkedhu.model.User;

import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findByPost(Post post);

    List<Comment> findByOwner(User owner);
}