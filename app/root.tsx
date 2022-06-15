import React from "react"
import {Box} from "@chakra-ui/react"
import {withEmotionCache} from "@emotion/react"
import {ServerStyleContext, ClientStyleContext} from "~/styles/context"
import type {LinksFunction, MetaFunction} from "@remix-run/node"
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
} from "@remix-run/react"
import {Layout} from "~/components/layout"
import {Chakra} from "~/styles/chakra"

export const links: LinksFunction = () => {
  return [{rel: "icon", href: "/favicon.ico"}]
}

export const meta: MetaFunction = () => {
  return {title: "Remix + Chakra UI App"}
}

interface DocumentProps {
  children: React.ReactNode
  title?: string
}

const Document = withEmotionCache(
  ({children, title}: DocumentProps, emotionCache) => {
    const serverSyleData = React.useContext(ServerStyleContext)
    const clientStyleData = React.useContext(ClientStyleContext)

    // Only executed on client
    React.useEffect(() => {
      // re-link sheet container
      emotionCache.sheet.container = document.head
      // re-inject tags
      const tags = emotionCache.sheet.tags
      emotionCache.sheet.flush()
      tags.forEach((tag) => {
        ;(emotionCache.sheet as any)._insertTag(tag)
      })
      // reset cache to reapply global styles
      clientStyleData?.reset()
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width,initial-scale=1" />
          {title ? <title>{title}</title> : null}
          <Meta />
          <Links />
          {serverSyleData?.map(({key, ids, css}) => (
            <style
              key={key}
              data-emotion={`${key} ${ids.join(" ")}`}
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{__html: css}}
            />
          ))}
        </head>
        <body>
          <Chakra>{children}</Chakra>
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </body>
      </html>
    )
  }
)

export default function App() {
  return (
    <Document>
      <Layout>
        <Outlet />
      </Layout>
    </Document>
  )
}

export function CatchBoundary() {
  let caught = useCatch()

  return (
    <Document title={`${caught.status} ${caught.statusText}`}>
      <Layout>
        <Box as="pre" fontSize="xl" padding={4} backgroundColor="red.300">
          [CatchBoundary]: {caught.status} {caught.statusText}
        </Box>
      </Layout>
    </Document>
  )
}

export function ErrorBoundary({error}: {error: Error}) {
  console.error(error)

  return (
    <Document title="Uh-oh!">
      <Layout>
        <Box as="pre" fontSize="xl" padding={4} backgroundColor="red.300">
          [ErrorBoundary]: There was an error: {error.message}
        </Box>
      </Layout>
    </Document>
  )
}
