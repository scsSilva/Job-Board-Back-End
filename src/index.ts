import express, { json, urlencoded } from "express";
import cors from "cors";
import routes from "./routes";

const app = express();
const PORT = process.env.PORT;

app.use(json());
app.use(cors());
app.use(urlencoded({ extended: false }));
app.use(routes);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));