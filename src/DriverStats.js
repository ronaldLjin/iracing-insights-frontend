import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Tag, Heading, Flex, Box, Stack, Tabs, TabList, TabPanels, Tab, TabPanel, Skeleton, Stat, StatLabel, StatNumber, StatHelpText, StatArrow, StatGroup, } from "@chakra-ui/react";
import Statistics from "./components/Statistics";
import { Helmet } from "react-helmet";
import License from "./components/License";
import PageNotFound from "./PageNotFound";
export default function DriverStats() {
    const percentile = (arr, num) => {
        let totalPlayers = arr.length
        let betterThan = arr.filter((item) => item < num).length
        let rank = totalPlayers - betterThan
        let percentile = Math.round(betterThan / totalPlayers * 1000) / 10
        let inversePercentile = Math.round((100 - percentile) * 10) / 10
        if (inversePercentile <= 50) {
            if (inversePercentile === 0) {
                return `#${rank}/${totalPlayers}`
            } else {
                return `Top ${inversePercentile}%`
            }
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
            fetch(`https://iracing-insights-backend.herokuapp.com/member_profile?cust_id=${params.clientId}`).then(value => value.json()),
            fetch(`https://iracing-insights-backend.herokuapp.com/stats_member_career?cust_id=${params.clientId}`).then(value => value.json()),
            fetch(`https://iracing-insights-backend.herokuapp.com/members?category=Oval&column=IRATING`).then(value => value.json()),
            fetch(`https://iracing-insights-backend.herokuapp.com/members?category=Road&column=IRATING`).then(value => value.json()),
            fetch(`https://iracing-insights-backend.herokuapp.com/members?category=Dirt_Oval&column=IRATING`).then(value => value.json()),
            fetch(`https://iracing-insights-backend.herokuapp.com/members?category=Dirt_Road&column=IRATING`).then(value => value.json())
        ]).then(allResponses => {
            setMemberProfile(allResponses[0])
            setData(allResponses[1])
            setAllIratings({ "oval": allResponses[2]['data'], "road": allResponses[3]['data'], "dirt_oval": allResponses[4]['data'], "dirt_road": allResponses[5]['data'] })
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

    if (isNaN(parseInt(params.clientId))) {
        return (
            <PageNotFound></PageNotFound>
        )
    } else {
        return (
            <Stack py="10vh" px="10vw" spacing="20px">
                <Helmet>
                    <title>{`iRacing Insights | ${memberProfile.member_info?.display_name}'s Stats`}</title>
                </Helmet>
                <Skeleton isLoaded={!loading} minW="100%" minH="100vh">
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
                                    <TabPanel p={"20px 0 20px 0"} key={index}>
                                        <Flex wrap="wrap" justify="space-between" margin="-10px">
                                            <Stack spacing="20px" borderRadius="15px" padding="15px" margin="10px">
                                                <StatGroup>
                                                    <Stat>
                                                        <StatLabel>iRating</StatLabel>
                                                        <StatNumber>{memberInfoStats?.irating}</StatNumber>
                                                        <StatHelpText>{
                                                            memberInfoStats?.group_name === "Rookie" ? "N/A" : percentile(allIratings[memberInfoStats?.category], memberInfoStats?.irating)
                                                        }</StatHelpText>
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

                                            <Flex flex="1" bg="gray.100" borderRadius="15px" padding="15px" margin="10px" flexWrap="wrap" justifyContent="flex-start">
                                                {
                                                    Object.keys(tab).map(
                                                        (key) => {
                                                            if (["category", "category_id"].includes(key)) {
                                                                return
                                                            } else {
                                                                return (
                                                                    <Stat padding={"20px"} className="driver-stat" flex="none">
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
                </Skeleton>
            </Stack>
        )
    }
}