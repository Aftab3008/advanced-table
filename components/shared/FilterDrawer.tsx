import { Product } from "@/types";
import { Box, Button, Drawer, Paper, Stack, Typography } from "@mui/material";
import {
  MRT_TableHeadCellFilterContainer,
  MRT_TableInstance,
} from "material-react-table";

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
    <Drawer
      anchor="right"
      open={isDrawerOpen}
      onClose={() => {
        setIsDrawerOpen(false);
      }}
    >
      <Box sx={{ width: { xs: "100%", sm: 450 }, padding: 1 }}>
        <Paper
          sx={{
            padding: { xs: "2px", sm: "4px", md: "8px" },
            display: "flex",
            flexDirection: "column",
            gap: { xs: "2px", sm: "4px" },
            width: "100%",
            maxWidth: "100%",
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
            Filters
          </Typography>
          <Stack
            direction="column"
            spacing={{ xs: 0.5, sm: 1, md: 2 }}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: { xs: "2px", sm: "4px" },
            }}
          >
            {table.getLeafHeaders().map((header) => (
              <Box
                key={header.id}
                sx={{ display: "flex", flexDirection: "column" }}
              >
                <Typography
                  variant="subtitle2"
                  sx={{ marginBottom: "2px", fontWeight: "bold" }}
                >
                  Filter by {header.column.columnDef.header}
                </Typography>
                <MRT_TableHeadCellFilterContainer
                  header={header}
                  table={table}
                  sx={{
                    padding: { xs: "2px", sm: "4px" },
                  }}
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
              sx={{
                marginTop: 1,
                alignSelf: "flex-start",
                padding: { xs: "4px 8px", sm: "6px 12px" },
              }}
            >
              Reset Filters
            </Button>
          </Stack>
        </Paper>
      </Box>
    </Drawer>
  );
}
