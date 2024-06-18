// src/app/_component/google.js

import React from 'react';
import { signIn } from 'next-auth/react';

const GoogleSignInButton = () => {
    const handleGoogleSignIn = async (e) => {
        e.preventDefault();
        await signIn('google');
    };

    return (
        <div>
            <form onSubmit={handleGoogleSignIn}>
                <button type="submit">Sign up with Google</button>
            </form>
        </div>
    );
};

export default GoogleSignInButton;
