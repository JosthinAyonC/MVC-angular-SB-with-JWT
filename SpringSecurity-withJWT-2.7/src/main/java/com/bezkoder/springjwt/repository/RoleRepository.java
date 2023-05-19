package com.bezkoder.springjwt.repository;

import java.util.List;
import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.bezkoder.springjwt.models.Role;

public interface RoleRepository extends JpaRepository<Role, Long> {
  
    @Query("SELECT r FROM Role r ORDER BY r.id ASC")
    public List<Role> findAllRoles();

    @Query("SELECT r FROM Role r WHERE r.name = 'ROLE_USER'")
    public Set<Role> getRoleUser();
}
