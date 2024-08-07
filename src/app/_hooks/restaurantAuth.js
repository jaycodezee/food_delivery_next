// hooks/useAuth.js
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const useAuth = () => {
    const [authenticated, setAuthenticated] = useState(false);
    const router = useRouter();

    useEffect(() => {
        // const user = Cookies.get("restaurantUser");
        const user = JSON.parse(localStorage.getItem('restaurantUser'));
        if (user) {
            setAuthenticated(true);
        } else {
            setAuthenticated(false);
            router.push('/Restaurant'); 
            // setTimeout(() => {
            //     window.location.reload(false); 
            // }, 500);
        }
    }, [router]);

    return authenticated;
};

export default useAuth;
