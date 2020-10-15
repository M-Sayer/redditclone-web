import { Box, Button, Flex, Link } from '@chakra-ui/core';
import React from 'react';
import NextLink from 'next/link';
import { useLogoutMutation, useMeQuery } from '../generated/graphql';
import { isServer } from '../utils/isServer';

interface NavBarProps {

};

export const Navbar: React.FC<NavBarProps> = ({}) => {
  // dont send req if SSR
  const [{data, fetching}] = useMeQuery({
    pause: isServer(),
  });

  const [{fetching: logoutFetching}, logout] = useLogoutMutation();
  let body;
  
  if (fetching) {
    // loading data
    body = null;
  } else if (!data?.me) {
    // user not logged in
    body = (
      <Box ml={'auto'}>
        <NextLink href='/login'>
          <Link mr={2}>login</Link>
        </NextLink>
        <NextLink href='/register'>
          <Link>register</Link>
          </NextLink>
      </Box>
    )
  } else {
    // user logged in
    body = (
      <Flex ml={'auto'}>
        <Box mr={2}>{data.me.username}</Box>
        <Button 
          onClick={() => logout()}
          isLoading={logoutFetching}
          variant='link'
        >
          logout
        </Button>
      </Flex>

    )
  }

  return (
    <Flex bg='tomato' p={4}>
      {body}
    </Flex>
  );
};