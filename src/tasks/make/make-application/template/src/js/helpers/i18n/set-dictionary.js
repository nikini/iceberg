import { getDictionary } from './get-dictionary';

/**
 * Set the i18n dictionary
 *
 * @param  {Object} newDictionary
 */
export const setDictionary = (newDictionary) => {
	const dictionary = getDictionary();
	dictionary.values = newDictionary;
};
