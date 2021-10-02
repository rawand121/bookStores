const books = [
  {
    name: "The Catcher in the Rye",
    price: 5000,
    bookStore: "Ranj",
    image: {
      url: "https://res.cloudinary.com/rawand121/image/upload/v1630408510/BookStore/The_Catcher_in_the_Rye_p9wu5l.jpg",
    },
    category: "Roman",
    language: "English",
    description:
      "The Catcher in the Rye is a novel by J. D. Salinger, partially published in serial form in 1945–1946 and as a novel in 1951. It was originally intended for adults but is often read by adolescents for its themes of angst, alienation, and as a critique on superficiality in society. It has been translated widely",
    parts: 1,
    writer: "J. D. Salinger",
  },
  {
    name: "As I Lay Dying",
    price: 4000,
    bookStore: "Yad",
    image: {
      url: "https://res.cloudinary.com/rawand121/image/upload/v1630408510/BookStore/As_I_Lay_Dying_cv4o6r.jpg",
    },
    category: "Roman",
    language: "English",
    description:
      "The death and burial of Addie Bundren is told by members of her family, as they cart the coffin to Jefferson, Mississippi, to bury her among her people. And as the intense desires, fears and rivalries of the family are revealed in the vernacular of the Deep South, Faulkner presents a portrait of extraordinary power - as epic as the Old Testament, as American as Huckleberry Finn.",
    parts: 2,
    writer: "William Faulkner",
  },
  {
    name: "BRAVE NEW WORLD",
    price: 6000,
    bookStore: "Rawand",
    image: {
      url: "https://res.cloudinary.com/rawand121/image/upload/v1630408511/BookStore/Brave_New_World_New_Longman_Literature_vsmsu5.jpg",
    },
    category: "Roman",
    language: "Kurdish",
    description:
      "The death and burial of Addie Bundren is told by members of her family, as they cart the coffin to Jefferson, Mississippi, to bury her among her people. And as the intense desires, fears and rivalries of the family are revealed in the vernacular of the Deep South, Faulkner presents a portrait of extraordinary power - as epic as the Old Testament, as American as Huckleberry Finn.",
    parts: 2,
    writer: "William Faulkner",
  },
  {
    name: "The Sound and the Fury",
    price: 6000,
    bookStore: "Rawand",
    image: {
      url: "https://res.cloudinary.com/rawand121/image/upload/v1630408513/BookStore/The_Sound_and_the_Fury_puenbt.jpg",
    },
    category: "Roman",
    language: "Kurdish",
    description:
      "The Sound and the Fury is a novel by the American author William Faulkner. It employs several narrative styles, including stream of consciousness. Published in 1929, The Sound and the Fury was Faulkner's fourth novel, and was not immediately successful",
    parts: 2,
    writer: "William Faulkner",
  },
  {
    name: "The Great Gatsby",
    price: 6000,
    bookStore: "Rawand",
    image: {
      url: "https://res.cloudinary.com/rawand121/image/upload/v1630408511/BookStore/The_Great_Gatsby_zwqybm.jpg",
    },
    category: "Dastan",
    language: "Kurdish",
    description:
      "The Great Gatsby is a 1925 novel by American writer F. Scott Fitzgerald. Set in the Jazz Age on Long Island, near New York City, the novel depicts first-person narrator Nick Carraway's interactions with mysterious millionaire Jay Gatsby and Gatsby's obsession to reunite with his former lover, Daisy Buchanan.",
    parts: 2,
    writer: "The Great Gatsby",
  },
  {
    name: "One Hundred Years of Solitude",
    price: 10000,
    bookStore: "Rawand",
    image: {
      url: "https://res.cloudinary.com/rawand121/image/upload/v1630408510/BookStore/One_Hundred_Years_of_Solitude_psie8e.jpg",
    },
    category: "Dastan",
    language: "Kurdish",
    description:
      "One Hundred Years of Solitude is a landmark 1967 novel by Colombian author Gabriel García Márquez that tells the multi-generational story of the Buendía family, whose patriarch, José Arcadio Buendía, founded the town of Macondo. The novel is often cited as one of the supreme achievements in literature.",
    parts: 2,
    writer: "Gabriel García Márquez",
  },
  {
    name: "To Kill a Mockingbird",
    price: 4000,
    bookStore: "Rawand",
    image: {
      url: "https://res.cloudinary.com/rawand121/image/upload/v1630408511/BookStore/To_Kill_A_Mockingbird_twv0lx.jpg",
    },
    category: "Dastan",
    language: "English",
    description:
      "To Kill a Mockingbird is a novel by the American author Harper Lee. It was published in 1960 and was instantly successful. In the United States, it is widely read in high schools and middle schools. To Kill a Mockingbird has become a classic of modern American literature, winning the Pulitzer Prize.",
    parts: 2,
    writer: "Harper Lee",
  },
  {
    name: "The Sun Also Rises",
    price: 8000,
    bookStore: "Andesha",
    image: {
      url: "https://res.cloudinary.com/rawand121/image/upload/v1630408512/BookStore/The_Sun_Also_Rises_s7sthl.jpg",
    },
    category: "Dastan",
    language: "English",
    description:
      "The Sun Also Rises is a 1926 novel by American writer Ernest Hemingway, his first, that portrays American and British expatriates who travel from Paris to the Festival of San Fermín in Pamplona to watch the running of the bulls and the bullfights",
    parts: 2,
    writer: "Ernest Hemingway",
  },
  {
    name: "The Grapes of Wrath",
    price: 8000,
    bookStore: "Andesha",
    image: {
      url: "https://res.cloudinary.com/rawand121/image/upload/v1630408511/BookStore/The_Grapes_of_Wrath_bvltnt.jpg",
    },
    category: "Dastan",
    language: "English",
    description:
      "The Grapes of Wrath is an American realist novel written by John Steinbeck and published in 1939. The book won the National Book Award and Pulitzer Prize for fiction, and it was cited prominently when Steinbeck was awarded the Nobel Prize in 1962.",
    parts: 2,
    writer: "John Steinbeck",
  },
  {
    name: "Pride and Prejudice",
    price: 5000,
    bookStore: "Andesha",
    image: {
      url: "https://res.cloudinary.com/rawand121/image/upload/v1630408511/BookStore/Pride_and_Prejudice_rv6sp9.jpg",
    },
    category: "Dastan",
    language: "Spanish",
    description:
      "Pride and Prejudice is an 1813 romantic novel of manners written by Jane Austen. Though it is mostly called a romantic novel, it can also be considered a satirical book",
    parts: 2,
    writer: "Jane Austen",
  },
];

export default books;
