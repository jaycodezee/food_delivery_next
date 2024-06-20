
import { signIn } from "../api/auth/[...nextauth]/route"
 
import React from 'react';
import axios from 'axios';
import styles from '../styles/Google.module.css';

const Google = () => {

  return (
    <div className={styles.container}>
      <form className={styles.signinForm} 
      action={async () => {
        // "use server"
        await signIn("google")
      }}>
        <button className={styles.googleSigninBtn} type="submit">
          Sign in with Google
        </button>
      </form>
    </div>
  );
};

export default Google;