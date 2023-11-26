Feature: Crear tag con Meta data en el sitio web del usuario administrador exitoso

@user1 @web
Scenario: Como usuario administrador creo un nuevo tag con Meta data (Meta titulo, descripcion y url validos)
  Given I navigate to page "<URL>"
  And I wait for 5 seconds
  And I login email "<USERNAME>" and password "<PASSWORD>"
  And I wait for 7 seconds
  When I click tags
  And I wait for 2 seconds
  And I click new tag
  And I wait for 2 seconds
  And I enter tag name "1"
  And I wait for 2 seconds
  And I enter tag description "1"
  And I wait for 2 seconds
  And I enter tag color "1"
  And I wait for 2 seconds
  And I click expand meta data
  And I wait for 2 seconds
  And I enter tag meta title "1"
  And I wait for 2 seconds
  And I enter tag meta description "1"
  And I wait for 2 seconds
  And I enter tag meta url "1"
  And I wait for 2 seconds
  And I click save
  And I wait for 2 seconds
  And I click tags
  And I wait for 2 seconds
  Then I see public tag