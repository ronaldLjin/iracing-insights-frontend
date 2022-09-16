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
    LinkOverlay,
    useColorModeValue,
} from '@chakra-ui/react';

export default function Profile({ name, country, club, irating, wins, className, cust_id, rank }) {
    let avatarColors = {
        '# 1': '#FFD700',
        "# 2": "#C0C0C0",
        '# 3': "#CD7F32"
    }
    return (
        <LinkOverlay href={`/driver-stats/${cust_id}`}>
            <Center >
                <Box
                    w={'175px'}
                    bg={'white'}
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
                            name={rank}
                            css={{
                                border: '2px solid white',
                                background: avatarColors[rank]
                            }}
                        />
                    </Flex>

                    <Box p={6} >
                        <Stack spacing={0} align={'center'} mb={5}>
                            <Heading textAlign="center" fontSize={'md'} fontWeight={500} fontFamily={'body'}>
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
        </LinkOverlay>
    );
}