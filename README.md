# Use Case Pizza
=================
Exercise Plain Server rest api

# Technologies Used
============

- mongodb, typescript, nodejs, express

#Features
=========

-- mongodb
----Migrations 

-- API
---- Pizza
---- Ingredients

# Problems known:
========

-- Typescript can not implement very well interfaces
    !!! Workaround made


#Model 
==========
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
