package co.edu.univalle.Controllers;

import co.edu.univalle.Auth.AuthResponse;
import co.edu.univalle.Auth.LoginRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/auth")
@RequiredArgsConstructor
public class AuthController {
    @PostMapping(path = "/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request){
        return ResponseEntity.ok(new AuthResponse());
    }
    @PostMapping(path = "/register")
    public String register(){
        return "Aqui va el registro";
    }
}
