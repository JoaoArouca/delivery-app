export const getStorage = (storageName) => {
  const storage = localStorage.getItem(storageName) || [];
  return JSON.parse(storage);
};

export const setStorage = (storageName, param2) => {
  localStorage.setItem(storageName, JSON.stringify(param2));
};

export const removeStorage = (storageName) => {
  localStorage.removeItem(storageName);
};

const notFound = -1;
const deliveryOrders = 'carrinho';

export const addItemStorage = (itemObj) => {
  const { id } = itemObj;

  const storage = getStorage(deliveryOrders) || [];

  const itemIndex = storage.findIndex((item) => item.id === id);

  if (itemIndex === notFound) {
    localStorage.setItem(deliveryOrders, JSON.stringify([
      ...storage,
      itemObj,
    ]));
  } else {
    storage[itemIndex].quantity += 1;
    localStorage.setItem(deliveryOrders, JSON.stringify(
      storage,
    ));
  }
};

export const removeItemStorage = (itemObj) => {
  const { id } = itemObj;

  const storage = getStorage(deliveryOrders) || [];

  const itemIndex = storage.findIndex((item) => item.id === id);

  if (itemIndex !== notFound) {
    if (storage[itemIndex].quantity === 1) {
      const filteredStorage = storage.filter((items) => items.id !== id);
      localStorage.setItem(deliveryOrders, JSON.stringify(filteredStorage));
    } else {
      storage[itemIndex].quantity -= 1;
      localStorage.setItem(deliveryOrders, JSON.stringify(
        storage,
      ));
    }
  }
};

export const InputItem = (itemObj) => {
  const { id } = itemObj;

  const storage = getStorage(deliveryOrders) || [];
  const itemIndex = storage.findIndex((item) => item.id === id);

  if (itemIndex === notFound) {
    localStorage.setItem(deliveryOrders, JSON.stringify([
      ...storage,
      itemObj,
    ]));
  } else {
    storage[itemIndex].quantity = itemObj.quantity;
    localStorage.setItem(deliveryOrders, JSON.stringify(
      storage,
    ));
  }
};

export const removeInputItem = (itemObj) => {
  const { id } = itemObj;
  const storage = getStorage(deliveryOrders) || [];

  const itemIndex = storage.findIndex((item) => item.id === id);

  if (itemIndex !== notFound) {
    const filteredStorage = storage.filter((items) => items.id !== id);
    localStorage.setItem(deliveryOrders, JSON.stringify(filteredStorage));
  }
};

export const removeFromCheckout = (id) => {
  const storage = getStorage(deliveryOrders) || [];

  // const itemIndex = storage.findIndex((item) => item.id === id);

  const filteredStorage = storage.filter((items) => items.id !== id);
  localStorage.setItem(deliveryOrders, JSON.stringify(filteredStorage));
};
