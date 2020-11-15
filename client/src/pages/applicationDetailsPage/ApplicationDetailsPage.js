import {useCallback, useEffect, useState} from "react"
import {useParams} from "react-router-dom"
import {ApplicationDetailsForm} from "../../components/applicationDetailsForm/ApplicationDetailsForm"
import {useHttp} from "../../hooks/http.hook"

export const ApplicationDetailsPage = () => {
  const {request, loading} = useHttp()
  const number = useParams().id
  const [application, setApplication] = useState(null)

  const getApplication = useCallback(async () => {
    try {
      const data = await request(`/api/applications/${number}`, "GET", null)
      setApplication(data)
    } catch (e) {}
  }, [number, request])

  useEffect(() => {
    getApplication()
  }, [getApplication])

  return (
    <>
      {!loading && application && <ApplicationDetailsForm application={application} />}
    </>
  )
}
