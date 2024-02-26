import styles from '@/app/styles/footer.module.css'

const Footer = () => {
  return (
    <footer
      className={`${styles.footer} h-[60px] items-center flex justify-between`}
    >
      <p>Copyright © 2021 Sample</p>
      <p className='cursor-pointer'>運営会社</p>
    </footer>
  )
}

export default Footer
