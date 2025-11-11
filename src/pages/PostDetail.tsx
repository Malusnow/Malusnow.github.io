import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getPostBySlug } from '../lib/posts'
import type { Post } from '../types/post'

function PostDetail() {
  const { slug } = useParams<{ slug: string }>()
  const [post, setPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadPost() {
      if (!slug) return
      
      try {
        const foundPost = await getPostBySlug(slug)
        setPost(foundPost)
      } catch (error) {
        console.error('加载文章失败:', error)
      } finally {
        setLoading(false)
      }
    }
    loadPost()
  }, [slug])

  if (loading) {
    return <div style={{ padding: '2rem' }}>加载中...</div>
  }

  if (!post) {
    return (
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
        <h1>文章未找到</h1>
        <Link to="/">返回首页</Link>
      </div>
    )
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
      <Link to="/" style={{ textDecoration: 'none', color: '#666' }}>
        ← 返回首页
      </Link>
      
      <article style={{ marginTop: '2rem' }}>
        <h1>{post.frontmatter.title}</h1>
        <p style={{ color: '#666' }}>{post.frontmatter.date}</p>
        
        {post.frontmatter.tags && post.frontmatter.tags.length > 0 && (
          <div style={{ marginBottom: '2rem' }}>
            {post.frontmatter.tags.map(tag => (
              <span key={tag} style={{ 
                marginRight: '0.5rem', 
                padding: '0.2rem 0.5rem', 
                background: '#f0f0f0', 
                borderRadius: '3px',
                fontSize: '0.85rem'
              }}>
                #{tag}
              </span>
            ))}
          </div>
        )}
        
        <div style={{ 
          lineHeight: '1.8', 
          whiteSpace: 'pre-wrap' 
        }}>
          {post.content}
        </div>
      </article>
    </div>
  )
}

export default PostDetail
