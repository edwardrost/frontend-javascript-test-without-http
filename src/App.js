import React, { Component } from 'react';
import SearchBox from './components/SearchBox';
import Table from './components/Table';
import minData from './components/minData';
import maxData from './components/maxData';
import './App.css';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      minDataSet: true,
      searchfield: ""
    };
    this.onDataChange = this.onDataChange.bind(this);
  }


  onDataChange() {    
    this.setState({
      minDataSet: !this.state.minDataSet
    })
  }

  onSearchChange = (event) => {
    this.setState({ searchfield: event.target.value });
  };

  render() {
    const { searchfield, minDataSet } = this.state;

    const robots = minDataSet ? minData : maxData;

    const buttonText = minDataSet ? 'Переключить на Большой ДатаСет' : 'Переключить на Малый ДатаСет';

    const filteredRobots = !searchfield
      ? robots
      : robots.filter((robot) => {
          return Object.values(robot)
            .slice(0, 5)
            .toString()
            .toLowerCase()
            .includes(searchfield.toLowerCase());
        });

    const data = filteredRobots;

    const columns = [
      {
        Header: "ID",
        accessor: "id",
      },
      {
        Header: "Имя",
        accessor: "firstName",
      },
      {
        Header: "Фамилия",
        accessor: "lastName",
      },
      {
        Header: "Эл.почта",
        accessor: "email",
      },
      {
        Header: "Телефон",
        accessor: "phone",
      },
    ];

    return (
      <div className="tc center">
        <h1 className="f1 lh-title">Frontend-Javascript-Test</h1>
        <button 
          className="w-30 bg-white ba ph3 pv2 dib br3 b--green"
          onClick={this.onDataChange}>{buttonText}</button>

        {robots &&
          <div className="tc center">
            <SearchBox searchChange={this.onSearchChange} />
            <Table columns={columns} data={data} />
          </div>
        }
      </div>
    );
  }
}

export default App;