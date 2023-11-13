import { OrderListItem } from './OrderListItem';
import { useEffect, useState } from 'react';
// import { useOrderPrintStore } from '@states/order';
export const OrderList: Component<{
  orders: OrderData[];
  updateTotalCost: (newTotalCost: number) => void;
}> = ({ orders, updateTotalCost }) => {
  const [currentNumbers, setCurrentNumbers] = useState<number[]>(
    orders.map((order) => order.number)
  );
  // const { orderPrintList, setOrderPrintList } = useOrderPrintStore();
  const updateCurrentNumber = (newNumber: number, index: number) => {
    setCurrentNumbers((prevNumbers) => {
      const updatedNumbers = [...prevNumbers];
      updatedNumbers[index] = newNumber;
      return updatedNumbers;
    });
  };
  useEffect(() => {
    const totalCost = orders.reduce(
      (acc, order, index) => acc + order.coins * currentNumbers[index],
      0
    );
    updateTotalCost(totalCost);
  }, [orders, updateTotalCost, currentNumbers]);
  // const handleRemove = (id: string) => {
  //   const newOrderPrintList = orderPrintList.filter((orderPrintItem) => orderPrintItem.id !== id);
  //   setOrderPrintList(newOrderPrintList);
  // };
  return (
    <div className='mt-4 bg-white'>
      {orders.map((order, index) => (
        <div key={index} className='p-4 flex gap-4 border-b-4'>
          <OrderListItem
            id={order.id}
            fileName={order.filesName[0]}
            size={order.size}
            coins={order.coins}
            number={currentNumbers[index]}
            updateCurrentNumber={(newNumber) => updateCurrentNumber(newNumber, index)}
            //handleRemove={() => handleRemove(order.id)}
            handleRemove={() => null}
          />
        </div>
      ))}
    </div>
  );
};
