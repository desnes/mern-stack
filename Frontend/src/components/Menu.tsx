import StockTable from './StockTable';
import PurchasedStockTable from './PurchasedStockTable';

function Menu() {
    const stockSymbols = ['AAPL']; // Agrega más símbolos según tus necesidades


  return (
    <div className="flex flex-col items-center  h-screen">
      <h1 className="text-3xl font-bold tracking-tight text-brand sm:text-4xl text-center">Acciones</h1>
      <div className="flex-col space-x-4">
        <StockTable stockSymbols={stockSymbols} />
        <h1 className="text-3xl font-bold tracking-tight text-brand sm:text-4xl text-center">Compras</h1>
        <PurchasedStockTable />
        
      </div>
    </div>
  );
}

export default Menu;
