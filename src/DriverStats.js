import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Tag, Heading, Flex, Box, Stack, Tabs, TabList, TabPanels, Tab, TabPanel, Skeleton, Stat, StatLabel, StatNumber, StatHelpText, StatArrow, StatGroup, } from "@chakra-ui/react";
import Statistics from "./components/Statistics";
import License from "./components/License";
export default function DriverStats() {
    const percentile = (arr, num) => {
        let totalPlayers = arr.length
        let betterThan = arr.filter((item) => item <= num).length
        let percentile = Math.round(betterThan / totalPlayers * 100)
        if (100-percentile <= 50) {
            return `Top ${100-percentile}%`
        } else {
            return `Bottom ${percentile}%`
        }
    }

    const params = useParams();

    const [data, setData] = useState([])
    const [memberProfile, setMemberProfile] = useState([])
    const [userInput, setUserInput] = useState()
    const [loading, setLoading] = useState(true)
    const [dateAndTime, setDateAndTime] = useState('')
    const [allIratings, setAllIratings] = useState({})

    useEffect(() => {
        setLoading(true)
        Promise.all([
            fetch(`/member_profile?cust_id=${params.clientId}`).then(value => value.json()),
            fetch(`/stats_member_career?cust_id=${params.clientId}`).then(value => value.json()),
            fetch(`/members?category=Oval&column=IRATING`).then(value => value.json()),
            fetch(`/members?category=Road&column=IRATING`).then(value => value.json()),
            fetch(`/members?category=Dirt_Oval&column=IRATING`).then(value => value.json()),
            fetch(`/members?category=Dirt_Road&column=IRATING`).then(value => value.json())
          ]).then(allResponses => {
            setMemberProfile(allResponses[0])
            setData(allResponses[1])
            setAllIratings({"oval": allResponses[2], "road": allResponses[3], "dirt_oval": allResponses[4], "dirt_road": allResponses[5]})
            setLoading(false)
          })
    }, [])

    const labelNames = {
        "starts": "Starts",
        "wins": "Wins",
        "top5": "Top 5",
        "poles": "Poles",
        "avg_start_position": "Avg. Start Position",
        "avg_finish_position": "Avg. Finish Position",
        "laps": "Laps",
        "laps_led": "Laps Led",
        "avg_incidents": "Avg. Incidents",
        "avg_points": "Avg. Points",
        "win_percentage": "Win Percentage",
        "top5_percentage": "Top 5 Percentage",
        "laps_led_percentage": "Laps Led Percentage",
        "total_club_points": "Total Club points"
    }


    return (
        <Skeleton isLoaded={!loading}>
            <Stack py="10vh" px="10vw" spacing="20px">
                <Stack spacing="20px">
                    <Heading as="h1">
                        {memberProfile.member_info?.display_name}
                    </Heading>
                    <Tag w="fit-content" colorScheme="green">{memberProfile.member_info?.club_name}</Tag>
                </Stack>
                <Tabs>
                    <TabList>
                        {data.stats?.map((tab, index) => (
                            <Tab key={index}>{tab.category}</Tab>
                        ))}
                    </TabList>
                    <TabPanels>
                        {data.stats?.map((tab, index) => {
                            let memberInfoStats = memberProfile.member_info?.licenses.find(obj => { return obj.category_id === tab.category_id })
                            return (
                                <TabPanel p={4} key={index}>
                                    <Flex wrap="wrap" justify="space-between">
                                        <Stack spacing="20px" bg="gray.700" borderRadius="15px" padding="15px" margin="10px">
                                            <StatGroup>
                                                <Stat>
                                                    <StatLabel>iRating</StatLabel>
                                                    <StatNumber>{memberInfoStats?.irating}</StatNumber>
                                                    <StatHelpText>{percentile(allIratings[memberInfoStats?.category], memberInfoStats?.irating)}</StatHelpText>
                                                </Stat>
                                                <Stat>
                                                    <StatLabel>ttRating</StatLabel>
                                                    <StatNumber>{memberInfoStats?.tt_rating}</StatNumber>
                                                </Stat>
                                            </StatGroup>
                                            <Stack spacing="20px">
                                                <License license={memberInfoStats?.group_name} sr={memberInfoStats?.safety_rating} />
                                            </Stack>
                                        </Stack>

                                        <Flex flex="1" bg="gray.700" borderRadius="15px" padding="15px" margin="10px" flexWrap="wrap" justifyContent="flex-start">
                                            {
                                                Object.keys(tab).map(
                                                    (key) => {
                                                        if (["category", "category_id"].includes(key)) {
                                                            return
                                                        } else {
                                                            return (
                                                                <Stat padding={"20px"} w="200px" flex="none">
                                                                    <StatLabel>{labelNames[key]}</StatLabel>
                                                                    <StatNumber>{tab[key]}</StatNumber>
                                                                </Stat>
                                                            )
                                                        }
                                                    }
                                                )
                                            }
                                        </Flex>
                                    </Flex>
                                </TabPanel>
                            )
                        })}
                    </TabPanels>
                </Tabs>
            </Stack>
        </Skeleton>
    )
}