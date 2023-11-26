Feature: Editar tag en el sitio web del usuario administrador fallido

@user1 @web
Scenario: Como usuario administrador edito un tagb (Nombre, descripcion y color invalidos)
  Given I navigate to page "<URL>"
  And I wait for 5 seconds
  And I login email "<USERNAME>" and password "<PASSWORD>"
  And I wait for 7 seconds
  And I load data tag
  And I wait for 2 seconds
  And I click tags
  And I wait for 2 seconds
  And I click new tag
  And I wait for 2 seconds
  And I enter tag name "1"
  And I wait for 2 seconds
  And I enter tag description "1"
  And I wait for 2 seconds
  And I enter tag color "1"
  And I wait for 2 seconds
  And I click save
  And I wait for 2 seconds
  And I click tags
  And I wait for 2 seconds
  And I see tag created before edited
  And I wait for 2 seconds
  When I click tag created
  And I wait for 2 seconds
  And I enter tag name dynamic "3"
  And I wait for 2 seconds
  And I enter tag description dynamic "3"
  And I wait for 2 seconds
  And I enter tag color dynamic "3"
  And I wait for 2 seconds
  And I click save
  And I wait for 2 seconds
  Then I see error tag color