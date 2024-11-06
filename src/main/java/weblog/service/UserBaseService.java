package weblog.service;

import weblog.entity.UserBase;

import java.util.List;

public interface UserBaseService {
    List<String> getEmailList();
    List<String> getUsernameList();
    void addUser(UserBase user);
    UserBase getUserByUsername(String username);
}
