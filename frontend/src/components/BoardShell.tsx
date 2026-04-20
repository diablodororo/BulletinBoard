import { useEffect, useState } from 'react'
import type { ThemeKey, Post } from '../types'
import { themeMap } from '../data/themes'
import { initialPosts } from '../data/initialPosts'
import { getLatestPost, getCount, searchPosts, getHistory } from '../api'
import Composer from './Composer'
import PostCard from './PostCard'

export default function BoardShell() {
  const [theme, setTheme] = useState<ThemeKey>('office')
  const [latestPost, setLatestPost] = useState<Post | null>(null)
  const [historyPosts, setHistoryPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [historyLoading, setHistoryLoading] = useState(true)
  const [historyError, setHistoryError] = useState(false)
  const [postCount, setPostCount] = useState<number | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<Post[] | null>(null)
  const [searching, setSearching] = useState(false)

  function handleSearch(): void {
    const q = searchQuery.trim()
    if (!q) return
    setSearching(true)
    searchPosts(q)
      .then(results => setSearchResults(results))
      .catch(() => setSearchResults([]))
      .finally(() => setSearching(false))
  }

  function handleClearSearch(): void {
    setSearchQuery('')
    setSearchResults(null)
  }

  useEffect(() => {
    getLatestPost()
      .then(post => setLatestPost(post))
      .catch(() => setLatestPost(initialPosts[0] ?? null))
      .finally(() => setLoading(false))

    getCount()
      .then(count => setPostCount(count))
      .catch(() => {})

    getHistory()
      .then(posts => setHistoryPosts(posts))
      .catch(() => setHistoryError(true))
      .finally(() => setHistoryLoading(false))
  }, [])

  const { className, title } = themeMap[theme]

  function handlePublish(post: Post) {
    setHistoryPosts(prev => latestPost ? [latestPost, ...prev] : prev)
    setLatestPost(post)
    setPostCount(prev => prev !== null ? prev + 1 : null)
  }

  return (
    <section className={`board-shell ${className}`}>
      <div className="board-topbar">
        <div className="board-heading">
          <h2>{title}{postCount !== null && `（共 ${postCount} 則公告）`}</h2>
          <div className="board-subtitle">最新公告會固定顯示在最上方，方便快速查看</div>
        </div>

        <div className="topbar-controls">
          <div className="search-box">
            <input
              type="text"
              placeholder="搜尋公告…"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSearch()}
            />
            {searchQuery && (
              <button className="search-clear" onClick={handleClearSearch}>✕</button>
            )}
          </div>

          <div className="theme-switcher">
            <label htmlFor="themeSelect">風格</label>
            <select
              id="themeSelect"
              value={theme}
              onChange={e => setTheme(e.target.value as ThemeKey)}
            >
              <option value="office">辦公室</option>
              <option value="classroom">教室</option>
              <option value="fridge">冰箱</option>
            </select>
          </div>
        </div>
      </div>

      <Composer onPublish={handlePublish} />

      <div className="sections">
        <div className="section-title">最新公告</div>
        <div className="latest-area">
          {loading ? (
            <div className="empty">載入中…</div>
          ) : latestPost ? (
            <PostCard post={latestPost} isLatest />
          ) : (
            <div className="empty">目前沒有公告。</div>
          )}
        </div>

        {searchResults !== null && (
          <>
            <div className="section-title">搜尋結果</div>
            <div className="search-area">
              {searching ? (
                <div className="empty">搜尋中…</div>
              ) : searchResults.length > 0 ? (
                searchResults.map(post => <PostCard key={post.id} post={post} />)
              ) : (
                <div className="empty">找不到符合的公告。</div>
              )}
            </div>
          </>
        )}

        <div className="section-title">歷史訊息</div>
        <div className="history-area">
          {historyLoading ? (
            <div className="empty">載入中…</div>
          ) : historyError ? (
            <div className="empty">載入失敗，請重新整理。</div>
          ) : historyPosts.length > 0 ? (
            historyPosts.map(post => <PostCard key={post.id} post={post} />)
          ) : (
            <div className="empty">目前沒有歷史訊息。</div>
          )}
        </div>
      </div>
    </section>
  )
}
