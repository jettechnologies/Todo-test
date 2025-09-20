import { Center } from "@chakra-ui/react";
import { TodoContainer } from "@/containers";

const Todowy = () => {
  return (
    <Center width="full" height="full" background="var(--light-gray-200)">
      <TodoContainer />
    </Center>
  );
};

export default Todowy;
