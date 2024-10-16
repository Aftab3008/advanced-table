import { Product } from "@/types";
import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import {
  MRT_TableHeadCellFilterContainer,
  MRT_TableInstance,
} from "material-react-table";
import CustomDrawer from "./CustomDrawer";
import CustomHeader from "./CustomHeader";

interface FilterDrawerProps {
  isDrawerOpen: boolean;
  setIsDrawerOpen: (value: boolean) => void;
  table: MRT_TableInstance<Product>;
}

export default function FilterDrawer({
  isDrawerOpen,
  setIsDrawerOpen,
  table,
}: FilterDrawerProps) {
  return (
    <CustomDrawer isOpen={isDrawerOpen} setIsOpen={setIsDrawerOpen}>
      <Paper className="p-2 sm:p-4 md:p-8 bg-gray-100 flex flex-col gap-2 sm:gap-4 w-full">
        <CustomHeader title="Filter" setIsOpen={setIsDrawerOpen} />
        <Stack
          direction="column"
          spacing={{ xs: 0.5, sm: 1, md: 2 }}
          className="flex flex-col gap-2 sm:gap-4"
        >
          {table.getLeafHeaders().map((header) => (
            <Box key={header.id} className="flex flex-col">
              <Typography variant="subtitle2" className="font-bold mb-1">
                {header.column.columnDef.header}
              </Typography>
              <MRT_TableHeadCellFilterContainer
                header={header}
                table={table}
                className="p-2 sm:p-4"
                in
              />
            </Box>
          ))}

          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              table.resetColumnFilters();
              table.resetGlobalFilter();
              setIsDrawerOpen(false);
            }}
            className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2 self-start w-full"
          >
            Reset Filters
          </Button>
        </Stack>
      </Paper>
    </CustomDrawer>
  );
}
