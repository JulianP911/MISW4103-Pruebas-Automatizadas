Feature: Asociar un tag a un post ambos creados previamente en el sitio web del usuario administrador

@user1 @web
Scenario: Como usuario administrador asigno un tag a un post que ya se encuentra publicado en el sitio web (caso positivo)
  Given I navigate to page "<URL>"
  And I wait for 5 seconds
  And I login email "<USERNAME>" and password "<PASSWORD>"
  And I wait for 7 seconds
  And I click posts
  And I wait for 2 seconds
  And I click new post
  And I wait for 2 seconds
  And I enter post title "Mi primer blog de pruebas automatizadas"
  And I wait for 2 seconds
  And I enter post description "Bienvenidos a un mundo nuevo donde aprenderás sobre pruebas"
  And I wait for 2 seconds
  And I click publish
  And I wait for 2 seconds
  And I click confirm publish
  And I wait for 2 seconds
  And I click confirm modal publish
  And I wait for 2 seconds
  And I click back posts
  And I wait for 2 seconds
  And I click published
  And I wait for 2 seconds
  And I see post published before edited
  And I wait for 2 seconds
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
  When I click posts
  And I wait for 2 seconds
  And I click published
  And I wait for 2 seconds
  And I click post published
  And I wait for 2 seconds
  And I click settings post
  And I wait for 2 seconds
  And I click settings tags
  And I wait for 2 seconds
  And I select first tag
  And I wait for 2 seconds
  And I click update
  And I wait for 2 seconds
  And I click confirm update
  And I wait for 2 seconds
  And I click back posts
  And I wait for 2 seconds
  And I click all tags
  And I wait for 2 seconds
  And I click tag animales
  And I wait for 2 seconds
  Then I see post with correct tag