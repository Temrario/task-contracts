export interface Contract {
    id: string;
    name: string;
    number: string;
    company: string;
    type: 'Project' | 'Recurring' | 'Total';
    startDate: string;
    endDate: string;
    status: 'Active' | 'Disabled' | 'Paused';
  }
  
  

  