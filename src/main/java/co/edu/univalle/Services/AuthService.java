package co.edu.univalle.Services;

import co.edu.univalle.DTO.AuthResponse;
import co.edu.univalle.DTO.LoginRequest;
import co.edu.univalle.Models.UserModel;
import co.edu.univalle.Repositories.UserRepository;
import co.edu.univalle.Security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthResponse login(LoginRequest request) {
        // Intentar autenticar con Spring Security
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsername(),
                        request.getPassword()
                )
        );

        // Obtener detalles del usuario autenticado
        UserDetails user = (UserDetails) authentication.getPrincipal();

        // Generar token JWT
        String token = jwtService.generateToken(user);

        return new AuthResponse(token);
    }

    public String register(UserModel user) {
        if (userRepository.findByUsername(user.getUsername()).isPresent()) {
            return "El usuario ya existe";
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);

        return "Usuario registrado con éxito";
    }


}
