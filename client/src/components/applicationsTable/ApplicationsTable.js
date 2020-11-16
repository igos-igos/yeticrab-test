import {Link} from "react-router-dom"
import classes from "./ApplicationsTable.module.css"

export const ApplicationsTable = ({applications, deleteHandler}) => {
  const formatDate = (date) => `${date.slice(0, 10)} ${date.slice(11, 16)}`

  return applications.length ? (
    <table className={classes.table}>
      <thead>
        <tr>
          <th className={classes.titleCell}>Номер заявки</th>
          <th className={classes.titleCell}>Дата получения заявки</th>
          <th className={classes.titleCell}>Название фирмы клиента</th>
          <th className={classes.titleCell}>ФИО перевозчика</th>
          <th className={classes.titleCell}>Телефон перевозчика</th>
          <th className={classes.titleCell}>ATI</th>
          <th className={classes.titleCell}></th>
        </tr>
      </thead>
      <tbody>
        {applications.map((application) => (
          <tr key={application.appNumber} className={classes.row}>
            <td>{application.appNumber}</td>
            <td>{formatDate(application.date)}</td>
            <td>{application.clientOrganizationName}</td>
            <td>{application.carrierName}</td>
            <td>
              <a
                href={`tel:+${application.carrirerPhone}`}
              >
                {application.carrirerPhone}
              </a>
            </td>
            <td>
              <a
                target="_blanc" rel="noreferrer"
                href={`https://ati.su/firms/${application.ati}/info`}
              >
                {application.ati}
              </a>
            </td>
            <td>
              <Link
                className={classes.openLink}
                to={`/application/${application.appNumber}`}
              >
                Открыть
              </Link>

              <button
                onClick={() => deleteHandler(application.appNumber)}
                className={classes.btn}
              >
                Удалить
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  ) : (
    <p>Заявок нет.</p>
  )
}
