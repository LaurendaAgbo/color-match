document.addEventListener("DOMContentLoaded", function(event) {
	let game = new Game();

	game.showPopup('start');
	document.getElementById("startGame").onclick = startGame;
	function startGame () {
		game.hidePopup('');
	
		game.init();
		// if (floor) {
		// 	cleanWorld();  
		// }
		// game.scene.scenes[0].drawWorld();
		
		// gameMusic.play({
		// 	loop: true,
		// 	volume: 0.5
		// });
		
		// gameStop = false;
		// timedEvent.paused = false;  
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