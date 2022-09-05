// theme.js

// 1. import `extendTheme` function
import { extendTheme } from '@chakra-ui/react'


const theme = extendTheme({
    config: {
        initialColorMode: 'dark',
        useSystemColorMode: false,
    },
})

export default theme