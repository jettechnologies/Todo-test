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
  Link,
  ArrowDown2,
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
          w="46px"
          h="46px"
          borderRadius="md"
          bg="transparent"
          border="1px solid hsla(221, 46%, 95%, 1)"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Image
            src="/images/header-img-1.png"
            alt="app1"
            width={20}
            height={20}
          />
        </Box>
        <Box
          w="46px"
          h="46px"
          borderRadius="md"
          bg="#fff"
          border="1px solid hsla(221, 46%, 95%, 1)"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Image
            src="/images/header-img-2.png"
            alt="app2"
            width={20}
            height={20}
          />
        </Box>
        <Box
          w="46px"
          h="46px"
          borderRadius="md"
          bg="transparent"
          border="1px solid hsla(221, 46%, 95%, 1)"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Image
            src="/images/header-img-3.png"
            alt="app3"
            width={20}
            height={20}
          />
        </Box>
        <Box
          w="46px"
          h="46px"
          borderRadius="md"
          bg="transparent"
          border="1px solid hsla(221, 46%, 95%, 1)"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Image
            src="/images/header-img-4.png"
            alt="app4"
            width={20}
            height={20}
          />
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
          icon={<Link size="20" color="gray" />}
          variant="ghost"
          width="40px"
          height="46px"
          rounded="10px"
          background="hsla(0, 0%, 97%, 1)"
          border="1px solid hsla(224, 48%, 95%, 1)"
        />
        <IconButton
          aria-label="notifications"
          icon={<Notification size="20" color="gray" />}
          variant="ghost"
          width="40px"
          height="46px"
          rounded="full"
          background="hsla(0, 0%, 97%, 1)"
          border="1px solid hsla(224, 48%, 95%, 1)"
        />
        <HStack
          rounded="50px"
          background="hsla(0, 0%, 97%, 1)"
          px="5px"
          py="3px"
        >
          <Avatar size="sm" src="/images/user-avatar.png" name="Paul" />
          <Text fontSize="14px">Hi Paul</Text>
          <ArrowDown2
            size={14}
            variant="Outline"
            color="hsla(210, 5%, 45%, 1)"
          />
        </HStack>
      </HStack>
    </HStack>
  );
};
