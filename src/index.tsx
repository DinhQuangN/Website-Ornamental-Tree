import { GoogleOAuthProvider } from '@react-oauth/google';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import App from './App';
import store from './features/store';
import './styles/index.css';

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);
root.render(
	<React.StrictMode>
		<Provider store={store}>
			<GoogleOAuthProvider clientId={process.env.REACT_APP_CLIENT_ID!}>
				<App />
			</GoogleOAuthProvider>
		</Provider>
	</React.StrictMode>
);
