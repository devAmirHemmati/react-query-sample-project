import { useQuery } from 'react-query';
import { initialConfig } from '.';
import { getPosts } from './../api';

export const useGetPosts = () => {
	return useQuery('posts', getPosts, initialConfig);
};
