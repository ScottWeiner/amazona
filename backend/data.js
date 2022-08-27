import bcrypt from 'bcryptjs'

export const data = {
    users: [
        {
            name: 'Scott',
            email: 'admin@example.com',
            password: bcrypt.hashSync('12345', 8),
            isAdmin: true
        },
        {
            name: 'Wayne',
            email: 'wayne@example.com',
            password: bcrypt.hashSync('12345', 8),
            isAdmin: false
        }
    ],
    products: [
        {

            name: 'Tuckable Shirt',
            category: 'Shirts',
            image: '/images/tuckableShirt.jpg',
            price: 20,
            countInStock: 10,
            rating: 4.5,
            numReviews: 12,
            description: 'Outstanding!'
        },
        {

            name: 'Barn Clothes',
            category: 'Shirts',
            image: '/images/barnClothes.jpg',
            price: 60,
            countInStock: 1,
            rating: 4.5,
            numReviews: 16,
            description: 'Good shirt for chorin\' in the barn'
        },
        {

            name: 'Skid Overalls',
            category: 'Shirts',
            image: '/images/skidOveralls.jpg',
            price: 55,
            countInStock: 6,
            rating: 1.5,
            numReviews: 22,
            description: 'I hate the world. I hate my parents. I hate myself.'
        },
        {
            name: 'Sudbury Blueberry Bulldogs Jersey',
            category: 'Shirts',
            image: '/images/blueberryBulldogs.jpg',
            price: 120,
            countInStock: 0,
            rating: 3.0,
            numReviews: 35,
            description: 'Great jersey for those that never want to lose again'
        },
        {

            name: 'Pomegranite Pomeranians Jersey',
            category: 'Shirts',
            image: '/images/pomegranatePoms.jpg',
            price: 120,
            countInStock: 10,
            rating: 4.75,
            numReviews: 10,
            description: 'Settle down'
        },
        {

            name: 'Letterkenny Irish Jersey',
            category: 'Shirts',
            image: '/images/letterkennyIrish.jpg',
            price: 100,
            countInStock: 10,
            rating: 4.0,
            numReviews: 5,
            description: 'My god, does this team FUCK DOG!'
        }
    ]
}