"use client"

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2 } from 'lucide-react'
import { supabase } from '@/lib/supabase'

interface ResearchGatherProps {
  className?: string
}

/**
 * Generic input + button to trigger the /scraper/topic endpoint.
 * Drop <ResearchGather/> anywhere a user can type a topic to gather research.
 */
export default function ResearchGather({ className }: ResearchGatherProps) {
  const [topic, setTopic] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [blogInfo, setBlogInfo] = useState<any | null>(null)

  const handleGather = async () => {
    if (!topic.trim()) return
    setIsLoading(true)
    setError(null)
    setSuccess(false)
    setBlogInfo(null)

    try {
      // Get Supabase JWT from the custom client
      const { data: { session }, error: sessionError } = await supabase.auth.getSession()
      if (sessionError || !session?.access_token) {
        throw new Error('Could not get user session. Please log in again.')
      }
      const jwt = session.access_token

      // Make API request
      const response = await fetch('https://leyu1qigsf.execute-api.ap-south-1.amazonaws.com/blog/manual-generate', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${jwt}`,
          'Content-Type': 'application/json',
          'apikey': process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
        },
        body: JSON.stringify({ topic: topic.trim() }),
      })
      if (!response.ok) {
        const errData = await response.json().catch(() => ({}))
        throw new Error(errData.message || 'Failed to generate blog')
      }
      const data = await response.json()
      // Try to fetch the most recent blog for this user and topic
      let recentBlogId = null;
      if (data.uid) {
        const { data: blogs, error: blogsError } = await supabase
          .from('blog_posts')
          .select('id, title, created_at')
          .eq('user_id', data.uid)
          .order('created_at', { ascending: false })
          .limit(1);
        console.log('Supabase blogs query result:', { blogs, blogsError });
        if (!blogsError && blogs && blogs.length > 0) {
          recentBlogId = blogs[0].id;
        } else {
          // Fallback: grab the absolute latest blog regardless of user (useful if user_id not set)
          const { data: latest, error: latestError } = await supabase
            .from('blog_posts')
            .select('id')
            .order('created_at', { ascending: false })
            .limit(1);
          if (!latestError && latest && latest.length > 0) {
            recentBlogId = latest[0].id;
          }
        }
        console.log('recentBlogId:', recentBlogId);
      }
      setBlogInfo(prev => {
        const info = { ...data, recentBlogId };
        console.log('Setting blogInfo:', info);
        return info;
      });
      setSuccess(true)
    } catch (err: any) {
      console.error('Gather research failed', err)
      setError(err.message || 'Failed to start research. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={className}>
      {error && (
        <Alert variant="destructive" className="mb-2">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      {success && blogInfo && (
        <Alert className="mt-4 border-green-600 bg-green-50 text-green-900">
          <AlertDescription>
            Blog generated successfully!<br />
            <b>Title:</b> {blogInfo.blog?.title} <br />
            <b>Status:</b> {blogInfo.blog?.status} <br />
            <b>User ID:</b> {blogInfo.uid}<br />
            {blogInfo.blog?.id && (
              <a
                href={`/public/${blogInfo.blog?.id}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-block',
                  marginTop: 12,
                  padding: '8px 16px',
                  background: '#2563eb',
                  color: 'white',
                  borderRadius: 6,
                  textDecoration: 'none',
                  fontWeight: 600
                }}
              >
                View Live Blog
              </a>
            )}
          </AlertDescription>
        </Alert>
      )}
      <div className="flex gap-2">
        <Input
          placeholder="Enter a topic e.g. SaaS pricing strategies in 2025"
          value={topic}
          disabled={isLoading}
          onChange={(e) => setTopic(e.target.value)}
        />
        <Button onClick={handleGather} disabled={isLoading || !topic.trim()}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Gathering…
            </>
          ) : (
            'Gather Research'
          )}
        </Button>
        <Button
          variant="outline"
          disabled={!blogInfo?.recentBlogId}
          onClick={() => {
            if (blogInfo?.recentBlogId) {
              window.open(`/public/${blogInfo.recentBlogId}`, '_blank', 'noopener,noreferrer');
            }
          }}
        >
          Visit Site
        </Button>
      </div>
    </div>
  )
}
