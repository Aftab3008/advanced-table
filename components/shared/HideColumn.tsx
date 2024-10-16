import { Product } from "@/types";
import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Button,
  IconButton,
  Paper,
  Stack,
  Switch,
  Typography,
} from "@mui/material";
import { MRT_TableInstance } from "material-react-table";
import CustomDrawer from "./CustomDrawer";
import CustomHeader from "./CustomHeader";

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
    <CustomDrawer isOpen={isColumnOpen} setIsOpen={setIsColumnOpen}>
      <Paper className="p-2 sm:p-4 md:p-8 bg-gray-100 flex flex-col gap-2 sm:gap-4 w-full">
        <CustomHeader title="Hide Columns" setIsOpen={setIsColumnOpen} />
        <Stack
          spacing={{ xs: 0.5, sm: 1, md: 2 }}
          className="flex flex-col gap-2 sm:gap-4"
        >
          {table.getAllLeafColumns().map((column) => {
            const isVisible = column.getIsVisible();

            return (
              <Box
                key={column.id}
                className="flex justify-between items-center mb-2"
              >
                <Typography variant="subtitle2" className="font-bold">
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
            className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2"
          >
            Reset Column Visibility
          </Button>
        </Stack>
      </Paper>
    </CustomDrawer>
  );
}
