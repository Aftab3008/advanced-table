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
      classes={{
        paper: "w-full sm:w-[450px] md:w-[500px] p-4 bg-white shadow-lg",
      }}
    >
      {children}
    </Drawer>
  );
}
