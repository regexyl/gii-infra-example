import { BackButton, Menu } from '@components/index';
import { Vendor } from '@components/vendor-list';
import { Button, Page, Spacer, Text } from '@geist-ui/core';
import { getAllVendorIds, getVendorData, vendorMenu } from '@lib/vendors';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

export async function getStaticPaths() {
  const paths = getAllVendorIds();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({
  params,
}: {
  params: { vendor: string };
}) {
  const vendorData = getVendorData(params.vendor);
  return {
    props: {
      vendorData,
    },
  };
}

interface Props {
  vendorData: Vendor;
}

const VendorMenu: React.FC<Props> = ({ vendorData }) => {
  const [data] = useState(
    vendorMenu.find((vendor) => vendor.name === vendorData.name)
  );
  const [itemsSelected, setItemsSelected] = useState({});

  useEffect(() => {
    console.log('Vendor data fetched:');
    console.log(JSON.stringify(vendorData));
  });

  const placeOrder = () => {};

  return (
    <div>
      <Page>
        <BackButton href={'/'} overrideStyle={"absolute top-4"} />
        <Spacer h={2} />
        <Page.Header>
          <Text h2>{vendorData.name}</Text>
        </Page.Header>
        <Page.Content>
          <Text h3>Menu</Text>

          {data && (
            <Menu
              data={data.menu}
              itemsSelected={itemsSelected}
              setItemsSelected={setItemsSelected}
            />
          )}
          <Spacer h={10} />

          <Link
            href={{
              pathname: '/order/summary',
              query: {
                vendor: vendorData.name,
                // TODO: hacky way to pass data to summary page (temporary)
                order: JSON.stringify(itemsSelected),
              },
            }}
          >
            <Button shadow type="secondary" width="100%" onClick={placeOrder}>
              Place your order
            </Button>
          </Link>
        </Page.Content>
      </Page>
    </div>
  );
};

export default VendorMenu;
