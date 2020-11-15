import {Switch, Route, Redirect} from "react-router-dom"
import { ApplicationDetailsPage } from "./pages/applicationDetailsPage/ApplicationDetailsPage"
import {ApplicationsPage} from "./pages/applicationsPage/ApplicationsPage"


export const Routes = () => {
  return (
    <Switch>
      <Route path="/applications" exact>
        <ApplicationsPage />
      </Route>
      <Route path="/application/:id">
        <ApplicationDetailsPage/>
      </Route>
      <Redirect to="/applications" />
    </Switch>
  )
}
