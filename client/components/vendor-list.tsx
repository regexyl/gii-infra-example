import { Card, Grid, Image, Tag, Text } from '@geist-ui/core';
import { ArrowRight } from '@geist-ui/icons';
import Link from 'next/link';
import React from 'react';

export interface Vendor {
  id: string;
  name: string;
  imagePath: string;
  cuisine: string[];
}

interface Props {
  vendors: Vendor[];
}

const VendorList: React.FC<Props> = ({ vendors }) => {
  return (
    <Grid.Container gap={2} justify="center" height="100px">
      {vendors.map((vendor) => (
        <Link href={`/order/${vendor.id}`}>
          <Grid md={8} id={vendor.name} className="cursor-pointer">
            <Card shadow width="100%">
              <Image
                src={vendor.imagePath}
                draggable={false}
                className="object-cover h-48 w-96"
              />
              <div className="flex justify-between mb-2">
                <Text b>{vendor.name}</Text>
                <ArrowRight />
              </div>
              <Tag type="success">{vendor.cuisine}</Tag>
            </Card>
          </Grid>
        </Link>
      ))}
    </Grid.Container>
  );
};

export default VendorList;
