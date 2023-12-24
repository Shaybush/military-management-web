import { GoogleOAuthProvider } from '@react-oauth/google';
import AppRoutes from './AppRoutes';

const App = () => {
	return (
		<GoogleOAuthProvider clientId={`${import.meta.env.VITE_GOOGLE_ID}.apps.googleusercontent.com`}>
			<AppRoutes />
		</GoogleOAuthProvider>
	);
};

export default App;
