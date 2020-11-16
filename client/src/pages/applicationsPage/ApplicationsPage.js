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
      setSearchResult(data)
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
    setApplications(applications.filter((application) => application.appNumber !== applicationNumber))
    try {
      await request(`/api/applications/delete/${applicationNumber}`, "DELETE", null)
    } catch (e) {}
  }

  const renderResult = (event, arr, query) => {
    if (event.key === 'Enter') {
      const result = arr.filter(item => String(item.appNumber).includes(query))
      setSearchResult(result)
    }
  }

  return (
    <React.Fragment>
      <div className={classes.wrapper}>
        <div className={classes.inputTip}>
          <input
            className={classes.searchInput}
            type="text"
            placeholder="Поиск"
            value={searchValue}
            onChange={(event) => setSearchValue(event.target.value)}
            onKeyPress={(event) => renderResult(event, applications, searchValue)}
          />
        </div>

        <button className={classes.createBtn} type="button" onClick={() => openModalHandler()}>
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
