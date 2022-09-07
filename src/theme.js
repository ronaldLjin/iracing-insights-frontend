// theme.js

// 1. import `extendTheme` function
import { extendTheme } from '@chakra-ui/react'


const theme = extendTheme({
    config: {
        initialColorMode: 'dark',
        useSystemColorMode: false,
    },
    components: {
        Input: {
            baseStyle: {
                field: {
                  bg: 'white',
                  borderColor: 'rgb(226,232,240)',
                  color: 'black',
                  ':focus': {
                    borderColor: '#a970ff',
                    bg: 'white'
                  }
                }
              },
              sizes: {},
              variants: {},
              defaultProps: {
                variant: null // null here
              }
            }
    }
})

export default theme