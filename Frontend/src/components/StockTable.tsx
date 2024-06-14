import React, { useEffect, useState } from 'react';


const StockTable = ({ stockSymbols }) => {

  const [stocks, setStocks] = useState([]);
  const [selectedStock, setSelectedStock] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Función para obtener los datos de la API
    async function fetchStockData(symbol) {
      try {
        const response = await fetch(
          `https://financialmodelingprep.com/api/v3/quote/${symbol}?apikey=vNRx1MDQ0j0g3wJbR4FZIOeLOBqHrJMG`
        );
        const data = await response.json();
        //console.log(data);
        return data[0]; // La API devuelve un array, tomamos el primer elemento
      } catch (error) {
        console.error(`Error al obtener datos para ${symbol}:`, error);
        return null;
      }
    }
    // Función para obtener los datos de las acciones
    async function fetchData() {
      const stockDataPromises = stockSymbols.map((symbol) => fetchStockData(symbol));
      const stockDataResults = await Promise.all(stockDataPromises);
      const filteredStocks = stockDataResults.filter((stockData) => stockData !== null);
      
      //asignar el valor de filteredStocks a la variable stocks
      setStocks(filteredStocks as never[]);
    }

    fetchData();
    
  }, [stockSymbols]);

  //Logica para la compra
  // Función para manejar el click en el botón de compra
  const handleBuyClick = (stock) => {
    setSelectedStock(stock);
    setShowModal(true);
  }

  // Función para manejar el clic en una fila
  const handleRowClick = (stock) => {
    
    // Si la fila ya está seleccionada, deselecciónala
    if (selectedStock === stock) {
      setSelectedStock(null);
    } else {
      // Si no está seleccionada, establece la fila como seleccionada
      setSelectedStock(stock);
    }
  };


  // Función para manejar el cambio en el input de cantidad
  const handlePurchase = async () => {
    // Calcular la fecha actual
    const currentDate = new Date().toISOString().split('T')[0];
    const purchasePrice = selectedStock.price * quantity;

    const purchaseData = {
      symbol: selectedStock.symbol,
      name: selectedStock.name,
      purchaseDate: currentDate,
      pricePerShare: selectedStock.price,
      quantity: quantity,
      purchasePrice: purchasePrice,
    };

    try {
      const response = await fetch('http://localhost:4000/api/stocks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(purchaseData),
      });

      if (response.ok) {
        console.log('Compra realizada con éxito');
      } else {
        console.error('Error al realizar la compra');
      }
    } catch (error) {
      console.error('Error al realizar la compra:', error);
    }

    // Cerrar el modal después de enviar la solicitud
    setShowModal(false);
  };

  return (
    <div className="py-3">
    <table className="min-w-full divide-y divide-gray-200 ring-gray-200 dark:ring-gray-700 rounded-md ">
      <thead className="bg-gray-50 dark:bg-slate-900">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-brand uppercase tracking-wider rounded-tl-xl">Simbolo</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-brand uppercase tracking-wider">Nombre de la empresa</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-brand uppercase tracking-wider">Precio</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-brand uppercase tracking-wider">Valoración Porcentual</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-brand uppercase tracking-wider">Cambio</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-brand uppercase tracking-wider">Mínimo del día</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-brand uppercase tracking-wider">Máximo del día</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-brand uppercase tracking-wider rounded-tr-xl">Volumen</th>
        </tr>
      </thead>
      <tbody className="bg-white dark:bg-gray-700 divide-y divide-gray-200">
        {stocks.map((stock) => (
          <tr key={stock.symbol}
            onClick={() => handleRowClick(stock)} // Manejar el clic en la fila
            className={selectedStock === stock ? 'bg-green-200 dark:bg-zinc-600' : ''} // Establecer el estilo de selección
            >
            <td className="px-6 py-4 whitespace-nowrap dark:text-white">{stock.symbol}</td>
            <td className="px-6 py-4 whitespace-nowrap dark:text-white">{stock.name }</td>
            <td className="px-6 py-4 whitespace-nowrap dark:text-white">{stock.price}</td>
            <td className="px-6 py-4 whitespace-nowrap dark:text-white">{stock.changesPercentage}</td>
            <td className="px-6 py-4 whitespace-nowrap dark:text-white">{stock.change}</td>
            <td className="px-6 py-4 whitespace-nowrap dark:text-white">{stock.dayLow}</td>
            <td className="px-6 py-4 whitespace-nowrap dark:text-white">{stock.dayHigh}</td>
            <td className="px-6 py-4 whitespace-nowrap dark:text-white">{stock.volume}</td>

          </tr>
        ))}
      </tbody>
    </table>
    
    <button data-modal-target="crud-modal" data-modal-toggle="crud-modal" 
      className="block text-brand my-3 dark:text-white bg-white text-brand hover:bg-blue-800 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-zinc-600 dark:hover:bg-zinc-700 dark:focus:ring-blue-800" 
      type="button"
      onClick={() => handleBuyClick(selectedStock)}
    >
      Comprar
    </button>
    {showModal && selectedStock && (
            <div id="crud-modal" tabIndex={-1} aria-hidden="true" className=" overflow-y-auto overflow-x-hidden top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
            <div className="relative p-4 w-full max-w-md max-h-full">
                
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Comprar acción
                        </h3>
                        <button
                          type="button"
                          className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                          data-modal-toggle="crud-modal"
                          onClick={() => setShowModal(false)}
                        >
                          <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                            />
                          </svg>
                          <span className="sr-only">Cerrar modal</span>
                        </button>

                    </div>
                    
                    <form className="p-4 md:p-5">
                        <div className="grid gap-4 mb-4 grid-cols-2">
                            
                            <div className="col-span-2 sm:col-span-1">
              <h2>Comprar {selectedStock && selectedStock.name}</h2>
                                <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ingrese la cantidad de acciones que desea comprar:</label>
                                <input type="number" value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value))} name="quantity" id="price" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="10"/>
                            </div>
                            
                            
                        </div>
                        <button type="submit" className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={handlePurchase}>
                            <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg>
                            Agregar compra
                        </button>
                    </form>
                </div>
            </div>
        </div> 
      )}
    </div>
  );
};

export default StockTable;
