package com.highfive.linkedhu.request;

import lombok.Data;

@Data
public class UserRoleRequest {
    private String username;
    private String roleName;
}