Table component
accepts array of objects as data where keys are mapped as header and data maps accrodingly

```jsx
import ReactDataTable from './ReactDataTable';

const data = [
            {
                date: '29-04-2019',
                customerName: 'John',
                stage: 'Approved',
            },
            {
                date: '9-04-2019',
                customerName: 'Adam',
                stage: 'InProgress',
            },
            {
                date: '15-04-2019',
                customerName: 'Robin',
                stage: 'Declined',
            },
        ];

<ReactDataTable data={data}/>
```
Adjusting column width based on accessor values and using properties like minWidth, maxWidth, width
```jsx
import ReactDataTable from './ReactDataTable';

const data = [
            {
                date: '29-04-2019',
                customerName: 'John',
                stage: 'Approved',
            },
            {
                date: '9-04-2019',
                customerName: 'Adam',
                stage: 'InProgress',
            },
            {
                date: '15-04-2019',
                customerName: 'Robin',
                stage: 'Declined',
            },
        ];

<ReactDataTable data={data} columnOverride={[
                {
                    accessor: 'date',
                    width: 60,
                },
                {
                    accessor: 'customerName',
                    minWidth: 50,
                },
                {
                    accessor: 'stage',
                    minWidth: 100,
                },
            ]}/>
```

Table with empty header
Empty header needs to be passed if no header required
```jsx
import ReactDataTable from './ReactDataTable';

const EmptyHeader = props => null;
const data = [
            {
                date: '29-04-2019',
                customerName: 'John',
                stage: 'Approved',
            },
            {
                date: '9-04-2019',
                customerName: 'Adam',
                stage: 'InProgress',
            },
            {
                date: '15-04-2019',
                customerName: 'Robin',
                stage: 'Declined',
            },
        ];

<ReactDataTable data={data} TheadComponent={EmptyHeader}/>
```


Table with customised CSS
The below example shows how a tr properties can be customised.
Similarly changes canbe done to Th, Td, TrGroup etc.
Please read the official documentation.
https://github.com/tannerlinsley/react-table/tree/v6
```jsx
import ReactDataTable from './ReactDataTable';
import styled from 'styled-components';

const EmptyHeader = props => null;
const data = [
            {
                date: '29-04-2019',
                customerName: 'John',
                stage: 'Approved',
            },
            {
                date: '9-04-2019',
                customerName: 'Adam',
                stage: 'InProgress',
            },
            {
                date: '15-04-2019',
                customerName: 'Robin',
                stage: 'Declined',
            },
        ];

        const ReactTableClasses = {
    TrClass: "managedata-tr",
    TheadClass: "managedata-thead-tr",
};

const ReactDataTableExtended = styled(ReactDataTable)`
    .${ReactTableClasses.TrClass} {
        border-bottom: none;
        padding-top: 16px;
        background-color: green;
    }
`;

<ReactDataTableExtended data={data} getTrProps={(state, rowInfo, column) => ({
                            className: ReactTableClasses.TrClass,
                        })}/>
```