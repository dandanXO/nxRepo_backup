import {Route} from "react-router-dom";
import React from "react";

// NOTICE: empty view for new cms
export const RouteForNewCMSAdapter = () => {
  return (
    <Route key={'/cms'} path="/cms" render={() => <div></div>}/>
  )
}
