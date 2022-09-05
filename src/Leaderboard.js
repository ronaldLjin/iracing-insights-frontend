import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import {
    Stack,
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Skeleton,
    Image,
    Tag,
    Link
} from "@chakra-ui/react";
export default function Leaderboard() {
    const params = useParams();
    const page = params.pageNumber
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([])

    useEffect(() => {
        setLoading(true)
        fetch(`/members?category=Oval&page=${page}`).then(
            res => res.json()
        ).then(
            data => {
                setData(data)
                setLoading(false)
            }
        )
    }, [])

    console.log(data)
    return (
        <Skeleton isLoaded={!loading}>
            <Stack py="10vh" px="10vw" spacing="20px">
                <Table variant='simple'>
                    <Thead>
                        <Tr>
                            {
                                !loading && Object.keys(data.drivers[0]).map((key) => {
                                    if (key === "CUSTID") {
                                        return
                                    } else {
                                        return <Th>{key}</Th>
                                    }
                                })
                            }
                        </Tr>
                    </Thead>
                    <Tbody>
                        {
                            data.drivers?.map(
                                (driver) => {

                                    return (
                                        <Tr>
                                            {Object.keys(driver).map(function (key) {
                                                if (key === "RANK") {
                                                    return (
                                                        <Td>{driver[key] + 1}</Td>
                                                    )
                                                } else if (key === "DRIVER") {
                                                    return (
                                                        <Td><Link target="_blank" href={`/driver-stats/${driver["CUSTID"]}`}>{driver[key]}</Link></Td>
                                                    )
                                                } else if (key === "LOCATION") {
                                                    return (
                                                        <Td>
                                                            <Image src={`https://countryflagsapi.com/svg/${driver[key]}`} w="30px" />
                                                        </Td>
                                                    )
                                                } else if (key === "CLASS") {
                                                    let color = ""
                                                    if (driver[key][0] === "R") {
                                                        color = "red.400"
                                                    } else if (driver[key][0] === "D") {
                                                        color = "orange.400"
                                                    } else if (driver[key][0] === "C") {
                                                        color = "yellow.400"
                                                    } else if (driver[key][0] === "B") {
                                                        color = "green.400"
                                                    } else if (driver[key][0] === "A") {
                                                        color = "blue.400"
                                                    } else if (driver[key][0] === "P") {
                                                        color = "blackAlpha.600"
                                                    }
                                                    return (
                                                        <Td><Tag bg={color}>{driver[key]}</Tag></Td>
                                                    )
                                                } else if (key === "CUSTID") {
                                                    return
                                                } else {
                                                    return (
                                                        <Td>{driver[key]}</Td>
                                                    )
                                                }
                                            })
                                            }
                                        </Tr>
                                    )
                                }
                            )
                        }
                    </Tbody>
                </Table>
            </Stack>
        </Skeleton>
    )
}