package com.highfive.linkedhu.repository;

import java.util.List;

import com.highfive.linkedhu.model.Meeting;
import com.highfive.linkedhu.model.User;

import org.springframework.data.jpa.repository.JpaRepository;

public interface MeetingRepository extends JpaRepository<Meeting, Long> {
    List<Meeting> findByOwner(User owner);
}