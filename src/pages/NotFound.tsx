import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div style={{ 
      maxWidth: '800px', 
      margin: '0 auto', 
      padding: '2rem',
      textAlign: 'center' 
    }}>
      <h1>404 - 页面未找到</h1>
      <p>抱歉，您访问的页面不存在。</p>
      <Link to="/" style={{ color: '#0066cc' }}>返回首页</Link>
    </div>
  )
}

export default NotFound
