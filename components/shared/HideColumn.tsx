import { Product } from "@/types";
import {
  Box,
  Button,
  Drawer,
  Paper,
  Stack,
  Switch,
  Typography,
} from "@mui/material";
import { MRT_TableInstance } from "material-react-table";

interface HideColumnProps {
  isColumnOpen: boolean;
  setIsColumnOpen: (value: boolean) => void;
  table: MRT_TableInstance<Product>;
}

export default function HideColumn({
  isColumnOpen,
  setIsColumnOpen,
  table,
}: HideColumnProps) {
  return (
    <Drawer
      anchor="right"
      open={isColumnOpen}
      onClose={() => setIsColumnOpen(false)}
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
            Hide
          </Typography>
          <Stack
            spacing={{ xs: 0.5, sm: 1, md: 2 }}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: { xs: "2px", sm: "4px" },
            }}
          >
            {table.getAllLeafColumns().map((column) => {
              const isVisible = column.getIsVisible();

              return (
                <Box
                  key={column.id}
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: 2,
                  }}
                >
                  <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
                    {column.columnDef.header}
                  </Typography>
                  <Switch
                    checked={isVisible}
                    onChange={() => {
                      column.toggleVisibility(!isVisible);
                    }}
                    inputProps={{ "aria-label": "toggle column visibility" }}
                  />
                </Box>
              );
            })}

            <Button
              onClick={() => {
                table.resetColumnVisibility();
                setIsColumnOpen(false);
              }}
              variant="contained"
              sx={{ marginTop: 2 }}
            >
              Reset Column Visibility
            </Button>
          </Stack>
        </Paper>
      </Box>
    </Drawer>
  );
}
