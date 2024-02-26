import ContentEditor from '@/app/components/content-editor'
import { fetchContents } from '@/app/lib/data'

/**
 * ホームページ
 * @returns コンテンツ管理画面
 */
const Home = async () => {
  const contents = (await fetchContents()) ?? []
  return <ContentEditor initialContents={contents} />
}

export default Home
