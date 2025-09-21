import { ModalLayout } from "./modal";
import { HStack, Button, VStack } from "@chakra-ui/react";
import { X } from "lucide-react";
import { Formik, Form } from "formik";
import { createTodoSchema } from "@/utils/schema";
import { useCreateTodo } from "@/services/mutations";
import {
  InputField,
  TextAreaField,
  DateExtendedPicker,
  PrioritySelector,
} from "@/components/ui";
import {
  Calendar,
  Flag,
  ProfileCircle,
  Status,
  Stickynote,
} from "iconsax-reactjs";
import { ParagraphText } from "@/components/typography";

interface CreateTodoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateTodoModal = ({ isOpen, onClose }: CreateTodoModalProps) => {
  return (
    <ModalLayout
      isOpen={isOpen}
      px="0px"
      onClose={onClose}
      noCloseButton
      size="xl"
    >
      <HStack justifyContent="flex-end" width="full" height="48px">
        <Button
          variant="link"
          onClick={onClose}
          aria-label="modalClose button"
          cursor="pointer"
          _hover={{ background: "none" }}
          p={0}
        >
          <X size={20} color="var(--text-black-200)" />
        </Button>
      </HStack>
      <VStack minHeight="300px" width="full">
        <Formik
          initialValues={{
            taskName: "",
            status: "",
            dates: "",
            assigneeIds: "",
            priority: "",
            description: "",
          }}
          validationSchema={createTodoSchema}
          onSubmit={(data) => {
            console.log(data);
          }}
        >
          {(formik) => {
            return (
              <VStack width="full" spacing={5} as={Form} px={4}>
                <InputField
                  name="taskName"
                  placeholder="Task Name"
                  height="30px"
                  sx={{
                    fontFamily: "var(--plus-jakarta-sans)",
                    fontWeight: "600",
                    color: "hsla(217, 15%, 76%, 1)",
                    fontSize: "30px",
                  }}
                />
                <VStack
                  width="full"
                  align="stretch"
                  spacing="1rem"
                  border="2px solid black"
                >
                  <HStack spacing={8}>
                    <HStack spacing={3}>
                      <Status
                        size={24}
                        variant="Outline"
                        color="hsla(217, 15%, 76%, 1)"
                      />
                      <ParagraphText
                        value="Status"
                        weight="500"
                        fontSize="1rem"
                      />
                    </HStack>
                  </HStack>
                  <HStack spacing={8}>
                    <HStack spacing={3}>
                      <Calendar size={24} color="hsla(217, 15%, 76%, 1)" />
                      <ParagraphText
                        value="Date"
                        weight="500"
                        fontSize="1rem"
                      />
                    </HStack>
                    <DateExtendedPicker
                      formik={formik}
                      fieldName="dates"
                      inputField={{
                        isActive: false,
                      }}
                    />
                  </HStack>
                  <HStack spacing={8}>
                    <HStack spacing={3}>
                      <ProfileCircle
                        size={24}
                        variant="Outline"
                        color="hsla(217, 15%, 76%, 1)"
                      />
                      <ParagraphText
                        value="Assignees"
                        weight="500"
                        fontSize="1rem"
                      />
                    </HStack>
                  </HStack>
                  <HStack spacing={8}>
                    <HStack spacing={3}>
                      <Flag
                        size={24}
                        variant="Outline"
                        color="hsla(217, 15%, 76%, 1)"
                      />
                      <ParagraphText
                        value="Priority"
                        weight="500"
                        fontSize="1rem"
                      />
                    </HStack>
                    <PrioritySelector name="priority" />
                  </HStack>
                  <VStack spacing={3} align="stretch">
                    <HStack spacing={3}>
                      <Stickynote
                        size={24}
                        variant="Outline"
                        color="hsla(217, 15%, 76%, 1)"
                      />
                      <ParagraphText
                        value="Description"
                        weight="500"
                        fontSize="1rem"
                      />
                    </HStack>
                    <TextAreaField
                      name="description"
                      height="150px"
                      placeholder="Write something or type"
                      borderColor="hsla(224, 48%, 95%, 1)"
                      background="hsla(0, 0%, 97%, 1)"
                      radius="10px"
                      sx={{
                        fontFamily: "var(--plus-jakarta-sans)",
                        fontWeight: "500",
                        color: "hsla(217, 15%, 76%, 1)",
                        fontSize: "1rem",
                      }}
                    />
                  </VStack>
                </VStack>
                <HStack width="full" justifyContent="flex-end">
                  <Button
                    type="submit"
                    width="250px"
                    height="46px"
                    background="var(--light-green-500)"
                    fontFamily="var(--plus-jakarta-sans)"
                    fontWeight="600"
                    fontSize="1rem"
                    color="white"
                    rounded="10px"
                    _hover={{
                      background: "var(--light-green-500)",
                    }}
                  >
                    Create Task
                  </Button>
                </HStack>
              </VStack>
            );
          }}
        </Formik>
      </VStack>
    </ModalLayout>
  );
};
