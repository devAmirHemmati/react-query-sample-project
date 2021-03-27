import { useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useGetPost, useDeletePost, useUpdatePost } from '../../hooks';

const Post = () => {
	const { id } = useParams();

	const query = useGetPost(id);

	const [deletePost, isLoadingDeletePost] = useDeletePost(id);
	const [updatePost, isLoadingUpdatePost] = useUpdatePost(id);

	const titleRef = useRef();
	const bodyRef = useRef();

	const handlerUpdatePost = () => {
		updatePost({
			title: titleRef.current.textContent,
			body: bodyRef.current.textContent,
		});
	};

	if (query.isLoading || !query.data) {
		return (
			<div className="text-center">
				<span className="spinner-border" />
			</div>
		);
	}

	if (query.error) {
		return (
			<div className="alert alert-danger text-center">
				An error has occurred: {query.error.mes}
			</div>
		);
	}

	return (
		<div>
			<h2
				className="display-5"
				suppressContentEditableWarning="true"
				contentEditable="true"
				ref={titleRef}
			>
				{query.data.title}
			</h2>

			<hr />

			<p
				className="text-secondary"
				suppressContentEditableWarning="true"
				contentEditable="true"
				ref={bodyRef}
			>
				{query.data.body}
			</p>

			<div>
				<button
					type="button"
					className="btn btn-primary"
					onClick={handlerUpdatePost}
				>
					{isLoadingUpdatePost ? (
						<span className="spinner-border" />
					) : (
						'Update Post'
					)}{' '}
				</button>

				<button
					type="button"
					className="btn btn-danger ml-3"
					onClick={deletePost}
				>
					{isLoadingDeletePost ? (
						<span className="spinner-border" />
					) : (
						'Delete Post'
					)}
				</button>
			</div>

			<Link to="/" className="btn btn-secondary btn-sm mt-3">
				Back
			</Link>
		</div>
	);
};

export default Post;
