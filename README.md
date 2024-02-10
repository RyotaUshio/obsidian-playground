# Obsidian JavaScript Playground

Transform `javascript` and `js` code blocks into interactive playground.

To indicate a code block should be processed by this plugin, start it with a line containing only an empty comment with three slashes `///`.

The code block's container `div` is passed as the `el` variable and you are free to interact with it.

````markdown
```javascript
///
const canvas = el.createEl('canvas');
const ctx = canvas.getContext('2d');
...
```
````
