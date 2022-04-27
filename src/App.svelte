<script>
	const os = require("os");
	const hostName = os.hostname();
</script>


<h1>Terminal: <span>{hostName}</span></h1>

<style>
	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 2em;
		font-weight: 100;
	}
	span {
		color: #13099e;
		text-transform: uppercase;
		font-size: 1em;
		font-weight: 100;
	}
</style>