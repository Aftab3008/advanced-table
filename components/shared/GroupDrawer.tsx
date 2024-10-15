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
      classes={{ paper: "bg-white shadow-lg w-full sm:w-[450px] p-4" }}
    >
      <Paper className="p-2 sm:p-4 md:p-8 bg-gray-100 flex flex-col gap-2 sm:gap-4 w-full">
        <Typography variant="h6" className="font-bold mb-2 text-center">
          Group
        </Typography>
        <Stack
          direction="column"
          spacing={{ xs: 0.5, sm: 1, md: 2 }}
          className="flex flex-col gap-2 sm:gap-4"
        >
          {table.getLeafHeaders().map((header) => {
            const isGrouped = table.getState().grouping.includes(header.id);

            return (
              <Box key={header.id} className="flex flex-col">
                <Typography variant="subtitle2" className="mb-2 font-bold">
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
                  className={`mt-1 ${
                    isGrouped ? "bg-red-500" : "bg-blue-500"
                  } text-white`}
                >
                  {isGrouped ? "Ungroup" : "Group"}
                </Button>
              </Box>
            );
          })}

          <Button
            variant="contained"
            className="bg-gray-400 text-white mt-2"
            onClick={() => {
              table.setGrouping([]);
              setIsGroupOpen(false);
            }}
          >
            Reset Grouping
          </Button>
        </Stack>
      </Paper>
    </Drawer>
  );
}
