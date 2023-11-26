Feature: Crear tag con Facebook card en el sitio web del usuario administrador fallido

@user1 @web
Scenario: Como usuario administrador creo un nuevo tag con Facebook card (Algunos campos largos)
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
  And I click expand facebook
  And I wait for 2 seconds
  And I enter tag facebook title "2"
  And I wait for 2 seconds
  And I enter tag facebook description "2"
  And I wait for 2 seconds
  And I click save
  And I wait for 2 seconds
  Then I see error tag facebook description