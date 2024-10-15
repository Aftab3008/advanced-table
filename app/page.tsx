"use client";

import Home from "@/components/home/Home";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { de } from "date-fns/locale/de";

export default function Page() {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={de}>
      <Home />
    </LocalizationProvider>
  );
}
