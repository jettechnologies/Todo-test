import { format } from "date-fns";

export const convertToDateString = (date: string) =>
  format(new Date(date), "dd/MM/yyyy");
