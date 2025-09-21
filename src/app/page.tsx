"use client";

import { useEffect } from "react";
import { Spinner, Flex, Text, VStack } from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const MotionFlex = motion(Flex);
const MotionImage = motion(Image);
const MotionText = motion(Text);

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/todowy?ui=row-horizontal");
    }, 2500);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <MotionFlex
      direction="column"
      justify="center"
      align="center"
      minH="100vh"
      px={4}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      bgGradient="linear(to-br, var(--light-purple-200), var(--light-green-200))"
      fontFamily="var(--plus-jakarta-sans)"
    >
      <VStack spacing={6}>
        {/* Logo with bounce animation */}
        <MotionImage
          src="/images/todo-logo.png"
          alt="App Logo"
          width={100}
          height={100}
          priority
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />

        {/* Spinner */}
        <Spinner
          thickness="5px"
          speed="0.7s"
          emptyColor="var(--light-gray-200)"
          color="var(--purple)"
          size="xl"
        />

        {/* Messages */}
        <MotionText
          fontSize="lg"
          fontWeight="semibold"
          color="var(--text-black-200)"
          textAlign="center"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          Loading your todos...
        </MotionText>

        <MotionText
          fontSize="sm"
          color="var(--text-black-300)"
          textAlign="center"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          Please wait while we set things up 🚀
        </MotionText>
      </VStack>
    </MotionFlex>
  );
}
