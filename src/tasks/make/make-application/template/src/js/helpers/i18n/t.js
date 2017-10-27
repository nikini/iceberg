import { getTranslation } from './get-translation';
import { replaceVars } from './replace-vars';

export const t = (input, vars) => {
	const translation = getTranslation(input);
	return replaceVars(translation, vars);
};
