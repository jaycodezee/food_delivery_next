import styles from './styles/Loading.module.css'; 

const LoadingPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.logoContainer}>
        <img src="/favicon.ico" alt="Loading..." className={styles.logo} />
      </div>
      <p className={styles.message}>Loading, please wait...</p>
    </div>
  );
};

export default LoadingPage;