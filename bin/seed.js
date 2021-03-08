require("dotenv").config();
require("./../config/mongo");
const UserModel = require("./../model/userModel");
const BookModel = require("./../model/bookModel");
const CommentModel = require("./../model/commentModel");
const FavoriteModel = require("./../model/favoriteModel");

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
]


BookModel.deleteMany() 
.then( BookModel.insertMany(books))
.then(dbSuccess => {
    console.log(dbSuccess);
})
.catch(dbError => {
    console.log(dbError);
});