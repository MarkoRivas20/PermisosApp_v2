export interface User{
  uid?: string,
  username: string,
  job: string,
  role: string,
  firstName: string,
  lastName: string,
  document: string,
}

export interface Request {
  id?:                        string;
  tiObservation:             string | null;
  ip:                        string;
  computerName:              string;
  internetJustification:     string;
  email:                     string;
  typeComputer:              string;
  office:                    string;
  accessSystem:              string;
  uidUser:                   string;
  typeContract:              string;
  accessInternet:            string;
  applicantObservation:      string;
  job:                       string;
  document:                  string;
  accessSystemJustification: string;
  location:                  string;
  cellphone:                 number;
  systems:                   Systems;
  name:                      string;
  date:                      string;
  status:                    string;
}

export interface Systems {
  besterp: boolean;
}

