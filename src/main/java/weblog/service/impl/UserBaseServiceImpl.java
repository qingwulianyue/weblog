package weblog.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import weblog.dao.UserBaseMapper;
import weblog.entity.UserBase;
import weblog.service.UserBaseService;

import java.util.List;

@Service
public class UserBaseServiceImpl implements UserBaseService {
    @Autowired
    private UserBaseMapper userBaseMapper;
    @Override
    public List<String> getEmailList() {
        return userBaseMapper.getEmailList();
    }

    @Override
    public List<String> getUsernameList() {
        return userBaseMapper.getUsernameList();
    }

    @Override
    public void addUser(UserBase user) {
        userBaseMapper.insert(user);
    }

    @Override
    public UserBase getUserByUsername(String username) {
        return userBaseMapper.getUserByUsername(username);
    }
}
