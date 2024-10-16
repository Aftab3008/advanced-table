import { Drawer } from "@mui/material";

interface CustomDrawerProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  children: React.ReactNode;
}

export default function CustomDrawer({
  isOpen,
  setIsOpen,
  children,
}: CustomDrawerProps) {
  return (
    <Drawer
      anchor="right"
      open={isOpen}
      onClose={() => setIsOpen(false)}
      sx={{
        "& .MuiDrawer-paper": {
          width: {
            xs: "100%",
            sm: "450px",
            md: "500px",
          },
          p: 4,
          bgcolor: "white",
          boxShadow: 3,
        },
      }}
    >
      {children}
    </Drawer>
  );
}
