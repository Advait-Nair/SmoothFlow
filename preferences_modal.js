const preferencesModalObject = [
	// Title

	'Options',

	// Top
	[m.text('Configure your options.', 1.2)],
	// Left
	[
		m.text('Autosave', 1,'rbottom'),
        m.text('It is recommended to save your work automatically.', 0.8, 'rtop'),
        m.toggle(toggleIdentifierValues, value => {
            toggleIdentifierValues.autosave = value;
        }, 'autosave'),


        m.text('Wipe local data', 1,'rbottom'),
        m.text('Warning! This deletes all of your projects saved online.', 0.8, 'rtop'),
        m.button(
            'Wipe all local data',
            e => {
                const confirmModal = [
                    'Confirm data wipeout',

                    [
                        m.text('Are you sure you want to wipe all local data?', 1.2, 'red wf c'),
                        m.div('flex acenter jcenter wf hf', [
                            m.button('Cancel', e => {
                                hideModal();
                            }, 'btn basic semi-strong p1 wh mr1 mt1 blue-context-bleed ubuntu-normal cancel'),
                            m.button('Confirm', e => {
                                new LSHandler().wipeLocalStorage();

                                const successModal = [
									'Wiped data!',
									[
										m.text(
											'Data has been wiped.',
											1.2,
											'red wf c'
										),
                                        m.div('flex acenter jcenter wf hf', [
                                            m.button(
                                                'Finish',
                                                e => {
                                                    hideModal();
                                                },
                                                'btn basic semi-strong p1 wh mt2 blue-context-bleed ubuntu-normal'
                                            ),
                                        ])
									],
									[],
									[],
									[],
									'',
								];
                                modal(successModal)
                                // hideModal();
                                



                            }, 'btn basic semi-strong p1 wh mr1 mt1 red-context-bleed ubuntu-normal cancel')
                        ])
                    ],[],[],[],'modal-top-100'
                ]
                modal(confirmModal)
            },
            'btn basic semi-strong p1 mt1 wh red-context-bleed ubuntu-normal wipeout'
        )
	],
	// Right
	[
	],
	// Bottom
	[
		m.div('flex acenter jcenter absolute bottom left wf p1', [
			// m.button(
			// 	'Cancel',
			// 	e => {
            //         // revertToBackup();
			// 		hideModal();
			// 	},
			// 	'btn basic semi-strong p1 wh mr1 mt1 red-context-bleed ubuntu-normal cancel'
			// ),
			m.button(
				'Confirm',
				e => {
                    // destroyBackup();
					hideModal();
				},
				'btn basic semi-strong p1 wh ml1 mt1 blue-context-bleed ubuntu-normal cancel'
			),
		]),
	],
	'relative',
];
