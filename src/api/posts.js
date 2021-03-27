import { req } from '.';

export const getPosts = async () => {
	const { data } = await req.get('/posts');

	return data;
};
