# Use Case Pizza
=================
Exercise Plain Server rest api


enum IngredientIco {
  anchovy
  bacon
  basil
  chili
  mozarella
  mushroom
  olive
  onion
  peeper
  pepperoni
  prawn
  sweetcorn
  tomato
}

type Ingredient @model
{
  id: ID!
  name: String!
  ico: IngredientIco
}

type Pizza @model
{
  id: String!
  name: String!
  toppingsList: String!
}
