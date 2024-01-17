package com.highfive.linkedhu.repository;

import com.highfive.linkedhu.model.Complaint;
import com.highfive.linkedhu.model.Post;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ComplaintRepository extends JpaRepository<Complaint, Long> {
    Complaint findByPost(Post post);
}