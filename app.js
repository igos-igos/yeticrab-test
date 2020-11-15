const express = require("express")
const config = require("config")
const path = require("path")
const mongoose = require("mongoose")

const app = express()

app.use(express.json({extended: true}))

app.use("/api/applications", require("./routes/applications.routes"))

if (process.env.NODE_ENV === "production") {
  app.use("/", express.static(path.join(__dirname, "client", "build")))

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  })
}

const PORT = config.get("port") || 5000

async function start() {
  try {
    await mongoose.connect(config.get("mongoUri"), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    })
    app.listen(PORT, () => console.log(`App has been started at port ${PORT}`))
  } catch (error) {
    console.log(`Server error: ${error.message}`)
  }
}

start()
