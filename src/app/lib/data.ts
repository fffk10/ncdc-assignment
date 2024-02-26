/** APIサーバーURL(ローカル固定) */
const ENDPOINT_URL = 'http://localhost:3000'

/**
 * コンテンツリストを取得
 * @returns コンテンツリスト
 */
export const fetchContents = async (): Promise<Content[] | undefined> => {
  try {
    const res = await fetch(`${ENDPOINT_URL}/content`, {
      cache: 'no-store',
    })

    const contents = await res.json()
    return contents
  } catch (err) {
    console.error('Error fetchContents.')
  }
}

/**
 * コンテンツを登録
 * @param content 登録するコンテンツ
 * @returns 登録したコンテンツ
 */
export const postContent = async (
  content: RequestContent
): Promise<Content | undefined> => {
  const res = await fetch(`${ENDPOINT_URL}/content`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(content),
  })

  try {
    return await res.json()
  } catch (err) {
    console.error('Error postContent.')
  }
}

/**
 * コンテンツを更新
 * @param content 更新するコンテンツ
 * @returns 更新したコンテンツ
 */
export const putContent = async (
  content: Content
): Promise<Content | undefined> => {
  const putContent: RequestContent = {
    title: content.title,
    body: content.body,
  }
  const res = await fetch(`${ENDPOINT_URL}/content/${content.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(putContent),
  })

  try {
    return await res.json()
  } catch (err) {
    console.error('Error putContent.')
  }
}

/**
 * コンテンツを削除
 * @param id 削除するコンテンツのID
 */
export const deleteContent = async (id: number): Promise<void> => {
  try {
    await fetch(`${ENDPOINT_URL}/content/${id}`, {
      method: 'DELETE',
    })
  } catch (err) {
    console.error('Error deleteContent.')
  }
}
