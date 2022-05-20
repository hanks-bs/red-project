window.addEventListener("load", () => {
	let makeRequest = (method, url, data) => {
		return new Promise(function (resolve, reject) {
			let xhr = new XMLHttpRequest();
			xhr.open(method, url);
			xhr.onload = function () {
				if (this.status >= 200 && this.status < 300) {
					resolve(xhr.response);
				} else {
					reject({
						status: this.status,
						statusText: xhr.statusText,
					});
				}
			};
			xhr.onerror = function () {
				reject({
					status: this.status,
					statusText: xhr.statusText,
				});
			};
			if (method == "POST" && data) {
				document.body.style.overflow = "hidden";

				if (window.location.pathname.includes("/pl/")) {
					UIkit.notification({
						message: "Trwa wysyłanie...",
						pos: "bottom-right",
						status: "primary",
					});
					xhr.send(data);
					return 0;
				}
				if (window.location.pathname.includes("/en/")) {
					UIkit.notification({
						message: "Sending...",
						pos: "bottom-right",
						status: "primary",
					});
					xhr.send(data);
					return 0;
				}

				UIkit.notification({
					message: "Het verzenden is bezig...",
					pos: "bottom-right",
					status: "primary",
				});
				xhr.send(data);
				return 0;
			} else {
				xhr.send();
				return 0;
			}
		});
	};

	const issueFrom = async () => {
		document.querySelector("form#form").addEventListener("submit", async e => {
			const submitBtn = document.querySelector("#form .btn-custom");

			submitBtn.disabled = true;
			const path =
				window.location.pathname != "/contact/"
					? "./../../assets/php/send-email.php"
					: "./../assets/php/send-email.php";

			e.preventDefault();
			let formData = new FormData();

			formData.append("name", document.querySelector("#name").value);
			formData.append("email", document.querySelector("#email").value);
			formData.append("phone", document.querySelector("#phone").value);
			formData.append("message", document.querySelector("#message").value);

			makeRequest("POST", path, formData).then(response => {
				const data = response;
				UIkit.notification.closeAll();
				document.body.style.overflow = "auto";
				if (response == "Complete") {
					submitBtn.disabled = false;
					document.querySelector("form#form").reset();

					if (window.location.pathname == "/pl/") {
						UIkit.notification({
							message: "Wysłano!",
							pos: "bottom-right",
							status: "success",
						});
						return 0;
					}
					if (window.location.pathname == "/en/") {
						UIkit.notification({
							message: "Successfully sent!",
							pos: "bottom-right",
							status: "success",
						});
						return 0;
					}

					UIkit.notification({
						message: "Verzonden!",
						pos: "bottom-right",
						status: "success",
					});
					return 0;
				} else {
					submitBtn.disabled = false;

					if (window.location.pathname == "/pl/") {
						UIkit.notification({
							message: "Wystąpił błąd...",
							pos: "bottom-right",
							status: "danger",
						});
						return 0;
					}
					if (window.location.pathname == "/en/") {
						UIkit.notification({
							message: "Error occured...",
							pos: "bottom-right",
							status: "danger",
						});
						return 0;
					}
					UIkit.notification({
						message: "Fout opgetreden...",
						pos: "bottom-right",
						status: "danger",
					});
					return 0;
				}
			});
		});
	};
	issueFrom();
});
