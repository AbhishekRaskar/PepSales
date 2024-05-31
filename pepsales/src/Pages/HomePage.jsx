import React, { useEffect, useState } from "react";
import {
  Box,
  Text,
  Flex,
  Center,
  SimpleGrid,
  Button,
  Spinner,
  Image,
  useColorModeValue,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCompanyData } from "../Redux/CompanyReducer/acton";
import Logo1 from "../Images/Logo1.png";
import Logo2 from "../Images/Logo2.png";
import Logo3 from "../Images/Logo3.png";
import Logo4 from "../Images/Logo4.png";
import Logo5 from "../Images/Logo5.png";
import Logo6 from "../Images/Logo6.png";

const HomePage = () => {
  const dispatch = useDispatch();
  const stocks = useSelector((state) => state.stocks);
  const [showDetails, setShowDetails] = useState({});

  const cardBg = useColorModeValue("white", "gray.800");
  const cardTextColor = useColorModeValue("gray.800", "white");
  const containerBg = useColorModeValue("gray.100", "gray.900");
  const detailsBg = useColorModeValue("gray.100", "gray.700");

  const logoMap = {
    Logo1,
    Logo2,
    Logo3,
    Logo4,
    Logo5,
    Logo6,
  };

  useEffect(() => {
    dispatch(fetchCompanyData());
  }, [dispatch]);

  if (!stocks || stocks.length === 0) {
    return (
      <Flex justify="center" align="center" h="100vh">
        <Spinner size="xl" thickness="4px" color="teal.500" />
      </Flex>
    );
  }

  const handleToggleDetails = (symbol1, symbol2) => {
    setShowDetails((prevShowDetails) => ({
      ...prevShowDetails,
      [`${symbol1}-${symbol2}`]: !prevShowDetails[`${symbol1}-${symbol2}`],
    }));
  };

  return (
    <Flex justify="center" align="center" p={4} bg={containerBg}>
      <SimpleGrid columns={[1, 2, 3]} spacing={6} w="full">
        {stocks.map((stock, index) => (
          <Box
            key={`${stock.symbol1}-${stock.symbol2}-${index}`}
            p={6}
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            boxShadow="lg"
            bg={cardBg}
            color={cardTextColor}
          >
            <Center>
              <Image
                src={logoMap[`Logo${index % 6 + 1}`]}
                boxSize="100px"
                mb={4}
                alt={`Logo${index % 6 + 1}`}
              />
            </Center>
            <Text fontSize="2xl" fontWeight="bold" textAlign="center">
              {stock.symbol1} / {stock.symbol2}
            </Text>
            <Text fontSize="lg" color="gray.500" mt={2}>
              Min Price: {stock.minPrice || "N/A"}
            </Text>
            <Text fontSize="lg" color="gray.500">
              Max Price: {stock.maxPrice || "N/A"}
            </Text>
            <Center mt={4}>
              <Text fontSize="2xl" fontWeight="bold">
                Min Lot Size: {stock.minLotSize || "N/A"}
              </Text>
            </Center>
            <Button
              mt={4}
              colorScheme="teal"
              onClick={() => handleToggleDetails(stock.symbol1, stock.symbol2)}
            >
              {showDetails[`${stock.symbol1}-${stock.symbol2}`]
                ? "Hide Details"
                : "More Details"}
            </Button>
            {showDetails[`${stock.symbol1}-${stock.symbol2}`] && (
              <Box mt={4} p={4} borderWidth="1px" borderRadius="md" bg={detailsBg}>
                <Text fontSize="md">
                  Price Precision: {stock.pricePrecision || "N/A"}
                </Text>
                <Text fontSize="md">
                  Min Lot Size S2: {stock.minLotSizeS2 || "N/A"}
                </Text>
                {stock.maxLotSize && (
                  <Text fontSize="md">Max Lot Size: {stock.maxLotSize}</Text>
                )}
              </Box>
            )}
          </Box>
        ))}
      </SimpleGrid>
    </Flex>
  );
};

export default HomePage;