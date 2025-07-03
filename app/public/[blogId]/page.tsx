import { notFound } from 'next/navigation'
import { supabase } from '@/lib/supabase'

interface BlogPageProps {
  params: { blogId: string }
}

export default async function PublicBlogPage({ params }: BlogPageProps) {
  // In Next.js 15, `params` may be a Promise in server components; await it
  const resolvedParams = await params;
  const blogId = resolvedParams.blogId;

  // Fetch the blog post from Supabase by ID
  const { data: blog, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('id', blogId)
    .maybeSingle()

  if (error || !blog) {
    return notFound()
  }

  if (blog.status === 'draft') {
    return (
      <main className="min-h-screen bg-white text-black flex flex-col items-center justify-center p-8">
        <article className="max-w-2xl w-full bg-gray-50 rounded-lg shadow p-8">
          <h1 className="text-3xl font-bold mb-4">Draft Post</h1>
          <div className="text-gray-500 text-sm mb-6">
            This post is not publicly available.
          </div>
        </article>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-white text-black flex flex-col items-center justify-center p-8">
      <article className="max-w-2xl w-full bg-gray-50 rounded-lg shadow p-8">
        <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
        <div className="text-gray-500 text-sm mb-6">
          Status: {blog.status} | Published: {blog.date || 'N/A'}
        </div>
        <div className="prose prose-lg" dangerouslySetInnerHTML={{ __html: blog.html_content || blog.content || '' }} />
      </article>
    </main>
  )
}
