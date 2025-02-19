import { Contract } from "./types";

export const contractsData: Contract[] = [
    {
      id: '1',
      name: 'West Electrical', 
      number: 'C0222XDSB000001', 
      company: 'West',
      type: 'Project', 
      startDate: '4-Mar-2021',
      endDate: '3-Oct-2024',
      status: 'Active',
    },
    {
      id: '2',
      name: 'Construction',
      number: 'CH000002', 
      company: 'ATHear Contracting',
      type: 'Recurring', 
      startDate: '9-Aug-2020',
      endDate: '5-Feb-2021',
      status: 'Disabled',
    },
    {
      id: '3',
      name: 'Small Contract', 
      number: 'CH000003', 
      company: 'Jacobs',
      type: 'Recurring', 
      startDate: '17-May-2021',
      endDate: '26-Oct-2022',
      status: 'Paused',
    },
    
    // ....
  ];