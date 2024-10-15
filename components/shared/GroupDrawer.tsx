import { Product } from "@/types";
import { Box, Button, Drawer, Paper, Stack, Typography } from "@mui/material";
import { MRT_TableInstance } from "material-react-table";

interface GroupDrawerProps {
  isGroupOpen: boolean;
  setIsGroupOpen: (value: boolean) => void;
  table: MRT_TableInstance<Product>;
}

export default function GroupDrawer({
  isGroupOpen,
  setIsGroupOpen,
  table,
}: GroupDrawerProps) {
  return (
    <Drawer
      anchor="right"
      open={isGroupOpen}
      onClose={() => {
        setIsGroupOpen(false);
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
            Group
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
            {table.getLeafHeaders().map((header) => {
              const isGrouped = table.getState().grouping.includes(header.id);

              return (
                <Box
                  key={header.id}
                  sx={{ display: "flex", flexDirection: "column" }}
                >
                  <Typography
                    variant="subtitle2"
                    sx={{ marginBottom: "2px", fontWeight: "bold" }}
                  >
                    Group by {header.column.columnDef.header}
                  </Typography>
                  <Button
                    onClick={() => {
                      table.setGrouping((prevGrouping) =>
                        isGrouped
                          ? prevGrouping.filter((id) => id !== header.id)
                          : [...prevGrouping, header.id]
                      );
                    }}
                    variant="contained"
                    sx={{ mt: 1 }}
                  >
                    {isGrouped ? "Ungroup" : "Group"}
                  </Button>
                </Box>
              );
            })}

            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                table.setGrouping([]);
              }}
              sx={{
                marginTop: 1,
                alignSelf: "flex-start",
                padding: { xs: "4px 8px", sm: "6px 12px" },
              }}
            >
              Reset Grouping
            </Button>
          </Stack>
        </Paper>
      </Box>
    </Drawer>
  );
}
