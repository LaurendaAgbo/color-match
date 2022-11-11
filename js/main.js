document.addEventListener("DOMContentLoaded", function(event) {
	let game = new Game();

	game.showPopup('start');
	document.getElementById("startGame").onclick = startGame;
	function startGame () {
		game.hidePopup('');
	
		game.init(); 
	}

	document.getElementById("nextLevel").onclick = function () {
		const nextLevel = parseInt(document.getElementById('level').textContent)+1;
		game.generateLevel(nextLevel);
	};

	document.getElementById("restart").onclick = function () {
		const currentLevel = parseInt(document.getElementById('level').textContent);
		game.generateLevel(currentLevel);
	};
});