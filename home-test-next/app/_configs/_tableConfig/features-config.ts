
import { AllCommunityModule, RowSelectionModule, ModuleRegistry, type GridOptions } from 'ag-grid-community';


import { AllEnterpriseModule } from 'ag-grid-enterprise';
import { SetFilterModule } from 'ag-grid-enterprise';
import {agGridLocaleFr} from "@/app/_Configs/_tableConfig/languageConfig";
ModuleRegistry.registerModules([AllCommunityModule,AllEnterpriseModule,SetFilterModule, RowSelectionModule]);

export const agGridBaseOptions: GridOptions = {
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
