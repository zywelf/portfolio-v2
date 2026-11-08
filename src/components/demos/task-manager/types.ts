export type Task = {
  id: number
  title: string
  desc: string
  completed: boolean
}
export type Filter = 'all' | 'active' | 'completed'
export type Screen = 'auth' | 'tasks' | 'detail'
export type ToastMessage = { text: string; undo: boolean }
export type Drag = { id: number; dx: number }
