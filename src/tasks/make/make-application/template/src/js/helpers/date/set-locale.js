import moment from 'moment';

import { t } from 'helpers/i18n';

let locale = 'en';

export const setLocale = (data = {}) => {
	if (data.lang)
		locale = data.lang;

	const localeSettings = {
		months: [t('January'), t('February'), t('March'), t('April'), t('May'), t('June'), t('July'), t('August'), t('September'), t('October'), t('November'), t('December')],
		monthsShort: [t('Jan'), t('Feb'), t('Mar'), t('Apr'), t('May'), t('Jun'), t('Jul'), t('Aug'), t('Sep'), t('Oct'), t('Nov'), t('Dec')],
		weekdays: [t('Sunday'), t('Monday'), t('Tuesday'), t('Wednesday'), t('Thursday'), t('Friday'), t('Saturday')],
		weekdaysShort: [t('Sun'), t('Mon'), t('Tue'), t('Wed'), t('Thu'), t('Fri'), t('Sat')],
		weekdaysMin: [t('Su'), t('Mo'), t('Tu'), t('We'), t('Th'), t('Fr'), t('Sa')],
	};

	if (data.dow)
		localeSettings.week = {
			dow: data.dow,
		};

	moment.locale(locale);
	moment.updateLocale(locale, localeSettings);

	delete data.lang;
	delete data.dow;
};
