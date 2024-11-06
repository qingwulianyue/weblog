package weblog.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class ProfileController {
    @GetMapping(value = "/profile")
    public String enterProfile(@RequestParam(required = false) String token){
        if (token.equals("home")){
            return "profile";
        }
        return "error";
    }
}
