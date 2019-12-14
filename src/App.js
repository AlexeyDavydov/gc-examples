import React, { Component } from 'react';
import { SpreadSheets, Worksheet, Column } from '@grapecity/spread-sheets-react';
import '@grapecity/spread-sheets/styles/gc.spread.sheets.excel2013white.css';
import spreadExcel from '@grapecity/spread-excelio';
import saveAs from 'file-saver';
// import GC from '@grapecity/spread-sheets';
// const SpreadJSKey = "xxx";
// GC.Spread.Sheets.LicenseKey = SpreadJSKey;

class App extends Component {

  constructor(props) {
    super(props);
    this.spreadBackColor = 'aliceblue';
    this.sheetName = 'Goods List';
    this.hostStyle = { width: '800px', height: '600px' };
    this.columnWidth = 100;
  }

  exportFile = () => {
    
    let excelIO = new spreadExcel.IO();
    let fileName = 'exportFile.xlsx';
   
    var json = JSON.stringify(this.state.spread.toJSON());
    excelIO.save(json, (blob) => {
        saveAs(blob, fileName);
    }, (e) => {
        console.log(e);
    });
  };

  workbookInit = (spread) => {
    this.setState({
        spread: spread
    });
}

  render() {
    const data = [
      { Name: 'Apple', Category: 'Fruit', Price: 1, 'Shopping Place': 'Wal-Mart' },
      { Name: 'Potato', Category: 'Fruit', Price: 2.01, 'Shopping Place': 'Other' },
      { Name: 'Tomato', Category: 'Vegetable', Price: 3.21, 'Shopping Place': 'Other' },
      { Name: 'Sandwich', Category: 'Food', Price: 2, 'Shopping Place': 'Wal-Mart' },
      { Name: 'Hamburger', Category: 'Food', Price: 2, 'Shopping Place': 'Wal-Mart' },
      { Name: 'Grape', Category: 'Fruit', Price: 4, 'Shopping Place': 'Sun Store' }
    ];

    return (
      <div>
        <button onClick={this.exportFile}>Export</button>
        <SpreadSheets backColor={this.spreadBackColor} hostStyle={this.hostStyle} workbookInitialized={this.workbookInit}>
          <Worksheet name={this.sheetName} dataSource={data}>
            <Column 
              dataField='Name' 
              width={300}/>

            <Column 
              dataField='Category' 
              width={this.columnWidth}/>

            <Column 
              dataField='Price' 
              width={this.columnWidth}
              formatter="$#.00"/>

            <Column 
              dataField='Shopping Place' 
              width={this.columnWidth}/>
          </Worksheet>
        </SpreadSheets>
      </div>
    )
  }
}
export default App;