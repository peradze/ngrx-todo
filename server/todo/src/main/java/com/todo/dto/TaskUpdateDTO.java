package com.todo.dto;

import lombok.Data;

@Data
public class TaskUpdateDTO {
    private String name;
    private Boolean isComplete;
}
