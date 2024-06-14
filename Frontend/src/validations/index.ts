import * as Yup from "yup";

export const actionFormValidationSchema = Yup.object({
  stockName: Yup.string().required("Campo vacío"),
  purchaseDate: Yup.date().required("Campo vacío"),
  purchasePricePerShare: Yup.number().min(0, "Error: Ingreso no válido. Por favor ingrese un número mayor o igual a cero").typeError("Error: Ingreso no válido. Por favor ingrese un número mayor o igual a cero").required("Campo vacío"),
  quantityOfShares: Yup.number().min(0, "Error: Ingreso no válido. Por favor ingrese un número mayor o igual a cero").typeError("Error: Ingreso no válido. Por favor ingrese un número mayor o igual a cero").required("Campo vacío"),
});
