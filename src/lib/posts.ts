import matter from 'gray-matter'
import type { Post, PostFrontmatter } from '../types/post'

export async function getAllPosts(): Promise<Post[]> {
  const modules = import.meta.glob('../posts/*.md', { query: '?raw', import: 'default', eager: true })
  const posts: Post[] = []
  
  for (const path in modules) {
    const rawContent = modules[path] as string
    const { data, content } = matter(rawContent)
    const slug = path.split('/').pop()?.replace('.md', '') || ''
    
    posts.push({
      slug,
      frontmatter: data as PostFrontmatter,
      content
    })
  }
  
  posts.sort((a, b) => {
    return new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime()
  })
  
  return posts
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const posts = await getAllPosts()
  return posts.find(post => post.slug === slug) || null
}