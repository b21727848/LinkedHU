package com.highfive.linkedhu.repository;

import java.util.List;

import com.highfive.linkedhu.model.Like;
import com.highfive.linkedhu.model.Post;
import com.highfive.linkedhu.model.User;

import org.springframework.data.jpa.repository.JpaRepository;

public interface LikeRepository extends JpaRepository<Like, Long> {
    List<Like> findByPost(Post post);

    List<Like> findByOwner(User owner);
}