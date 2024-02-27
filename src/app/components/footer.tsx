import styles from '@/app/styles/footer.module.css'

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <p>Copyright © 2021 Sample</p>
      <p className='cursor-pointer'>運営会社</p>
    </footer>
  )
}

export default Footer
