import { Box, Input, FormControl, Button, FormLabel, Select, Stack, NumberInput, NumberInputField, Flex, Heading, Text, Image, Skeleton } from "@chakra-ui/react"
import { Form, Formik, Field } from "formik"
import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import Profile from "./components/Profile"
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
export default function Home() {
    const navigate = useNavigate()
    const categories = ['Road', 'Oval', 'Dirt_Road', 'Dirt_Oval']
    const [topPlayers, setTopPlayers] = useState([])
    const [loading, setLoading] = useState(true)
    const [category, setCategory] = useState('')
    const [custId, setCustId] = useState('')
    const [driverName, setDriverName] = useState('')

    useEffect(() => {
        setLoading(true)
        let c = categories[Math.floor(Math.random() * categories.length)]
        fetch(`https://iracing-insights-backend.herokuapp.com/members/top_players?category=${c}`).then(
            res => res.json()
        ).then(
            data => {
                setTopPlayers(data)
                setLoading(false)
                setCategory(c)
            }
        )
    }, [])

    return (
        <Flex className="container hero-image">
            <Box className="top-players-box">
                {/* <Flex className="top-players" width='min-content' justifyContent='center' marginTop="20px">
                </Flex> */}
                <Swiper
                    // install Swiper modules
                    slidesPerView={'auto'}
                    onSwiper={(swiper) => console.log(swiper)}
                    onSlideChange={() => console.log('slide change')}
                >
                    <SwiperSlide className="top-players-swiper">
                        <Skeleton isLoaded={!loading} className="top-player-profile">
                            <Profile name={topPlayers[0]?.DRIVER} country={topPlayers[0]?.LOCATION} club={topPlayers[0]?.CLUB_NAME} irating={topPlayers[0]?.IRATING} wins={topPlayers[0]?.WINS} cust_id={topPlayers[0]?.CUSTID} rank="# 1" />
                        </Skeleton >
                    </SwiperSlide>
                    <SwiperSlide className="top-players-swiper">
                        <Skeleton isLoaded={!loading} className="top-player-profile">
                            <Profile name={topPlayers[1]?.DRIVER} country={topPlayers[1]?.LOCATION} club={topPlayers[1]?.CLUB_NAME} irating={topPlayers[1]?.IRATING} wins={topPlayers[1]?.WINS} cust_id={topPlayers[1]?.CUSTID} rank="# 2" />
                        </Skeleton>
                    </SwiperSlide>
                    <SwiperSlide className="top-players-swiper">
                        <Skeleton isLoaded={!loading} className="top-player-profile">
                            <Profile name={topPlayers[2]?.DRIVER} country={topPlayers[2]?.LOCATION} club={topPlayers[2]?.CLUB_NAME} irating={topPlayers[2]?.IRATING} wins={topPlayers[2]?.WINS} cust_id={topPlayers[2]?.CUSTID} rank="# 3" />
                        </Skeleton>
                    </SwiperSlide>
                </Swiper>
            </Box>
            <Stack className="player-search-form" spacing={"20px"}>
                <Box>
                    <Heading>iRacing Stats Tracker</Heading>
                    <Text fontSize="xl">1. Input a name OR customer ID, 2. Click submit</Text>
                </Box>
                <Formik
                    initialValues={{
                        driver_name: "",
                        cust_id: ""
                    }
                    }
                    onSubmit={async (values) => {
                        setCustId(values.cust_id)
                        setDriverName(values.driver_name)
                        if (values.cust_id !== "") {
                            window.location.href = `driver-stats/${values.cust_id}`
                        } else if (values.driver_name !== "") {
                            window.location.href = `driver-search/${values.driver_name}`
                        }
                    }}
                >
                    <Form>
                        <Stack spacing={"20px"}>
                            <FormControl>
                                <FormLabel htmlFor="driver_name">Driver Name</FormLabel>
                                <Field id="driver_name" name="driver_name" _placeholder={{ color: 'blackAlpha.500' }} placeholder='e.x. John Doe' as={Input}>
                                </Field>
                            </FormControl>
                            <FormControl>
                                <FormLabel htmlFor="cust_id">Customer ID</FormLabel>
                                <Field type="number" id="cust_id" name="cust_id" _placeholder={{ color: 'blackAlpha.500' }} as={Input} placeholder='e.x. 00000'>
                                </Field>
                            </FormControl>
                            <Button type='submit' colorScheme="red">
                                Submit
                            </Button>
                        </Stack>
                    </Form>
                </Formik >
            </Stack>

        </Flex>
    )
}