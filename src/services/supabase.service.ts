import { createClient } from '@supabase/supabase-js'
import type { Database } from '../types/supabase'

// 从环境变量中获取 Supabase 配置
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// 确保环境变量已配置
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase 环境变量未配置，请在 .env 文件中设置 VITE_SUPABASE_URL 和 VITE_SUPABASE_ANON_KEY')
}

// 创建 Supabase 客户端实例
export const supabase = createClient<Database>(supabaseUrl || '', supabaseAnonKey || '')

// 导出常用的类型和方法
export type { Database }
export default supabase