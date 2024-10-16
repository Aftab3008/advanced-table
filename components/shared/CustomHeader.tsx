import { Box, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface CustomHeaderProps {
  title: string;
  setIsOpen: (value: boolean) => void;
}

export default function CustomHeader({ title, setIsOpen }: CustomHeaderProps) {
  return (
    <Box className="flex justify-between items-center mb-4">
      <Typography variant="h6" className="font-bold">
        {title}
      </Typography>
      <IconButton
        onClick={() => setIsOpen(false)}
        className="text-gray-500 hover:text-black"
      >
        <CloseIcon />
      </IconButton>
    </Box>
  );
}
