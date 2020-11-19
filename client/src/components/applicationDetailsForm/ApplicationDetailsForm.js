import {useState} from "react"
import {Link} from "react-router-dom"
import {useHttp} from "../../hooks/http.hook"

export const ApplicationDetailsForm = ({application}) => {
  const {request} = useHttp()
  const [change, setChange] = useState(false)

  const activeChangeHandler = () => {
    setChange(true)
  }

  const changeHandler = (event) => {
    setForm({...form, [event.target.name]: event.target.value})
  }
  const [form, setForm] = useState({
    appNumber: application.appNumber,
    date: application.date,
    clientOrganizationName: application.clientOrganizationName,
    carrierName: application.carrierName,
    carrirerPhone: application.carrirerPhone,
    ati: application.ati,
    comment: application.comment
  })

  const changeApplicationHandler = async () => {
    try {
      await request(`/api/applications/change/${application.appNumber}`, "PATCH", {...form})
      setChange(false)
    } catch (e) {}
  }

  return (
    <div>

      <b className="title">Заявка № {application.appNumber}</b>
      <Link className="link" to={"/applications"}>К списку заявок</Link>

      <form className="form">
        <ul className="resetList">

          <li className="inputItem">
            <label htmlFor="appNumber">
              Номер заявки
            </label>
            <input
              className="input"
              type="text"
              name="appNumber"
              id="appNumber"
              defaultValue={form.appNumber}
              disabled
            />
          </li>

          <li className="inputItem">
            <label htmlFor="date">
              Дата/время создания заявки
            </label>
            <input
              className="input"
              type="text"
              name="date"
              id="date"
              defaultValue={form.date}
              disabled
            />
          </li>

          <li className="inputItem">
            <label htmlFor="clientOrganizationName">
              Название фирмы клиента
            </label>
            <input
              className="input"
              type="text"
              name="clientOrganizationName"
              id="clientOrganizationName"
              value={form.clientOrganizationName}
              disabled={!change}
              onChange={changeHandler}
            />
          </li>

          <li className="inputItem">
            <label htmlFor="carrierName">
              ФИО перевозчика
            </label>
            <input
              className="input"
              type="text"
              name="carrierName"
              id="carrierName"
              value={form.carrierName}
              disabled={!change}
              onChange={changeHandler}
            />
          </li>

          <li className="inputItem">
            <label htmlFor="carrirerPhone">
              Телефон перевозчика
            </label>
            <input
              className="input"
              type="text"
              name="carrirerPhone"
              id="carrirerPhone"
              value={form.carrirerPhone}
              disabled={!change}
              onChange={changeHandler}
            />
          </li>

          <li className="inputItem">
            <label htmlFor="ati">
              ATI код сети перевозчика
            </label>
            <input
              className="input"
              type="text" name="ati"
              id="ati" value={form.ati}
              disabled={!change}
              onChange={changeHandler}
            />
          </li>

          <li className="inputItem">
            <label htmlFor="comment">
              Комментарий
            </label>
            <textarea
              className="input"
              id="comment"
              name="comment"
              value={form.comment}
              disabled={!change}
              onChange={changeHandler}
            />
          </li>
        </ul>

        <div>
          <button className="btn btn--lg" disabled={change} onClick={activeChangeHandler}>
            Изменить заявку
          </button>
          <button className="btn btn--lg" type="button" disabled={!change} onClick={changeApplicationHandler}>
            Сохранить
          </button>
        </div>
      </form>
    </div>
  )
}
