describe("Render app on screen", () => {
	it("Renders page", () => {
		cy.visit("http://localhost:3000");
	});
});

describe("Go to form component", () => {
	it("Takes user to order form", () => {
		cy.get(".goToForm").click();
	});
});

describe("Fill out name input", () => {
	it("Selects name input", () => {
		cy.get("#name");
	});
	it("Enters name into input", () => {
		cy.get("#name")
			.should("have.value", "")
			.type("Michael Skarn")
			.should("have.value", "Michael Skarn");
	});
});

describe("Select multiple toppings", () => {
	it("Selects toppings", () => {
		cy.get("#pepperoni").click().should("be.checked");
		cy.get("#spicyPepperoni").click().should("be.checked");
		cy.get("#italianSausage").click().should("be.checked");
	});
});

describe("Check if submit button works", () => {
	it("checks submit button functionality", () => {
		cy.get("#size").select[1].should("have.value", "Small");
	});
});
