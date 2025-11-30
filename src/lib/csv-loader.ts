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
  website: string;
  total_schools: string;
  total_students: string;
  county: string;
  [key: string]: any;
}

export interface ContactRow {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  title: string;
  department: string;
  agency_id: string;
  [key: string]: any;
}

export interface MergedAgencyData extends AgencyRow {
  contacts: ContactRow[];
}

function readCsv<T>(filePath: string): Promise<T[]> {
  return new Promise((resolve, reject) => {
    const results: T[] = [];
    fs.createReadStream(filePath)
      .pipe(csv({
        mapHeaders: ({ header }: { header: string }) => header.trim() 
      }))
      .on('data', (data: T) => results.push(data))
      .on('end', () => resolve(results))
      .on('error', (error: Error) => reject(error));
  });
}

export async function loadAndMergeData(): Promise<MergedAgencyData[]> {
  try {
    const agenciesRaw = await readCsv<AgencyRow>(AGENCIES_FILE);
    const employeesRaw = await readCsv<ContactRow>(EMPLOYEES_FILE);

    if (employeesRaw.length > 0) {
      console.log("--- DEBUG CSV KEYS ---");
      console.log("First Contact Keys:", Object.keys(employeesRaw[0]));
      console.log("First Contact Data:", employeesRaw[0]);
      console.log("Looking for 'agency_id'...");
    }

    const employeesByAgencyId: Record<string, ContactRow[]> = {};
    
    employeesRaw.forEach(employee => {
      const agencyId = employee.agency_id?.trim(); 
      
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