export type ThemeKey = 'office' | 'classroom' | 'fridge'

export interface Post {
  id: string
  title: string
  message: string
  author: string
  time: string
}

export interface ThemeConfig {
  className: string
  title: string
}
