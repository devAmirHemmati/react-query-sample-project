export const initialConfig = {
	refetchInterval: false,
	refetchOnWindowFocus: false,
	refetchOnMount: false,
};

export { useGetPosts } from './posts';
export { useGetPost, useDeletePost, useUpdatePost } from './post';
