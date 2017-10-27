export const getEnv = () => {
	if (typeof ENVIRONMENT === 'undefined')
		return 'production';
	return ENVIRONMENT;
};
