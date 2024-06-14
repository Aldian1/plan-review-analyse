import { Box, Flex, Link, Spacer } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const Navbar = () => {
  return (
    <Box bg="teal.500" p={4}>
      <Flex maxW="1200px" mx="auto" align="center">
        <Link as={RouterLink} to="/" color="white" fontWeight="bold" fontSize="xl">
          Home
        </Link>
        <Spacer />
      </Flex>
    </Box>
  );
};

export default Navbar;