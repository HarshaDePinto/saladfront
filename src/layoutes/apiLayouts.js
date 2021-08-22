import { API } from "../config";

export const itemTotal = () => {
    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        return JSON.parse(localStorage.getItem("cart")).length;
      }
    }
    return 0;
  };