
import { AllCommunityModule, RowSelectionModule, ModuleRegistry } from 'ag-grid-community';
import {agGridLocaleFr} from "./language-config";

ModuleRegistry.registerModules([AllCommunityModule, RowSelectionModule]);

export const agGridBaseOptions = {
    pagination: true,
    suppressRowClickSelection: true,
    enableCellTextSelection: true,
    localeText: agGridLocaleFr,
    defaultColDef: {
        resizable: true,
        sortable: true,
        filter: 'agTextColumnFilter',
        filterParams: {
            maxNumConditions: 1
        }

    },

    paginationPageSize: 20,
    paginationPageSizeSelector: [5,20,50,100, 500],
};
