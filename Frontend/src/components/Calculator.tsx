import { useState } from "react";
import { useFormik } from "formik";
import { FormikProvider, Form, Field } from "formik";
import StockTable from './StockTable';



import TextField from "./TextField";
import { initialActionFormState } from "../types";
import { actionFormValidationSchema } from "../validations";

function Calculator() {
  const [form, setForm] = useState(initialActionFormState);
  const [stocks, setStocks] = useState([]);
  const [selectedStock, setSelectedStock] = useState(null);


  const calculateSalePrice = (purchasePricePerShare, quantityOfShares) => {
    const calculatedSalePrice = Number(purchasePricePerShare) * Number(quantityOfShares);
    return calculatedSalePrice;
  };

  
  const handleDelete = (stockId) => {
    const updatedStocks = stocks.filter((stock) => stock.id !== stockId);
    setStocks(updatedStocks);
  };
  
  const {
    handleSubmit,
    handleChange,
    handleBlur,
    resetForm,
    touched,
    errors,
    values: { stockName, purchaseDate, purchasePricePerShare, quantityOfShares },
  } = useFormik({
    initialValues: {
      stockName: "",
      purchaseDate: new Date().toISOString().slice(0, 10),
      purchasePricePerShare: "",
      quantityOfShares: "",
    },
    validationSchema: actionFormValidationSchema,
    onSubmit: (values) => {
      // Calculate and handle sale price here
      const calculatedSalePrice = calculateSalePrice(values.purchasePricePerShare, values.quantityOfShares);
      // Perform any actions needed with calculatedSalePrice (e.g., store it)
      // store calculatedSalePrice in localStorage
      localStorage.calculatedSalePrice = calculatedSalePrice;
      const newStock = {
        id: Date.now(),
        stockName: values.stockName,
        purchaseDate: values.purchaseDate ,
        purchasePricePerShare: values.purchasePricePerShare,
        quantityOfShares: values.quantityOfShares,
        totalCost: calculatedSalePrice,
      };

      setStocks([...stocks, newStock]);
      console.log(stocks);
      console.log(new Date(values.purchaseDate).toLocaleDateString());
    },
  });

  const onReset = () => {
    setForm(initialActionFormState);
    resetForm();
  };

  return (
    <><div className="mx-auto max-w-2xl rounded-3xl ring-1 ring-gray-200 dark:ring-gray-700 sm:mt-13 mt-10 lg:mx-0 lg:flex lg:max-w-none">
      <div className="px-4 py-6 md:p-8 sm:p-10 lg:flex-auto items-center flex">
        <form
          method="POST"
          autoComplete="off"
          className="space-y-8 w-full"
          onSubmit={handleSubmit}
        >

          <TextField
            name="stockName"
            label="Nombre de la acción"
            value={stockName}
            error={touched.stockName && errors.stockName}
            onChange={handleChange}
            onBlur={handleBlur} />

          <div className="relative mt-1 rounded-md shadow-sm">
          <label className="block text-sm font-medium text-gray-700 dark:text-white">
            Fecha de la compra
          </label>
          <input
            name="purchaseDate"
            value={purchaseDate}
            onChange={handleChange}
            type="date" // Agrega el tipo "date"
            className="block w-full pr-5 pl-7 py-3 text-base placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg text-neutral-600 dark:text-white bg-gray-50 dark:bg-slate-900 focus:outline-none focus:border-transparent focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700"
          />
          </div>

          <TextField
            name="purchasePricePerShare"
            label="Precio de compra por acción"
            value={purchasePricePerShare}
            error={touched.purchasePricePerShare && errors.purchasePricePerShare}
            onChange={handleChange}
            onBlur={handleBlur} />
          <TextField
            name="quantityOfShares"
            label="Cantidad de acciones"
            value={quantityOfShares}
            error={touched.quantityOfShares && errors.quantityOfShares}
            onChange={handleChange}
            onBlur={handleBlur} />

          <div className="flex flex-col space-y-3 md:flex-row md:space-y-0 md:space-x-8">
            <button type="submit" className="flex-2 btn btn-primary">
              Registrar
            </button>
            <button
              type="button"
              onClick={onReset}
              className="flex-1 btn btn-secondary"
            >
              Reiniciar
            </button>
          </div>
        </form>
      </div>



    </div>
    <div className="mx-auto max-w-2xl rounded-3xl ring-1 ring-gray-200 dark:ring-gray-700 sm:mt-13 mt-16 lg:mx-0 lg:flex lg:max-w-none">
        {/* ... formulario */}

        <StockTable stocks={stocks} onDelete={handleDelete}/> {/* Renderiza la tabla */}
    </div>
    </>
    
  );
}


export default Calculator;
