// src/app/_component/google.js


// import React from 'react';
// import { signIn } from '../auth';

// const GoogleSignInButton = () => {
//     const handleGoogleSignIn = async (e) => {
//         e.preventDefault();
//        return await signIn('google');
//     };

//     return (
//         <div>
//             <form onSubmit={handleGoogleSignIn}>
//                 <button type="submit">Sign up with Google</button>
//             </form>
//         </div>
//     );
// };

// export default GoogleSignInButton;



// import { signIn } from "@/app/auth"
 
import React from 'react';
import axios from 'axios';
import styles from '../styles/Google.module.css';

const Google = () => {
  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/signin');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.signinForm}>
        <button className={styles.googleSigninBtn} type="submit" onClick={handleGoogleSignIn}>
          Sign in with Google
        </button>
      </form>
    </div>
  );
};

export default Google;