export interface MessageSnakeCase {
  id?: number
  message: string
  love: number
  added_by_user?: string
}

export interface Message {
  id: number
  message: string
  love: number
  addedByUser: string
}

export interface MessageData {
  message: string
  love: number
}

export interface BoardData {
  name: string
  tag: string
}

export interface BoardData {
  id: number
  name: string
  tag: string
  addedByUser: string
  timestamp: Date
}
