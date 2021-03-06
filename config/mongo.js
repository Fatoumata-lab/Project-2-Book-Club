const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI, {
  useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
});
mongoose.connection.on("connected", () =>
  console.log("yay mongodb connected :)")
);
mongoose.connection.on("error", () =>
  console.log("nay db connection error :(")
);