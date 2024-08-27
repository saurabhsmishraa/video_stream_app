import express from "express";
import cors from "cors";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import dotenv from "dotenv";
import path from "path";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5500

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./uploads")
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "-" + uuidv4() + path.extname(file.originalname))
    }
})
const upload = multer({ storage: storage })
app.use(cors({
    origin: ["http://localhost:3000", "http://localhost:5173"],
    credentials: true
}))

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin,X-Requested-With,Content-Type,Accept")
    next()
})
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/uploads", express.static("uploads"))
app.get('/', (req, res) => {
    res.json({ message: "Hello, Welcome from Youtube India" })
})


app.post('/upload', upload.single('file'), function (req, res) {
    // console.log('file uploaded')
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

