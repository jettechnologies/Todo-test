"use client";

import {
  Box,
  VStack,
  HStack,
  Text,
  Input,
  Avatar,
  InputGroup,
  InputLeftElement,
  Icon,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
} from "@chakra-ui/react";
// import { FiSearch } from "react-icons/fi";
import { SearchNormal } from "iconsax-reactjs";
import { useState } from "react";

interface User {
  id: string;
  name: string;
  avatar: string;
}

const users: User[] = [
  { id: "1", name: "Maria Vetrovs", avatar: "/professional-woman.png" },
  { id: "2", name: "Adison Mango", avatar: "/professional-man.png" },
  { id: "3", name: "Gustavo Culhane", avatar: "/man-with-beard.png" },
  { id: "4", name: "Adison Bator", avatar: "/blonde-woman.png" },
  { id: "5", name: "Zaire George", avatar: "/man-young.jpg" },
];

interface UserSelectorProps {
  onUserSelect?: (user: User) => void;
  selectedUserId?: string;
}

export function UserSelector({
  onUserSelect,
  selectedUserId,
}: UserSelectorProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const selected = users.find((u) => u.id === selectedUserId);

  return (
    <Popover placement="bottom-start">
      <PopoverTrigger>
        <Text cursor="pointer" color="gray.700" fontWeight="medium">
          {selected ? selected.name : "Select User"}
        </Text>
      </PopoverTrigger>
      <PopoverContent w="280px">
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverBody>
          <InputGroup mb={3}>
            <InputLeftElement pointerEvents="none">
              <Icon as={FiSearch} color="gray.400" />
            </InputLeftElement>
            <Input
              placeholder="Search user"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              border="none"
              bg="gray.50"
              _focus={{ bg: "white", border: "1px", borderColor: "blue.200" }}
            />
          </InputGroup>

          <VStack spacing={2} align="stretch">
            {filteredUsers.map((user) => (
              <Box
                key={user.id}
                cursor="pointer"
                borderRadius="md"
                p={2}
                _hover={{ bg: "gray.50" }}
                bg={selectedUserId === user.id ? "blue.50" : "transparent"}
                onClick={() => onUserSelect?.(user)}
              >
                <HStack spacing={3}>
                  <Avatar size="sm" src={user.avatar} name={user.name} />
                  <Text fontSize="sm" color="gray.700">
                    {user.name}
                  </Text>
                </HStack>
              </Box>
            ))}
          </VStack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}
