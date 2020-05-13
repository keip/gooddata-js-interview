// Copyright (C) 2007-2019, GoodData(R) Corporation. All rights reserved.

import React, { Component } from 'react';
import '@gooddata/react-components/styles/css/main.css';

import { ColumnChart } from '@gooddata/react-components';

const grossProfitMeasure = '/gdc/md/xms7ga4tf3g3nzucd8380o2bev8oeknp/obj/6877';
const dateAttributeInMonths = '/gdc/md/xms7ga4tf3g3nzucd8380o2bev8oeknp/obj/2142';
const dateAttribute = '/gdc/md/xms7ga4tf3g3nzucd8380o2bev8oeknp/obj/2180';

const MONTHS = [
    { id: 1, value: 'January' },
    { id: 2, value: 'February' },
    { id: 3, value: 'March' },
    { id: 4, value: 'April' },
    { id: 5, value: 'May' },
    { id: 6, value: 'June' },
    { id: 7, value: 'July' },
    { id: 8, value: 'August' },
    { id: 9, value: 'September' },
    { id: 10, value: 'October' },
    { id: 11, value: 'November' },
    { id: 12, value: 'December' }
];

const YEARS = [
    { id: 2015, value: '2015' },
    { id: 2016, value: '2016' },
    { id: 2017, value: '2017' },
];

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            year: 2016,
            month: 1
        }
    }

    getFilter() {
        return {
            absoluteDateFilter: {
                dataSet: {
                    uri: dateAttribute
                },
                from: `${this.state.year}-${("0" + this.state.month).slice(-2)}-01`,
                to: `${this.state.year}-${("0" + this.state.month).slice(-2)}-31`
            }
        }
    }

    getMeasures() {
        return [
            {
                measure: {
                    localIdentifier: 'm1',
                    definition: {
                        measureDefinition: {
                            item: {
                                uri: grossProfitMeasure
                            }
                        }
                    },
                    alias: '$ Gross Profit'
                }
            }
        ]
    }

    getViewBy() {
        return {
            visualizationAttribute:
            {
                displayForm: {
                    uri: dateAttributeInMonths
                },
                localIdentifier: 'a1'
            }
        }
    }

    onMonthChange(event) {
        this.setState({
            month: event.target.value
        });
    }

    onYearChange(event) {
        this.setState({
            year: event.target.value
        });
    }

    renderMonthDropdown() {
        return (
            <select defaultValue="1" onChange={event => this.onMonthChange(event)}>
                {MONTHS.map(item => <option key={item.id} value={item.id}>{item.value}</option>)}
            </select>
        )
    }

    renderYearDropdown() {
        return (
            <select defaultValue="2016" onChange={event => this.onYearChange(event)}>
                {YEARS.map(item => <option key={item.id} value={item.id}>{item.value}</option>)}
            </select>
        )
    }

    render() {
        const projectId = 'xms7ga4tf3g3nzucd8380o2bev8oeknp';
        const filters = [this.getFilter()];
        const measures = this.getMeasures();
        const viewBy = this.getViewBy();

        return (
            <div className="App">
                <h1>$ Gross Profit in month {this.renderMonthDropdown()} {this.renderYearDropdown()}</h1>
                <div>
                    <ColumnChart
                        measures={measures}
                        filters={filters}
                        projectId={projectId}
                    />
                </div>
                <h1>$ Gross Profit - All months</h1>
                <div>
                    <ColumnChart
                        measures={measures}
                        viewBy={viewBy}
                        projectId={projectId}
                    />
                </div>
            </div>
        );
    }
}

export default App;
