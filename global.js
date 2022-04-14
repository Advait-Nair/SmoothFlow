let clientOptions = {
    id: 'clientOptions',
	maxZoomLevel: 120,
	minZoomLevel: 50,
	strength: 0.1,
	panStrength: 0.2,
	currentZoomLevel: 1,
	zoomLevel: 1,
	currentPan: {
		X: 0,
		Y: 0,
	},
};

let toggleIdentifierValues = {
    id: 'toggleIdentifierValues',
    autosave: true,
    cache: null
};

// let itemsToBackup = [
//     clientOptions,
//     toggleIdentifierValues
// ]


// let backups = [];
// function backup() {
//     itemsToBackup.forEach(item => {
//         backups.push(item);
//     });
//     new LSHandler().setObject('backup_', backups);
//     console.log(backups)
//     backups = [];
// }

// function revertToBackup() {
//     backups = new LSHandler().retrieveObject('backup_');
//     clientOptions = backups[0];
//     toggleIdentifierValues = backups[1];
//     console.log(backups)
//     backups = [];
// }

// function destroyBackup() {
//     backups = [];
// }