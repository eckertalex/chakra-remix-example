import {Box, Heading} from "@chakra-ui/react"
import type {MetaFunction} from "@remix-run/node"

export const meta: MetaFunction = () => {
  return {
    title: "Error route",
    description: "Generate Text missing error",
  }
}

// Don't import Text from @chakra-ui/react
// If you do the error won't be thrown
export default function RouteWithError() {
  return (
    <Box>
      {/* @ts-ignore */}
      <Text>If you see this then you imported Text</Text>
    </Box>
  )
}

export function CatchBoundary() {
  return (
    <Box>
      <Heading as="h2">I caught some condition</Heading>
    </Box>
  )
}

export function ErrorBoundary({error}: {error: Error}) {
  return (
    <Box bg="red.400" px={4} py={2}>
      <Heading as="h3" size="lg" color="white">
        Something is really wrong!
      </Heading>
      <Box color="white" fontSize={22}>
        {error.message}
      </Box>
    </Box>
  )
}
