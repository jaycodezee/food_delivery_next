'use client'
import { useRouter } from 'next/navigation';
import styles from './styles/not-found.module.css';
import Image from 'next/image';


export default function NotFound() {
  const router = useRouter();

  const handleGoHome = () => {
    router.push('/');
  };

  return (
    <div className={styles.container}>
      <Image 
        src="/error.png" 
        alt="Not Found" 
        width={1000} 
        height={700} 
      />
      <button onClick={handleGoHome} className={styles.button}>
        Go to Home 
      </button>
    </div>
  );
  };