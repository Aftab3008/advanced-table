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
      <Paper className="p-2 sm:p-4 md:p-8 bg-gray-100 flex flex-col gap-2 sm:gap-4 w-full">
        <CustomHeader title="Group" setIsOpen={setIsGroupOpen} />
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
                  className={`mt-1 ${
                    isGrouped
                      ? "bg-red-500 text-white"
                      : "bg-white text-black/75"
                  }`}
                >
                  {isGrouped ? "Ungroup" : "Group"}
                </Button>
              </Box>
            );
          })}

          <Button
            variant="contained"
            className="bg-blue-500 text-white mt-2"
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
