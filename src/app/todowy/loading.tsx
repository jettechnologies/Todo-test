import { Center, HStack, Spinner } from "@chakra-ui/react";
import Image from "next/image";

const Loading = () => {
  return (
    <Center width="100%" height="100vh">
      <HStack spacing={4}>
        <Spinner color="var(--primary-500)" />
        <Image
          src="/images/todo-logo.png"
          alt="todo logo"
          width={100}
          height={100}
        />
      </HStack>
    </Center>
  );
};

export default Loading;
