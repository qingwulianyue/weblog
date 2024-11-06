package weblog.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import weblog.entity.UserBase;
import weblog.service.UserBaseService;

import java.util.HashMap;
import java.util.List;

@Controller
public class LoginController {
    @Autowired
    private UserBaseService userBaseService;
    @GetMapping(value = "/login")
    public String enterLogin(){
        return "login";
    }
    @PostMapping(value = "/login_submit")
    @ResponseBody
    public HashMap<String,Object> loginResponse(@RequestParam HashMap<String,Object> input){
        HashMap<String,Object> result = new HashMap<>();
        if (input.get("initiator").equals("registerBtn"))
            return registerBtnResponse();
        if (input.get("initiator").equals("username"))
            return usernameResponse((String) input.get("username"));
        if (input.get("initiator").equals("loginBtn"))
            return loginBtnResponse((String) input.get("username"),(String) input.get("password"));
        result.put("result","error");
        return result;
    }
    private HashMap<String,Object> registerBtnResponse(){
        HashMap<String,Object> result = new HashMap<>();
        result.put("result","redirect");
        result.put("url","/register?token=login");
        return result;
    }
    private HashMap<String,Object> usernameResponse(String username){
        HashMap<String,Object> result = new HashMap<>();
        List<String> usernameList = userBaseService.getUsernameList();
        if (usernameList != null && !usernameList.isEmpty() && usernameList.contains(username))
            result.put("result","success");
        else
            result.put("result","failure");
        return result;
    }
    private HashMap<String,Object> loginBtnResponse(String username,String password){
        HashMap<String,Object> result = new HashMap<>();
        UserBase userBase = userBaseService.getUserByUsername(username);
        if (userBase.getPassword().equals(password)){
            result.put("result","success");
            result.put("url","/home?token=login");
        }
        else
            result.put("result","failure");
        return result;
    }
}
