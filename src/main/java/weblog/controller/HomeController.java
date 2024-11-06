package weblog.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import weblog.service.UserBaseService;

@Controller
public class HomeController {
    @GetMapping(value = "/home")
    public String enterLogin(@RequestParam(required = false) String token){
        if (token.equals("login")){
            return "home";
        }
        return "error";
    }
}
