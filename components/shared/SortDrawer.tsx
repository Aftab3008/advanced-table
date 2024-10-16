import { Product } from "@/types";
import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import { MRT_TableInstance } from "material-react-table";
import CustomDrawer from "./CustomDrawer";
import CustomHeader from "./CustomHeader";

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
    <CustomDrawer isOpen={isSortOpen} setIsOpen={setIsSortOpen}>
      <Paper
        sx={{
          padding: { xs: 2, sm: 4, md: 8 },
          backgroundColor: "grey.100",
          display: "flex",
          flexDirection: "column",
          gap: 2,
          width: "100%",
        }}
      >
        <CustomHeader title="Sort" setIsOpen={setIsSortOpen} />
        <Stack
          spacing={{ xs: 0.5, sm: 1, md: 2 }}
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          {table.getLeafHeaders().map((header) => {
            const sortedColumn = table
              .getState()
              .sorting.find((sort) => sort.id === header.id);

            const isAsc = sortedColumn && !sortedColumn.desc;
            const isDesc = sortedColumn && sortedColumn.desc;

            const handleSort = (isAscending: boolean) => {
              const currentSorting = table.getState().sorting;
              const existingSort = currentSorting.find(
                (sort) => sort.id === header.id
              );

              if (existingSort) {
                if (
                  (isAscending && !existingSort.desc) ||
                  (!isAscending && existingSort.desc)
                ) {
                  table.setSorting(
                    currentSorting.filter((sort) => sort.id !== header.id)
                  );
                } else {
                  table.setSorting(
                    currentSorting.map((sort) =>
                      sort.id === header.id
                        ? { id: header.id, desc: !isAscending }
                        : sort
                    )
                  );
                }
              } else {
                table.setSorting([
                  ...currentSorting,
                  { id: header.id, desc: !isAscending },
                ]);
              }
            };

            return (
              <Box
                key={header.id}
                sx={{ display: "flex", flexDirection: "column" }}
              >
                <Typography
                  variant="subtitle2"
                  sx={{ fontWeight: "bold", mb: 1 }}
                >
                  {header.column.columnDef.header}
                </Typography>

                <Box sx={{ display: "flex", gap: 1, width: "100%" }}>
                  <Button
                    onClick={() => handleSort(true)}
                    variant={isAsc ? "contained" : "outlined"}
                    color={isAsc ? "primary" : "inherit"}
                    sx={{
                      flex: 1,
                      backgroundColor: isAsc ? "blue.500" : "white",
                      color: isAsc ? "white" : "inherit",
                      border: isAsc ? "none" : "1px solid",
                      borderColor: isAsc ? "transparent" : "gray.300",
                      px: 4,
                      py: 2,
                      borderRadius: "8px",
                    }}
                  >
                    Asc
                  </Button>

                  <Button
                    onClick={() => handleSort(false)}
                    variant={isDesc ? "contained" : "outlined"}
                    color={isDesc ? "primary" : "inherit"}
                    sx={{
                      flex: 1,
                      backgroundColor: isDesc ? "blue.500" : "white",
                      color: isDesc ? "white" : "inherit",
                      border: isDesc ? "none" : "1px solid",
                      borderColor: isDesc ? "transparent" : "gray.300",
                      px: 4,
                      py: 2,
                      borderRadius: "8px",
                    }}
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
            sx={{
              backgroundColor: "blue.500",
              color: "white",
              px: 4,
              py: 2,
              borderRadius: "8px",
              mt: 4,
            }}
          >
            Reset Sort
          </Button>
        </Stack>
      </Paper>
    </CustomDrawer>
  );
}
