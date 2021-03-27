import axios from 'axios';

export const req = axios.create({
	baseURL: 'https://jsonplaceholder.typicode.com',
});

export { getPosts } from './posts';
export { getPost, deletePost, updatePost } from './post';
