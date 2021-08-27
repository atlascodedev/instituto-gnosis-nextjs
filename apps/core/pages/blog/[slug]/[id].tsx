import { BlogLayoutV1, BlogLayoutV1Props } from '@atlascode/core';
import { GetStaticPaths, GetStaticProps } from 'next';
import React from 'react';
import axios, { AxiosResponse } from 'axios';
import { BlogCollectionType } from 'apps/core/types';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface BlogPageProps extends BlogLayoutV1Props {}

const BlogPage = ({
  readingTime = true,
  content = '',
  date = new Date().toDateString(),
  featuredImage = '',
  latestPosts = [],
  socials = {},
  tags = [],
  title = 'Placeholder title',
}: BlogPageProps) => {
  return (
    <BlogLayoutV1
      readingTime={readingTime}
      content={content}
      date={date}
      featuredImage={featuredImage}
      latestPosts={latestPosts}
      socials={socials}
      tags={tags}
      title={title}
    />
  );
};

export default BlogPage;

type BlogStaticPaths = GetStaticPaths<{ slug: string; id: string }>;

export const getStaticPaths: BlogStaticPaths = async ({
  defaultLocale,
  locales,
}) => {
  const blogRequest: AxiosResponse<BlogCollectionType[]> = await axios.get(
    'https://us-central1-gnosis-webapp.cloudfunctions.net/api/collections/entries/gnosisBlog'
  );

  const blogData = blogRequest.data;

  return {
    paths: blogData.map((value, index) => {
      return {
        params: {
          id: value.uuid,
          slug: value.slug,
        },
      };
    }),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<BlogPageProps> = async ({
  defaultLocale,
  locale,
  locales,
  params,
  preview,
  previewData,
}) => {
  const requestById: AxiosResponse<BlogCollectionType> = await axios.get(
    `https://us-central1-gnosis-webapp.cloudfunctions.net/api/collections/entries/gnosisBlog${params.id}`
  );

  const data = requestById.data;

  return {
    props: {
      title: '',
      readingTime: true,
      content: '',
      date: new Date().toDateString(),
      featuredImage: '',
      latestPosts: [],
      socials: {},
      tags: [],
    },
  };
};
