import ky, { type Options, type SearchParamsOption } from 'ky';

const apiUrl = `https://swapi.dev/api`;

type Path = 'people';

const request = async <TReturn>({ path, ...options }: { path: Path } & Options): Promise<TReturn> =>
  await ky(`${apiUrl}/${path}`, options).json();

const getUsers = async <TReturn>(searchParams: SearchParamsOption) =>
  await request<TReturn>({
    path: 'people',
    searchParams,
  });

export { getUsers };
