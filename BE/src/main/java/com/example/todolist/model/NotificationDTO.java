package com.example.todolist.model;

public class NotificationDTO {
    private Long id;
    private String message;
    private String title;
    private String type;
    private int isRead;
    public NotificationDTO(Long id, String message, String title, String type, int isRead) {
        this.id = id;
        this.message = message;
        this.title = title;
        this.type = type;
        this.isRead = isRead;
    }

    public Long getId() {
        return id;
    }

    public String getMessage() {
        return message;
    }

    public String getTitle() {
        return title;
    }

    public String getType() {
        return type;
    }

    public int getIsRead() {
        return isRead;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setType(String type) {
        this.type = type;
    }

    public void setIsRead(int isRead) {
        this.isRead = isRead;
    }
}
