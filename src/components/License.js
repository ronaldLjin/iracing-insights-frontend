import { Flex, Heading, Text, Divider} from "@chakra-ui/react"
export default function License({ license, sr }) {
    let color = ""
    if (license === "Rookie") {
        color = "red.400"
    } else if (license === "Class D") {
        color = "orange.400"
        license = "D"
    } else if (license === "Class C") {
        color = "yellow.400"
        license = "C"
    } else if (license === "Class B") {
        color = "green.400"
        license = "B"
    } else if (license === "Class A") {
        color = "blue.400"
        license = "A"
    } else if (license === "Pro/WC") {
        color = "blackAlpha.800"
    }
    return (
        <Flex backgroundColor={color} padding={6} borderRadius={"15px"} direction="column" alignItems="center" w="160px" h="175px" justifyContent="space-between" color="white">
            <Text size="lg">CLASS</Text>
            <Heading as="h3" size="lg">{license}</Heading>
            <Divider borderBottomWidth={"2px"}/>
            <p>SR: {sr}</p>
            <Divider borderBottomWidth={"2px"} />
        </Flex>
    )
}