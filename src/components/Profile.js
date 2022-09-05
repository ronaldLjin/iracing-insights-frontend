import {
    Heading,
    Avatar,
    Box,
    Center,
    Image,
    Flex,
    Text,
    Stack,
    Button,
    Link,
    useColorModeValue,
} from '@chakra-ui/react';

export default function Profile({ name, country, club, irating, wins, className, cust_id }) {
    return (
        <Link target="_blank" href={`/driver-stats/${cust_id}`}>
            <Center>
                <Box
                    w={'200px'}
                    bg={useColorModeValue('white', 'gray.800')}
                    boxShadow={'2xl'}
                    rounded={'md'}
                    overflow={'hidden'}
                    h={'300px'}
                >
                    <Image
                        h={'120px'}
                        w={'full'}
                        src={
                            `https://countryflagsapi.com/svg/${country}`
                        }
                        objectFit={'cover'}
                    />
                    <Flex justify={'center'} mt={-12}>
                        <Avatar
                            size='lg'
                            name={name}
                            css={{
                                border: '2px solid white',
                            }}
                        />
                    </Flex>

                    <Box p={6}>
                        <Stack spacing={0} align={'center'} mb={5}>
                            <Heading fontSize={'md'} fontWeight={500} fontFamily={'body'}>
                                {name}
                            </Heading>
                            <Text color={'gray.500'}>{club}</Text>
                        </Stack>

                        <Stack direction={'row'} justify={'center'} spacing={6}>
                            <Stack spacing={0} align={'center'}>
                                <Text fontWeight={600}>{irating}</Text>
                                <Text fontSize={'sm'} color={'gray.500'}>
                                    iRating
                                </Text>
                            </Stack>
                            <Stack spacing={0} align={'center'}>
                                <Text fontWeight={600}>{wins}</Text>
                                <Text fontSize={'sm'} color={'gray.500'}>
                                    Wins
                                </Text>
                            </Stack>
                        </Stack>
                    </Box>
                </Box>
            </Center >
        </Link>
    );
}