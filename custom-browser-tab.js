const MODULE_ID = 'custom-browser-tab';

Hooks.once('init', function() {

	game.settings.register(MODULE_ID, 'title', {
		name: 'CUSTOM_BROWSER_TAB.Settings.Title.Name',
		hint: 'CUSTOM_BROWSER_TAB.Settings.Title.Hint',
		scope: 'world',
		config: true,
		default: 'Foundry VTT',
		type: String,
		onChange: () => updateTitle(),
	});
	game.settings.register(MODULE_ID, 'pageastitle', {
		name: 'CUSTOM_BROWSER_TAB.Settings.PageAsTitle.Name',
		hint: 'CUSTOM_BROWSER_TAB.Settings.PageAsTitle.Hint',
		scope: 'world',
		config: true,
		type: String,
		default: 'afterTitle',
		onChange: () => updateTitle(),
		choices: {
			"no": "CUSTOM_BROWSER_TAB.Settings.PageAsTitle.No",
			"asTitle": "CUSTOM_BROWSER_TAB.Settings.PageAsTitle.AsTitle",
			"beforeTitle": "CUSTOM_BROWSER_TAB.Settings.PageAsTitle.BeforeTitle",
			"afterTitle": "CUSTOM_BROWSER_TAB.Settings.PageAsTitle.AfterTitle"
		},
	});
	game.settings.register(MODULE_ID, 'icon', {
		name: 'CUSTOM_BROWSER_TAB.Settings.Icon.Name',
		hint: 'CUSTOM_BROWSER_TAB.Settings.Icon.Hint',
		scope: 'world',
		config: true,
		default: 'icons/svg/clockwork.svg',
		type: String,
		onChange: () => updateFavicon(),
		filePicker: 'image',
	});
	game.settings.register(MODULE_ID, 'anvilIcon', {
		name: 'CUSTOM_BROWSER_TAB.Settings.AnvilIcon.Name',
		hint: 'CUSTOM_BROWSER_TAB.Settings.AnvilIcon.Hint',
		scope: 'world',
		config: true,
		default: '/icons/fvtt.png',
		type: String,
		onChange: () => updateLogo(),
		filePicker: 'image',
	});
});

Hooks.once('ready', function() {
	console.log("Custom Browser Tab | Initialised");
	updateTitle();
	updateFavicon();
	updateLogo();
});

Hooks.on('canvasReady', () => updateTitle());

function updateTitle() {
	const customTitle = game.settings.get(MODULE_ID, 'title');
	const sceneSetting = game.settings.get(MODULE_ID, 'pageastitle');
	const sceneName = game.scenes?.active?.name;

	if (sceneSetting === "asTitle" && sceneName) {
		document.title = sceneName;
	} else if (sceneSetting === "afterTitle" && sceneName) {
		document.title = customTitle + " | " + sceneName;
	} else if (sceneSetting === "beforeTitle" && sceneName) {
		document.title = sceneName + " | " + customTitle;
	} else {
		document.title = customTitle;
	}
}

function updateFavicon() {
	let link = document.querySelector("link[rel*='icon']") || document.createElement('link');
	link.type = 'image/x-icon';
	link.rel = 'shortcut icon';
	link.href = game.settings.get(MODULE_ID, 'icon');
	document.getElementsByTagName('head')[0].appendChild(link);
}

function updateLogo() {
	const logo = document.getElementById("logo");
	if (!logo) return;
	const iconPath = game.settings.get(MODULE_ID, 'anvilIcon');
	logo.src = iconPath;
	logo.style.left = (iconPath !== "/icons/fvtt.png") ? "20px" : "";
}
