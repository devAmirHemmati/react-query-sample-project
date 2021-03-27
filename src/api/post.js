import { req } from '.';

export const getPost = async (id) => {
	const { data } = await req.get(`/posts/${id}`);

	return data;
};

export const deletePost = async (id) => {
	const { data } = await req.delete(`/posts/${id}`);

	return data;
};

export const updatePost = async (id, title, body) => {
	const { data } = await req.put(`/posts/${id}`, { title, body });

	return data;
};
