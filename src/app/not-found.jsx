import Link from 'next/link'
import styles from './styles/not-found.module.css';



export default function NotFound() {
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>404</h1>
        <p className={styles.message}>Oops! The page you're looking for doesn't exist.</p>
        <Link href="/" className={styles.homeLink}>Go Back to Home</Link>
      </div>
    );
  };