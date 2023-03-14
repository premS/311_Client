import { AgGridReact } from "ag-grid-react";

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

/**
 * 
 * @param props rowData => Table data with total cases grouped by neighborhood, top 2K records, columnDefs => Column field name
 * @returns a Ag grid powered table for 311 cases, filtered by neighborhood
 */
export function Table(props: any) {
    return (
    <div className="ag-theme-alpine" style={{padding: "24px", height: 400, width: "90vw"}}>
        <label>311 Cases(Filtered by above dropdown, column filters/sorting, limited to 2K records)</label>
        <AgGridReact
            defaultColDef={{
             filter: true,
             resizable: true,
             sortable: true
            }}
            rowData={props.rowData}
            overlayLoadingTemplate={
             '<span class="ag-overlay-loading-center">Please wait while your rows are loading</span>'
            }
            columnDefs={props.columnDefs}
         >
        </AgGridReact>
    </div>
    );
}