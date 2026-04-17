import { useState, useEffect, useCallback } from "react"

const STORAGE_KEY = "uiverse:saved_components"

function loadSaved(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as string[]) : []
  } catch {
    return []
  }
}

function persistSaved(slugs: string[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(slugs))
  } catch {
    // localStorage unavailable (private browsing, quota exceeded, etc.)
  }
}

/**
 * Persists a set of saved component slugs in localStorage.
 * Works across page refreshes without requiring an authenticated user.
 */
export function useSavedComponents() {
  const [savedSlugs, setSavedSlugs] = useState<string[]>(() => loadSaved())

  // Keep localStorage in sync whenever state changes
  useEffect(() => {
    persistSaved(savedSlugs)
  }, [savedSlugs])

  const isSaved = useCallback(
    (slug: string) => savedSlugs.includes(slug),
    [savedSlugs]
  )

  const toggleSave = useCallback((slug: string) => {
    setSavedSlugs((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    )
  }, [])

  const clearAll = useCallback(() => {
    setSavedSlugs([])
  }, [])

  return { savedSlugs, isSaved, toggleSave, clearAll }
}
