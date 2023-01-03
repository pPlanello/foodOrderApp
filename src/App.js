import { useState } from 'react';
import Cart from './components/Cart/Cart';
import Meals from './components/Meals/Meals';
import ToolBar from './components/shared/ToolBar';

function App() {
  const [cartIsShown, setCartIsShown] = useState(false);

  const items = [{id: 1, name: 'Pepe'}];

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
    <>
      {cartIsShown && <Cart cartItems={items} onClose={hideCartModal} onOrder={orderCartItems}/>}
      <ToolBar onShowCart={showCartModal}/>
      <main>
        <Meals />
      </main>
    </>
  );
}

export default App;
