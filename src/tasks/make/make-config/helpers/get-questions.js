module.exports = (name = '') => {
	const questions = [{
		name: 'entry',
		type: 'input',
		message: 'What is the name of you entry file JS?',
		default: 'index.js',
	}];

	if (!name)
		questions.unshift({
			name: 'name',
			type: 'input',
			message: 'What is the name of your project?',
			validate(input) {
				if (!input.trim())
					return 'The name cannot be empty';
				return true;
			},
		});

	return questions;
};
