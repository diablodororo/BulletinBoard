import type { Post } from '../types'

export const initialPosts: Post[] = [
  {
    id: 'demo-1',
    title: '歡迎使用佈告欄',
    message: '這是一個示範公告。你可以點右上角切換不同風格，也可以點「張貼公告」新增訊息。',
    author: '系統管理員',
    time: new Date().toLocaleString('zh-TW'),
  },
  {
    id: 'demo-2',
    title: '影印機維護通知',
    message: '本週五下午 3 點到 5 點，影印機將進行保養，請提早完成文件列印。',
    author: '行政組',
    time: '2026/4/18 下午 03:20:00',
  },
  {
    id: 'demo-3',
    title: '茶水間清潔提醒',
    message: '請於離開前帶走個人物品，並保持流理台整潔。',
    author: '總務組',
    time: '2026/4/16 上午 10:00:00',
  },
]
