import { ChangeEvent, FocusEvent } from "react";

interface TextFieldProps {
  label: string;
  name: string;
  value?: any;
  error?: any;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: FocusEvent<HTMLInputElement>) => void;
}


type Errors = {
  costOfItem?: string | null;
  markup?: string | null;
  // Additional error fields for ActionFormState, e.g.,
  stockName?: string | null;
  purchaseDate?: string | null;
  purchasePricePerShare?: string | null;
  quantityOfShares?: string | null;
};


interface ActionFormState {
  stockName: string;
  purchaseDate: Date;
  purchasePricePerShare: Number;
  quantityOfShares: Number;
  errors: Errors;
}

const initialActionFormState: ActionFormState = {
  stockName: "",
  purchaseDate: new Date(), // Initialize to current date
  purchasePricePerShare: 0,
  quantityOfShares: 0,
  errors: {
    // Add any relevant error fields for ActionFormState, e.g.,
    stockName: null,
    purchaseDate: null,
    purchasePricePerShare: null,
    quantityOfShares: null,
  },
 };
 

export type { TextFieldProps, Errors };
export { initialActionFormState };
