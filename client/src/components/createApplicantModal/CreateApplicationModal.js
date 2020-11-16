import {useState} from "react"
import {useHttp} from "../../hooks/http.hook"

import classes from "./CreateApplicationModal.module.css"

export const CreateApplicationModal = ({closeHandler, getApplications}) => {
  const {loading, request} = useHttp()
  const [form, setForm] = useState({
    clientOrganizationName: "",
    carrierName: "",
    carrirerPhone: "",
    ati: "",
    comment: ""
  })

  const changeHandler = (event) => {
    setForm({...form, [event.target.name]: event.target.value})
  }

  const createApplicationHandler = async () => {
    try {
      const data = await request("/api/applications/create", "POST", {...form})
      setForm({clientOrganizationName: "", carrierName: "", carrirerPhone: "", ati: "", comment: ""})
      getApplications()
      closeHandler()
      console.log(data)
    } catch (e) {}
  }

  return (
    <div className={classes.overlay} onClick={() => closeHandler()}>
      <div className={classes.modal} onClick={(event) => event.stopPropagation()}>
        <b>Создание заявки</b>

        <form className={classes.form}>
          <ul className={classes.inputsList}>

            <li className={classes.inputItem}>
              <label className={classes.label} htmlFor="clientFirm">
                Название фирмы клиента
              </label>
              <input
                placeholder="Введите название фирмы клиента"
                name="clientOrganizationName"
                type="text"
                id="clientOrganizationName"
                value={form.clientOrganizationName}
                onChange={changeHandler}
              />
            </li>

            <li className={classes.inputItem}>
              <label className={classes.label} htmlFor="carrierName">
                ФИО перевозчика
              </label>
              <input
                placeholder="Введите ФИО перевозчика"
                name="carrierName"
                type="text"
                id="carrierName"
                value={form.carrierName}
                onChange={changeHandler}
              />
            </li>

            <li className={classes.inputItem}>
              <label className={classes.label} htmlFor="carrirerPhone">
                Телефон перевозчика
              </label>
              <input
                placeholder="Введите номер телефона перевозчика"
                name="carrirerPhone"
                type="text"
                id="carrirerPhone"
                value={form.carrirerPhone}
                onChange={changeHandler}
              />
            </li>

            <li className={classes.inputItem}>
              <label className={classes.label} htmlFor="ati">
                ATI код сети перевозчика
              </label>
              <input
                placeholder="Введите ati"
                name="ati"
                type="text"
                id="ati"
                value={form.ati}
                onChange={changeHandler}
              />
            </li>

            <li className={classes.inputItem}>
              <label className={classes.label} htmlFor="comment">
                Комментарий
              </label>
              <textarea
                placeholder="Введите комментарий"
                name="comment"
                id="comment"
                value={form.comment}
                onChange={changeHandler}
              />
            </li>
          </ul>

          <div>
            <button
              className={classes.btn}
              onClick={createApplicationHandler}
              disabled={loading}
            >
              Создать заявку
            </button>
            <button
              className={classes.btn}
              type="button"
              onClick={() => closeHandler()}
            >
              Закрыть окно
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
