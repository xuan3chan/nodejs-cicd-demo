import { createContext, useContext, useState, useEffect } from 'react'

const SiteConfigContext = createContext({})

export function SiteConfigProvider({ children }) {
  const [config, setConfig] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/site-config')
      .then((res) => res.json())
      .then((data) => setConfig(data))
      .catch((err) => console.error('Failed to load site config:', err))
      .finally(() => setLoading(false))
  }, [])

  return (
    <SiteConfigContext.Provider value={{ config, loading }}>
      {children}
    </SiteConfigContext.Provider>
  )
}

export function useSiteConfig() {
  return useContext(SiteConfigContext)
}
