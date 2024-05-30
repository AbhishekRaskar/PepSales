import React, { useEffect, useState } from "react";
import {
  Box,
  Text,
  Flex,
  Center,
  SimpleGrid,
  Button,
  Spinner,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCompanyData } from "../Redux/CompanyReducer/acton";

const HomePage = () => {
  const dispatch = useDispatch();
  const stocks = useSelector((state) => state.stocks);
  const [showDetails, setShowDetails] = useState({});

  useEffect(() => {
    dispatch(fetchCompanyData());
  }, [dispatch]);

  console.log(stocks, "stocks");

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
    <Flex justify="center" align="center" p={4}>
      <SimpleGrid columns={[1, 2, 3]} spacing={4} w="full">
        {stocks.map((stock, index) => (
          <Box
            key={`${stock.symbol1}-${stock.symbol2}-${index}`}
            p={4}
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            boxShadow="lg"
          >
            <Text fontSize="xl" fontWeight="bold">
              {stock.symbol1} / {stock.symbol2}
            </Text>
            <Text fontSize="md" color="gray.500">
              Min Price: {stock.minPrice || "N/A"}
            </Text>
            <Text fontSize="md" color="gray.500">
              Max Price: {stock.maxPrice || "N/A"}
            </Text>
            <Center mt={2}>
              <Text fontSize="2xl">
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
              <Box mt={4} p={2} borderWidth="1px" borderRadius="md">
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
