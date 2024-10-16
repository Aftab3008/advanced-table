import { Product } from "@/types";
import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import { MRT_TableInstance } from "material-react-table";
import CustomDrawer from "./CustomDrawer";
import CustomHeader from "./CustomHeader";

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
    <CustomDrawer isOpen={isGroupOpen} setIsOpen={setIsGroupOpen}>
      <Paper
        sx={{
          padding: { xs: 2, sm: 4, md: 8 },
          backgroundColor: "grey.100",
          display: "flex",
          flexDirection: "column",
          gap: { xs: 2, sm: 4 },
          width: "100%",
        }}
      >
        <CustomHeader title="Group" setIsOpen={setIsGroupOpen} />
        <Stack
          direction="column"
          spacing={{ xs: 0.5, sm: 1, md: 2 }}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: { xs: 2, sm: 4 },
            width: "100%",
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
                  sx={{ mb: 2, fontWeight: "bold" }}
                >
                  {header.column.columnDef.header}
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
                  sx={{
                    mt: 1,
                    backgroundColor: isGrouped ? "red.500" : "white",
                    color: isGrouped ? "white" : "black",
                    "&:hover": {
                      backgroundColor: isGrouped ? "red.600" : "gray.100",
                    },
                  }}
                >
                  {isGrouped ? "Ungroup" : "Group"}
                </Button>
              </Box>
            );
          })}

          <Button
            variant="contained"
            sx={{
              backgroundColor: "blue.500",
              color: "white",
              mt: 2,
              "&:hover": {
                backgroundColor: "blue.600",
              },
            }}
            onClick={() => {
              table.setGrouping([]);
              setIsGroupOpen(false);
            }}
          >
            Reset Grouping
          </Button>
        </Stack>
      </Paper>
    </CustomDrawer>
  );
}
