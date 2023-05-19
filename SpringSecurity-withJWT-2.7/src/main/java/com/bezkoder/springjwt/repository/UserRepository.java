package com.bezkoder.springjwt.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.bezkoder.springjwt.models.User;

public interface UserRepository extends JpaRepository<User, Long> {
  Optional<User> findByUsername(String username);

  Boolean existsByUsername(String username);

  Boolean existsByEmail(String email);

  @Modifying
  @Query("UPDATE User u SET u.status = null WHERE u.id = ?1")
  public void deleteById(Long id);

  @Query("SELECT u FROM User u WHERE u.status != null ORDER BY u.id ASC")
  public List<User> findByEstado();
}
