import { Button, Page, Spacer, Table, Text } from '@geist-ui/core';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

export const getServerSideProps: GetServerSideProps = async (context) => {
  console.log(context.query);

  return {
    props: {
      vendor: context.query?.vendor ? context.query.vendor : '',
      order: context.query?.order ? context.query.order : '',
    },
  };
};

interface Item {
  [name: string]: ItemDetails;
}

interface ItemDetails {
  quantity: number;
  price: number;
}

const Summary = ({ vendor, order }: { vendor: string; order: string }) => {
  const [orderObj] = useState(order ? getOrderObj(order) : undefined);

  function getOrderObj(order: string) {
    console.log({ order });
    const orderParsed: Item = JSON.parse(order);
    console.log({ orderParsed });
    return Object.keys(orderParsed).map((key) => {
      // @ts-ignore
      return {
        item: key,
        quantity: orderParsed[key].quantity,
        price: orderParsed[key].price,
      };
    });
  }

  useEffect(() => {
    console.log('orderObj:', orderObj);
  });

  return (
    <div>
      <Page>
        <Page.Header>
          <div className='flex justify-between mb-10"'>
            <Text h2>Order Summary</Text>

            <Link href={`/`}>
              <Button auto ghost type="success">
                Go back home
              </Button>
            </Link>
          </div>
        </Page.Header>
        <Page.Content>
          <Text h3 b>
            {vendor}
          </Text>
          <Table data={orderObj}>
            <Table.Column prop="item" label="Item" />
            <Table.Column prop="quantity" label="Quantity" />
            <Table.Column prop="price" label="Price" />
          </Table>

          <Spacer h={2} />

          <Text h5>
            Total: ${' '}
            {orderObj?.reduce(
              (prevValue, currValue) =>
              prevValue + currValue.price * currValue.quantity,
              0
            ).toFixed(2)}
          </Text>
        </Page.Content>
      </Page>
    </div>
  );
};

export default Summary;
