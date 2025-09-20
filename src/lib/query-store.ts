import {
  useQueryStates,
  createParser,
  parseAsString,
  parseAsInteger,
} from "nuqs";
import type { TodoStatus } from "@prisma/client";

export type StatusResponse = TodoStatus | "";

export type UiComponents = "row-horizontal" | "row-vertical" | "";

export const optionalIntegerParser = createParser({
  parse: (value: string) => (value ? parseAsInteger.parse(value) : null),
  serialize: (value: number) => (value !== undefined ? String(value) : ""),
});

export const optionalParseAsString = createParser({
  parse: (value: string) => {
    if (value) return parseAsString.parse(value);
    return null;
  },
  serialize: (value: string) => value,
});

const uiComponentParser = createParser({
  parse: (value: string) => {
    if (value) return value as UiComponents;
    return null;
  },
  serialize: (value: UiComponents) => value,
});

const todoStatusParser = createParser({
  parse: (value: string) => {
    if (value) return value as StatusResponse;
    return null;
  },
  serialize: (value: StatusResponse) => value,
});

export const useFilterStore = () => {
  const [filters, setFilters] = useQueryStates(
    {
      ui: uiComponentParser.withDefault(""),
      search: optionalParseAsString.withDefault(""),
      page: parseAsInteger.withDefault(1),
      limit: parseAsInteger.withDefault(10),
      status: todoStatusParser.withDefault(""),
    },
    {
      shallow: false,
    }
  );

  return {
    filters,
    updateFilters: setFilters,
  };
};
