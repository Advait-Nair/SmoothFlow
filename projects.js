// Handles user's projects.

// prefix added to saves written to LS to tell apart user's project date from other objects stored.
const PREFIX = 'CLIENT_';

function save(name, project) {
    const ls = new LSHandler();
    // File name exists, so we need to update it.
    if(ls.retrieveObject(PREFIX + name)) {
        raiseAlert('Updated Project!', `Updated ${name} to local.`, 'alert-success', 3000);
        ls.setObject(PREFIX + name, project);
    } else {
        // New, so we may need to ask for additional information.
        console.log(project)
        const newProjectModal = [
			`Configure '${name ? name : 'your new project'}'`,

			// Top
			[m.text(`Add more information about your amazing project.`, 1)],
			// Left
			[
				m.input(
					'Title...',
					inputElement => {
						inputElement.addEventListener('keyup', () => {
							project.meta.title = inputElement.value;
						});
					},
					project.title,
					'You have to add a title.'
				),
				m.input(
					'Description...',
					inputElement => {
						inputElement.addEventListener('keyup', () => {
							project.meta.description = inputElement.value;
						});
					},
					project.title,
					'',
					'mt1'
				),
				m.input(
					'Author...',
					inputElement => {
						inputElement.addEventListener('keyup', () => {
							project.meta.author = inputElement.value;
						});
					},
					project.title,
					'',
					'mt1'
				),
				m.input(
					'Sign...',
					inputElement => {
						inputElement.addEventListener('keyup', () => {
							project.meta.sign = inputElement.value;
						});
					},
					project.title,
					'Like a signature. Put anything here, you know?',
					'mt1'
				),
			],
			// Right
			[
				m.text('Other Information', 1.1, 'ml1'),
				m.text(
					`Created ${project.meta.created.toUTCString()}`,
					1,
					'ml1 rv'
				),
				m.text(
					`Updated ${
						project.meta.updated
							? project.meta.updated.toUTCString()
							: project.meta.created.toUTCString()
					}`,
					1,
					'ml1 rv'
				),
				m.text(`Certificate ${project.meta.certificate}`, 1, 'ml1 rv'),
			],
			[
                m.button(
                    'Finish',
                    e => {
                        if (project.meta.title.trim() !== '') {
                            ls.setObject(PREFIX + project.meta.title, project);
                            hideModal();
                            raiseAlert('Saved Project!', `Saved ${project.meta.title} to local.`, 'alert-success', 3000);
                            document.querySelector('.current-file-name-input').value = project.meta.title;
                        } else {
                            raiseAlert('Error!', 'You need to give your project a title.', 'alert-warning', 3000);
                        }
                    },
                    'btn basic semi-strong p1 wf mt2 blue-context-bleed ubuntu-normal'
                ),
            ],
		];
        modal(newProjectModal);
    }
}

class Project {
    constructor (output, author, title, description, sign) {

        this.output = output;
        this.meta = {
            created: new Date(),
            updated: null,
            editedOn: window.navigator.userAgent,
            certificate: null,
            author,
            title,
            description,
            sign
        };
        this.meta.certificate = this.meta.created.getTime() + new Date().getTime();
    }
}