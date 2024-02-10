import { App, Component, MarkdownPostProcessorContext, MarkdownRenderChild, MarkdownRenderer, Plugin } from 'obsidian';
// import { MyPluginSettings, DEFAULT_SETTINGS, SampleSettingTab } from 'settings';


export default class MyPlugin extends Plugin {
	// settings: MyPluginSettings;

	async onload() {
		// await this.loadSettings();
		// await this.saveSettings();
		// this.addSettingTab(new SampleSettingTab(this));

		const postProcessor = (source: string, containerEl: HTMLElement, ctx: MarkdownPostProcessorContext) => {
			ctx.addChild(new PlaygroundRenderChild(this, containerEl, source));
		}

		// this.registerMarkdownCodeBlockProcessor('javascript', postProcessor);
		this.registerMarkdownCodeBlockProcessor('js', postProcessor);
	}

	// async loadSettings() {
	// 	this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	// }

	// async saveSettings() {
	// 	await this.saveData(this.settings);
	// }
}


class PlaygroundRenderChild extends MarkdownRenderChild {
	app: App;
	plugin: MyPlugin;
	source: string;

	constructor(plugin: MyPlugin, containerEl: HTMLElement, source: string) {
		super(containerEl);
		this.app = plugin.app;
		this.plugin = plugin;
		this.source = source;
	}

	async onload() {
		const lines = this.source.split('\n');
		const firstLine = lines[0].trim();
		const sourceBody = firstLine === '///' ? lines.slice(1).join('\n') : this.source;

		const codeEl = this.containerEl.createDiv('playground-code');
		await MarkdownRenderer.render(
			this.app, '```javascript\n' + sourceBody + '\n```',
			codeEl, '', this.plugin
		);

		if (firstLine === '///') {
			const el = this.containerEl.createDiv('playground');
			try {
				new Function('el', sourceBody)(el);
			} catch (err) {
				el.setText(err);
				el.addClass('error');
				console.error(err);
			}
		}
	}
}
