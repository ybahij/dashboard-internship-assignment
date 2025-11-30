import * as fs from 'fs';
import path from 'path';
// @ts-ignore
import csv from 'csv-parser';

const AGENCIES_FILE = path.join(process.cwd(), 'src', 'data', 'agencies_agency_rows.csv');
const EMPLOYEES_FILE = path.join(process.cwd(), 'src', 'data', 'contacts_contact_rows.csv');

interface AgencyRow {
  id: string;
  name: string;
  state: string;
  state_code: string;
  type: string;
  population: string;
  website: string;
  total_schools: string;
  total_students: string;
  mailing_address: string;
  grade_span: string;
  locale: string;
  csa_cbsa: string;
  domain_name: string;
  physical_address: string;
  phone: string;
  status: string;
  student_teacher_ratio: string;
  county: string;
  created_at: string;
  updated_at: string;
}

export interface ContactRow {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  title: string;
  email_type: string;
  contact_form_url: string;
  created_at: string;
  updated_at: string;
  agency_id: string;
  firm_id: string;
  department: string;
}

export interface MergedAgencyData extends AgencyRow {
  contacts: ContactRow[];
}

function readCsv<T>(filePath: string): Promise<T[]> {
  return new Promise((resolve, reject) => {
    const results: T[] = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data: T) => results.push(data))
      .on('end', () => resolve(results))
      .on('error', (error: Error) => reject(error));
  });
}

export async function loadAndMergeData(): Promise<MergedAgencyData[]> {
  try {
    const agenciesRaw = await readCsv<AgencyRow>(AGENCIES_FILE);
    const employeesRaw = await readCsv<ContactRow>(EMPLOYEES_FILE);

    const employeesByAgencyId: Record<string, ContactRow[]> = {};
    employeesRaw.forEach(employee => {
      const agencyId = employee.agency_id;
      if (!agencyId) return;
      if (!employeesByAgencyId[agencyId]) {
        employeesByAgencyId[agencyId] = [];
      }
      employeesByAgencyId[agencyId].push(employee);
    });

    const mergedData: MergedAgencyData[] = agenciesRaw.map(agency => ({
      ...agency,
      contacts: employeesByAgencyId[agency.id] || []
    }));

    return mergedData;
  } catch (error) {
    console.error("Failed to load CSV data:", error);
    throw new Error("Could not load CSV files.");
  }
}