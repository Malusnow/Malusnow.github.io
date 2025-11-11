import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getAllPosts } from '../lib/posts'
import type { Post } from '../types/post'

function Home() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadPosts() {
      try {
        const allPosts = await getAllPosts()
        console.log('加载到的文章:', allPosts)
        setPosts(allPosts)
      } catch (error) {
        console.error('加载文章失败:', error)
      } finally {
        setLoading(false)
      }
    }
    loadPosts()
  }, [])

  if (loading) {
    return <div style={{ padding: '2rem' }}>加载中...</div>
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
      <h1>我的博客</h1>
      <p>记录学习与成长的点滴</p>
      
      <div style={{ marginTop: '2rem' }}>
        {posts.length === 0 ? (
          <p>暂无文章</p>
        ) : (
          posts.map(post => (
            <article key={post.slug} style={{ 
              borderBottom: '1px solid #eee', 
              padding: '1.5rem 0' 
            }}>
              <h2>
                <Link to={`/posts/${post.slug}`} style={{ 
                  textDecoration: 'none', 
                  color: '#333' 
                }}>
                  {post.frontmatter.title}
                </Link>
              </h2>
              <p style={{ color: '#666', fontSize: '0.9rem' }}>
                {post.frontmatter.date}
              </p>
              {post.frontmatter.description && (
                <p>{post.frontmatter.description}</p>
              )}
              {post.frontmatter.tags && post.frontmatter.tags.length > 0 && (
                <div style={{ marginTop: '0.5rem' }}>
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
            </article>
          ))
        )}
      </div>
    </div>
  )
}

export default Home
