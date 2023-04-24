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
    Link,
    Select,
    Box,
    Flex,
    Button,
    Text
} from "@chakra-ui/react";
import { Helmet } from "react-helmet";
import Paragon from "./assets/Paragon";
import RankTwo from "./assets/RankTwo";
import RankThree from "./assets/RankThree";
export default function Leaderboard() {
    const params = useParams();
    const page = parseInt(params.pageNumber)
    const category = params.category
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([])
    const categoryDict = {
        "Dirt_Oval": "Dirt Oval",
        "Road": "Road",
        "Oval": "Oval",
        "Dirt_Road": "Dirt Road"
    }

    useEffect(() => {
        setLoading(true)
        fetch(`https://iracing-insights-backend.herokuapp.com/members?category=${category}&page=${page}`).then(
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
        <Stack py="10vh" px="10vw" spacing="20px">
            <Helmet>
                <title>{`iRacing Insights | ${categoryDict[category]} Leaderboard`}</title>
            </Helmet>
            <Select value={category} onChange={(event) => { window.location.href = `/leaderboard/${event.currentTarget.value}/1` }}>
                <option value='Road'>Road</option>
                <option value='Oval'>Oval</option>
                <option value='Dirt_Road'>Dirt Road</option>
                <option value='Dirt_Oval'>Dirt Oval</option>
            </Select>
            <Skeleton isLoaded={!loading} className="overflow-scroll-gradient">
                <Box overflow="auto" minW="100%" minH="100vh">
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
                                                        if (driver[key] === 0) {
                                                            return (
                                                                <Td><Paragon w="30px"/></Td>
                                                            )
                                                        } else if (driver[key] === 1) {
                                                            return (
                                                                <Td><RankTwo w="30px"/></Td>
                                                            )
                                                        } else if (driver[key] === 2) {
                                                            return (
                                                                <Td><RankThree w="30px"/></Td>
                                                            )
                                                        } else {
                                                            return (
                                                                <Td>{driver[key] + 1}</Td>
                                                            )
                                                        }
                                                    } else if (key === "DRIVER") {
                                                        return (
                                                            <Td><Link target="_blank" href={`/driver-stats/${driver["CUSTID"]}`}>{driver[key]}</Link></Td>
                                                        )
                                                    } else if (key === "LOCATION") {
                                                        let country = driver[key].toLowerCase()
                                                        return (
                                                            <Td>
                                                                <Image src={`https://flagcdn.com/${country}.svg`} w="30px" />
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
                                                            color = "blackAlpha.800"
                                                        }
                                                        return (
                                                            <Td whiteSpace="nowrap"><Tag bg={color} color="white">{driver[key]}</Tag></Td>
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
                </Box>
            </Skeleton>
            <Flex justify="space-between">
                {
                    page > 1 && <Button onClick={(event) => { window.location.href = `/leaderboard/${category}/${page - 1}` }}>Previous</Button>
                }
                <Text>Page {page} of {data.page_count}</Text>
                {
                    page < data.page_count && <Button onClick={(event) => { window.location.href = `/leaderboard/${category}/${page + 1}` }}>Next</Button>
                }
            </Flex>
        </Stack>
    )
}