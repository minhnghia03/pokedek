import { GetStaticPaths, GetStaticProps } from 'next';
import fs from 'fs';
import { ParsedUrlQuery } from 'querystring';
import {
  typeColors,
  getAttackPropsAndCons,
  getDefenseProsAndCons
} from '../../src/api/pokemon_type';
import TypeButton from '../../src/components/pokemon/TypeButton';
import TypeList from '../../src/components/pokemon/TypeList';
import styles from '../../styles/PokemonDetail.module.css';

type Props = {
  slug: string;
  description: string;
  attackPropsAndCons: {
    'super effective': string[];
    'not effective': string[];
    'no effect': string[];
  };
  defensePropsAndCons: {
    'super effective': string[];
    'not effective': string[];
    'no effect': string[];
  };
};

const TypeDetailPage = ({
  slug,
  description,
  attackPropsAndCons,
  defensePropsAndCons
}: Props) => {
  return (
    <div className="w-full flex flex-col gap-4 py-4">
      <h1 className={`${styles.heading} mx-auto`}>{slug}</h1>
      <div className="flex flex-col sm:flex-row gap-4">
        <div
          className="flex flex-1 flex-col gap-4 items-center bg-white shadow-md rounded-md px-4 py-2 border-2"
          style={{ borderColor: typeColors[slug] }}
        >
          <TypeButton type={slug} />
          <p className="">{description}</p>
        </div>

        <div className="flex flex-1 px-4 py-2 gap-4 flex-col bg-white shadow-md rounded-md">
          <div className="flex flex-col gap-2">
            <h1
              className={styles.title}
              style={{
                color: typeColors[slug]
              }}
            >
              Attack pros & cons
            </h1>
            <div className="flex flex-col gap-1">
              <p>
                <span className="capitalize italic">{slug}</span> moves are
                super-effective against:
              </p>
              <TypeList types={attackPropsAndCons['super effective']} />
            </div>

            <div className="flex flex-col gap-1">
              <p>
                <span className="capitalize italic">{slug}</span> moves are not
                very effective against:
              </p>
              <TypeList types={attackPropsAndCons['not effective']} />
            </div>

            <div className="flex flex-col gap-1">
              <p>
                <span className="capitalize italic">{slug}</span> moves have no
                effect on:
              </p>
              <TypeList types={attackPropsAndCons['no effect']} />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <h1
              className={styles.title}
              style={{
                color: typeColors[slug]
              }}
            >
              Defense pros & cons
            </h1>
            <div className="flex flex-col gap-1">
              <p>
                These types are super-effective against{' '}
                <span className="capitalize italic">{slug}</span> Pokémon:
              </p>
              <TypeList types={defensePropsAndCons['super effective']} />
            </div>

            <div className="flex flex-col gap-1">
              <p>
                These types are not very effective against
                <span className="capitalize italic">{slug}</span> Pokémon:
              </p>
              <TypeList types={defensePropsAndCons['not effective']} />
            </div>

            <div className="flex flex-col gap-1">
              <p>
                These types have no effect on{' '}
                <span className="capitalize italic">{slug}</span> Pokémon:
              </p>
              <TypeList types={defensePropsAndCons['no effect']} />
            </div>
          </div>
        </div>
      </div>
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
      description,
      attackPropsAndCons: getAttackPropsAndCons(slug),
      defensePropsAndCons: getDefenseProsAndCons(slug)
    }
  };
};
