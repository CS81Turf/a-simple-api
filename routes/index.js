const form = document.querySelector("form");

form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const data = new FormData(form);

    const newEntry = {
        name: data.get("name"),
        show: data.get("show")
    }

    try {
        const postRequest = await fetch("http://localhost:2025/api/characters", {
            method: "POST",
            body: JSON.stringify(newEntry),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        });

    } catch (error) {
        console.error(error.message);
    }

    form.reset();
})