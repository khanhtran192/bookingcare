const readImage = async (imageFile) => {
	const formData = new FormData();
	formData.append("image", imageFile);
	const res = await fetch("https://api.fpt.ai/vision/idr/vnm", {
		method: "post",
		headers: {
			"api-key": "y3RkEUnqyyDxevH8VvjjngoketMkUsBh",
		},
		body: formData,
	}).then((res) => res.json());
	if (res.errorCode !== 0) {
		throw new Error("Ảnh không hợp lệ");
	}
	return res.data[0];
};

document.addEventListener("DOMContentLoaded", function () {
	console.log("Hello world");
	const bookingForm = document.forms[0];
	const bookingFormInputs = bookingForm.elements;
	const inputIdCard = document.getElementById("idCard");
	if (inputIdCard) {
		inputIdCard.addEventListener("change", async (e) => {
			try {
				const data = await readImage(inputIdCard.files?.[0]);
				for (const key in data) {
					if (
						Object.hasOwnProperty.call(data, key) &&
						Object.hasOwnProperty.call(bookingFormInputs, key)
					) {
						const value = data[key];
						if (value) {
							if (bookingFormInputs[key].type === "date") {
								bookingFormInputs[key].value = value
									.split("/")
									.reverse()
									.join("-");
							} else {
								bookingFormInputs[key].value = value;
							}
						}
					}
				}
			} catch (e) {
				console.log("e :", e);
				alert(e.message);
			}
		});
	}
	bookingForm.addEventListener("submit", async (e) => {
		e.preventDefault();
		const formData = new FormData(bookingForm);
		for (const [key, value] of formData.entries()) {
			console.log(key, value);
		}
	});
});
