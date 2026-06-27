import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// Format a trek package price for display in INR.
export function formatPrice(amount) {
  return "₹" + amount.toLocaleString("en-IN");
}