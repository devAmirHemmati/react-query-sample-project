import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ToastProvider } from 'react-toast-notifications';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Posts, Post } from './components';

const queryClient = new QueryClient();

const App = () => {
	return (
		<div className="container py-4">
			<Router>
				<QueryClientProvider client={queryClient}>
					<ToastProvider>
						<Switch>
							<Route path="/" component={Posts} exact />
							<Route path="/post/:id" component={Post} />

							{/* not found page -> 404 */}
							<Route paht="*">
								<h1 className="text-center mt-2 display-1">Page Not Found</h1>
							</Route>
						</Switch>
					</ToastProvider>

					{process.env.NODE_ENV !== 'production' && (
						<ReactQueryDevtools initialIsOpen />
					)}
				</QueryClientProvider>
			</Router>
		</div>
	);
};

export default App;
