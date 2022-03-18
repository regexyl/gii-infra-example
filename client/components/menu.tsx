import { Button, Spacer, Table, Text } from '@geist-ui/core';
import { MenuItem } from '@lib/vendors';
import React, { useState } from 'react';

interface Order {
  [key: string]: Item;
}

interface Item {
  price: number;
  quantity: number;
}

const Menu = ({
  data,
  itemsSelected,
  setItemsSelected,
}: {
  data: MenuItem[];
  itemsSelected: Order;
  setItemsSelected: React.Dispatch<React.SetStateAction<{}>>;
}) => {
  const QuantityButton = (
    _: any,
    rowData: { item: string; price: number; quantity: any }
  ) => {
    const { item, price } = rowData;
    const [quantity, setQuantity] = useState(0);

    const add = () => {
      if (itemsSelected[item]) {
        setItemsSelected({
          ...itemsSelected,
          [item]: {
            price,
            quantity: itemsSelected[item].quantity + 1,
          },
        });
      } else {
        setItemsSelected({
          ...itemsSelected,
          [item]: {
            price,
            quantity: 1,
          },
        });
      }
      console.log(itemsSelected);

      setQuantity(quantity + 1);
    };

    const subtract = () => {
      if (quantity <= 0) return;

      if (quantity === 1) {
        delete itemsSelected[item];
        setItemsSelected(itemsSelected);
      } else if (itemsSelected[item]) {
        setItemsSelected({
          ...itemsSelected,
          [item]: { price, quantity: itemsSelected[item].quantity - 1 },
        });
      }
      console.log(itemsSelected);

      setQuantity(quantity - 1);
    };

    return (
      <>
        <Button onClick={subtract} auto>
          -
        </Button>
        <Spacer w={2} />
        <Text>{quantity}</Text>
        <Spacer w={2} />
        <Button onClick={add} auto>
          +
        </Button>
      </>
    );
  };

  return (
    <Table data={data}>
      <Table.Column prop="item" label="item" />
      <Table.Column prop="price" label="price ($)" />
      <Table.Column prop="quantity" label="quantity" render={QuantityButton} />
    </Table>
  );
};

export default Menu;
