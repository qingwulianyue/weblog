package weblog.dao;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import weblog.entity.UserBase;

import java.util.List;

public interface UserBaseMapper extends BaseMapper<UserBase> {
    List<String> getEmailList();
    List<String> getUsernameList();
    UserBase getUserByUsername(String username);
}
