import { useState, useEffect } from "react"

const STORAGE_KEY = "uiverse:preferences"

export interface UserPreferences {
  emailNotifications: boolean
  componentAlerts: boolean
  weeklyDigest: boolean
}

const DEFAULT_PREFERENCES: UserPreferences = {
  emailNotifications: true,
  componentAlerts: true,
  weeklyDigest: false,
}

function loadPreferences(): UserPreferences {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return DEFAULT_PREFERENCES
    return { ...DEFAULT_PREFERENCES, ...(JSON.parse(raw) as Partial<UserPreferences>) }
  } catch {
    return DEFAULT_PREFERENCES
  }
}

function persistPreferences(prefs: UserPreferences) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs))
  } catch {
    // localStorage unavailable
  }
}

/**
 * Persists user notification preferences to localStorage.
 */
export function usePreferences() {
  const [preferences, setPreferences] = useState<UserPreferences>(() =>
    loadPreferences()
  )

  useEffect(() => {
    persistPreferences(preferences)
  }, [preferences])

  const togglePreference = (key: keyof UserPreferences) => {
    setPreferences((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  return { preferences, togglePreference }
}
