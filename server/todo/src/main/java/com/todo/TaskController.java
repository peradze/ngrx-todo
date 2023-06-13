package com.todo;

import com.todo.dto.TaskCreateDTO;
import com.todo.dto.TaskUpdateDTO;
import org.springframework.beans.BeanUtils;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/tasks")
public class TaskController {
    private final TaskRepository taskRepository;

    public TaskController(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    @GetMapping
    public ResponseEntity<List<Task>> getAll() {
        return ResponseEntity.ok(taskRepository.findAll());
    }

    @GetMapping("/{taskId}")
    public ResponseEntity<Task> getById(@PathVariable Long taskId) {
        if (taskRepository.findById(taskId).isPresent()) {
            return ResponseEntity.ok(taskRepository.findById(taskId).get());
        }

        throw new RuntimeException("Task.ts not found by id: " + taskId);
    }

    @PostMapping()
    public ResponseEntity<Task> save(@RequestBody TaskCreateDTO task) {
        return ResponseEntity.ok(taskRepository.save(Task.builder().name(task.getName()).isComplete(false).build()));
    }

    @PutMapping("/{taskId}")
    public ResponseEntity<Task> update(@PathVariable Long taskId, @RequestBody TaskUpdateDTO task) {
        Optional<Task> taskById = taskRepository.findById(taskId);
        if (taskById.isPresent()) {
            BeanUtils.copyProperties(task, taskById.get());
            Task save = taskRepository.save(taskById.get());
            return ResponseEntity.ok(save);
        }

        throw new RuntimeException("Task.ts not fount by id: " + taskById);
    }

    @DeleteMapping("/{taskId}")
    public ResponseEntity<?> delete(@PathVariable Long taskId) {
        Optional<Task> taskById = taskRepository.findById(taskId);
        if (taskById.isPresent()) {
            taskRepository.deleteById(taskId);
            return ResponseEntity.accepted().build();
        }

        throw new RuntimeException("Task.ts not found by id: " + taskId);
    }
}
