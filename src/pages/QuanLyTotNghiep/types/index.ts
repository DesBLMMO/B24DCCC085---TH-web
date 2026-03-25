export type FieldType = 'string' | 'number' | 'date';

export interface FieldConfig {
  id: string;
  fieldCode: string; 
  name: string;
  type: FieldType;
}

export interface Registry {
  id: string;
  name: string;
  year: number;
}

export interface Decision {
  id: string;
  registryId: string;
  decisionNumber: string;
  issueDate: string;
  summary: string;
  viewCount: number;
}

export interface Diploma {
  id: string;
  decisionId: string;
  registryId: string;
  soVaoSo: number;
  soHieu: string;
  studentId: string;
  fullName: string;
  dob: string;
  dynamicData: Record<string, string | number>;
}