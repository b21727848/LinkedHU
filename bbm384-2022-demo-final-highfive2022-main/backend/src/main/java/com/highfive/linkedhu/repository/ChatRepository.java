package com.highfive.linkedhu.repository;

import java.util.List;

import com.highfive.linkedhu.model.Chat;
import com.highfive.linkedhu.model.User;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ChatRepository extends JpaRepository<Chat, Long> {
    List<Chat> findBySenderAndReceiver(User sender, User receiver);

    List<Chat> findBySender(User sender);

    List<Chat> findByReceiver(User receiver);
}