const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', () => {
    console.log('Database Connected');
});

const array = (array) => array[Math.floor(Math.random() * array.length)];

seadDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 5; i++) {
        let random1000 = Math.floor(Math.random() * 1000);
        let price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '6173512d0840f5175a3b989a',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${array(places)}, ${array(descriptors)}`,
            images: [
                {
                  url: 'https://res.cloudinary.com/yelsin/image/upload/v1638914554/YelpCamp/vq935pbzgfmwoe2jkepx.jpg',
                  filename: 'YelpCamp/vq935pbzgfmwoe2jkepx'
                },
                {
                  url: 'https://res.cloudinary.com/yelsin/image/upload/v1638914574/YelpCamp/imedi9ykmoxtwp14hp6e.jpg',
                  filename: 'YelpCamp/imedi9ykmoxtwp14hp6e'
                },
                {
                  url: 'https://res.cloudinary.com/yelsin/image/upload/v1638914581/YelpCamp/ggf5olhcufbnfhgzpekk.jpg',
                  filename: 'YelpCamp/ggf5olhcufbnfhgzpekk'
                },
                {
                  url: 'https://res.cloudinary.com/yelsin/image/upload/v1639119571/YelpCamp/ffhrr6drjbrmbgyyb8wk.jpg',
                  filename: 'YelpCamp/ffhrr6drjbrmbgyyb8wk'
                },
                {
                  url: 'https://res.cloudinary.com/yelsin/image/upload/v1639119571/YelpCamp/dn4z2oqx2uyfwgtq0l4f.jpg',
                  filename: 'YelpCamp/dn4z2oqx2uyfwgtq0l4f'
                },
                {
                  url: 'https://res.cloudinary.com/yelsin/image/upload/v1639119571/YelpCamp/dihtg55alp8iehvupggy.jpg',
                  filename: 'YelpCamp/dihtg55alp8iehvupggy'
                }
            ],
            description: `Camping is an outdoor activity involving overnight stays away from home with or without a shelter, such as a tent or a recreational vehicle. Typically participants leave developed areas to spend time outdoors in more natural ones in pursuit of activities providing them enjoyment. The night (or more) spent outdoors distinguishes camping from day-tripping, picnicking, and other similarly short-term recreational activities.`,
            price
        })
        await camp.save();
    }
}

seadDB().then(() => {
    db.close();
});