import logo from './logo.svg';

import './App.scss';
import BottomNav from './components/BottomNav';

import { connect } from "react-redux";
import { setPage, setUser } from "./redux/main";
import LandingPage from "./components/LandingPage"
import SearchPage from "./components/SearchPage";
import CartPage from './components/CartPage';
import BuyerHomePage from './components/BuyerHome';
import UserInsights from './components/UserInsights';
import InventoryPage from './components/InventoryPage';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Button from '@material-ui/core/Button';

function App(props) {
  const backButtonMapping = {3:1, 4:1, 5:1, 8:7, 7:1, 9:7}

  const debug = () => {
    console.log(Object.keys(backButtonMapping))
    console.log(props.page)
    console.log(Object.keys(backButtonMapping).includes(props.page))
    return null;
  }
  return (
    <div className="App"> 
    {props.page !=1? 
      <div id="header"> 
      {Object.keys(backButtonMapping).includes(""+props.page)? 
        <Button id="back-button" onClick={()=> {props.setPage(backButtonMapping[props.page])}}>
          <ArrowBackIcon/>
        </Button> : debug()}
        <div id="header-text">Agrio</div> 
      </div> : null}
    
    {props.page === 1? 
    <LandingPage setPage={props.setPage} /> :
      props.page == 4?
    <SearchPage/> : 
      props.page == 5?
      <CartPage /> : 
      props.page == 7?
    <BuyerHomePage /> : 
      props.page == 8? 
    <UserInsights /> :
      props.page == 9?
      <InventoryPage/>: null
    } 
    {![1,7,8,9].includes(props.page)? 
      <div id="bottom-nav">
        <BottomNav></BottomNav>
      </div> : null}
    </div>
  );
}

const mapStateToProps = (state) => ({
  user : state.user,
  page : state.page,
});

const mapDispatchToProps = {
  setUser,
  setPage
};

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);
export default AppContainer;
