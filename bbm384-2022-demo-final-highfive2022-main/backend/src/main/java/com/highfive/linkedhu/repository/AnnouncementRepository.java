package com.highfive.linkedhu.repository;

import java.util.List;

import com.highfive.linkedhu.model.Announcement;
import com.highfive.linkedhu.model.User;

import org.springframework.data.jpa.repository.JpaRepository;

public interface AnnouncementRepository extends JpaRepository<Announcement, Long> {
    List<Announcement> findByOwner(User owner);
}