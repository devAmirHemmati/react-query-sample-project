import { Link } from 'react-router-dom';
import { useGetPosts } from '../../hooks';

const Posts = () => {
	const query = useGetPosts();

	if (query.isLoading) {
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
			<h1 className="display-3">Posts</h1>

			<ul className="list-group">
				{query.data.map((post, key) => (
					<li className="list-group-item text-center" key={post.id}>
						<ul className="list-unstyled">
							<li>
								{key + 1}. {post.title}
							</li>
							<li>
								<Link to={`/post/${post.id}`}>Details ...</Link>
							</li>
						</ul>
					</li>
				))}
			</ul>
		</div>
	);
};

export default Posts;
