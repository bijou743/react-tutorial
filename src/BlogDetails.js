import { useParams } from 'react-router-dom';
import useFetch from './useFetch';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';

const BlogDetails = () => {
	const { id } = useParams();
	const {
		data: blog,
		error,
		isPending,
	} = useFetch('http://localhost:8000/blogs/' + id);
	const [isDeleting, setIsDeleting] = useState(false);
	const history = useHistory();

	const handleClick = () => {
		setIsDeleting(true);

		fetch('http://localhost:8000/blogs/' + id, {
			method: 'DELETE',
		}).then(() => {
			history.push('/');
			setIsDeleting(false);
		});
	};

	return (
		<div className="blog-details">
			{isPending && <div>Loading...</div>}
			{error && <div>{error}</div>}
			{blog && (
				<article>
					<h2>{blog.title}</h2>
					<p>Written by {blog.author}</p>
					<div>{blog.body}</div>
					{!isDeleting && (
						<button className="btn" onClick={handleClick}>
							Delete Blog
						</button>
					)}
					{isDeleting && (
						<button className="btn" disabled>
							Deleting...
						</button>
					)}
				</article>
			)}
		</div>
	);
};

export default BlogDetails;
