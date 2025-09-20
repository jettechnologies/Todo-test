"use client";

import {
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  IconButton,
  Avatar,
  Button,
  Text,
  Box,
} from "@chakra-ui/react";
import {
  SearchNormal1,
  Notification,
  CloseCircle,
  Export,
} from "iconsax-reactjs";
import Image from "next/image";

export const Header = () => {
  return (
    <HStack
      justifyContent="space-between"
      px="20px"
      py="10px"
      alignItems="center"
      height="70px"
      bg="#fff"
      color="var(--text-black-200)"
      fontFamily="var(--plus-jakarta-sans)"
      boxShadow="sm"
    >
      {/* Left Section - Search */}
      <InputGroup maxW="250px">
        <InputLeftElement pointerEvents="none">
          <SearchNormal1 size="18" color="gray" />
        </InputLeftElement>
        <Input
          type="text"
          placeholder="Search..."
          borderRadius="full"
          bg="var(--light-gray-200)"
          fontSize="14px"
        />
        <InputRightElement>
          <IconButton
            aria-label="clear"
            size="xs"
            icon={<CloseCircle size="16" color="gray" />}
            variant="ghost"
          />
        </InputRightElement>
      </InputGroup>

      {/* Middle Section - App Icons & Buttons */}
      <HStack spacing="12px">
        {/* App Icons */}
        <Box
          w="32px"
          h="32px"
          borderRadius="md"
          bg="var(--light-yellow-200)"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Image src="/icons/icon1.svg" alt="app1" width={20} height={20} />
        </Box>
        <Box
          w="32px"
          h="32px"
          borderRadius="md"
          bg="var(--light-green-200)"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Image src="/icons/icon2.svg" alt="app2" width={20} height={20} />
        </Box>
        <Box
          w="32px"
          h="32px"
          borderRadius="md"
          bg="var(--light-gray-200)"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Image src="/icons/icon3.svg" alt="app3" width={20} height={20} />
        </Box>
        <Box
          w="32px"
          h="32px"
          borderRadius="md"
          bg="var(--light-gray-200)"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Image src="/icons/icon4.svg" alt="app4" width={20} height={20} />
        </Box>

        {/* "Melding maken" Button */}
        <Button
          bg="var(--purple)"
          color="white"
          borderRadius="md"
          px="16px"
          fontSize="14px"
          _hover={{
            bg: "var(--light-purple-200)",
            color: "var(--text-black-200)",
          }}
        >
          Melding maken
        </Button>

        {/* Tags */}
        {["VIM", "LMS", "BHV", "DataLek"].map((label) => (
          <Button
            key={label}
            size="sm"
            borderRadius="md"
            fontSize="12px"
            px="10px"
            bg="var(--light-green-500)"
            color="white"
            _hover={{
              bg: "var(--light-green-200)",
              color: "var(--text-black-200)",
            }}
          >
            {label}
          </Button>
        ))}
      </HStack>

      {/* Right Section - Profile */}
      <HStack spacing="14px">
        <IconButton
          aria-label="share"
          icon={<Export size="20" color="gray" />}
          variant="ghost"
          size="sm"
        />
        <IconButton
          aria-label="notifications"
          icon={<Notification size="20" color="gray" />}
          variant="ghost"
          size="sm"
        />
        <HStack>
          <Avatar size="sm" src="/avatars/paul.png" name="Paul" />
          <Text fontSize="14px">Hi Paul</Text>
        </HStack>
      </HStack>
    </HStack>
  );
};

// import { HStack } from "@chakra-ui/react";

// export const Header = () => {
//   return (
//     <HStack
//       justifyContent="space-between"
//       px="40px"
//       alignItems="center"
//       height="full"
//       bg="#fff"
//       color="black"
//       border="2px solid black"
//     >
//       Header
//     </HStack>
//   );
// };
