import {hydrateRoot} from "react-dom/client"
import {RemixBrowser} from "@remix-run/react"
import {useState} from "react"
import {CacheProvider} from "@emotion/react"
import {createEmotionCache} from "~/styles/create-emotion-cache"
import {ClientStyleContext} from "~/styles/context"

type ClientCacheProviderProps = {
  children: React.ReactNode
}

function ClientCacheProvider(props: ClientCacheProviderProps) {
  const {children} = props
  const [cache, setCache] = useState(createEmotionCache())

  function reset() {
    setCache(createEmotionCache())
  }

  return (
    <ClientStyleContext.Provider value={{reset}}>
      <CacheProvider value={cache}>{children}</CacheProvider>
    </ClientStyleContext.Provider>
  )
}

hydrateRoot(
  document,
  <ClientCacheProvider>
    <RemixBrowser />
  </ClientCacheProvider>
)
