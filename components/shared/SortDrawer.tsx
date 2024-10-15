import { Product } from "@/types";
import { Box, Button, Drawer, Paper, Stack, Typography } from "@mui/material";
import { MRT_TableInstance } from "material-react-table";

interface SortDrawerProps {
  isSortOpen: boolean;
  setIsSortOpen: (value: boolean) => void;
  table: MRT_TableInstance<Product>;
}

export default function SortDrawer({
  isSortOpen,
  setIsSortOpen,
  table,
}: SortDrawerProps) {
  return (
    <Drawer
      anchor="right"
      open={isSortOpen}
      onClose={() => setIsSortOpen(false)}
      classes={{ paper: "bg-white shadow-lg w-full sm:w-[450px] p-4" }}
    >
      <Paper className="p-2 sm:p-4 md:p-8 bg-gray-100 flex flex-col gap-2 sm:gap-4 w-full">
        <Typography variant="h6" className="font-bold mb-2 text-center">
          Sort
        </Typography>
        <Stack
          spacing={{ xs: 0.5, sm: 1, md: 2 }}
          className="flex flex-col gap-2 sm:gap-4"
        >
          {table.getLeafHeaders().map((header) => {
            const sortedColumn = table
              .getState()
              .sorting.find((sort) => sort.id === header.id);

            const isAsc = sortedColumn && !sortedColumn.desc;
            const isDesc = sortedColumn && sortedColumn.desc;

            return (
              <Box key={header.id} className="flex flex-col">
                <Typography variant="subtitle2" className="font-bold mb-1">
                  Sort By {header.column.columnDef.header}
                </Typography>

                <Box className="flex gap-1 w-full">
                  <Button
                    onClick={() => {
                      const currentSorting = table.getState().sorting;
                      const existingSort = currentSorting.find(
                        (sort) => sort.id === header.id
                      );
                      if (existingSort && existingSort.desc === false) {
                        table.setSorting(
                          currentSorting.filter((sort) => sort.id !== header.id)
                        );
                      } else {
                        table.setSorting([
                          ...currentSorting,
                          { id: header.id, desc: false },
                        ]);
                      }
                    }}
                    variant={isAsc ? "contained" : "outlined"}
                    color={isAsc ? "primary" : "inherit"}
                    className={`flex-1 ${
                      isAsc
                        ? "bg-blue-500 text-white"
                        : "bg-white border border-gray-300"
                    } px-4 py-2 rounded-md`}
                  >
                    Asc
                  </Button>

                  <Button
                    onClick={() => {
                      const currentSorting = table.getState().sorting;
                      const existingSort = currentSorting.find(
                        (sort) => sort.id === header.id
                      );
                      if (existingSort && existingSort.desc === true) {
                        table.setSorting(
                          currentSorting.filter((sort) => sort.id !== header.id)
                        );
                      } else {
                        table.setSorting([
                          ...currentSorting,
                          { id: header.id, desc: true },
                        ]);
                      }
                    }}
                    variant={isDesc ? "contained" : "outlined"}
                    color={isDesc ? "primary" : "inherit"}
                    className={`flex-1 ${
                      isDesc
                        ? "bg-blue-500 text-white"
                        : "bg-white border border-gray-300"
                    } px-4 py-2 rounded-md`}
                  >
                    Desc
                  </Button>
                </Box>
              </Box>
            );
          })}

          <Button
            onClick={() => {
              table.resetSorting();
              setIsSortOpen(false);
            }}
            variant="contained"
            className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4"
          >
            Reset Sort
          </Button>
        </Stack>
      </Paper>
    </Drawer>
  );
}
