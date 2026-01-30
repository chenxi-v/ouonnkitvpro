// Supabase 数据库类型定义
// 注意：此文件为占位符，实际使用时应从 Supabase 控制台生成
// 生成方法：
// 1. 登录 Supabase 控制台
// 2. 进入项目 → 设置 → API
// 3. 在 "Type Definitions" 部分复制类型定义
// 4. 替换此文件内容

export interface Database {
  public: {
    Tables: {
      // 示例表结构，实际应根据 Supabase 项目中的表结构定义
      users: {
        Row: {
          id: string
          email: string
          name: string
          created_at: string
        }
        Insert: {
          id?: string
          email: string
          name?: string
          created_at?: string
        }
        Update: {
          id?: string
          email?: string
          name?: string
          created_at?: string
        }
      }
      // 可添加更多表结构
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}