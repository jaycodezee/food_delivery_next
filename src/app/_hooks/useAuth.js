// hooks/useAuth.js
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

const useAuth = () => {
    const [authenticated, setAuthenticated] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const user = Cookies.get("restaurantUser");
        if (user) {
            setAuthenticated(true);
        } else {
            setAuthenticated(false);
            router.push('/Restaurant'); // Redirect to login page
        }
    }, [router]);

    return authenticated;
};

export default useAuth;
