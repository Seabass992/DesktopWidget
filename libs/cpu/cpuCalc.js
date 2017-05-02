var CpuCalculator = function(os) {
	
	function CalcPercentages(timeWait) {
		var promise = new Promise((resolve, reject) => {
			var percents = [];
			calc1 = os.cpus();
			var model = calc1[0].model
			setTimeout(() => {
				var totals = [];
				calc2 = os.cpus();
				calc1.forEach((cpu, i) => {
					totals[i] = 0;
					for(type in cpu.times) {
						totals[i] += calc2[i].times[type] - calc1[i].times[type];
					}
				});
				calc1.forEach((cpu, i) => {
					percents[i] = {};
					for(type in cpu.times) {
						var percent = (calc2[i].times[type] - calc1[i].times[type]) / totals[i];
						percents[i][type] = percent;
					}
				});
				resolve({
					model: model,
					percents: percents
				});
			}, timeWait)
		});

		return promise;
	}
	return {
		calc: function() { return CalcPercentages(2000); }
	};
}