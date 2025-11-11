export interface PostFrontmatter {
  title: string
  date: string
  tags?: string[]
  description?: string
}

export interface Post {
  slug: string
  frontmatter: PostFrontmatter
  content: string
}