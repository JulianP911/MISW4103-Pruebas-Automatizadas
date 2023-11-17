Feature: Editar post en el sitio web del usuario administrador

@user1 @web
Scenario: Como usuario administrador edito un post creado previamente de mis borradores (caso positivo)
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
  When I click post published
  And I enter post title "Mi primer blog de pruebas automatizadas editado"
  And I wait for 2 seconds
  And I enter post description "Bienvenidos a un mundo nuevo donde aprenderás sobre pruebas editado"
  And I wait for 2 seconds
  And I click update
  And I wait for 2 seconds
  And I click confirm update
  And I wait for 2 seconds
  And I click back posts
  And I wait for 2 seconds
  And I click published
  And I wait for 2 seconds
  Then I see post edited