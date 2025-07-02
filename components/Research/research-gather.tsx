"use client"

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2 } from 'lucide-react'
import { startTopicScrape } from '@/lib/scraper'

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

  const handleGather = async () => {
    if (!topic.trim()) return
    setIsLoading(true)
    setError(null)
    setSuccess(false)

    try {
      await startTopicScrape(topic.trim())
      setSuccess(true)
    } catch (err) {
      console.error('Gather research failed', err)
      setError('Failed to start research. Please try again.')
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
      {success && (
        <Alert className="mb-2">
          <AlertDescription>Research in progress… You can generate content in about a minute.</AlertDescription>
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
      </div>
    </div>
  )
}
