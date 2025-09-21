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
  AvatarGroup,
} from "@chakra-ui/react";
import { SearchNormal } from "iconsax-reactjs";

interface User {
  id: string;
  name: string;
  email: string;
}

interface AssigneeSelectorProps {
  onUserSelect?: (selectedIds: string[]) => void;
  selectedUserIds?: string[];
  users: User[];
  searchTerm?: string;
  onChangeSearchTerm?: (search: string) => void;
  userLoading?: boolean;
}

export function AssigneeSelector({
  onUserSelect,
  selectedUserIds = [],
  users,
  searchTerm,
  onChangeSearchTerm,
  userLoading,
}: AssigneeSelectorProps) {
  const selectedUsers = users.filter((u) => selectedUserIds.includes(u.id));

  const toggleUser = (userId: string) => {
    let newSelected: string[];
    if (selectedUserIds.includes(userId)) {
      newSelected = selectedUserIds.filter((id) => id !== userId);
    } else {
      newSelected = [...selectedUserIds, userId];
    }
    onUserSelect?.(newSelected);
  };

  return (
    <Popover placement="bottom-start">
      <PopoverTrigger>
        <Box cursor="pointer">
          {selectedUsers.length > 0 ? (
            <AvatarGroup size="xs" max={3}>
              {selectedUsers.map((user) => (
                <Avatar key={user.id} name={user.name} />
              ))}
            </AvatarGroup>
          ) : (
            <Text
              color="hsla(217, 15%, 76%, 1)"
              fontSize="1rem"
              fontWeight="500"
            >
              Select Assignee
            </Text>
          )}
        </Box>
      </PopoverTrigger>

      <PopoverContent w="300px" rounded="10px">
        <PopoverBody p="20px" width="full">
          <InputGroup mb={3} height="40px" rounded="6px">
            <InputLeftElement pointerEvents="none">
              <Icon as={SearchNormal} color="gray.400" size={14} />
            </InputLeftElement>
            <Input
              placeholder="Search user"
              value={searchTerm}
              onChange={(e) => onChangeSearchTerm?.(e.target.value)}
              bg="hsla(0, 0%, 97%, 1)"
              border="1px solid hsla(224, 48%, 95%, 1)"
              _focus={{ bg: "white", border: "1px", borderColor: "blue.200" }}
            />
          </InputGroup>

          <VStack spacing={2} align="stretch">
            {users.map((user) => {
              const isSelected = selectedUserIds.includes(user.id);
              return (
                <Box
                  key={user.id}
                  cursor="pointer"
                  borderRadius="md"
                  p={2}
                  _hover={{ bg: "gray.50" }}
                  bg={isSelected ? "blue.50" : "transparent"}
                  onClick={() => toggleUser(user.id)}
                >
                  <HStack spacing={3}>
                    <Avatar size="sm" name={user.name} />
                    <Text
                      fontSize="1rem"
                      fontFamily="var(--plus-jakarta-sans)"
                      color="hsla(210, 7%, 29%, 1)"
                    >
                      {user.name}
                    </Text>
                    {isSelected && (
                      <Text fontSize="xs" color="blue.500" ml="auto">
                        Selected
                      </Text>
                    )}
                  </HStack>
                </Box>
              );
            })}
          </VStack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}
