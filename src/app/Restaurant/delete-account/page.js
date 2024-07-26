"use client";
import React from "react";
import { useRouter } from "next/navigation";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import styles from "../../styles/DeleteAccount.module.css";
import HomeIcon from '@mui/icons-material/Home';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

function DeleteAccount() {
  const router = useRouter();

  const backtohome =async ()=>{
    router.push('/Restaurant/dashboard')
  }
  
  const handleDelete = async () => {
    if (
      window.confirm(
        "Are you sure you want to delete your account? This action cannot be undone."
      )
    ) {
      try {
        const token = localStorage.getItem("restaurantUser");

        if (!token) {
          alert("Authorization token is missing");
          return;
        }
        const response = await fetch("/api/restaurant", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          // console.log('response', response)
          router.push("/Restaurant");
        } else {
          // Handle error
          const errorData = await response.json();
          alert(`Failed to delete account: ${errorData.message}`);
        }
      } catch (error) {
        console.error("Error deleting :", error);
        alert("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <title>Delete Account</title>
        <h1 className={styles.title}>Delete Account</h1>
        <IconButton
          aria-label="delete"
          size="large"
          className={styles.iconButton}
          onClick={handleDelete}
        >
          <DeleteIcon />
        </IconButton>
        <br/>
        <IconButton
          aria-label="delete"
          size="large"
          onClick={backtohome}
        >
          <HomeIcon fontSize="large"/>
          <KeyboardBackspaceIcon fontSize="large"/>
        </IconButton>
        
      </div>
    </div>
  );
}

export default DeleteAccount;
