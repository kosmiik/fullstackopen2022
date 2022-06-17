describe("Blog", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    const user = {
      name: "Pertti Makelainen",
      username: "Pertti",
      password: "qwerty",
    };
    cy.request("POST", "http://localhost:3003/api/users/", user);
    cy.visit("http://localhost:3000");
  });

  it("Login form is shown", function () {
    cy.contains("Log in to application");
    cy.contains("username");
    cy.contains("password");
  });

  it("login succeeds with correct credentials", function () {
    cy.contains("login").click();
    cy.get("#username").type("Pertti");
    cy.get("#password").type("qwerty");
    cy.get("#login-button").click();

    cy.contains("Pertti Makelainen logged in");
  });

  it("fails with wrong credentials", function () {
    cy.contains("login").click();
    cy.get("#username").type("Kalle");
    cy.get("#password").type("Bad");
    cy.get("#login-button").click();
    cy.contains("wrong username or password");
  });

  describe("When logged in", function () {
    beforeEach(function () {
      cy.login({ username: "Pertti", password: "qwerty" });
    });

    it("a blog can be created", function () {
      cy.createBlog({
        title: "a blog created by test",
        author: "Pertti",
        url: "www.pertti.fi",
      });
    });

    describe("and several blogs exist", function () {
      beforeEach(function () {
        cy.createBlog({
          title: "first blog",
          author: "Pertti",
          url: "pert.ti",
        });
        cy.createBlog({ title: "second blog", author: "Jorma", url: "jor.ma" });
        cy.createBlog({ title: "third blog", author: "Yrjö", url: "yr.jo" });

        cy.contains("first blog").as("b1");
        cy.contains("second blog").as("b2");
        cy.contains("third blog").as("b3");
      });

      it("one of those can be liked", function () {
        cy.contains("second blog").contains("show").click();
        cy.contains("like").click();
        cy.contains("1");
      });
      it("and we can delete one blog...", function () {
        cy.contains("third blog").contains("show").click();
        cy.contains("remove").click();
        cy.on("window:confirm", () => true);
        cy.contains("removed");
      });
      it("blog with most likes is first etc...", function () {
        cy.get("@b1").contains("show").click();
        cy.get("@b2").contains("show").click();
        cy.get("@b3").contains("show").click();
        cy.get("@b1").contains("like").as("l1");
        cy.get("@b2").contains("like").as("l2");
        cy.get("@b3").contains("like").as("l3");

        cy.get("@l3").click();
        cy.wait(777);
        cy.get("@l3").click();
        cy.wait(777);
        cy.get("@l3").click();
        cy.wait(777);
        cy.get("@l1").click();
        cy.wait(777);
        cy.get("@l1").click();
        cy.wait(777);
        cy.get("@l2").click();
        cy.wait(777);

        cy.get(".blog").eq(0).should("contain", "third blog");
        cy.get(".blog").eq(1).should("contain", "first blog");
        cy.get(".blog").eq(2).should("contain", "second blog");
      });
    });
  });
});
