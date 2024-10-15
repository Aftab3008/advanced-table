"use client";

import { Product } from "@/types";
import { products } from "@/utils";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import {
  faArrowDownWideShort,
  faFilter,
  faFilterCircleXmark,
  faSearch,
  faSearchMinus,
  faSortDown,
  faEyeLowVision,
  faColumns,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  MaterialReactTable,
  MRT_GlobalFilterTextField,
  MRT_Icons,
  MRT_PaginationState,
  MRT_ShowHideColumnsButton,
  MRT_ShowHideColumnsMenuItems,
  MRT_SortingFns,
  MRT_TableHeadCellFilterContainer,
  MRT_ToggleFullScreenButton,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";
import moment from "moment";
import { useMemo, useState } from "react";
import { Box, Button, IconButton } from "@mui/material";
import FilterDrawer from "../shared/FilterDrawer";
import HideColumn from "../shared/HideColumn";
import SortDrawer from "../shared/SortDrawer";

config.autoAddCss = false;

const data: Product[] = products;

const fontAwesomeIcons: Partial<MRT_Icons> = {
  ArrowDownwardIcon: (props: any) => (
    <FontAwesomeIcon icon={faSortDown} {...props} />
  ),
  FilterListIcon: (props: any) => (
    <FontAwesomeIcon icon={faFilter} {...props} />
  ),
  FilterListOffIcon: () => <FontAwesomeIcon icon={faFilterCircleXmark} />,
  SearchIcon: (props: any) => <FontAwesomeIcon icon={faSearch} {...props} />,
  SearchOffIcon: () => <FontAwesomeIcon icon={faSearchMinus} />,
  SortIcon: (props: any) => (
    <FontAwesomeIcon icon={faArrowDownWideShort} {...props} />
  ),
};
const Home = () => {
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isColumnOpen, setIsColumnOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  // const toggleDrawer =
  //   (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
  //     if (
  //       event.type === "keydown" &&
  //       ((event as React.KeyboardEvent).key === "Tab" ||
  //         (event as React.KeyboardEvent).key === "Shift")
  //     ) {
  //       return;
  //     }
  //     setIsDrawerOpen(open);
  //   };
  const columns = useMemo<MRT_ColumnDef<Product>[]>(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        size: 50,
      },
      {
        accessorKey: "name",
        header: "Product Name",
        size: 200,
      },
      {
        accessorKey: "category",
        header: "Category",
        size: 150,
        filterVariant: "select",
      },
      {
        accessorKey: "subcategory",
        header: "Subcategory",
        size: 150,
        filterVariant: "select",
      },
      {
        accessorKey: "createdAt",
        header: "Created At",
        Cell: ({ cell }) =>
          moment(cell.getValue<string>()).local().format("DD-MMM-YYYY HH:mm"),
        size: 150,
        filterVariant: "date-range",
      },
      {
        accessorKey: "updatedAt",
        header: "Updated At",
        Cell: ({ cell }) =>
          moment(cell.getValue<string>()).local().format("DD-MMM-YYYY HH:mm"),
        size: 150,
        filterVariant: "date-range",
      },
      {
        accessorKey: "price",
        header: "Price",
        size: 100,
        filterVariant: "range-slider",
      },
      {
        accessorKey: "sale_price",
        header: "Sale Price",
        Cell: ({ cell }) =>
          cell.getValue() ? (cell.getValue() as React.ReactNode) : "N/A",
        size: 100,
        filterVariant: "range-slider",
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data,
    onPaginationChange: setPagination,
    enableFullScreenToggle: false,
    enableDensityToggle: false,
    enableSortingRemoval: true,
    enableMultiSort: true,
    enableGlobalFilter: true,
    enableFacetedValues: true,
    enableGrouping: true,
    paginationDisplayMode: "pages",
    isMultiSortEvent: () => true,
    state: {
      pagination,
    },
    muiPaginationProps: {
      showRowsPerPage: false,
    },
    initialState: {
      showGlobalFilter: true,
    },
    renderToolbarInternalActions: ({ table }) => (
      <Box>
        <IconButton
          onClick={() => {
            setIsSortOpen(true);
          }}
        >
          <FontAwesomeIcon icon={faArrowDownWideShort} />
        </IconButton>
        <SortDrawer
          isSortOpen={isSortOpen}
          setIsSortOpen={setIsSortOpen}
          table={table}
        />
        <IconButton
          onClick={() => {
            setIsDrawerOpen(true);
          }}
        >
          <FontAwesomeIcon icon={faFilter} />
        </IconButton>
        <FilterDrawer
          isDrawerOpen={isDrawerOpen}
          setIsDrawerOpen={setIsDrawerOpen}
          table={table}
        />
        <IconButton
          onClick={() => {
            setIsColumnOpen(true);
          }}
        >
          <FontAwesomeIcon icon={faColumns} />
        </IconButton>
        <HideColumn
          isColumnOpen={isColumnOpen}
          setIsColumnOpen={setIsColumnOpen}
          table={table}
        />
      </Box>
    ),
  });

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-4/5">
        <MaterialReactTable table={table} />
      </div>
    </div>
  );
};

export default Home;
