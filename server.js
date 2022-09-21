const express = require("express")
const app = express()

const path = require("path")

const PORT = process.env.PORT || 5000


app.use(express.static(__dirname + '/'))


app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + "/views/main.html"))
})


// BAR pdf417
const multer = require("multer")
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })


app.post("/", upload.single("image"), (req, res) => {
    // reading request
    const { file } = req
    // basic checks
    if (!file) { return res.status(400).send("No image files have been passed") }
    if (!file.mimetype) { return res.status(400).send("Mimetype is not specified, cannot save file") }
    if (!file.buffer) { return res.status(500).send("The image was not uploaded to Buffer. Cannot save it") }
    
    console.log(file.buffer.toString('base64'))

    res.send("ok")

})


app.listen(PORT, console.log(`http://localhost:${ PORT }`))