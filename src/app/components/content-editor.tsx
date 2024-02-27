'use client'

import { useState } from 'react'
import Editor from '@/app/components/editor'
import SideMenu from '@/app/components/side-menu'
import { fetchContents } from '@/app/lib/data'

type ContentEditorProps = {
  initialContents: Content[]
}

/**
 * コンテンツエディタ
 * @param initialContents 初期コンテンツリスト
 * @returns コンテンツエディタ
 */
const ContentEditor: React.FC<ContentEditorProps> = ({ initialContents }) => {
  const [contents, setContents] = useState<Content[]>(initialContents)
  const [selectContent, setSelectContent] = useState<Content>(
    contents && contents[0]
  )

  /**
   * コンテンツリストを更新する
   */
  const updateContents = async () => {
    setContents((await fetchContents()) ?? [])
  }

  return (
    <div className='flex h-screen'>
      <SideMenu
        contents={contents}
        setContents={setContents}
        selectContent={selectContent}
        setSelectContent={setSelectContent}
      />
      <Editor
        selectContent={selectContent}
        setSelectContent={setSelectContent}
        updateContents={updateContents}
      />
    </div>
  )
}

export default ContentEditor
