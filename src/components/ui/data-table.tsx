"use client";

import { useState } from "react";
import {
  type ColumnDef,
  type ColumnFiltersState,
  type Row,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Box,
  Flex,
  Text,
  Icon,
  Skeleton,
  Popover,
  PopoverTrigger,
  Portal,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  Avatar,
  AvatarGroup,
  Select,
} from "@chakra-ui/react";
import {
  ArrowLeft,
  ArrowRight,
  ChevronsLeft,
  ChevronsRight,
  Ellipsis,
} from "lucide-react";
import { StatusBadge, type GlobalStatus } from "./badge";

type Props<T> = {
  columns: ColumnDef<T>[];
  data: T[];
  onRowClick?: (row: Row<T>) => void;
  defaultVisibility?: Record<string, boolean>;
  loading?: boolean;
  tableAction?: Array<{
    label: string;
    onClick: (row: Row<T>) => void;
  }>;
  pagination?: {
    pageIndex: number;
    pageSize: number;
    rowCount: number;
    onPageChange: (pageIndex: number) => void;
    onPageSizeChange?: (pageSize: number) => void;
    onMouseEnter?: () => void;
  };
};

export const DEFAULT_PAGE_SIZE = 10;

export default function DataGrid<T>({
  defaultVisibility,
  columns,
  data,
  onRowClick,
  loading = false,
  pagination,
  tableAction,
}: Props<T>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
    defaultVisibility || {}
  );
  const [rowSelection, setRowSelection] = useState({});
  const [internalPagination, setInternalPagination] = useState({
    pageIndex: 0,
    pageSize: DEFAULT_PAGE_SIZE,
  });

  const isExternal = !!pagination;
  const pageCount = isExternal
    ? Math.ceil(pagination.rowCount / pagination.pageSize)
    : Math.ceil(data.length / internalPagination.pageSize);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: isExternal,
    pageCount: isExternal ? pageCount : undefined,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination: isExternal ? pagination : internalPagination,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: (updater) => {
      if (isExternal) {
        if (typeof updater === "function") {
          const newState = updater({
            pageIndex: pagination.pageIndex - 1,
            pageSize: pagination.pageSize,
          });
          pagination.onPageChange(newState.pageIndex + 1);
          pagination.onPageSizeChange?.(newState.pageSize);
        } else {
          pagination.onPageChange(updater.pageIndex + 1);
          pagination.onPageSizeChange?.(updater.pageSize);
        }
      } else {
        setInternalPagination((old) =>
          typeof updater === "function" ? updater(old) : updater
        );
      }
    },
  });

  // Generate numbered pagination
  const currentPage = table.getState().pagination.pageIndex + 1;
  const visiblePages = Array.from({ length: pageCount }, (_, i) => i + 1).slice(
    Math.max(currentPage - 3, 0),
    Math.min(currentPage + 2, pageCount)
  );

  return (
    <Box
      w="full"
      overflowX="auto"
      border="1px solid hsla(221, 39%, 86%, 1)"
      rounded="10px"
    >
      {/* Table */}
      <Table variant="simple" size="sm">
        <Thead bg="gray.100" height="40px">
          {table.getHeaderGroups().map((headerGroup) => (
            <Tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <Th
                  key={header.id}
                  fontWeight="500"
                  fontSize="14px"
                  whiteSpace="nowrap"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody>
          {loading ? (
            Array.from({ length: 5 }).map((_, index) => (
              <Tr key={index}>
                {columns.map((_, colIdx) => (
                  <Td key={colIdx}>
                    <Skeleton height="20px" />
                  </Td>
                ))}
              </Tr>
            ))
          ) : table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <Tr
                key={row.id}
                cursor={onRowClick ? "pointer" : "default"}
                _hover={onRowClick ? { bg: "gray.50" } : undefined}
                onClick={() => onRowClick?.(row)}
                bg={row.getIsSelected() ? "gray.100" : "transparent"}
              >
                {row.getVisibleCells().map((cell) => {
                  const thead = cell.column.columnDef.header;
                  if (thead === "Priority") {
                    return (
                      <Td key={cell.id}>
                        <StatusBadge
                          key={cell.id}
                          width="fit-content"
                          status={cell.getValue() as GlobalStatus}
                        />
                      </Td>
                    );
                  } else if (thead === "Action") {
                    return (
                      <Td key={cell.id} textAlign="right">
                        <Popover>
                          <PopoverTrigger>
                            <Button variant="ghost" size="sm">
                              <Ellipsis size={20} />
                            </Button>
                          </PopoverTrigger>
                          <Portal>
                            <PopoverContent width="120px">
                              <PopoverArrow />
                              <PopoverBody py="4px">
                                {tableAction?.map((action) => (
                                  <Button
                                    key={action.label}
                                    variant="link"
                                    size="sm"
                                    onClick={() =>
                                      action.onClick(cell.row as Row<T>)
                                    }
                                  >
                                    {action.label}
                                  </Button>
                                ))}
                              </PopoverBody>
                            </PopoverContent>
                          </Portal>
                        </Popover>
                      </Td>
                    );
                  } else if (thead === "Assignee") {
                    const assignees = cell.getValue() as string[];
                    return (
                      <Td key={cell.id}>
                        <AvatarGroup size="sm" max={2}>
                          {assignees.map((name, idx) => (
                            <Avatar key={idx} name={name} />
                          ))}
                        </AvatarGroup>
                      </Td>
                    );
                  } else {
                    return (
                      <Td
                        key={cell.id}
                        fontSize="14px"
                        fontWeight="medium"
                        whiteSpace="nowrap"
                        p={4}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </Td>
                    );
                  }
                })}
              </Tr>
            ))
          ) : (
            <Tr>
              <Td colSpan={columns.length} textAlign="center" py={10}>
                No results.
              </Td>
            </Tr>
          )}
        </Tbody>
      </Table>

      {/* Pagination */}
      <Flex
        align="center"
        justify="space-between"
        px={4}
        py={3}
        flexWrap="wrap"
        height="80px"
        gap={3}
      >
        {/* Pagination buttons */}
        <Flex
          gap={1}
          align="center"
          height="40px"
          rounded="20px"
          px="10px"
          background="hsla(0, 0%, 97%, 1)"
        >
          <Button
            boxSize="30px"
            variant="ghost"
            rounded="full"
            onClick={() => table.setPageIndex(0)}
            isDisabled={!table.getCanPreviousPage()}
          >
            <Icon as={ChevronsLeft} boxSize={4} />
          </Button>
          <Button
            boxSize="30px"
            variant="ghost"
            rounded="full"
            onClick={() => table.previousPage()}
            isDisabled={!table.getCanPreviousPage()}
          >
            <Icon as={ArrowLeft} boxSize={4} />
          </Button>

          {visiblePages.map((page) => (
            <Button
              key={page}
              boxSize="30px"
              rounded="full"
              variant={page === currentPage ? "solid" : "outline"}
              colorScheme="greeen"
              onClick={() => table.setPageIndex(page - 1)}
              px="0"
            >
              {page}
            </Button>
          ))}

          <Button
            boxSize="30px"
            variant="ghost"
            rounded="full"
            onClick={() => table.nextPage()}
            isDisabled={!table.getCanNextPage()}
          >
            <Icon as={ArrowRight} boxSize={4} />
          </Button>
          <Button
            boxSize="30px"
            variant="ghost"
            rounded="full"
            onClick={() => table.setPageIndex(pageCount - 1)}
            isDisabled={!table.getCanNextPage()}
          >
            <Icon as={ChevronsRight} boxSize={4} />
          </Button>
        </Flex>

        {/* Rows per page */}
        <Flex align="center" gap={2}>
          <Text fontSize="sm">Rows per page:</Text>
          <Select
            height="40px"
            rounded="20px"
            background="hsla(0, 0%, 97%, 1)"
            w="80px"
            value={table.getState().pagination.pageSize}
            onChange={(e) => {
              table.setPageSize(Number(e.target.value));
              pagination?.onPageSizeChange?.(Number(e.target.value));
            }}
          >
            {[5, 10, 20, 50].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </Select>
        </Flex>
      </Flex>
    </Box>
  );
}

// "use client";

// import { useState } from "react";
// import {
//   type ColumnDef,
//   type ColumnFiltersState,
//   type Row,
//   type SortingState,
//   type VisibilityState,
//   flexRender,
//   getCoreRowModel,
//   getFilteredRowModel,
//   getPaginationRowModel,
//   getSortedRowModel,
//   useReactTable,
// } from "@tanstack/react-table";
// import {
//   Table,
//   Thead,
//   Tbody,
//   Tr,
//   Th,
//   Td,
//   Button,
//   Box,
//   Flex,
//   Text,
//   Icon,
//   Skeleton,
//   Popover,
//   PopoverTrigger,
//   Portal,
//   PopoverContent,
//   PopoverBody,
//   PopoverArrow,
// } from "@chakra-ui/react";
// import { ArrowLeft, ArrowRight, Ellipsis } from "lucide-react";
// import { Status, type GlobalStatus } from "./badge";

// type Props<T> = {
//   columns: ColumnDef<T>[];
//   data: T[];
//   onRowClick?: (row: Row<T>) => void;
//   defaultVisibility?: Record<string, boolean>;
//   loading?: boolean;
//   tableAction?: Array<{
//     label: string;
//     onClick: (row: Row<T>) => void;
//   }>;
//   pagination?: {
//     pageIndex: number;
//     pageSize: number;
//     rowCount: number;
//     onPageChange: (pageIndex: number) => void;
//     onPageSizeChange?: (pageSize: number) => void;
//     onMouseEnter?: () => void;
//   };
// };

// export const DEFAULT_PAGE_SIZE = 10;

// export default function DataGrid<T>({
//   defaultVisibility,
//   columns,
//   data,
//   onRowClick,
//   loading = false,
//   pagination,
//   tableAction,
// }: Props<T>) {
//   const [sorting, setSorting] = useState<SortingState>([]);
//   const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
//   const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
//     defaultVisibility || {}
//   );
//   const [rowSelection, setRowSelection] = useState({});
//   const [internalPagination, setInternalPagination] = useState({
//     pageIndex: 0,
//     pageSize: DEFAULT_PAGE_SIZE,
//   });

//   // Choose mode (external vs internal)
//   const isExternal = !!pagination;
//   const pageCount = isExternal
//     ? Math.ceil(pagination.rowCount / pagination.pageSize)
//     : Math.ceil(data.length / internalPagination.pageSize);

//   const table = useReactTable({
//     data,
//     columns,
//     getCoreRowModel: getCoreRowModel(),
//     getSortedRowModel: getSortedRowModel(),
//     getFilteredRowModel: getFilteredRowModel(),
//     getPaginationRowModel: getPaginationRowModel(),
//     manualPagination: isExternal,
//     pageCount: isExternal ? pageCount : undefined,
//     state: {
//       sorting,
//       columnFilters,
//       columnVisibility,
//       rowSelection,
//       pagination: isExternal ? pagination : internalPagination,
//     },
//     onSortingChange: setSorting,
//     onColumnFiltersChange: setColumnFilters,
//     onColumnVisibilityChange: setColumnVisibility,
//     onRowSelectionChange: setRowSelection,
//     onPaginationChange: (updater) => {
//       if (isExternal) {
//         if (typeof updater === "function") {
//           const newState = updater({
//             pageIndex: pagination.pageIndex - 1,
//             pageSize: pagination.pageSize,
//           });
//           pagination.onPageChange(newState.pageIndex + 1);
//           pagination.onPageSizeChange?.(newState.pageSize);
//         } else {
//           pagination.onPageChange(updater.pageIndex + 1);
//           pagination.onPageSizeChange?.(updater.pageSize);
//         }
//       } else {
//         setInternalPagination((old) =>
//           typeof updater === "function" ? updater(old) : updater
//         );
//       }
//     },
//   });

//   return (
//     <Box w="full" overflowX="auto">
//       <Table variant="simple" size="sm">
//         <Thead bg="gray.100" height="40px" fontFamily="var(--fakt)">
//           {table.getHeaderGroups().map((headerGroup) => (
//             <Tr key={headerGroup.id}>
//               {headerGroup.headers.map((header) => (
//                 <Th
//                   key={header.id}
//                   fontWeight="500"
//                   fontSize="14px"
//                   whiteSpace="nowrap"
//                 >
//                   {header.isPlaceholder
//                     ? null
//                     : flexRender(
//                         header.column.columnDef.header,
//                         header.getContext()
//                       )}
//                 </Th>
//               ))}
//             </Tr>
//           ))}
//         </Thead>
//         <Tbody>
//           {loading ? (
//             Array.from({ length: 5 }).map((_, index) => (
//               <Tr key={index}>
//                 {columns.map((_, colIdx) => (
//                   <Td key={colIdx}>
//                     <Skeleton height="20px" />
//                   </Td>
//                 ))}
//               </Tr>
//             ))
//           ) : table.getRowModel().rows?.length ? (
//             table.getRowModel().rows.map((row) => (
//               <Tr
//                 key={row.id}
//                 cursor={onRowClick ? "pointer" : "default"}
//                 _hover={onRowClick ? { bg: "gray.50" } : undefined}
//                 onClick={() => onRowClick?.(row)}
//                 bg={row.getIsSelected() ? "gray.100" : "transparent"}
//               >
//                 {row.getVisibleCells().map((cell) => {
//                   const thead = cell.column.columnDef.header;
//                   if (thead === "Status") {
//                     return (
//                       <Td key={cell.id}>
//                         <Status
//                           key={cell.id}
//                           status={cell.getValue() as GlobalStatus}
//                         />
//                       </Td>
//                     );
//                   } else if (thead === "Action") {
//                     return (
//                       <Td key={cell.id} textAlign="right">
//                         <Popover>
//                           <PopoverTrigger>
//                             <Button variant="ghost" size="sm">
//                               <Ellipsis size={24} />
//                             </Button>
//                           </PopoverTrigger>
//                           <Portal>
//                             <PopoverContent width="100px" height="fit-content">
//                               <PopoverArrow />
//                               <PopoverBody py="4px">
//                                 {tableAction?.map((action) => (
//                                   <Button
//                                     key={action.label}
//                                     variant="link"
//                                     size="sm"
//                                     onClick={() =>
//                                       action.onClick(cell.row as Row<T>)
//                                     }
//                                     fontFamily="var(--fakt)"
//                                     fontWeight="400"
//                                     fontSize="10px"
//                                     color="black"
//                                   >
//                                     {action.label}
//                                   </Button>
//                                 ))}
//                               </PopoverBody>
//                             </PopoverContent>
//                           </Portal>
//                         </Popover>
//                       </Td>
//                     );
//                   } else {
//                     return (
//                       <Td
//                         key={cell.id}
//                         fontSize="14px"
//                         fontWeight="medium"
//                         color="hsla(215, 22%, 17%, 1)"
//                         whiteSpace="nowrap"
//                         p={4}
//                       >
//                         {flexRender(
//                           cell.column.columnDef.cell,
//                           cell.getContext()
//                         )}
//                       </Td>
//                     );
//                   }
//                 })}
//               </Tr>
//             ))
//           ) : (
//             <Tr>
//               <Td colSpan={columns.length} textAlign="center" py={10}>
//                 No results.
//               </Td>
//             </Tr>
//           )}
//         </Tbody>
//       </Table>

//       <Flex
//         align="center"
//         justify="space-between"
//         px={4}
//         py={3}
//         flexWrap="wrap"
//         gap={3}
//       >
//         <Text fontSize="sm">
//           Page {table.getState().pagination.pageIndex} of {pageCount}
//         </Text>
//         <Flex gap={2}>
//           <Button
//             variant="outline"
//             size="sm"
//             onClick={() => table.previousPage()}
//             isDisabled={!table.getCanPreviousPage() || loading}
//             leftIcon={<Icon as={ArrowLeft} boxSize={4} />}
//           >
//             Previous
//           </Button>
//           <Button
//             variant="outline"
//             size="sm"
//             onClick={() => table.nextPage()}
//             onMouseEnter={() => pagination?.onMouseEnter?.()}
//             isDisabled={!table.getCanNextPage() || loading}
//             rightIcon={<Icon as={ArrowRight} boxSize={4} />}
//           >
//             Next
//           </Button>
//         </Flex>
//       </Flex>
//     </Box>
//   );
// }
