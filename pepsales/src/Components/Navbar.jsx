import React from "react";
import {
  Box,
  Flex,
  HStack,
  IconButton,
  Button,
  useDisclosure,
  Stack,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon, SunIcon, MoonIcon } from "@chakra-ui/icons";
import { Link, Link as RouterLink } from "react-router-dom";

const Links = [
  { name: "Home", path: "/" },
  { name: "Stocks", path: "/stocks" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

const NavLink = ({ children, to }) => (
  <Button
    as={RouterLink}
    to={to}
    px={2}
    py={1}
    rounded={"md"}
    _hover={{
      textDecoration: "none",
      bg: useColorModeValue("gray.200", "gray.700"),
    }}
  >
    {children}
  </Button>
);

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        <IconButton
          size={"md"}
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label={"Open Menu"}
          display={{ md: "none" }}
          onClick={isOpen ? onClose : onOpen}
        />
        <HStack spacing={8} alignItems={"center"}>
          <Link to={"/"}>
            <Box fontSize="xl" fontWeight="bold">
              Stocker
            </Box>
          </Link>
          <HStack as={"nav"} spacing={4} display={{ base: "none", md: "flex" }}>
            {Links.map((link) => (
              <NavLink key={link.name} to={link.path}>
                {link.name}
              </NavLink>
            ))}
          </HStack>
        </HStack>
        <Flex alignItems={"center"}>
          <Button onClick={toggleColorMode} mr={4}>
            {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          </Button>
          {/* <Button
            as={RouterLink}
            to="/signup"
            display={{ base: "none", md: "inline-flex" }}
            fontSize={"sm"}
            fontWeight={600}
            color={"white"}
            bg={"blue.400"}
            _hover={{
              bg: "blue.300",
            }}
          >
            Sign Up
          </Button> */}
        </Flex>
      </Flex>

      {isOpen ? (
        <Box pb={4} display={{ md: "none" }}>
          <Stack as={"nav"} spacing={4}>
            {Links.map((link) => (
              <NavLink key={link.name} to={link.path}>
                {link.name}
              </NavLink>
            ))}
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
};

export default Navbar;
