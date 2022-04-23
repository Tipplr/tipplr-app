# Tipplr - Know What to Mix with What You Have

## Deployed at [eventegg.netlify.app](https://eventegg.netlify.app)

## Authors

- [Andrew Enyeart](https://github.com/aenyeart)
- [Daniel Jackson](https://github.com/daniel-jacks)
- [Erik Savage](https://github.com/eriksavage)
- [Spencer Tower](https://github.com/SpencerTower)

---

## Project Description

Tipplr enables users to catalog their home liquor inventory and save cocktail recipes, but it goes a step further by _selectively displaying recipes that the user currently has the ingredients for_. It also compares the list of recipes to figure out which one ingredient, if added to the user's collection, would most increase the number of new cocktails they can make!

## Background

Andrew is a bartender by trade with a substantial collection of bottles at home for making delicious cocktails for himself and guests. He uses a fun app that has fantastic recipes and some helpful features, but the search function is extremely limited, such that when he wants to see what he can make with what he has on hand, he can only search one ingredient at a time. Then he has to read through multiple recipes to determine if he has all the other ingredients, too. We want to build an application that enables the user to filter a list of cocktail recipes based on what they actually have on hand, add their own recipes, organize and save their favorites, and get recommendations on the next bottle they should add to their collection to significantly increase the number of drinks they can make at home.

---

### Project Status: MVP complete

### Technologies Used

- Vanilla Javascript
- HTML5
- CSS3

### Scope of Functionalities

#### Home Page

- 'Filter recipes by':
- filter recipes by base alcohol type
- filter by '1 ingredient away' - shows user which recipes they are on ingredient away from making
- 'Recipes list':
- displays filtered recipes

#### My Inventory

- add inventory - allows user to input bottle name / type
- renders a list of users current inventory
- allows user to remove inventory items from list

#### My Recipes

- add new recipe
- displays user created recipes
- takes recipe name, base, ingredients / amount, glassware, instructions, notes

#### Storage

- utilizes local storage to store and retrieve user's recipes and inventory

---

### Additional Resources

- [Asana - Tipplr Project](https://app.asana.com/0/1201367791360026/overview)
- [Google Drive](https://drive.google.com/drive/folders/15NCmAkLO5YskJMwSisfSIme9kqXutvRt)
- [Work Agreement](https://docs.google.com/document/d/1EWqoIjHevwoeMd498koeLVaLgHBfE0i_gl43d3N-tsg/edit?usp=sharing)
- [Pitch/MVP](https://docs.google.com/document/d/1yVgFbKpPoL3dMFSfXpoGq8YGnJSBrriiFG2HRkGxpFY/edit?usp=sharing)

---

### License

MIT License

Copyright (c) 2021 Tipplr

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
