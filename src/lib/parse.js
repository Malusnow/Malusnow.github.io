import { marked } from 'marked'
import { gfmHeadingId, getHeadingList } from 'marked-gfm-heading-id'

marked.use(gfmHeadingId())
// 提取文章目录列表
export function getTocList(body) {
  return getHeadingList()
}

const postModules = import.meta.glob('../posts/*.md', {
  eager: true,
  import: 'default',
  query: '?raw',
})

function parseFrontmatter(raw) {
  const normolized = raw.replace(/\r\n/g, '\n')

  if (!normolized.startsWith('---\n')) {
    return {
      metadata: {},
      body: normolized,
    }
  }

  const endIndex = normolized.indexOf('\n---\n', 4)
  if (endIndex === -1) {
    return {
      metadata: {},
      body: normolized,
    }
  }

  const frontMatterText = normolized.slice(4, endIndex)
  const body = normolized.slice(endIndex + 5)

  const metadata = {}
  for (const line of frontMatterText.split('\n')) {
    const seperator = line.indexOf(':')
    if (seperator === -1) {
      continue
    }
    const key = line.slice(0, seperator).trim()
    const value = line
      .slice(seperator + 1)
      .trim()
      .replace(/^['\"]|['\"]$/g, '')
    if (key) {
      metadata[key] = value
    }
  }

  return {
    metadata,
    body,
  }
}

function parsePosts(path, raw) {
  const { metadata, body } = parseFrontmatter(raw)
  const filename = path.split('/').pop().replace('.md', '')
  const id = metadata.id || filename
  const title = metadata.title
  const date = metadata.date
  const description = metadata.description || metadata.summary || ''

  return {
    id,
    title,
    date,
    description,
    body,
  }
}

const postList = Object.entries(postModules)
  .map(([path, raw]) => parsePosts(path, raw))
  .sort((a, b) => new Date(b.date) - new Date(a.date))

export function getAllPostsMetadata() {
  return postList.map(({ id, title, date, description }) => ({
    id,
    title,
    date,
    description,
  }))
}

export function getPostById(id) {
  return postList.find((post) => post.id === id)
}

export function getDefaultPost() {
  return postList[0]
}

export function getDefaultPostId() {
  return postList[0]?.id || ''
}
