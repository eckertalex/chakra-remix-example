import {ChakraProvider, extendTheme} from "@chakra-ui/react"

type ChakraProps = {
  children: React.ReactNode
}

const theme = extendTheme({
  config: {
    initialColorMode: "system",
    useSystemColorMode: false,
  },
})

export function Chakra({children}: ChakraProps) {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>
}
