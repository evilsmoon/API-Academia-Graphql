import { IResolvers } from 'graphql-tools';
import query from './query';
import type from './type';
const resolverMap: IResolvers = {
    ...query,
    ...type
};
export default resolverMap;
