import Image from 'next/image'
import styles from '@/app/styles/buttons.module.css'

import cancel from '@/app/assets/cancel.svg'
import trash from '@/app/assets/delete.svg'
import done from '@/app/assets/done.svg'
import edit from '@/app/assets/edit.svg'
import plus from '@/app/assets/+.svg'
import save from '@/app/assets/save.svg'

/** button用汎用Propsタイプ */
type CommonButtonProps = {
  onClick: () => void
}

/**
 * キャンセルボタン
 * @param onClick クリック時の処理
 * @returns キャンセルボタン
 */
export const CancelButton = ({ onClick }: CommonButtonProps) => {
  return (
    <button
      className={`${styles['cancel-btn']} w-10 h-10 rounded`}
      onClick={onClick}
    >
      <Image
        src={cancel}
        alt='cancel-btn'
        className='mx-auto'
        width={18}
        height={18}
      />
      <p className={styles['cancel-text']}>Cancel</p>
    </button>
  )
}

/**
 * 削除ボタン
 * @param onClick クリック時の処理
 * @returns 削除ボタン
 */
export const DeleteButton = ({ onClick }: CommonButtonProps) => {
  return (
    <button className={styles['delete-btn']} onClick={onClick}>
      <Image src={trash} alt='delete-button' width={20} height={20} />
    </button>
  )
}

/**
 * 完了ボタン
 * @param onClick クリック時の処理
 * @returns 完了ボタン
 */
export const DoneButton = ({ onClick }: CommonButtonProps) => {
  return (
    <button className={`${styles['done-btn']} h-10 rounded`} onClick={onClick}>
      <Image
        src={done}
        alt='done-btn'
        className='mx-auto'
        width={18}
        height={18}
      />
      <p className={styles['done-text']}>Done</p>
    </button>
  )
}

/**
 * 編集ボタン
 * @param onClick クリック時の処理
 * @returns 編集ボタン
 */
export const EditButton = ({ onClick }: CommonButtonProps) => {
  return (
    <button
      className={`${styles['edit-btn']} w-[90px] h-10 rounded`}
      onClick={onClick}
    >
      <Image src={edit} alt='' className='mx-auto' width={18} height={18} />
      <p className={styles['edit-text']}>Edit</p>
    </button>
  )
}

/**
 * 新規作成ボタン
 * @param onClick クリック時の処理
 * @returns 新規作成ボタン
 */
export const PlusButton = ({ onClick }: CommonButtonProps) => {
  return (
    <button className={`${styles['plus-btn']} rounded`} onClick={onClick}>
      <Image src={plus} alt='' className='mx-auto' width={24} height={24} />
      <p className={styles['plus-text']}>New page</p>
    </button>
  )
}

/**
 * 保存ボタン
 * @param onClick クリック時の処理
 * @returns 保存ボタン
 */
export const SaveButton = ({ onClick }: CommonButtonProps) => {
  return (
    <button
      className={`${styles['save-btn']} w-10 h-10 rounded`}
      onClick={onClick}
    >
      <Image src={save} alt='' className='mx-auto' width={18} height={18} />
      <p className={styles['save-text']}>Save</p>
    </button>
  )
}
