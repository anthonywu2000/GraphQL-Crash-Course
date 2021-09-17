const { v4 } = require("uuid");

const Mutation = {
    addAnimal: (parent, {image, title, rating, price, description, slug, stock, onSale, category}, {animals}) => {
        let newAnimal = {
            id: v4(),
            image,
            title,
            rating,
            price,
            description,
            slug,
            stock,
            onSale,
            category,
        }
        animals.push(newAnimal);
        // console.log(newAnimal) // testing only
        return newAnimal;
    },
    removeAnimal: (parent, { id }, { animals }) => {
        let animalIndex = animals.findIndex((animal) => {
            return animal.id === id; // if animal id is same the inputted id
        });
        animals.splice(animalIndex, 1);
        return true;
    }
}

module.exports = Mutation;