import React, {useCallback, useEffect, useState} from "react"
import {ApplicationsTable} from "../../components/applicationsTable/ApplicationsTable"
import {CreateApplicationModal} from "../../components/createApplicantModal/CreateApplicationModal"
import {useHttp} from "../../hooks/http.hook"
import classes from "./ApplicationsPage.module.css"

export const ApplicationsPage = () => {
  const {request, loading} = useHttp()
  const [applications, setApplications] = useState([])
  const [searchValue, setSearchValue] = useState("")
  const [searchResult, setSearchResult] = useState([])

  const getApplications = useCallback(async () => {
    try {
      const data = await request("api/applications", "GET", null)
      setApplications(data)
    } catch (e) {}
  }, [request])

  useEffect(() => {
    getApplications()
  }, [getApplications])

  const [openModal, setOpenModal] = useState(false)

  const openModalHandler = () => {
    setOpenModal(true)
  }
  const closeModalHandler = () => {
    setOpenModal(false)
  }

  const deleteApplicationHandler = async (applicationNumber) => {
    try {
        await request(`/api/applications/delete/${applicationNumber}`, "DELETE", null)
      } catch (e) {}
      setApplications(applications.filter((application) => application.appNumber !== applicationNumber))
  }

  const renderResult = useCallback(() => {
      setSearchResult(applications.filter(item => String(item.appNumber).includes(searchValue)))
  }, [applications, searchValue])

  useEffect(() => {
    renderResult()
  }, [renderResult])

  return (
    <React.Fragment>
      <div className={classes.wrapper}>
        <div className={classes.inputTip}>
          <input
            className="input"
            type="text"
            placeholder="Введите значение..."
            value={searchValue}
            onChange={(event) => setSearchValue(event.target.value)}
          />
        </div>

        <button className="btn btn--lg" type="button" onClick={() => openModalHandler()}>
          Создать заявку
        </button>
      </div>

      {
        !loading && applications &&
        (<ApplicationsTable applications={searchResult} deleteHandler={deleteApplicationHandler} />)
      }

      {
        openModal
        ?
        <CreateApplicationModal closeHandler={closeModalHandler} getApplications={getApplications} />
        :
        null
      }
    </React.Fragment>
  )
}
