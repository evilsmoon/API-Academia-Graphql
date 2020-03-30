import { IResolvers } from 'graphql-tools';
import query from './query';
import type from './type';
import mutation from './mutation';
const resolverMap: IResolvers = {
    ...query,
    ...mutation,
    ...type
};
export default resolverMap;
