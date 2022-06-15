import {Box, HStack, Link as ChakraLink, Spacer} from "@chakra-ui/react"
import {NavLink} from "@remix-run/react"
import {ColorModeSwitcher} from "~/components/color-mode-switcher"

export function Layout({children}: {children: React.ReactNode}) {
  return (
    <Box>
      <HStack as="nav" spacing={4} p={4}>
        <ChakraLink as={NavLink} to="/">
          Home
        </ChakraLink>
        <ChakraLink as={NavLink} to="/i-dont-exist">
          No route
        </ChakraLink>
        <ChakraLink as={NavLink} to="/route-with-error">
          Error
        </ChakraLink>
        <ChakraLink as={NavLink} to="/good-route">
          Real route
        </ChakraLink>
        <Spacer />
        <ColorModeSwitcher />
      </HStack>
      <Box as="main" p={4}>
        {children}
      </Box>
    </Box>
  )
}
