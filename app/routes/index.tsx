import {Box, Heading, HStack, Link as ChakraLink} from "@chakra-ui/react"
import {Link} from "@remix-run/react"

export default function Index() {
  return (
    <Box fontFamily="system-ui, sans-serif" lineHeight={1.4}>
      <Heading as="h1" color="purple.400">
        Welcome to Remix with Chakra UI!
      </Heading>
      <HStack spacing={4}>
        <ChakraLink href="https://remix.run/docs" isExternal>
          Remix Docs
        </ChakraLink>
        <ChakraLink
          href="https://chakra-ui.com/docs/getting-started"
          isExternal
        >
          Chakra UI Docs
        </ChakraLink>
        <ChakraLink as={Link} color="red.400" to="/nothing-here">
          Nothing here
        </ChakraLink>
      </HStack>
    </Box>
  )
}
