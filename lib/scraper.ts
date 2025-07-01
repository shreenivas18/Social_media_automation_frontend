import { supabase } from './supabase'

export const SCRAPER_API = 'https://fmoubbrtg1.execute-api.ap-south-1.amazonaws.com/Prod'

/**
 * Send an authorised POST request to the Scraper Service.
 * Automatically attaches the user's Supabase JWT.
 */
export async function postWithJWT<T = unknown>(path: string, body?: unknown): Promise<T> {
  const { data: { session }, error } = await supabase.auth.getSession()
  if (error || !session?.access_token) {
    throw new Error('Unable to obtain authentication token')
  }

  const res = await fetch(`${SCRAPER_API}${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session.access_token}`,
    },
    body: body ? JSON.stringify(body) : undefined,
  })

  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Scraper request failed: ${res.status} ${text}`)
  }
  return res.json() as Promise<T>
}

// Convenience wrappers ------------------------------------------------------

export function startProfileScrape() {
  return postWithJWT('/scraper/profile')
}

export function startTopicScrape(topic: string) {
  return postWithJWT('/scraper/topic', { topic })
}

export function getTopicResults(topic: string) {
  return postWithJWT<{ topic: string, content: string }[]>('/scraper/topic-results', { topic })
}
