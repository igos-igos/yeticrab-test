const {Router} = require("express")
const {check, validationResult} = require("express-validator")
const Application = require("../models/Application")
const router = Router()

// /api/applications

router.get("/", async (req, res) => {
  const applications = await Application.find()
  res.json(applications)
  try {
  } catch (error) {
    res.status(500).json({message: "Что-то пошло не так, попробуйте снова."})
  }
})

router.get("/:number", async (req, res) => {
  const application = await Application.findOne({appNumber: req.params.number})
  res.json(application)
  try {
  } catch (error) {
    res.status(500).json({message: "Что-то пошло не так, попробуйте снова."})
  }
})

router.post(
  "/create",
  // Список валидаторов
  [
    check("clientOrganizationName", "Заполните поле.").exists(),
    check("carrierName", "Заполните поле.").exists(),
    check("carrirerPhone", "Заполните поле.").exists(),
    check("ati", "Заполните поле.").exists()
  ],
  async (req, res) => {
    try {
      // В errors запишутся ошибки, если они есть.
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({error: errors.array(), message: "Некорректные данные при создании заявки."})
      }

      const {clientOrganizationName, carrierName, carrirerPhone, ati, comment} = req.body
      const appNumber = Math.random() * Math.pow(10, 17)
      const date = Date.now()
      const application = new Application({
        appNumber,
        date,
        clientOrganizationName,
        carrierName,
        carrirerPhone,
        ati,
        comment
      })

      await application.save()

      res.status(201).json({message: "Заявка создана."})
    } catch (error) {
      res.status(500).json({message: "Что-то пошло не так, попробуйте снова."})
    }
  }
)

router.patch(
  "/change/:number",
  // Список валидаторов
  [
    check("clientOrganizationName", "Заполните поле.").exists(),
    check("carrierName", "Заполните поле.").exists(),
    check("carrirerPhone", "Заполните поле.").exists(),
    check("ati", "Заполните поле.").exists()
  ],
  async (req, res) => {
    try {
      // В errors запишутся ошибки, если они есть.
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({error: errors.array(), message: "Некорректные данные при создании заявки."})
      }

      const application = await Application.findOneAndUpdate({appNumber: req.params.number}, req.body, {new: true})

      await application.save()

      res.status(200).json({message: "Заявка обновлена."})
    } catch (error) {
      res.status(500).json({message: "Что-то пошло не так, попробуйте снова."})
    }
  }
)

router.delete("/delete/:number", async (req, res) => {
  try {
    await Application.deleteOne({appNumber: req.params.number})

    res.status(200).json({message: "Заявка удалена."})
  } catch (error) {
    res.status(500).json({message: "Что-то пошло не так, попробуйте снова."})
  }
})

module.exports = router
