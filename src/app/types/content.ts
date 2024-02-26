/** コンテンツ */
type Content = {
  id: number
  title?: string
  body?: string
}

/** コンテンツ作成(更新)リクエスト */
type RequestContent = {
  title?: string
  body?: string
}
