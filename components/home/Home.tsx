"use client";

import { Product } from "@/types";
import { products } from "@/utils";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import {
  MaterialReactTable,
  MRT_PaginationState,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";
import moment from "moment";
import { useMemo, useState } from "react";
import CustomToolBar from "../shared/CustomToolBar";

config.autoAddCss = false;

const data: Product[] = products;

const Home = () => {
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

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
        filterVariant: "multi-select",
      },
      {
        accessorKey: "subcategory",
        header: "Subcategory",
        size: 150,
        filterVariant: "multi-select",
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
      <CustomToolBar table={table} />
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
