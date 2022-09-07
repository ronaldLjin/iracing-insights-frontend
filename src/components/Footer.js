import {
    Box,
    chakra,
    Container,
    Heading,
    Link,
    Stack,
    Text,
    useColorModeValue,
    VisuallyHidden,
  } from '@chakra-ui/react';
  import { ReactNode } from 'react';
  
  const Logo = () => {
    return (
      <Heading size="md">iRacing Insights</Heading>
    );
  };
  
  const SocialButton = ({
    children,
    label,
    href,
  }) => {
    return (
      <chakra.button
        bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
        rounded={'full'}
        w={8}
        h={8}
        cursor={'pointer'}
        as={'a'}
        href={href}
        display={'inline-flex'}
        alignItems={'center'}
        justifyContent={'center'}
        transition={'background 0.3s ease'}
        _hover={{
          bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
        }}>
        <VisuallyHidden>{label}</VisuallyHidden>
        {children}
      </chakra.button>
    );
  };
  
  export default function SmallCentered() {
    return (
      <Box
        bg={useColorModeValue('gray.50', 'gray.900')}
        color={useColorModeValue('gray.700', 'gray.200')}
        py={'20px'}
        px={'10vw'}
        >
        <Container
          as={Stack}
          maxW={'6xl'}
          py={4}
          spacing={4}
          justify={'center'}
          align={'center'}>
          <Logo />
          <Stack direction={'row'} spacing={6}>
            <Link href={'/'}>Home</Link>
            <Link href={'/percentile-calculator'}>Percentile Calculator</Link>
            <Link href={'/leaderboard/Road/1'}>Leaderboard</Link>
          </Stack>
        </Container>
  
        <Box
          borderTopWidth={1}
          borderStyle={'solid'}
          borderColor={useColorModeValue('gray.200', 'gray.700')}>
          <Container
            as={Stack}
            maxW={'6xl'}
            py={4}
            direction={{ base: 'column', md: 'row' }}
            spacing={4}
            justify={{ base: 'center', md: 'space-between' }}
            align={{ base: 'center', md: 'center' }}>
            <Text>© 2022 iRacing Insights. All rights reserved. iRacing Insights isn’t endorsed by iRacing and doesn’t reflect the views or opinions of iRacing or anyone officially involved in producing or managing iRacing. </Text>
          </Container>
        </Box>
      </Box>
    );
  }