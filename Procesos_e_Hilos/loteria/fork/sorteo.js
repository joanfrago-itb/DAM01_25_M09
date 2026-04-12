process.on("message", (m) => {
	if(m.action === "start_sorteo"){
		let i = 0;
		while(i++ < 10_000_000_000);
	}
	const result = false;

	process.send({
		user: m.name,
		isWinner: result
	});

	process.exit();
});
