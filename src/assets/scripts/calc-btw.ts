const calc = async (
	percentage: number,
	stake: number,
	hours: number,
	include: boolean
): Promise<{ without_vat: number; vat_value: number; with_vat: number }> => {
	return await new Promise((resolve, reject) => {
		const without_vat = (stake * 100) / (100 + (include ? percentage : 0));

		const vat_value = include
			? stake - without_vat
			: stake * (percentage / 100);
		const with_vat = without_vat + vat_value;
		resolve({
			without_vat: parseFloat(
				((Math.floor(without_vat * 100) / 100) * hours).toFixed(2)
			),
			vat_value: parseFloat(
				((Math.ceil(vat_value * 100) / 100) * hours).toFixed(2)
			),
			with_vat: parseFloat(
				((Math.floor(with_vat * 100) / 100) * hours).toFixed(2)
			),
		});
	});
};

const handle_form = async () => {
	const stakes_buttons = document.querySelectorAll(
		".form-con.percentage > .flex-box > button"
	);
	const includes_buttons = document.querySelectorAll(
		".form-con.btw > .flex-box.includes-box > button"
	);

	includes_buttons.forEach(button => {
		button.addEventListener("click", e => {
			includes_buttons.forEach(button => {
				button.classList.remove("active");
			});

			(e.target as HTMLInputElement).classList.add("active");
		});
	});

	stakes_buttons.forEach(button => {
		button.addEventListener("click", e => {
			stakes_buttons.forEach(button => {
				button.classList.remove("active");
			});

			(e.target as HTMLInputElement).classList.add("active");
		});
	});
	document
		.querySelector("#calculator-btw")
		.addEventListener("submit", async e => {
			e.preventDefault();
			const btw: number = parseInt(
				document
					.querySelector(".form-con.percentage button.active")
					.innerHTML.replace("%", "")
			);
			const stake: number = parseInt(
				(
					document.querySelector(
						"form#calculator-btw #stake"
					) as HTMLInputElement
				).value
			);
			const includeEl: string = document.querySelector(
				".form-con.btw button.active"
			).innerHTML;

			const hours: number = parseInt(
				(
					document.querySelector(
						"form#calculator-btw #hours"
					) as HTMLInputElement
				).value
			);

			const include: boolean =
				includeEl === "zawiera" ||
				includeEl === "contain" ||
				includeEl === "ContainNL"
					? true
					: false;

			const result = await calc(
				Math.abs(btw),
				Math.abs(stake),
				Math.abs(hours),
				include
			);

			const { with_vat, without_vat, vat_value } = result;

			document.querySelector(
				".result > .with-btw > h4"
			).innerHTML = `${with_vat} €`;

			document.querySelector(
				".result > .without-btw > h4"
			).innerHTML = `${without_vat} €`;

			document.querySelector(
				".result > .btw-value > h4"
			).innerHTML = `${vat_value} €`;
		});
};

handle_form();
