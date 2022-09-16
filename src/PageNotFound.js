import { Box, Heading, Text, Button, Flex } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
export default function PageNotFound() {
    return (
        <Flex minH="80vh" direction="column" justify="center" alignItems="center" py="10vh" px="10vw">
            <Helmet>
                <title>{`iRacing Insights | Page Not Found`}</title>
            </Helmet>
            <Box textAlign="center">
                <Heading
                    display="inline-block"
                    as="h2"
                    size="2xl"
                    bgGradient="linear(to-r, teal.400, teal.600)"
                    backgroundClip="text">
                    404
                </Heading>
                <Text fontSize="18px" mt={3} mb={2}>
                    Page Not Found
                </Text>
                <Text color={'gray.500'} mb={6}>
                    The page you're looking for does not seem to exist
                </Text>

                <a href="/">
                    <Button
                        colorScheme="teal"
                        bgGradient="linear(to-r, teal.400, teal.500, teal.600)"
                        color="white"
                        variant="solid">
                        Go to Home
                    </Button>
                </a>
            </Box>
        </Flex>
    );
}