import { useState, useEffect } from 'react'
import { supabase } from '@/services/supabase.service'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Loader2, Database, CheckCircle2, XCircle } from 'lucide-react'

const DatabaseSettings = () => {
  const [isConnected, setIsConnected] = useState(false)
  const [connectionStatus, setConnectionStatus] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null)

  // 检查 Supabase 连接状态
  useEffect(() => {
    checkConnection()
  }, [])

  const checkConnection = async () => {
    setIsLoading(true)
    setConnectionStatus('正在检查连接...')

    try {
      // 尝试调用 Supabase 的 auth 服务来测试连接
      const { error } = await supabase.auth.getSession()
      
      if (error) {
        setIsConnected(false)
        setConnectionStatus(`连接失败: ${error.message}`)
        setTestResult({ success: false, message: `连接失败: ${error.message}` })
      } else {
        setIsConnected(true)
        setConnectionStatus('连接成功')
        setTestResult({ success: true, message: '连接成功' })
      }
    } catch (error) {
      setIsConnected(false)
      setConnectionStatus('连接失败: 无法连接到 Supabase')
      setTestResult({ success: false, message: '连接失败: 无法连接到 Supabase' })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Database className="h-6 w-6" />
          数据库设置
        </h2>
        <p className="text-gray-600 mb-6">
          管理 Supabase 数据库连接和相关功能
        </p>

        {/* 连接状态卡片 */}
        <Card className="p-6 mb-6">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-lg font-semibold">Supabase 连接状态</h3>
            <div className="flex items-center gap-2">
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : isConnected ? (
                <CheckCircle2 className="h-5 w-5 text-green-500" />
              ) : (
                <XCircle className="h-5 w-5 text-red-500" />
              )}
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-4">{connectionStatus}</p>
          <Button onClick={checkConnection} disabled={isLoading}>
            {isLoading ? '检查中...' : '重新检查连接'}
          </Button>
        </Card>

        {/* 测试结果提示 */}
        {testResult && (
          <div className={`p-4 rounded border ${testResult.success ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
            <h4 className="font-medium mb-2">{testResult.success ? '成功' : '失败'}</h4>
            <p className="text-sm">{testResult.message}</p>
          </div>
        )}

        {/* 配置说明 */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">配置说明</h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">环境变量配置</h4>
              <p className="text-sm text-gray-600">
                请在 <code>.env</code> 文件中配置以下环境变量：
              </p>
              <pre className="mt-2 p-3 bg-gray-100 rounded text-sm overflow-x-auto">
                <code>
                  VITE_SUPABASE_URL=your-supabase-url
                  VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
                </code>
              </pre>
            </div>
            <div>
              <h4 className="font-medium mb-2">类型定义</h4>
              <p className="text-sm text-gray-600">
                请从 Supabase 控制台生成并更新 <code>src/types/supabase.ts</code> 文件，以获得完整的类型支持。
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-2">使用示例</h4>
              <p className="text-sm text-gray-600">
                您可以在项目中使用 <code>supabase</code> 客户端进行数据库操作，例如：
              </p>
              <pre className="mt-2 p-3 bg-gray-100 rounded text-sm overflow-x-auto">
                <code>
                  {`import { supabase } from '@/services/supabase.service'\n\n// 获取数据\nconst { data, error } = await supabase\n  .from('users')\n  .select('*')\n\n// 插入数据\nconst { data: newUser, error } = await supabase\n  .from('users')\n  .insert({ email: 'user@example.com', name: 'Test User' })\n  .select()`}
                </code>
              </pre>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default DatabaseSettings