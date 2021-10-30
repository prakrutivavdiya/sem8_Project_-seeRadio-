import './App.css';
import CampaignDetailPage from './containers/CampaignDetailPage';
import Dashboard from './containers/Dashboard';
import Login from './containers/Login';
import MultiStepForm from './containers/Order/MultiStepForm';
import ChangePassword from './containers/ChangePassword';
import VideosInProduction from './containers/VideosInProduction/videosInProduction'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import axios from 'axios';
function App() {
  

  axios.defaults.baseURL = "http://localhost:3000/";
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path='/' exact component={Login} />
          <Route path='/dashboard' exact component={Dashboard} />
          <Route path='/order' exact component={MultiStepForm} />
          <Route path='/CampaignDetail' component={CampaignDetailPage} />
          <Route path='/videosInProduction' exact component={VideosInProduction} />
          <Route path='/changePassword' exact component={ChangePassword} />

          <Redirect to='/' />
        </Switch>
      </Router>

    </div>
  );
}

export default App;
