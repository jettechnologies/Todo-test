"use client";

import { useEffect } from "react";
import { Spinner, Flex, Text } from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/todos");
    }, 5000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <Flex
      direction="column"
      justify="center"
      align="center"
      minH="100vh"
      bg="gray.50"
    >
      <Image src="/logo.png" alt="App Logo" width={80} height={80} />

      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
        mt={6}
      />
      <Text mt={4} fontSize="lg" color="gray.600">
        Loading your todos...
      </Text>
    </Flex>
  );
}
