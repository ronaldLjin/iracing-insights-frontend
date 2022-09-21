import { Box, FormLabel, Input, TableContainer, Table, Thead, Tr, Th, Td, Tbody, Link, Text, Progress, useOutsideClick, InputGroup, InputLeftElement } from "@chakra-ui/react"
import { useState, useEffect, useRef } from "react"
import { SearchIcon } from "@chakra-ui/icons"
export default function SearchBar({ variant, label }) {
    const [driverName, setDriverName] = useState(null)
    const [searchResults, setSearchResults] = useState([])
    const [searchIsLoading, setSearchIsLoading] = useState(false)
    const [driverNameIsFocused, setDriverNameIsFocused] = useState(false)
    const ref = useRef()

    useEffect(() => {
        if (!driverName) {
            return
        } else {
            const delay = setTimeout(() => {
                fetch(`https://iracing-insights-backend.herokuapp.com/player_search?search_term=${driverName}`).then(
                    res => res.json()
                ).then(
                    data => {
                        setSearchResults(data)
                        console.log(data)
                    }
                )
                setSearchIsLoading(false)
            }, 1000)
            return () => clearTimeout(delay)
        }
    }, [driverName])

    useOutsideClick({
        ref: ref,
        handler: () => setDriverNameIsFocused(false),
    })

    return (
        <Box pos={"relative"} ref={ref}>
            {
                (label === true) && <FormLabel htmlFor="driver_name">Driver Name</FormLabel>
            }
            <InputGroup>
                <InputLeftElement
                    pointerEvents='none'
                    children={<SearchIcon color='gray.300' />}
                />
                <Input variant={variant} id="driver_name" name="driver_name" placeholder='e.x. John Doe' autoComplete="off" onChange={event => {
                    setSearchIsLoading(true)
                    setDriverName(event.currentTarget.value)
                }} onFocus={event => setDriverNameIsFocused(true)}>
                </Input>
            </InputGroup>
            {(searchResults !== [] && driverNameIsFocused) &&
                <Box bg="white" position="absolute" zIndex="999" w="100%" maxH="200px" overflow="auto" rounded={"md"} p={4} boxShadow={'xl'} css={{
                    '&::-webkit-scrollbar': {
                        width: '6px',
                        height: '6px',
                    },
                    '&::-webkit-scrollbar-track': {
                        borderRadius: '10px',
                        background: 'rgba(0,0,0,0.1);',
                    },
                    '&::-webkit-scrollbar-thumb': {
                        background: 'rgba(0,0,0,0.3);',
                        borderRadius: '10px',
                    },
                }}>
                    {searchIsLoading === true && <Progress size='xs' isIndeterminate />}
                    <TableContainer w="100%">
                        {searchResults.length !== 0 ?
                            <Table variant='simple'>
                                <Thead>
                                    <Tr>
                                        <Th>Driver Name</Th>
                                        <Th>Customer ID</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {
                                        searchResults.map(
                                            (driver) => {

                                                return (
                                                    <Tr>
                                                        <Td><Link href={`/driver-stats/${driver["cust_id"]}`}>{driver["display_name"]}</Link></Td>
                                                        <Td><Link href={`/driver-stats/${driver["cust_id"]}`}>{driver["cust_id"]}</Link></Td>
                                                    </Tr>
                                                )
                                            }
                                        )
                                    }
                                </Tbody>
                            </Table>
                            : <Text>No results</Text>
                        }
                    </TableContainer>
                </Box>
            }
        </Box>
    )
}