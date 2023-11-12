Feature: Editar tag en el sitio web del usuario administrador

@user1 @web
Scenario: Como usuario administrador edito un tag creado previamente (caso positivo)
  Given I navigate to page "http://localhost:2368/ghost/#/signin"
  And I login email "<USERNAME>" and password "<PASSWORD>"
  And I wait for 3 seconds
  And I click tags
  And I wait for 2 seconds
  And I click new tag
  And I wait for 2 seconds
  And I enter tag name "Animales"
  And I wait for 2 seconds
  And I enter tag description "Este tag es para referenciar a los post de animales"
  And I wait for 2 seconds
  And I enter color "8FC0A9"
  And I wait for 2 seconds
  And I click save
  And I wait for 2 seconds
  And I click tags
  And I wait for 2 seconds
  And I see tag created before edited
  And I wait for 2 seconds
  When I click tag created
  And I wait for 2 seconds
  And I enter tag name "Anfibios"
  And I wait for 2 seconds
  And I click save
  And I wait for 2 seconds
  And I click tags
  And I wait for 2 seconds
  Then I see tag edited