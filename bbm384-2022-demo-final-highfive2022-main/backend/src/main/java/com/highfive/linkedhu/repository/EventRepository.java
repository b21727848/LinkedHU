package com.highfive.linkedhu.repository;

import java.util.List;

import com.highfive.linkedhu.model.Event;
import com.highfive.linkedhu.model.User;

import org.springframework.data.jpa.repository.JpaRepository;

public interface EventRepository extends JpaRepository<Event, Long> {
    List<Event> findByOwner(User owner);
}