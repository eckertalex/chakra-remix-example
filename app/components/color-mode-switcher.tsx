import type {IconButtonProps} from "@chakra-ui/react"
import {useColorModeValue, IconButton} from "@chakra-ui/react"
import {useFetcher} from "@remix-run/react"
import {Moon as MoonIcon, Sun as SunIcon} from "lucide-react"

type ColorModeSwitcherProps = Omit<IconButtonProps, "aria-label">

export function ColorModeSwitcher(props: ColorModeSwitcherProps) {
  const colorModeFetcher = useFetcher()
  const text = useColorModeValue("dark", "light")
  const SwitchIcon = useColorModeValue(MoonIcon, SunIcon)

  return (
    <colorModeFetcher.Form method="post" action="/api/color-mode">
      <IconButton
        type="submit"
        name="colorMode"
        value={text}
        size="md"
        fontSize="lg"
        variant="ghost"
        colorScheme="purple"
        marginLeft="2"
        icon={<SwitchIcon />}
        aria-label={`Switch to ${text} mode`}
        {...props}
      />
    </colorModeFetcher.Form>
  )
}
