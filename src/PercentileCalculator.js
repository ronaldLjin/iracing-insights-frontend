import { useState, useEffect } from 'react'
import Plot from 'react-plotly.js';
import { Stack, HStack, FormControl, Button, Flex, Select, Skeleton, FormLabel, Box, Text, Heading, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, Stat, StatLabel, StatNumber, StatGroup, } from '@chakra-ui/react'
import { Form, Formik, Field } from "formik"
import theme from './theme'
import Statistics from './components/Statistics';

export default function Distribution() {
    const percentile = (arr, num) => {
        let totalPlayers = arr.length
        let betterThan = arr.filter((item) => item < num).length
        let rank = totalPlayers - betterThan
        let percentile = Math.round(betterThan / totalPlayers * 100000) / 1000
        rank = `${rank} out of ${totalPlayers}`
        return { percentile, rank, betterThan }
    }

    const median = arr => {
        const mid = Math.floor(arr.length / 2),
            nums = [...arr].sort((a, b) => a - b);
        return Math.round(arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2);
    };

    const average = arr => Math.round(arr.reduce((a, b) => a + b, 0) / arr.length);

    const [data, setData] = useState([])
    const [date, setDate] = useState('')
    const [userInput, setUserInput] = useState()
    const [loading, setLoading] = useState(true)
    const [category, setCategory] = useState('Road')
    const [statistic, setStatistic] = useState('iRating')
    const [percentileDisplay, setPercentileDisplay] = useState({ "percentile": `--`, "rank": `--`, "betterThan": `--` });

    const handleUserInput = value => {
        if (value === '') {
            setPercentileDisplay({ "percentile": `--`, "rank": `--`, "betterThan": `--` })
        } else {
            setPercentileDisplay(percentile(data, value));
        }
    }

    const loadDistribution = (category, statistic) => {
        setLoading(true)
        fetch(`https://iracing-insights-backend.herokuapp.com/members?category=${category}&column=${statistic}`).then(
            res => res.json()
        ).then(
            response => {
                // const csv = Papa.parse(data, { header: true });
                // const parsedData = csv?.data;
                setDate(response['datetime'])
                setData(response['data'])
                setPercentileDisplay({ "percentile": `--`, "rank": `--`, "betterThan": `--` })
                setLoading(false)
            }
        )
    }

    useEffect(() => {
        loadDistribution(category, statistic)
    }, [])

    return (
        <Stack py="10vh" px="10vw" spacing="20px">
            <Text>Data is updated automatically approximately every hour.</Text>
            <Skeleton isLoaded={!loading}><Text as="sub">Last updated: {date}</Text></Skeleton>
            <Formik
                initialValues={{
                    category: 'Road',
                    statistic: 'iRating',
                }}
                onSubmit={async (values) => {
                    // alert(JSON.stringify(values, null, 2));
                    setCategory(values.category)
                    setStatistic(values.statistic)
                    loadDistribution(values.category, values.statistic)
                }}
            >
                <Form>
                    <Flex direction="row" alignItems="flex-end" flexWrap="wrap">
                        <Box paddingRight="20px">
                            <FormControl>
                                <FormLabel>Category</FormLabel>

                                <Field id="category" name="category" as={Select}>
                                    <option value='Road'>Road</option>
                                    <option value='Oval'>Oval</option>
                                    <option value='Dirt_Road'>Dirt Road</option>
                                    <option value='Dirt_Oval'>Dirt Oval</option>
                                </Field>

                            </FormControl>
                        </Box>
                        <Box paddingRight="20px">
                            <FormControl>
                                <FormLabel>Statistic</FormLabel>
                                <Field id="statistic" name="statistic" as={Select}>
                                    <option value='Starts'>Starts</option>
                                    <option value='Wins'>Wins</option>
                                    <option value='Avg_start_pos'>Average Start Position</option>
                                    <option value='Avg_finish_pos'>Average Finish Position</option>
                                    <option value='Avg_points'>Average Points</option>
                                    <option value='Top25pcnt'>Top 25%</option>
                                    <option value='Laps'>Laps</option>
                                    <option value='Lapslead'>Laps Lead</option>
                                    <option value='Avg_inc'>Average Incidents</option>
                                    <option value='class'>Safety Rating</option>
                                    <option value='iRating'>iRating</option>
                                    <option value='ttrating'>ttRating</option>
                                    <option value='Tot_clubpoints'>Total Club Points</option>
                                    <option value='Champpoints'>Champ Points</option>
                                </Field>
                            </FormControl>
                        </Box>
                        <Button type='submit'>
                            Submit
                        </Button>
                    </Flex>
                </Form>
            </Formik >
            <Skeleton isLoaded={!loading}>
                <Plot
                    data={[
                        {
                            x: data,
                            type: 'histogram',
                            mode: 'lines+markers',
                            marker: { color: 'red' },
                        }
                    ]}
                    layout={{
                        title: `iRacing ${statistic} statistics for ${category} drivers on ${date}`,
                        bargap: 0.5,
                        paper_bgcolor: 'rgba(0,0,0,0)',
                        plot_bgcolor: 'rgba(0,0,0,0)',
                        font: {
                            color: 'white',
                            family: theme.fonts.body
                        },
                        xaxis: {
                            title: {
                                text: statistic,
                            },
                        },
                        yaxis: {
                            title: {
                                text: 'Frequency',
                            }
                        }
                    }}
                    config={{displaylogo: false}}
                    useResizeHandler={true}
                    style={{ width: "100%", height: "100%" }}
                />
            </Skeleton>
            <Skeleton isLoaded={!loading}>

                <Stack bg="gray.700" borderRadius="15px" padding="15px" spacing="20px">
                    <Heading as="h2" size='lg'>
                        Quick Stats
                    </Heading>
                    <Statistics stats={
                        {
                            Mean: average(data),
                            Median: median(data),
                            Max: data[0]
                        }
                    }
                    />
                    {/* <HStack spacing="20px" mt="50px" display="flex" flexWrap="wrap">
                        <Box bg="gray.600" borderRadius="15px" padding="15px">
                            <Heading as="h2" size='lg'>
                                Mean
                            </Heading>
                            <Heading size='xl'>{average(data)}</Heading>
                        </Box>
                        <Box bg="gray.600" borderRadius="15px" padding="15px">
                            <Heading as="h2" size='lg'>
                                Median
                            </Heading>
                            <Heading size='xl'>{median(data)}</Heading>
                        </Box>
                        <Box bg="gray.600" borderRadius="15px" padding="15px">
                            <Heading as="h2" size='lg'>
                                Max
                            </Heading>
                            <Heading size='xl'>{data[0]}</Heading>
                        </Box>
                    </HStack> */}
                </Stack>
            </Skeleton>

            <Skeleton isLoaded={!loading}>
                <Stack bg="gray.700" borderRadius="15px" padding="15px" spacing="20px">
                    <Heading as="h2" size='lg'>
                        Percentile Calculator
                    </Heading>
                    <FormControl>
                        <FormLabel>
                            {statistic}
                        </FormLabel>
                        <NumberInput min={0}>
                            <NumberInputField placeholder={`Input your ${statistic}`} onChange={event => handleUserInput(event.currentTarget.value)} />
                        </NumberInput>
                    </FormControl>
                    <Text >Percentile: {percentileDisplay['percentile']}</Text>
                    <Text>Rank: {percentileDisplay['rank']}</Text>
                    <Text>Higher than: {percentileDisplay['betterThan']}</Text>
                </Stack>
            </Skeleton>
        </Stack>
    )
}