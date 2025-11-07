package co.edu.univalle.Repositories;



import co.edu.univalle.Models.UserModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository <UserModel, Long> {
    Optional<UserModel> findByUsername(String username);
}
