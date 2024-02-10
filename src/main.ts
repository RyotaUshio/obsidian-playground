import { Plugin } from 'obsidian';
// import { MyPluginSettings, DEFAULT_SETTINGS, SampleSettingTab } from 'settings';


export default class MyPlugin extends Plugin {
	// settings: MyPluginSettings;

	async onload() {
		// await this.loadSettings();
		// await this.saveSettings();
		// this.addSettingTab(new SampleSettingTab(this));

		this.registerMarkdownCodeBlockProcessor('javascript', (source, el) => {
			if (source.split('\n')[0].trim() === '///') {
				el.addClass('playground');
				new Function('el', source)(el);
			}
		});

		this.registerMarkdownCodeBlockProcessor('js', (source, el) => {
			if (source.split('\n')[0].trim() === '///') {
				el.addClass('playground');
				new Function('el', source)(el);
			}
		});
	}

	// async loadSettings() {
	// 	this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	// }

	// async saveSettings() {
	// 	await this.saveData(this.settings);
	// }
}
