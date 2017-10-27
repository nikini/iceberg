import { getEnv } from './get-env';

export const isDevelopment = () => {
	return getEnv() === 'development';
};
