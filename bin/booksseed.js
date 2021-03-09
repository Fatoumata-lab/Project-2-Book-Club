require("dotenv").config();
require("../config/mongo");
const UserModel = require("../model/userModel");
const BookModel = require("../model/bookModel");
const CommentModel = require("../model/commentModel");
const FavoriteModel = require("../model/favoriteModel");

const books = [
    {
        title: "Gulivers travels",
        author: "Jonathan Swift",
        year: 1726,
        genre: "To change",
        synopsis: "For the last 250 years people everywhere have enjoyed reading about Lemuel Gulliver's travels in the strange countries of Lilliput and Brobdingnag. The people of these countries, with all their curiously human failings, come to life in vivid illustrations. ",
        comment: "Bien",
        rating: 4,
        cover: "https://covers.openlibrary.org/b/id/6652735-L.jpg",
    },
    {
        title: "Oh, the Thinks You Can Think!",
        author: "Dr. Seuss",
        year: 1975,
        genre: "To change",
        synopsis: "Relates in verse some of the unusual thinks you can think if only you try.",
        comment: "Bien",
        rating: 4,
        cover: "https://covers.openlibrary.org/b/id/8314464-L.jpg",
    },
    {
        title: "Invisible cities",
        author: "Italo Calvino",
        year: 1972,
        genre: "To change",
        synopsis: "Kublai Khan does not necessarily believe everything Marco Polo says when he describes the cities visited on his expeditions, but the emperor of the Tartars does continue listening to the young Venetian with greater attention and curiosity than he shows any other messenger or explorer of his. So begins Italo Calvino's compilation of fragmentary urban images. As Marco tells the khan about Armilla, which has nothing that makes it seem a city, except the water pipes that rise vertically where the houses should be and spread out horizontally where the floors should be, the spider-web city of Octavia, and other marvelous burgs, it may be that he is creating them all out of his imagination, or perhaps he is recreating fine details of his native Venice over and over again, or perhaps he is simply recounting some of the myriad possible forms a city might take.",
        comment: "Nul",
        rating: 3,
        cover: "https://covers.openlibrary.org/b/id/6518445-L.jpg",
    },
    {
        title: "Anna Karenina",
        author: "Lev Nikolaevic Tolstoy",
        year: 1876,
        genre: ["Fiction", "Romance"],
        synopsis: "Described by William Faulkner as the best novel ever written and by Fyodor Dostoevsky as “flawless,” Anna Karenina tells of the doomed love affair between the sensuous and rebellious Anna and the dashing officer, Count Vronsky. Tragedy unfolds as Anna rejects her passionless marriage and thereby exposes herself to the hypocrisies of society. Set against a vast and richly textured canvas of nineteenth-century Russia, the novel's seven major characters create a dynamic imbalance, playing out the contrasts of city and country life and all the variations on love and family happiness.",
        comment: "Pas mal",
        rating: 4,
        cover: "https://covers.openlibrary.org/b/id/7061588-L.jpg",
    },
    {
        title: "The Handmaid's Tale ",
        author: "Margaret Atwood",
        year: 1996,
        genre: "Novel",
        synopsis: "Set in a dystopian future, The Handmaid's Tale imagines a world in which an environmental catastrophe has led to the majority of the female population becoming infertile. When a fundamentalist religious group seizes control of what was once the USA, fertile women are rounded up and trained to be silent, nameless 'handmaids', forced to procreate with the men in power. An important feminist text, Margaret Atwood's novel explores the consequences of a reversal of women's rights.",
        comment: "Dur",
        rating: 2,
        cover: "https://covers.openlibrary.org/b/id/8231851-L.jpg",
    },
    {
        title: "The Great Gatsby",
        author: "F Scott Fitzgerald",
        year: 1925,
        genre: "Tragedy", 
        synopsis: "The Great Gatsby, third novel by F. Scott Fitzgerald, published in 1925 by Charles Scribner's Sons. Set in Jazz Age New York, the novel tells the tragic story of Jay Gatsby, a self-made millionaire, and his pursuit of Daisy Buchanan, a wealthy young woman whom he loved in his youth.",
        comment: "Top",
        rating: 5,
        cover: "https://covers.openlibrary.org/b/id/10217417-L.jpg",
    },
    {
        title: "Nineteen Eighty-Four",
        author: "George Orwell",
        year: 1949,
        genre: "Social science fiction",
        synopsis: "Hidden away in the Record Department of the sprawling Ministry of Truth, Winston Smith skilfully rewrites the past to suit the needs of the Party. Yet he inwardly rebels against the totalitarian world he lives in, which demands absolute obedience and controls him through the all-seeing telescreens and the watchful eye of Big Brother, symbolic head of the Party. In his longing for truth and liberty, Smith begins a secret love affair with a fellow-worker Julia, but soon discovers the true price of freedom is betrayal.",
        comment: "belle surprise",
        rating: 4,
        cover: "https://upload.wikimedia.org/wikipedia/en/c/c3/1984first.jpg",
    },
    {
        title: "The Thursday Murder Club",
        author: "Richard Osman",
        year: 2020,
        genre: "Thriller",
        synopsis: "In a peaceful retirement village, four unlikely friends meet up once a week to investigate unsolved murders. But when a brutal killing takes place on their very doorstep, the Thursday Murder Club find themselves in the middle of their first live case. Elizabeth, Joyce, Ibrahim and Ron might be pushing eighty but they still have a few tricks up their sleeves.",
        comment: "bof",
        rating: 2,
        cover: "https://images-na.ssl-images-amazon.com/images/I/81uHYq+cvkL.jpg",
    },
    {
        title: "The Book Club",
        author: "C.J. Cooper",
        year: 2020,
        genre: "Thriller",
        synopsis: "An absolutely gripping psychological thriller with a killer twist",
        comment: "Magnifique",
        rating: 5,
        cover: "https://m.media-amazon.com/images/I/515LTe1i8xL.jpg",
    },
    {
        title: "Healing Her Heart",
        author: "Laura Scott",
        year: 2013,
        genre: "Romance",
        synopsis: "Dr. Gabe Allen has a rule about dating colleagues but when he meets ER nurse Larissa Brockman he's tempted to break his vow. Larissa's faith draws him back to the church he'd left behind, but when their lives are on the line Gabe discovers that Larissa is the one who needs to learn about the true meaning of forgiveness. And only Gabe can help heal her heart.",
        comment: "Not too bad",
        rating: 4,
        cover: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1369861884l/17937407.jpg",
    },
    {
        title: "Pride and Prejudice ",
        author: "Jane Austen",
        year: 2012,
        genre: "Romance",
        synopsis: "In this historic romance, young Elizabeth Bennet strives for love, independence and honesty in the vapid high society of 19th century England.",
        comment: "Amazing",
        rating: 5,
        cover: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1362061628l/15769088.jpg",
    },
    {
        title: "With Eyes Closed",
        author: "Jason Miranda",
        year: 2009,
        genre: "Fiction",
        synopsis: "Into the Depths of A terrible addiction.",
        comment: "Bof",
        rating: 2,
        cover: "https://www.bookrix.com/image/coverpic3d.php?art=book&size=xl&p=constantine.eternal_1253637807.7521040440",
    },
    {
        title: "Rain on My Wings",
        author: "Juliet Rose",
        year: 2010,
        genre: ["Fiction", "Romance"],
        synopsis: "I wanted him to see me, to open his eyes and simply acknowledge my presence. But I knew he wouldn’t. To him, I was only a speck in the universe, a beautiful but unimportant creature. He would not see me, because right now... I was a butterfly.",
        comment: "No comment",
        rating: 1,
        cover: "https://www.bookrix.com/image/coverpic3d.php?art=book&size=xl&p=kyiu101_1278961768.8726470470",
    },
    {
        title: "Come Find Me",
        author: "Harley Jane",
        year: 2010,
        genre: "Fiction",
        synopsis: "People run away from things. Things that scare them. Things that they don’t like. And the things that they love. But what happens when the person you’re running away chases after you? The person you love, and have loved since first grade, chooses to follow you to the end of the earth. But do I run towards the guy I love? No I run away.",
        comment: "Alright",
        rating: 4,
        cover: "https://www.bookrix.com/image/coverpic3d.php?art=book&size=xl&p=i.love.cheer.123_1281328267.4071021080",
    },
     {
        title: "Kingdom of a thousand",
        author: "Eftos Ent.",
        year: 2011,
        genre: "Science Fiction",
        synopsis: "Invention of sci-fi, guaranteed voodoo-free. The adventures of Prince Henley to Westerburg, Patchara Petch-a-boon and Svinenysh Galactic.",
        comment: "Too out of this world for me",
        rating: 1,
        cover: "https://www.bookrix.com/image/coverpic3d.php?art=book&size=xl&p=eftostunnel_1301049355.0605859756",
    },
    {
        title: "Time Traveler",
        author: "S. M. Bowes",
        year: 2009,
        genre: "Science Fiction",
        synopsis: "A short, original, scifi fiction for Travel` contest.",
        comment: "Not for me",
        rating: 2,
        cover: "https://www.bookrix.com/image/coverpic3d.php?art=book&size=xl&p=susanbowes_1257178452.5276820660",
    },
     {
        title: "Calypso",
        author: "S. G. Ricketts",
        year: 2011,
        genre: "Science Fiction",
        synopsis: "The world is not what it seems. Millions of lightyears away from her home planet, Kira is the sole survivor of the Earth colony on Calypso. Trapped on the exotic rain forest planet, Kira is surrounded by natives who want her dead and watched by the organization that sent her there. Without warning, Kira is thrown into a world of politics, betrayal, and desperation. She must relearn the ability to love and trust if she is ever going to survive.",
        comment: "Not too bad",
        rating: 4,
        cover: "https://www.bookrix.com/image/coverpic3d.php?art=book&size=xl&p=stevie.grace_1300474648.7187800407",
    },
    {
        title: "Becoming",
        author: "Michelle Obama",
        year: 2018,
        genre: "Memoirs",
        synopsis: "An intimate, powerful, and inspiring memoir by the former First Lady of the United States",
        comment: "Great one",
        rating: 5,
        cover: "https://images-production.bookshop.org/spree/images/attachments/4137042/original/9781524763138.jpg?1589083552",
    },
    {
        title: "Just Mercy: A Story of Justice and Redemption",
        author: "Bryan Stevenson",
        year: 2015,
        genre: "Memoirs",
        synopsis: "A powerful true story about the potential for mercy to redeem us, and a clarion call to fix our broken system of justice--from one of the most brilliant and influential lawyers of our time.",
        comment: "Good",
        rating: 4,
        cover: "https://images-production.bookshop.org/spree/images/attachments/4143635/original/9780812984965.jpg?1608761340",
    },
]

// books.prototype.random = function () {
//     return books[Math.floor((Math.random()*books[0].length))];
//   }

BookModel.deleteMany() 
.then( BookModel.insertMany(books))
.then(dbSuccess => {
    console.log(dbSuccess);
})
.catch(dbError => {
    console.log(dbError);
});


