package com.highfive.linkedhu;

import java.util.ArrayList;

import com.highfive.linkedhu.constants.RoleConstants;
import com.highfive.linkedhu.model.Role;
import com.highfive.linkedhu.model.User;
import com.highfive.linkedhu.service.AnnouncementService;
import com.highfive.linkedhu.service.UserService;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@SpringBootApplication
public class LinkedhuApplication {

	public static void main(String[] args) {
		SpringApplication.run(LinkedhuApplication.class, args);
	}

	@Bean
	BCryptPasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	@Bean
	CommandLineRunner run(UserService userService, AnnouncementService announcementService) {
		return args -> {
			try {
				userService.saveRole(new Role(null, RoleConstants.ROLE_ADMIN));
				userService.saveRole(new Role(null, RoleConstants.ROLE_STUDENT));
				userService.saveRole(new Role(null, RoleConstants.ROLE_STUDENT_REP));
				userService.saveRole(new Role(null, RoleConstants.ROLE_GRADUATE));
				userService.saveRole(new Role(null, RoleConstants.ROLE_ACADEMICIAN));

				userService.saveUser(
						new User(null, "admin@hacettepe.edu.tr", "123456", "admin", "All", "Title",
								"Please tell us about yourself", null, true, null, null,
								new ArrayList<>()));
				userService.saveUser(new User(null, "student@hacettepe.edu.tr", "123456", "student", "Computer Science",
						"Title", "Please tell us about yourself", null, true, null, null, new ArrayList<>()));
				userService.saveUser(new User(null, "student_rep@hacettepe.edu.tr", "123456", "student_rep",
						"Computer Science", "Title", "Please tell us about yourself", null, true, null, null,
						new ArrayList<>()));
				userService
						.saveUser(new User(null, "graduate@hacettepe.edu.tr", "123456", "graduate", "Computer Science",
								"Title", "Please tell us about yourself", null, true, null, null, new ArrayList<>()));
				userService.saveUser(new User(null, "academician@hacettepe.edu.tr", "123456", "academician",
						"Computer Science", "Title", "Please tell us about yourself", null, true, null, null,
						new ArrayList<>()));

				userService.addRoleToUser("admin@hacettepe.edu.tr", RoleConstants.ROLE_ADMIN);
				userService.addRoleToUser("student@hacettepe.edu.tr", RoleConstants.ROLE_STUDENT);
				userService.addRoleToUser("student_rep@hacettepe.edu.tr", RoleConstants.ROLE_STUDENT_REP);
				userService.addRoleToUser("graduate@hacettepe.edu.tr", RoleConstants.ROLE_GRADUATE);
				userService.addRoleToUser("academician@hacettepe.edu.tr", RoleConstants.ROLE_ACADEMICIAN);
			} catch (Exception e) {
				System.out.println("Users and roles already created");
			}
		};
	}
}
