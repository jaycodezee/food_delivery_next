// hooks/useAuth.js
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const deliveryAuth = () => {
    const [authenticated, setAuthenticated] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('deliveryBoy'));
        if (user) {
            setAuthenticated(true);
        } else {
            setAuthenticated(false);
            router.push('/deliverypartner'); 
            // setTimeout(() => {
            //     window.location.reload(false); 
            // }, 500);
        }
    }, [router]);

    return authenticated;
};

export default deliveryAuth;
