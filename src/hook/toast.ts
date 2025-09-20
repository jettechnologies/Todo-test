import React from "react";
// import { ToastContextValues, ToastContext } from "@/context/toast-provider";
import { ToastContext, type ToastContextValues } from "@context/toast-provider";

export const useToastContext = () => {
  const context = React.useContext(ToastContext);

  if (context === null) {
    throw new Error(
      "Toast context is missing. You probably forgot to wrap the component depending on toast in <ToastProvider />"
    );
  }

  return context as ToastContextValues;
};
