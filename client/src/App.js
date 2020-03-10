import React, { Component } from "react";
import "./App.scss";
import "../src/components/treeStyles.css";
import { Switch, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import AuthService from "./components/auth/AuthService";
import axios from "axios";
import Footer from "./components/footer/Footer";
import {nestByMuseum} from "./nestData"
// import * as d3 from "d3";
// import "../treeStyles.css"
import Profile from "./components/profile/Profile";
import DetailPiece from "./components/detailPiece/DetailPiece";
import D3Test2 from "./components/D3Test/D3Test2";
import CollectionDetail from "./components/CollectionDetail/CollectionDetail";
var Loader = require('react-loader');


// d3.select(this.refs.myDiv).style(“background-color”, “blue”)
// render(<div ref=”myDiv”></div>)

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedInUser: null,
      search: "",
      resultsId: [],
      resultsDetail: [],
      tree: {},
      loaded: false
    };
    this.service = new AuthService();
    this.fetchUser();
  }

  getUser = userObj => {
    this.setState({
      loggedInUser: userObj
    });
  };
  logout = () => {
    this.service.logout().then(() => {
      this.setState({ loggedInUser: null });
    });
  };
  fetchUser() {
    return this.service
      .loggedin()
      .then(response => {
        this.setState({
          loggedInUser: response
        });
      })
      .catch(err => {
        this.setState({
          loggedInUser: false
        });
      });
  }

  // searchBar(e) {
  //   if (e.key === "Enter") {
  //     axios
  //       .get(
  //         `https://collectionapi.metmuseum.org/public/collection/v1/search?q=${e.target.value}`
  //       )
  //       .then(results => {
  //         results = results.data.objectIDs;
  //         if (results) {
  //           this.setState({ resultsId: results }, () => {
  //             this.getResultsDetail(0);
  //           });
  //         }
  //       });
  //   }
  // }

  searchMongo(e) {
    if (e.key === "Enter") {
      axios
        .get(`${process.env.REACT_APP_API_URL}/pieces/${e.target.value}`)
        .then(results => {
          results = results.data;
          if (results) {
            const filteredResults = results; //this.filterResults(results);
            console.log("results filteredResults", results, filteredResults);
            const tree = nestByMuseum(filteredResults);
            this.setState({ resultsDetail: filteredResults, tree: tree, loaded: true });
          }
        });
    }
  }
  // /////////////////////////////
  

  // getData(results) {
  //   let data = results.map(result => ({
  //     name: result.name,
  //     value: result.imageUrl
  //   }));
  //   this.setState({ resultsDetail: { children: data } });
  //   console.log("state", this.state.resultsDetail);
  // }

  render() {
    return (
      <React.Fragment>
        <div className="App">
          {/* <Loader loaded={this.state.loaded}> */}
          <D3Test2 data={this.state.tree}></D3Test2>
          {/* </Loader> */}
          <Navbar
            // searchBar={e => this.searchBar(e)}
            userInSession={this.state.loggedInUser}
            logout={this.logout}
            getUser={this.getUser}
          />
          <Switch>
            <Route
              path="/detail/:id"
              render={({ match }) => (
                <DetailPiece user={this.state.loggedInUser} match={match} />
              )}
            />
            <Route
              path="/collection/:id"
              render={({ match }) => (
                <CollectionDetail
                  user={this.state.loggedInUser}
                  match={match}
                />
              )}
            />
            {/* <Route  path="/" /> */}
            <Route
              // path="/profile/:id"
              path="/profile"
              render={props => (
                <Profile user={this.state.loggedInUser} {...props} />
              )}
            />
          </Switch>
          <Footer
            searchMongo={e => this.searchMongo(e)}
            tags={this.state.resultsDetail ? this.state.resultsDetail : []}
          ></Footer>
        </div>
        {/* <SimpleTreemapExample></SimpleTreemapExample> */}
      </React.Fragment>
    );
  }
}

export default App;
