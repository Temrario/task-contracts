import { Contract } from "./types";

export const contractsData: Contract[] = [
  {
    id: '1',
    name: 'West Electrical',
    number: 'C20220420-000001',
    company: 'Weir',
    type: 'Project',
    startDate: new Date('2021-03-04'),  // Перетворення рядка у формат Date
    endDate: new Date('2024-10-03'),    // Перетворення рядка у формат Date
    status: 'Active',
  },
  {
    id: '2',
    name: 'Construction',
    number: 'CH000002',
    company: 'Al Nasr Contracting',
    type: 'Recurring',
    startDate: new Date('2020-08-09'),
    endDate: new Date('2021-02-05'),
    status: 'Active',
  },
  {
    id: '3',
    name: 'Small Contract',
    number: 'CH000003',
    company: 'Jacobs',
    type: 'Recurring',
    startDate: new Date('2021-05-17'),
    endDate: new Date('2022-10-26'),
    status: 'Disabled',
  },
  {
    id: '4',
    name: 'Pixaera Test',
    number: 'CH000004',
    company: 'Pixaera',
    type: 'Trial',
    startDate: new Date('2022-10-06'),
    endDate: new Date('2024-12-15'),
    status: 'Paused',
  },
  {
    id: '5',
    name: 'Emerge 10 Years',
    number: 'CH000005',
    company: 'Emerge Education',
    type: 'Recurring',
    startDate: new Date('2021-06-27'),
    endDate: new Date('2022-05-07'),
    status: 'Active',
  },
  {
    id: '6',
    name: 'Large Aramco',
    number: 'CH000006',
    company: 'Aramco',
    type: 'Recurring',
    startDate: new Date('2021-02-05'),
    endDate: new Date('2021-04-24'),
    status: 'Disabled',
  },
  {
    id: '7',
    name: 'Temporary Contract',
    number: 'CH000007',
    company: 'Temporary',
    type: 'Project',
    startDate: new Date('2020-06-27'),
    endDate: new Date('2021-09-11'),
    status: 'Active',
  },
  {
    id: '8',
    name: 'Rio Tinto Test',
    number: 'CH000008',
    company: 'Rio Tinto',
    type: 'Trial',
    startDate: new Date('2020-11-26'),
    endDate: new Date('2021-05-13'),
    status: 'Active',
  },
  {
    id: '9',
    name: 'Shell Full',
    number: 'CH000009',
    company: 'Shell',
    type: 'Recurring',
    startDate: new Date('2020-07-09'),
    endDate: new Date('2020-10-12'),
    status: 'Disabled',
  },
  {
    id: '10',
    name: 'Shell Full',
    number: 'CH000009',
    company: 'Shell',
    type: 'Recurring',
    startDate: new Date('2020-07-09'),
    endDate: new Date('2020-10-12'),
    status: 'Disabled',
  },
  {
    id: '11',
    name: 'Shell Full',
    number: 'CH000009',
    company: 'Shell',
    type: 'Recurring',
    startDate: new Date('2020-07-09'),
    endDate: new Date('2020-10-12'),
    status: 'Disabled',
  },
  {
    id: '12',
    name: 'Shell Full',
    number: 'CH000009',
    company: 'Shell',
    type: 'Recurring',
    startDate: new Date('2020-07-09'),
    endDate: new Date('2020-10-12'),
    status: 'Disabled',
  },
  {
    id: '13',
    name: 'Shell Full',
    number: 'CH000009',
    company: 'Shell',
    type: 'Recurring',
    startDate: new Date('2020-07-09'),
    endDate: new Date('2020-10-12'),
    status: 'Disabled',
  },
  // .....
];
