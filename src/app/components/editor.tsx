'use client'

import { ChangeEvent, useEffect, useState } from 'react'
import {
  CancelButton,
  SaveButton,
  EditButton,
} from '@/app/components/common/buttons'
import Footer from '@/app/components/footer'
import { putContent } from '@/app/lib/data'
import styles from '@/app/styles/editor.module.css'

type EditorProps = {
  /** 選択中のコンテンツ */
  selectContent: Content
  /** 選択中のコンテンツ更新用 */
  setSelectContent: (content: Content) => void
  /** コンテンツリスト更新用 */
  updateContents: () => void
}

const Editor: React.FC<EditorProps> = ({
  selectContent,
  setSelectContent,
  updateContents,
}) => {
  const [isTitleEdit, setIsTitleEdit] = useState(false)
  const [isBodyEdit, setIsBodyEdit] = useState(false)
  const [editContent, setEditContent] = useState(selectContent)

  /**
   * 編集ボタン押下ハンドラ
   * @param target
   */
  const handleEditButton = (target: string) => {
    switch (target) {
      case 'title':
        setIsTitleEdit((p) => !p)

        // 編集中の別項目はリセット
        setEditContent(selectContent)
        setIsBodyEdit(false)
        break
      case 'body':
        setIsBodyEdit((p) => !p)

        // 編集中の別項目はリセット
        setEditContent(selectContent)
        setIsTitleEdit(false)
        break
      default:
    }
  }

  /**
   * コンテンツ編集時のonChangeハンドラ
   * @param e イベント
   */
  const handleContentEdit = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target
    setEditContent({ ...selectContent, [name]: value })
  }

  /**
   * キャンセルボタン押下ハンドラ
   */
  const handleCancel = () => {
    setEditContent(selectContent)
    setIsTitleEdit(false)
    setIsBodyEdit(false)
  }

  /**
   * 保存ボタン押下ハンドラ
   */
  const handleSave = async () => {
    // コンテンツ更新
    const postData: Content = {
      id: editContent.id,
      title: editContent.title,
      body: editContent.body,
    }
    const res = await putContent(postData)

    // コンテンツリスト更新
    updateContents()
    if (res) setSelectContent(res)
    setIsTitleEdit(false)
    setIsBodyEdit(false)
  }

  useEffect(() => {
    setEditContent(selectContent)
  }, [selectContent])

  /**
   * コンテンツタイトル部を表示
   * @returns コンテンツタイトル
   */
  const renderTitle = () => {
    return (
      <div className='flex h-10'>
        {isTitleEdit ? (
          <>
            <input
              className={styles.title}
              name='title'
              value={editContent.title}
              onChange={handleContentEdit}
            />
            <div className='flex justify-between gap-[10px]'>
              <CancelButton key='title-cancel' onClick={handleCancel} />
              <SaveButton key='title-save' onClick={handleSave} />
            </div>
          </>
        ) : (
          <>
            <h1 className='px-[30px] mr-5 font-bold leading-10 tracking-normal w-full overflow-hidden whitespace-nowrap text-ellipsis'>
              {selectContent.title}
            </h1>
            <div className='flex w-[90px]'>
              <EditButton
                key='title-edit'
                onClick={() => handleEditButton('title')}
              />
            </div>
          </>
        )}
      </div>
    )
  }

  /**
   * コンテンツボディ部を表示
   * @returns コンテンツボディ
   */
  const renderBody = () => {
    return (
      <div className='flex flex-grow mt-5 justify-between'>
        <textarea
          name='body'
          className='p-[30px] w-full h-full mr-5 overflow-y-auto rounded-lg resize-none'
          value={editContent.body}
          onChange={handleContentEdit}
          readOnly={!isBodyEdit}
        />
        {isBodyEdit ? (
          <div className='flex justify-between gap-[10px]'>
            <CancelButton key='body-cancel' onClick={handleCancel} />
            <SaveButton key='body-save' onClick={handleSave} />
          </div>
        ) : (
          <div className='w-[90px]'>
            <EditButton
              key='body-edit'
              onClick={() => handleEditButton('body')}
            />
          </div>
        )}
      </div>
    )
  }

  /** コンテンツがない場合の表示 */
  if (editContent && Object.keys(editContent).length === 0) {
    return (
      <div className='flex flex-col w-full pt-8 px-10'>
        <div className={styles.editor}></div>
        <Footer />
      </div>
    )
  }

  return (
    <div className='flex flex-col w-full pt-8 px-10'>
      <div className={styles.editor}>
        {/* title */}
        {editContent && renderTitle()}

        {/* text */}
        {editContent && renderBody()}
      </div>
      <Footer />
    </div>
  )
}

export default Editor
