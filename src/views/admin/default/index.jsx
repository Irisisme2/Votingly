/*!
  _   _  ___  ____  ___ ________  _   _   _   _ ___   
 | | | |/ _ \|  _ \|_ _|__  / _ \| \ | | | | | |_ _| 
 | |_| | | | | |_) || |  / / | | |  \| | | | | || | 
 |  _  | |_| |  _ < | | / /| |_| | |\  | | |_| || |
 |_| |_|\___/|_| \_\___/____\___/|_| \_|  \___/|___|
                                                                                                                                                                                                                                                                                                                                       
=========================================================
* Horizon UI - v1.1.0
=========================================================

* Product Page: https://www.horizon-ui.com/
* Copyright 2023 Horizon UI (https://www.horizon-ui.com/)

* Designed and Coded by Simmmple

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// Chakra imports
import {
  Avatar,
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Icon,
  SimpleGrid,
  Select,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
// Assets
import Usa from "assets/img/dashboards/usa.png";
// Custom components
import MiniCalendar from "components/calendar/MiniCalendar";
import MiniStatistics from "components/card/MiniStatistics";
import IconBox from "components/icons/IconBox";
import React, { useState } from "react";
import {
  MdAddTask,
  MdAttachMoney,
  MdBarChart,
  MdFileCopy,
} from "react-icons/md";
import CreatePollForm from "views/admin/default/components/CreatePollForm";
import WeeklyRevenue from "views/admin/default/components/WeeklyRevenue";

const userName = "John Doe";
const walletAddress = "0x1234...5678";
const isPremium = true; // Załóżmy, że użytkownik ma status premium

const UserReports = () => {
  // Chakra Color Mode
  const brandColor = useColorModeValue("brand.500", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  const toast = useToast();
  const [connected, setConnected] = useState(false); // Stan połączenia z MetaMask

  // Funkcja do łączenia z MetaMask
  const connectMetaMask = async () => {
    if (window.ethereum) {
      try {
        // Łączenie z MetaMask i uzyskiwanie konta
        await window.ethereum.request({ method: "eth_requestAccounts" });
        setConnected(true); // Ustawienie stanu połączenia
        toast({
          title: "MetaMask Connected",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } catch (error) {
        console.error("MetaMask connection error:", error);
        toast({
          title: "Connection failed",
          description: "Could not connect to MetaMask.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } else {
      toast({
        title: "MetaMask not detected",
        description: "Please install MetaMask to use this feature.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  // Funkcja do podpisywania transakcji
  const signTransaction = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        const address = accounts[0];
        const params = [
          {
            from: address,
            to: "0xRecipientAddress", // Adres odbiorcy transakcji
            value: "0xTransactionValue", // Wartość transakcji w hex
            gasPrice: "0xGasPrice", // Cena gazu w hex
            gas: "0xGasLimit", // Limit gazu w hex
            data: "0xData", // Dane transakcji w hex
            chainId: "0xChainId", // Identyfikator łańcucha w hex
          },
        ];
        const response = await window.ethereum.request({
          method: "eth_sendTransaction",
          params,
        });
        console.log("Transaction sent:", response);
        toast({
          title: "Transaction sent successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } catch (error) {
        console.error("Transaction error:", error);
        toast({
          title: "Transaction failed",
          description: error.message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } else {
      toast({
        title: "MetaMask not detected",
        description: "Please install MetaMask to use this feature.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3, "2xl": 6 }} gap="20px" mb="20px">
        <MiniStatistics
          startContent={
            <IconBox
              w="56px"
              h="56px"
              bg={boxBg}
              icon={<Avatar name={userName} src={`https://api.adorable.io/avatars/32/${userName}.png`} />}
            />
          }
          name="Username"
          value={userName}
        />
        <MiniStatistics
          startContent={
            <IconBox
              w="56px"
              h="56px"
              bg={boxBg}
              icon={<Icon w="32px" h="32px" as={MdAttachMoney} color={brandColor} />}
            />
          }
          name="Wallet Address"
          value={walletAddress}
        />
        <MiniStatistics
          startContent={
            <IconBox
              w="56px"
              h="56px"
              bg={boxBg}
              icon={<Icon w="32px" h="32px" as={MdFileCopy} color={brandColor} />}
            />
          }
          name="Premium Status"
          value={isPremium ? "Premium" : "Standard"}
        />
      </SimpleGrid>

      <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap="20px" mb="20px">
        {/* Komponent formularza tworzenia głosowania */}
        <CreatePollForm />

        {/* Komponent wykresu tygodniowego przychodu */}
        <WeeklyRevenue />
      </SimpleGrid>

      {/* Przycisk do łączenia z MetaMask */}
      {!connected && (
        <Button onClick={connectMetaMask} colorScheme="blue" mb={4}>
          Connect MetaMask
        </Button>
      )}

      {/* Przycisk do podpisywania transakcji */}
      {connected && (
        <Button onClick={signTransaction} colorScheme="green">
          Sign Transaction
        </Button>
      )}
    </Box>
  );
};

export default UserReports;