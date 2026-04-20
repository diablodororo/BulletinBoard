// api/index.ts
// 所有對 GAS 後端的 API 呼叫集中在這裡
//
// API 網址只需在 vite.config.ts 的 GAS_EXEC_URL 設定一次：
//   開發（npm run dev）：透過 Vite proxy 轉發，無 CORS 問題
//   生產（npm run build）：直接呼叫 GAS /exec 網址

const API_ENDPOINT = import.meta.env.DEV ? '/api' : __API_ENDPOINT__

// ── 型別 ────────────────────────────────────────────────────

export interface Post {
  id: string
  title: string
  message: string
  author: string
  time: string
}

interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
}

// ── 發布新公告（POST） ───────────────────────────────────────

export async function createPost(payload: {
  title: string
  message: string
  author: string
}): Promise<Post> {
  const res = await fetch(API_ENDPOINT, {
    method: 'POST',
    // GAS 不支援 application/json 的 CORS preflight，改用 text/plain
    headers: { 'Content-Type': 'text/plain' },
    body: JSON.stringify(payload),
    redirect: 'follow',
  })

  const json: ApiResponse<Post> = await res.json()
  if (!json.success) throw new Error(json.error ?? '發布失敗')
  return json.data!
}

// ── 取得最新公告（GET） ─── TODO：留給同仁實作 ───────────────

export async function getLatestPost(): Promise<Post | null> {
  const res = await fetch(`${API_ENDPOINT}?action=latest`)
  const json: ApiResponse<Post> = await res.json()
  if (!json.success) throw new Error(json.error ?? '取得最新公告失敗')
  return json.data ?? null
}

// ── 取得歷史訊息（GET） ─── TODO：留給同仁實作 ───────────────

export async function getHistory(): Promise<Post[]> {
  // TODO:
  // const res = await fetch(`${API_ENDPOINT}?action=history`)
  // const json: ApiResponse<Post[]> = await res.json()
  // return json.data ?? []
  throw new Error('尚未實作')
}
