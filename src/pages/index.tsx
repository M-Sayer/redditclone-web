import React, { useState } from 'react';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from "../utils/createUrqlClient";
import { usePostsQuery } from "../generated/graphql";
import { Layout } from '../components/Layout';
import { Box, Button, Flex, Heading, Link, Stack, Text } from '@chakra-ui/core';
import NextLink from 'next/link';
 
const Index = () => {
  const [variables, setVariables] = useState({ limit: 10, cursor: null as null | string })
  const [{ data, fetching }] = usePostsQuery({ variables });
  const posts = data?.posts.posts;
  
  if (!fetching && !data) return (
    <div>you got no posts for some reason!</div>
  );

  return (
    <Layout>
      <Flex>
        <Heading>Roaddit</Heading>
        <NextLink href='/create-post'>
          <Link ml='auto'>create post</Link>
        </NextLink>
      </Flex>
      {!data && fetching
        ? <div>loading...</div>
        : (
        <Stack spacing={8}>
          {posts!.map(p => (
            <Box key={p.id} p={5} shadow="md" borderWidth="1px">
              <Heading fontSize="xl">{p.title}</Heading>
              <Text mt={4}>{p.textSnippet}</Text>
            </Box>
            ))}
        </Stack>
        )
      }
      {data && data.posts.hasMore && (
        <Flex>
          <Button 
            onClick={() => {
              setVariables({
                limit: variables.limit,
                cursor: posts![posts!.length-1].createdAt,
              })
            }} 
            isLoading={fetching} 
            m='auto' my={8}
          >
            load more
          </Button>
        </Flex>
      )}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
