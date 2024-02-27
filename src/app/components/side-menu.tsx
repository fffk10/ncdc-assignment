'use client'

import { useState } from 'react'
import {
  DeleteButton,
  PlusButton,
  DoneButton,
  EditButton,
} from '@/app/components/common/buttons'
import Logo from '@/app/components/logo'
import { deleteContent, fetchContents, postContent } from '@/app/lib/data'
import styles from '@/app/styles/side-menu.module.css'

type SideMenuProps = {
  /** コンテンツリスト */
  contents: Content[]
  /** コンテンツリスト更新用 */
  setContents: (contents: Content[]) => void
  /** 選択中のコンテンツ */
  selectContent: Content
  /** 選択中のコンテンツ更新用 */
  setSelectContent: (content: Content) => void
}

/**
 * サイドメニュー
 * @param contents コンテンツリスト
 * @param setContents コンテンツリスト更新用
 * @param selectContent 選択中のコンテンツ
 * @param setSelectContent 選択中のコンテンツ更新用
 * @returns サイドメニュー
 */
const SideMenu: React.FC<SideMenuProps> = ({
  contents,
  setContents,
  selectContent,
  setSelectContent,
}) => {
  /** 編集モードかどうか */
  const [isEdit, setIsEdit] = useState(false)
  /**
   * 編集ボタン押下
   */
  const handleEditButton = (): void => {
    setIsEdit((p) => !p)
  }

  /**
   * コンテンツを選択した時の処理
   * @param content 選択したコンテンツ
   */
  const handleSelect = async (content: Content) => {
    setSelectContent(content)
  }

  /**
   * コンテンツを削除する
   * @param id 削除するコンテンツのID
   */
  const handleDelete = async (id: number): Promise<void> => {
    await deleteContent(id)
    const afterDeleteContents = contents.filter((content) => content.id != id)

    // 選択中のコンテンツを削除した場合は、先頭のコンテンツを選択するように
    if (selectContent.id == id) {
      if (afterDeleteContents[0]) {
        setSelectContent(afterDeleteContents[0])
      } else {
        setSelectContent({} as Content)
      }
    }
    setContents(afterDeleteContents)
  }

  /**
   * 新規コンテンツを作成する
   */
  const handleNewPage = async (): Promise<void> => {
    const res = await postContent({
      title: 'タイトル',
      body: 'コンテンツ',
    })
    if (res) {
      setContents([...contents, res])
    }
  }

  /**
   * 編集モードを終了する
   */
  const handleDone = async (): Promise<void> => {
    setContents((await fetchContents()) ?? [])
    setIsEdit(false)
  }

  return (
    <div className='flex flex-col min-h-screen border-r'>
      <div className={`${styles.container} flex flex-col flex-grow`}>
        {/* ロゴ */}
        <div className='flex mb-5 h-8'>
          <Logo />
          <h1 className={`${styles.logo} font-bold tracking-normal ml-1`}>
            ServiceName
          </h1>
        </div>

        {/* メニュー */}
        <ul className='flex-grow h-0 overflow-y-auto'>
          {contents?.map((content) => {
            return (
              <li
                key={content.id}
                className={
                  selectContent?.id == content.id
                    ? `${styles.selected} flex justify-between font-bold rounded h-11 w-60 p-[10px]`
                    : 'flex justify-between h-11 w-60 p-[10px]'
                }
              >
                <button
                  onClick={() => handleSelect(content)}
                  className='w-full justify-between text-start mr-[10px] overflow-hidden whitespace-nowrap text-ellipsis'
                >
                  {content.title}
                </button>
                {isEdit && (
                  <DeleteButton onClick={() => handleDelete(content.id)} />
                )}
              </li>
            )
          })}
        </ul>
      </div>

      {/* 編集ボタン */}
      <div className={`${styles.edit} flex justify-between`}>
        {isEdit ? (
          <>
            <PlusButton onClick={handleNewPage} />
            <DoneButton onClick={handleDone} />
          </>
        ) : (
          <>
            <div></div>
            <EditButton key='title-edit' onClick={handleEditButton} />
          </>
        )}
      </div>
    </div>
  )
}

export default SideMenu
