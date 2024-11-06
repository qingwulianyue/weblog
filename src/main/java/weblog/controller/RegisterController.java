package weblog.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import weblog.entity.UserBase;
import weblog.service.UserBaseService;

import java.util.HashMap;
import java.util.List;

@Controller
public class RegisterController {
    @Autowired
    private UserBaseService userBaseService;
    @GetMapping(value = "/register")
    public String enterRegister(@RequestParam(required = false) String token){
        if (token.equals("login")){
            return "register";
        }
        return "error";
    }
    @PostMapping(value = "/register_submit")
    @ResponseBody
    public HashMap<String,Object> registerResponse(@RequestParam HashMap<String,Object> input){
        HashMap<String,Object> result = new HashMap<>();
        if (input.get("initiator").equals("loginBtn"))
            return loginBtnResponse();
        else if (input.get("initiator").equals("email"))
            return emailResponse((String) input.get("email"));
        else if (input.get("initiator").equals("username"))
            return usernameResponse((String) input.get("username"));
        else if (input.get("initiator").equals("registerBtn"))
            return registerResponse((String) input.get("username"), (String) input.get("email"), (String) input.get("password"));
        result.put("result","error");
        return result;
    }
    private HashMap<String,Object> loginBtnResponse(){
        HashMap<String,Object> result = new HashMap<>();
        result.put("result","redirect");
        result.put("url","/login");
        return result;
    }
    private HashMap<String,Object> emailResponse(String email){
        HashMap<String,Object> result = new HashMap<>();
        List<String> emailList = userBaseService.getEmailList();
        if (emailList != null && !emailList.isEmpty() && emailList.contains(email)){
            result.put("result","failure");
        } else
            result.put("result","success");
        return result;
    }
    private HashMap<String,Object> usernameResponse(String name){
        HashMap<String,Object> result = new HashMap<>();
        List<String> nameList = userBaseService.getUsernameList();
        if (nameList != null && !nameList.isEmpty() && nameList.contains(name)){
            result.put("result","failure");
        } else
            result.put("result","success");
        return result;
    }
    private HashMap<String,Object> registerResponse(String name,String email,String password){
        HashMap<String,Object> result = new HashMap<>();
        UserBase user = new UserBase(name,email,password);
        userBaseService.addUser(user);
        result.put("result","success");
        result.put("url","/login");
        return result;
    }
}
