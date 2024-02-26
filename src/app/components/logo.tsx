import Image from 'next/image'
import logo from '@/app/assets/logo.svg'

/**
 * ロゴ
 * @returns ロゴ
 */
const Logo = () => {
  return <Image src={logo} alt='page logo' width={32} height={32} />
}

export default Logo
