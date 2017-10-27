import { getEnv } from './get-env';

export const isProduction = () => {
	return getEnv() === 'production';
};
