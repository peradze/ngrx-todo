package com.todo;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class DataLoader implements CommandLineRunner {
    private final TaskRepository taskRepository;

    public DataLoader(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        List<Task> tasks = new ArrayList<>();
        tasks.add(Task.builder().name("Task 1").isComplete(false).build());
        tasks.add(Task.builder().name("Task 2").isComplete(false).build());
        tasks.add(Task.builder().name("Task 3").isComplete(false).build());
        taskRepository.saveAll(tasks);
    }
}
