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
    >
      <Box sx={{ width: { xs: "100%", sm: 450 }, padding: 1 }}>
        <Paper
          sx={{
            padding: { xs: "2px", sm: "4px", md: "8px" },
            display: "flex",
            flexDirection: "column",
            gap: { xs: "2px", sm: "4px" },
            width: "100%",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              marginBottom: "8px",
              textAlign: "center",
            }}
          >
            Sort
          </Typography>
          <Stack
            spacing={{ xs: 0.5, sm: 1, md: 2 }}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: { xs: "2px", sm: "4px" },
            }}
          >
            {table.getLeafHeaders().map((header) => {
              const sortedColumn = table
                .getState()
                .sorting.find((sort) => sort.id === header.id);

              const isAsc = sortedColumn && !sortedColumn.desc;
              const isDesc = sortedColumn && sortedColumn.desc;

              return (
                <Box
                  key={header.id}
                  sx={{ display: "flex", flexDirection: "column" }}
                >
                  <Typography
                    variant="subtitle2"
                    sx={{ marginBottom: "2px", fontWeight: "bold" }}
                  >
                    Sort By {header.column.columnDef.header}
                  </Typography>

                  <Box sx={{ display: "flex", gap: 1 }}>
                    <Button
                      onClick={() => {
                        const currentSorting = table.getState().sorting;
                        const existingSort = currentSorting.find(
                          (sort) => sort.id === header.id
                        );
                        if (existingSort && existingSort.desc === false) {
                          table.setSorting(
                            currentSorting.filter(
                              (sort) => sort.id !== header.id
                            )
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
                            currentSorting.filter(
                              (sort) => sort.id !== header.id
                            )
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
              sx={{ marginTop: 2 }}
            >
              Reset Sort
            </Button>
          </Stack>
        </Paper>
      </Box>
    </Drawer>
  );
}
