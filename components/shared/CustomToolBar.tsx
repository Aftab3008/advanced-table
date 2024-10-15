import { Product } from "@/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, IconButton } from "@mui/material";
import { MRT_TableInstance } from "material-react-table";
import SortDrawer from "./SortDrawer";
import FilterDrawer from "./FilterDrawer";
import HideColumn from "./HideColumn";
import GroupDrawer from "./GroupDrawer";
import { useState } from "react";
import {
  faArrowDownWideShort,
  faColumns,
  faCubesStacked,
  faFilter,
} from "@fortawesome/free-solid-svg-icons";

interface CustomToolBarProps {
  table: MRT_TableInstance<Product>;
}

export default function CustomToolBar({ table }: CustomToolBarProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [isColumnOpen, setIsColumnOpen] = useState<boolean>(false);
  const [isSortOpen, setIsSortOpen] = useState<boolean>(false);
  const [isGroupOpen, setIsGroupOpen] = useState<boolean>(false);
  return (
    <Box>
      <IconButton
        onClick={() => {
          setIsSortOpen(true);
        }}
      >
        <FontAwesomeIcon icon={faArrowDownWideShort} />
      </IconButton>
      <SortDrawer
        isSortOpen={isSortOpen}
        setIsSortOpen={setIsSortOpen}
        table={table}
      />
      <IconButton
        onClick={() => {
          setIsDrawerOpen(true);
        }}
      >
        <FontAwesomeIcon icon={faFilter} />
      </IconButton>
      <FilterDrawer
        isDrawerOpen={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
        table={table}
      />
      <IconButton
        onClick={() => {
          setIsColumnOpen(true);
        }}
      >
        <FontAwesomeIcon icon={faColumns} />
      </IconButton>
      <HideColumn
        isColumnOpen={isColumnOpen}
        setIsColumnOpen={setIsColumnOpen}
        table={table}
      />
      <IconButton
        onClick={() => {
          setIsGroupOpen(true);
        }}
      >
        <FontAwesomeIcon icon={faCubesStacked} />
      </IconButton>
      <GroupDrawer
        isGroupOpen={isGroupOpen}
        setIsGroupOpen={setIsGroupOpen}
        table={table}
      />
    </Box>
  );
}
