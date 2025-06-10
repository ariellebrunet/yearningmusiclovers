
import fs from 'fs'
import path from 'path'
import Link from 'next/link'
import matter from 'gray-matter'

export default function Home({ posts }) {
  return (
    <div style={{ fontFamily: "'Georgia', serif", maxWidth: 600, margin: 'auto', padding: 20, background: '#fefcf8', minHeight: '100vh' }}>
      <h1 style={{ textAlign: 'center' }}>yearningmusiclovers</h1>
      <p style={{ textAlign: 'center', fontStyle: 'italic' }}>Grunge zine vibes + neo-retro blog</p>
      <hr />
      {posts.map(post => (
        <article key={post.slug} style={{ marginBottom: 20 }}>
          <h2><Link href={`/posts/${post.slug}`}><a style={{ color: '#333', textDecoration: 'none' }}>{post.data.title}</a></Link></h2>
          <p>{post.data.date}</p>
        </article>
      ))}
    </div>
  )
}

export async function getStaticProps() {
  const postsDir = path.join(process.cwd(), 'src/pages/posts')
  const filenames = fs.readdirSync(postsDir)
  const posts = filenames.map(filename => {
    const filePath = path.join(postsDir, filename)
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const { data } = matter(fileContents)
    return {
      slug: filename.replace(/\.md$/, ''),
      data,
    }
  })
  return {
    props: {
      posts
    }
  }
}
