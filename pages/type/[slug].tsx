import { GetStaticPaths, GetStaticProps } from 'next';
import fs from 'fs';
import { ParsedUrlQuery } from 'querystring';
import { typeColors } from '../../src/api/pokemon';

type Props = {
  slug: string;
  description: string;
};

const TypeDetailPage = ({ slug, description }: Props) => {
  return (
    <div className="w-full flex flex-col items-center">
      <h1
        className="text-4xl font-bold capitalize"
        style={{ color: typeColors[slug] }}
      >
        {slug}
      </h1>
      <p className="text-mediumGray bg-white">{description}</p>
    </div>
  );
};

export default TypeDetailPage;

export const getStaticPaths: GetStaticPaths = async () => {
  const data = fs.readFileSync('data/types.json', 'utf-8');
  const types = JSON.parse(data);

  return {
    paths: Object.keys(types).map((key) => ({
      params: {
        slug: key
      }
    })),
    fallback: false
  };
};

type MyQuery = ParsedUrlQuery & {
  slug: string;
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const data = fs.readFileSync('data/types.json', 'utf-8');
  const types = JSON.parse(data);
  const { slug } = params as MyQuery;

  const description: string = types[slug].description;

  return {
    props: {
      slug,
      description
    }
  };
};
