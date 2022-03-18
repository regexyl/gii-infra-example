import { Button, Text } from '@geist-ui/core';
import { Emoji } from '@geist-ui/icons';
import Link from 'next/link';
import React from 'react';

const Header = () => {
  return (
    <div className="flex justify-between relative mb-10">
      <div>
        <div className="flex relative mb-2">
          <Emoji className="absolute top-2" size={36} />
          <Text h2 className="absolute left-10">
            Smooder
          </Text>
        </div>
        <Text p className="my-0 absolute top-14">
          Order food within the SMU campus!
        </Text>
      </div>
      <Link href={`/vendor/auth`}>
        <Button auto ghost type="success">
          Vendor Login
        </Button>
      </Link>
    </div>
  );
};

export default Header;
