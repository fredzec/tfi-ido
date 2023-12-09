import React, { Fragment } from 'react'
import HomePage from './pages/homePage/index.js'
import ProjectsPage from './pages/projectsPage/index.js'
import DetailPage from './pages/detailPage/index.js'
import JoinDetailPage from './pages/joinDetailPage/index.js'
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom'
import GlobalStyle from "./style/Global";
import DetailPageTs from './pages/detailPage/DetailPage'
import JoinPage from "./pages/joinDetailPage/JoinPage";
import useEagerConnect from "./hooks/useEagerConnect";
import JoinPageV2 from "./pages/joinDetailPage/JoinPageV2";

function App() {
  useEagerConnect()
  return (
      <Fragment>
        <HashRouter>
          <GlobalStyle/>
          <Switch>
            <Route path="/projects" component={ProjectsPage}/>
            <Route path="/home" component={HomePage}/>
            <Route path="/detail" component={DetailPage}/>
            <Route path="/join" component={JoinDetailPage}/>
            <Route exact path="/" component={HomePage}/>
            <Route path="/:nameKey/detail" component={DetailPageTs} exact/>
            <Route path="/v1/:nameKey/join" component={JoinPage} exact/>
            <Route path="/v2/:nameKey/join" component={JoinPageV2} exact/>
            <Redirect to={"/home"}/>
          </Switch>
        </HashRouter>
      </Fragment>
  )
}

export default App
