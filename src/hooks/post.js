import { useQuery, useMutation, useQueryClient } from 'react-query';
import { useHistory } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import { initialConfig } from '.';
import { getPost, deletePost, updatePost } from '../api';

export const useGetPost = (id) => {
	return useQuery(['post', id], () => getPost(id), initialConfig);
};

export const useDeletePost = (id) => {
	const queryClient = useQueryClient();
	const history = useHistory();
	const { addToast } = useToasts();

	const mutation = useMutation(() => deletePost(id), {
		onSuccess: () => {
			// delete details post
			queryClient.setQueryData(['post', id], undefined);

			// delete post from posts
			const posts = queryClient.getQueryData('posts');

			if (Array.isArray(posts)) {
				const filterPosts = posts.filter((post) => post.id !== parseInt(id));
				queryClient.setQueryData('posts', filterPosts);
			}

			// go to home page
			history.push('/');

			addToast('Delete post', {
				appearance: 'success',
				autoDismiss: true,
			});
		},
		onError: () => {
			addToast('Error in delete post', {
				appearance: 'error',
				autoDismiss: true,
			});
		},
	});

	return [mutation.mutate, mutation.isLoading];
};

export const useUpdatePost = (id) => {
	const queryClient = useQueryClient();
	const { addToast } = useToasts();

	const mutation = useMutation(
		({ title, body }) => updatePost(id, title, body),
		{
			onSuccess: ({ title, body }) => {
				// update details post
				const post = queryClient.getQueryData(['post', id]);

				post.title = title;
				post.body = body;

				queryClient.setQueryData(['post', id], post);

				// update post in posts
				const posts = queryClient.getQueryData('posts');

				if (Array.isArray(posts)) {
					const newPosts = posts.map((_post) => {
						if (_post.id === parseInt(id)) {
							_post.title = title;
							_post.body = body;
						}

						return _post;
					});

					queryClient.setQueryData('posts', newPosts);
				}

				addToast('Updated post', {
					appearance: 'success',
					autoDismiss: true,
				});
			},
			onError: () => {
				addToast('Error in updated post', {
					appearance: 'error',
					autoDismiss: true,
				});
			},
		}
	);

	return [mutation.mutate, mutation.isLoading];
};
