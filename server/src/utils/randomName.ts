import { uniqueNamesGenerator, Config, names } from 'unique-names-generator';

const config: Config = {
  dictionaries: [names]
}

export const randomName = (): string => uniqueNamesGenerator(config);