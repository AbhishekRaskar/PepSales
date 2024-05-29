import React, { useState, useEffect } from "react";
import { Box, Text, Flex, Center, VStack } from "@chakra-ui/react";

const HomePage = () => {
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://financialmodelingprep.com/api/v3/stock/list?apikey=kl5zJ1tpBMbwj9iCoQt0geHWQMJrtmpb"
        );
        const data = await response.json();
        setStocks(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  console.log(stocks);

  return (
    <Flex justify="center" align="center" h="100vh">
      <VStack spacing={4}>
        {stocks.map((stock, index) => (
          <Box
            key={`${stock.symbol}-${index}`}
            p={4}
            maxW="sm"
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            boxShadow="lg"
          >
            <Text fontSize="xl" fontWeight="bold">
              {stock.name}
            </Text>
            <Text fontSize="md" color="gray.500">
              {stock.symbol}
            </Text>
            <Center mt={2}>
              <Text fontSize="2xl">${stock.price}</Text>
            </Center>
          </Box>
        ))}
      </VStack>
    </Flex>
  );
};

export default HomePage;
