import { Button, Spacer, Text } from "@geist-ui/core";
import { useState } from "react";

const QuantityButton = () => {
  const [quantity, setQuantity] = useState(0);

  const add = () => {
    setQuantity(quantity + 1);
  };

  const subtract = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <>
      <Button onClick={subtract} auto>-</Button>
      <Spacer w={2}/>
      <Text>{quantity}</Text>
      <Spacer w={2}/>
      <Button onClick={add} auto>+</Button>
    </>
  );
};

export default QuantityButton;