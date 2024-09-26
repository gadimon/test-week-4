import express from "express";

const app = express();
const PORT = 3050;

app.get('/', (req, res) => {
    res.send("hello gad");
});

app.listen(PORT, ()=> {console.log(`server listen to port:  ${PORT}`);
});
