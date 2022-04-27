import App from './App.svelte';
import './legacy/pos';
import './legacy/product-filter';
import 'print-js';

const app = new App({
	target: document.getElementById('svelte'),
});

export default app;
