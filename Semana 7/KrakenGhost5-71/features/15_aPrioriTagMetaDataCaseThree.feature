Feature: Crear tag con Meta data en el sitio web del usuario administrador fallido

@user1 @web
Scenario: Como usuario administrador creo un nuevo tag con Meta data (Algunos campos largos)
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
  And I enter tag meta title "3"
  And I wait for 2 seconds
  And I enter tag meta description "3"
  And I wait for 2 seconds
  And I enter tag meta url "3"
  And I wait for 2 seconds
  And I click save
  And I wait for 2 seconds
  Then I see error tag meta data description