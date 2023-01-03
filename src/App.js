import { useState } from 'react';

import Cart from './components/Cart/Cart';
import CartProvider from './components/context/CartProvider';
import Meals from './components/Meals/Meals';
import ToolBar from './components/shared/ToolBar';

function App() {
  const [cartIsShown, setCartIsShown] = useState(false);

  const showCartModal = () => {
    setCartIsShown(true);
  }

  const hideCartModal = () => {
    setCartIsShown(false);
  }

  const orderCartItems = () => {
    console.log('Order Items');
  }

  return (
    <CartProvider>
      {cartIsShown && <Cart onClose={hideCartModal} onOrder={orderCartItems}/>}
      <ToolBar onShowCart={showCartModal}/>
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
