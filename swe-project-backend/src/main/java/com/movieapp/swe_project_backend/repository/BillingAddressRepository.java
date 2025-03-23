package com.movieapp.swe_project_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

import com.movieapp.swe_project_backend.model.BillingAddress;

@Repository
public interface BillingAddressRepository extends JpaRepository<BillingAddress, Integer> {
    @Query("SELECT b FROM BillingAddress b WHERE b.userID.userID = :userID")
    List<BillingAddress> findBillingAddressesByUserID(@Param("userID") int userID);
}
