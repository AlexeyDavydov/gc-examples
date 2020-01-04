import React, { Component } from 'react';
import GC from '@grapecity/spread-sheets';
import { SpreadSheets } from '@grapecity/spread-sheets-react';
import '@grapecity/spread-sheets/styles/gc.spread.sheets.excel2013white.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.spreadBackColor = 'aliceblue';
    this.sheetName = 'Goods List';
    this.hostStyle = { width: '800px', height: '600px' };
    this.columnWidth = 100;
  }


  workbookInit = (spread) => {
    this.setState({
        spread: spread
    });

    this.initData(spread);
  }

  initData(spread) {
    var spreadNS = GC.Spread.Sheets;
    const sheet = spread.getSheet(0);

    const source = [
      { Course: "Calculus", Term: 1, Credit: 5, Score: 80, Teacher: "Nancy.Feehafer" },
      { Course: "P.E.", Term: 1, Credit: 3.5, Score: 85, Teacher: "Andrew.Cencini" },
      { Course: "Political Economics", Term: 1, Credit: 3.5, Score: 95, Teacher: "Jan.Kotas" },
      { Course: "Basic of Computer", Term: 1, Credit: 2, Score: 85, Teacher: "Steven.Thorpe" },
      { Course: "Micro-Economics", Term: 1, Credit: 4, Score: 62, Teacher: "Jan.Kotas" },
      { Course: "Linear Algebra", Term: '', Credit: '', Score: '', Teacher: "" },
      { Course: "Accounting", Term: '', Credit: '', Score: '', Teacher: "" },
      { Course: "Statistics", Term: '', Credit: '', Score: '', Teacher: "" },
      { Course: "Marketing", Term: '', Credit: '', Score: '', Teacher: "" }
    ];
    spread.suspendPaint();
    const table = sheet.tables.addFromDataSource("Table1", 2, 1, source, spreadNS.Tables.TableThemes.medium2);
    sheet.bind(GC.Spread.Sheets.Events.EditEnded, () => {
      console.log(table.getDirtyRows())
    })
    sheet.setColumnWidth(0, 20);
    sheet.setColumnWidth(1, 130);
    sheet.setColumnWidth(2, 70);
    sheet.setColumnWidth(3, 70);
    sheet.setColumnWidth(4, 70);
    sheet.setColumnWidth(5, 100);
    spread.resumePaint();
  }

  render() {
    return <SpreadSheets backColor={this.spreadBackColor} hostStyle={this.hostStyle} workbookInitialized={this.workbookInit}/>
  }
}
export default App;