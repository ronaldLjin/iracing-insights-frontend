import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Stack, Skeleton, Table, Thead, Tr, Tbody, Td, Th, Link, Heading } from "@chakra-ui/react";

export default function DriverSearch() {
    let params = useParams()

    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([])

    useEffect(() => {
        setLoading(true)
        fetch(`https://iracing-insights-backend.herokuapp.com/player_search?search_term=${params.searchTerm}`).then(
            res => res.json()
        ).then(
            data => {
                if (data.length === 1) {
                    window.location.href = `/driver-stats/${data[0]['cust_id']}`
                }
                setData(data)
                setLoading(false)
            }
        )
    }, [])

    return (
        <Stack py="10vh" px="10vw" spacing="20px">
            <Link href="/">Go back</Link>
            <Heading size="lg">Search results for {params.searchTerm}</Heading>
            <Skeleton isLoaded={!loading}>
                <Table variant='simple'>
                    <Thead>
                        <Tr>
                            <Th>Driver Name</Th>
                            <Th>Customer ID</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {
                            data.map(
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
            </Skeleton>
        </Stack>
    )
}