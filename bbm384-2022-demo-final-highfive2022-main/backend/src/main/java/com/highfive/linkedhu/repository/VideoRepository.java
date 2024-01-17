package com.highfive.linkedhu.repository;

import java.util.List;

import com.highfive.linkedhu.model.User;
import com.highfive.linkedhu.model.Video;

import org.springframework.data.jpa.repository.JpaRepository;

public interface VideoRepository extends JpaRepository<Video, Long> {
    List<Video> findByOwner(User owner);
}