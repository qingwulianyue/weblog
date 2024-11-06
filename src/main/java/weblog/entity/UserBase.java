package weblog.entity;

import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@TableName("user_base")
public class UserBase {
    private int id;
    private String username;
    private String email;
    private String password;

    public UserBase(String username, String email, String password) {
        this.username = username;
        this.email = email;
        this.password = password;
    }
}

