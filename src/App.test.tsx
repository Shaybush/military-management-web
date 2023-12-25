import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import App from './App';

// mocking React.lazy
jest.mock('./AppRoutes', () => ({
	__esModule: true,
	default: () => 'MockedComponent',
}));

describe('App Component', () => {
	const renderApp = () => render(<App />);

	test('demo', () => {
		expect(true).toBe(true);
	});

	test('Renders the main page', () => {
		renderApp();
		expect(true).toBeTruthy();
	});
});
