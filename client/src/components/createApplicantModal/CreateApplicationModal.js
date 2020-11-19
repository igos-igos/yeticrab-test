import {useState} from "react"
import {useHttp} from "../../hooks/http.hook"

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
    <div className="overlay" onClick={() => closeHandler()}>
      <div className="modal" onClick={(event) => event.stopPropagation()}>
        <b className="title">Создание заявки</b>

        <form className="form">
          <ul className="resetList">

            <li className="inputItem">
              <label htmlFor="clientFirm">
                Название фирмы клиента
              </label>
              <input
                className="input"
                placeholder="Введите название фирмы клиента"
                name="clientOrganizationName"
                type="text"
                id="clientOrganizationName"
                value={form.clientOrganizationName}
                onChange={changeHandler}
              />
            </li>

            <li className="inputItem">
              <label htmlFor="carrierName">
                ФИО перевозчика
              </label>
              <input
                className="input"
                placeholder="Введите ФИО перевозчика"
                name="carrierName"
                type="text"
                id="carrierName"
                value={form.carrierName}
                onChange={changeHandler}
              />
            </li>

            <li className="inputItem">
              <label htmlFor="carrirerPhone">
                Телефон перевозчика
              </label>
              <input
                className="input"
                placeholder="Введите номер телефона перевозчика"
                name="carrirerPhone"
                type="text"
                id="carrirerPhone"
                value={form.carrirerPhone}
                onChange={changeHandler}
              />
            </li>

            <li className="inputItem">
              <label htmlFor="ati">
                ATI код сети перевозчика
              </label>
              <input
                className="input"
                placeholder="Введите ati"
                name="ati"
                type="text"
                id="ati"
                value={form.ati}
                onChange={changeHandler}
              />
            </li>

            <li className="inputItem">
              <label htmlFor="comment">
                Комментарий
              </label>
              <textarea
                className="input"
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
              className="btn btn--lg"
              onClick={createApplicationHandler}
              disabled={loading}
            >
              Создать заявку
            </button>
            <button
              className="btn btn--lg"
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
