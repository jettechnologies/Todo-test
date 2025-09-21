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
            <Text color="gray.700" fontWeight="medium">
              Select Users
            </Text>
          )}
        </Box>
      </PopoverTrigger>

      <PopoverContent w="280px">
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverBody>
          <InputGroup mb={3}>
            <InputLeftElement pointerEvents="none">
              <Icon as={SearchNormal} color="gray.400" />
            </InputLeftElement>
            <Input
              placeholder="Search user"
              value={searchTerm}
              onChange={(e) => onChangeSearchTerm?.(e.target.value)}
              border="none"
              bg="gray.50"
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
                  onClick={() => toggleUser(user.id)} // 👈 toggle selection
                >
                  <HStack spacing={3}>
                    <Avatar size="sm" name={user.name} />
                    <Text fontSize="sm" color="gray.700">
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

// "use client";

// import {
//   Box,
//   VStack,
//   HStack,
//   Text,
//   Input,
//   Avatar,
//   InputGroup,
//   InputLeftElement,
//   Icon,
//   Popover,
//   PopoverTrigger,
//   PopoverContent,
//   PopoverBody,
//   PopoverArrow,
//   PopoverCloseButton,
//   AvatarGroup,
// } from "@chakra-ui/react";
// import { SearchNormal } from "iconsax-reactjs";

// interface User {
//   id: string;
//   name: string;
//   email: string;
// }

// interface AssigneeSelectorProps {
//   onUserSelect?: (user: User) => void;
//   selectedUserIds?: string[];
//   users: User[];
//   searchTerm?: string;
//   onChangeSearchTerm?: (search: string) => void;
//   userLoading?: boolean;
// }

// export function AssigneeSelector({
//   onUserSelect,
//   selectedUserIds = [],
//   users,
//   searchTerm,
//   onChangeSearchTerm,
//   userLoading,
// }: AssigneeSelectorProps) {
//   console.log(users, "users");

//   const selectedUsers = users.filter((u) => selectedUserIds.includes(u.id));

//   return (
//     <Popover placement="bottom-start">
//       <PopoverTrigger>
//         <Box cursor="pointer">
//           {selectedUsers.length > 0 ? (
//             <AvatarGroup size="xs" max={3}>
//               {selectedUsers.map((user) => (
//                 <Avatar key={user.id} name={user.name} />
//               ))}
//             </AvatarGroup>
//           ) : (
//             <Text color="gray.700" fontWeight="medium">
//               Select Users
//             </Text>
//           )}
//         </Box>
//       </PopoverTrigger>

//       <PopoverContent w="280px">
//         <PopoverArrow />
//         <PopoverCloseButton />
//         <PopoverBody>
//           <InputGroup mb={3}>
//             <InputLeftElement pointerEvents="none">
//               <Icon as={SearchNormal} color="gray.400" />
//             </InputLeftElement>
//             <Input
//               placeholder="Search user"
//               value={searchTerm}
//               onChange={(e) => onChangeSearchTerm?.(e.target.value)}
//               border="none"
//               bg="gray.50"
//               _focus={{ bg: "white", border: "1px", borderColor: "blue.200" }}
//             />
//           </InputGroup>

//           <VStack spacing={2} align="stretch">
//             {users.map((user) => {
//               const isSelected = selectedUserIds.includes(user.id);
//               return (
//                 <Box
//                   key={user.id}
//                   cursor="pointer"
//                   borderRadius="md"
//                   p={2}
//                   _hover={{ bg: "gray.50" }}
//                   bg={isSelected ? "blue.50" : "transparent"}
//                   onClick={() => {
//                     onUserSelect?.(user);
//                     console.log(user, "user object");
//                   }}
//                 >
//                   <HStack spacing={3}>
//                     <Avatar size="sm" name={user.name} />
//                     <Text fontSize="sm" color="gray.700">
//                       {user.name}
//                     </Text>
//                   </HStack>
//                 </Box>
//               );
//             })}
//           </VStack>
//         </PopoverBody>
//       </PopoverContent>
//     </Popover>
//   );
// }

// "use client";

// import {
//   Box,
//   VStack,
//   HStack,
//   Text,
//   Input,
//   Avatar,
//   InputGroup,
//   InputLeftElement,
//   Icon,
//   Popover,
//   PopoverTrigger,
//   PopoverContent,
//   PopoverBody,
//   PopoverArrow,
//   PopoverCloseButton,
// } from "@chakra-ui/react";
// // import { FiSearch } from "react-icons/fi";
// import { SearchNormal } from "iconsax-reactjs";
// import { useState } from "react";

// interface User {
//   id: string;
//   name: string;
//   avatar: string;
// }

// const users: User[] = [
//   { id: "1", name: "Maria Vetrovs", avatar: "/professional-woman.png" },
//   { id: "2", name: "Adison Mango", avatar: "/professional-man.png" },
//   { id: "3", name: "Gustavo Culhane", avatar: "/man-with-beard.png" },
//   { id: "4", name: "Adison Bator", avatar: "/blonde-woman.png" },
//   { id: "5", name: "Zaire George", avatar: "/man-young.jpg" },
// ];

// interface AssigneeSelectorProps {
//   onUserSelect?: (user: User) => void;
//   selectedUserId?: string[];
// }

// export function AssigneeSelector({
//   onUserSelect,
//   selectedUserId,
// }: AssigneeSelectorProps) {
//   const [searchTerm, setSearchTerm] = useState("");

//   const filteredUsers = users.filter((user) =>
//     user.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );
//   const selected = users.find((u) => u.id === selectedUserId);

//   return (
//     <Popover placement="bottom-start">
//       <PopoverTrigger>
//         <Text cursor="pointer" color="gray.700" fontWeight="medium">
//           {selected ? selected.name : "Select User"}
//         </Text>
//       </PopoverTrigger>
//       <PopoverContent w="280px">
//         <PopoverArrow />
//         <PopoverCloseButton />
//         <PopoverBody>
//           <InputGroup mb={3}>
//             <InputLeftElement pointerEvents="none">
//               <Icon as={SearchNormal} color="gray.400" />
//             </InputLeftElement>
//             <Input
//               placeholder="Search user"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               border="none"
//               bg="gray.50"
//               _focus={{ bg: "white", border: "1px", borderColor: "blue.200" }}
//             />
//           </InputGroup>

//           <VStack spacing={2} align="stretch">
//             {filteredUsers.map((user) => (
//               <Box
//                 key={user.id}
//                 cursor="pointer"
//                 borderRadius="md"
//                 p={2}
//                 _hover={{ bg: "gray.50" }}
//                 bg={selectedUserId === user.id ? "blue.50" : "transparent"}
//                 onClick={() => onUserSelect?.(user)}
//               >
//                 <HStack spacing={3}>
//                   <Avatar size="sm" src={user.avatar} name={user.name} />
//                   <Text fontSize="sm" color="gray.700">
//                     {user.name}
//                   </Text>
//                 </HStack>
//               </Box>
//             ))}
//           </VStack>
//         </PopoverBody>
//       </PopoverContent>
//     </Popover>
//   );
// }
