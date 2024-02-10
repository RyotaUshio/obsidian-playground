import { Plugin } from 'obsidian';
// import { MyPluginSettings, DEFAULT_SETTINGS, SampleSettingTab } from 'settings';


export default class MyPlugin extends Plugin {
	// settings: MyPluginSettings;

	async onload() {
		// await this.loadSettings();
		// await this.saveSettings();
		// this.addSettingTab(new SampleSettingTab(this));

		const postProcessor = (source: string, containerEl: HTMLElement) => {
			if (source.split('\n')[0].trim() === '///') {
				const el = containerEl.createDiv('playground');
				try {
					new Function('el', source)(el);
				} catch (err) {
					el.setText(err);
					el.addClass('error');
					console.error(err);
				}
			}
		}

		this.registerMarkdownCodeBlockProcessor('javascript', postProcessor);
		this.registerMarkdownCodeBlockProcessor('js', postProcessor);
	}

	// async loadSettings() {
	// 	this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	// }

	// async saveSettings() {
	// 	await this.saveData(this.settings);
	// }
}
