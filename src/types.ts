export interface Contract {
  id: string;
  name: string;
  number: string;
  company: string;
  type?: string;
  startDate: Date;  
  endDate: Date;   
  status: 'Active' | 'Disabled' | 'Paused';
  dateCreated?: Date;  
}
