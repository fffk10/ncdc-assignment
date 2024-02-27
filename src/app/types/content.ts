/**
 * コンテンツ
 * @property id ID
 * @property title コンテンツタイトル
 * @property body コンテンツボディ
 */
type Content = {
  id: number
  title?: string
  body?: string
}

/**
 * コンテンツ作成(更新)リクエスト
 * @property title コンテンツタイトル
 * @property body コンテンツボディ
 */
type RequestContent = {
  title?: string
  body?: string
}
