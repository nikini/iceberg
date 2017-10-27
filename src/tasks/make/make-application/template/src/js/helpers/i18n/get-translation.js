import { getDictionary } from './get-dictionary';

/**
 * Returns a translation (if one exists)
 *
 * @param  {string} key
 *
 * @return {string}
 */
export const getTranslation = (key) => {
	const dictionary = getDictionary();

	if (!dictionary || !dictionary.values || !dictionary.values[key])
		return key;

	return dictionary.values[key];
};
