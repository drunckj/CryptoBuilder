import React, { Suspense } from "react";

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";


import LoadingAnimation from "./components/animation/loadingAnimation";
import DashboardEntries from "./components/coindashboard";
import ViewDetail from "./components/viewDetail";
import IDO from "./components/IDO";
import NFTDashboardEntries from "./components/NFTdashboard"
import NFTdetail from "./components/NFTviewdetail"
var wallet={
  "wallet": sessionStorage.getItem('wallet')
}
var string="NFT"
const ConnectToWallet = React.lazy(() =>
  import("./components/connectToWallet")
);



const RoutesNavigation = () => {
  return (
    <Router>
      <Suspense
        fallback={
          <div>
            <LoadingAnimation />
          </div>
        }
      >
        <Routes>
          <Route exact path="/" element={<ConnectToWallet />} />
          <Route path="/coindetail" element={<ViewDetail />} />
          <Route exact path="/dashboard" element={<DashboardEntries data={wallet} state={true} />} />
          <Route exact path="/NFT" element={<ConnectToWallet data={string} state={true} />} />
          <Route exact path="/NFTdashboard" element={<NFTDashboardEntries data={wallet} state={true} />} />
          <Route exact path="/IDO" element={<IDO/>} />
          <Route path="/NFTdetail" element={<NFTdetail />} />
        
        </Routes>
      </Suspense>
    </Router>
  );
};

export default RoutesNavigation;
