package com.highfive.linkedhu.request;

import lombok.Data;

@Data
public class CreateMessageRequest {
    String receiver;
    String message;
}
