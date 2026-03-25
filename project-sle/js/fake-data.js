if (!localStorage.getItem("fakeData")) {
    const fakeData = {
        users: 435,
        projects: 18,
        ecoScore: 76
    };
    localStorage.setItem("fakeData", JSON.stringify(fakeData));
}
