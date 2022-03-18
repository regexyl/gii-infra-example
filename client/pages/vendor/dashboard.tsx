import { gql, useQuery } from '@apollo/client';
import { Button, Page, Table, Text } from '@geist-ui/core';
import { useAuth } from '@lib/auth';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const VENDOR_LIST = gql`
  query vendors {
    vendorsList {
      count
      vendors {
        email
      }
    }
  }
`;

const VENDOR_DETAILS = gql`
  query vendor($email: String!) {
    vendor(email: $email) {
      id
      name
      email
    }
  }
`;

const dashboard = () => {
  const { getAuthToken, getVendorEmail, logout } = useAuth()!;
  const [vendorEmail] = useState(getVendorEmail());
  const { data: vendorDetails } = useQuery(VENDOR_DETAILS, {
    variables: { email: vendorEmail },
  });

  // TODO: Clear dummy data and fetch from server
  const currentOrders = [
    { orderNo: '1', item: 'Aglio Olio', quantity: 2 },
    { orderNo: '1', item: 'Carbonara', quantity: 3 },
  ];

  useEffect(() => {
    console.log(vendorDetails);
  });

  return (
    <div>
      <Page>
        <Page.Header>
          <div className="flex justify-between relative mb-10">
            <Text>
              {JSON.stringify(vendorDetails ? vendorDetails.name : '')}
            </Text>
            <Link href={`/`}>
              <Button auto ghost type="success" onClick={logout}>
                Logout
              </Button>
            </Link>
          </div>
        </Page.Header>

        <Page.Content>
          <Table data={currentOrders}>
            <Table.Column prop="orderNo" label="Order No." />
            <Table.Column prop="item" label="Item" />
            <Table.Column prop="quantity" label="Quantity" />
          </Table>
        </Page.Content>
      </Page>
    </div>
  );
};

export default dashboard;
