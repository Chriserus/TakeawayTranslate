import React, { FC } from 'react';
import { GoogleSpreadsheet, GoogleSpreadsheetRow } from 'google-spreadsheet';
import { Translation } from './App';

interface ReaderProps {
  translations: Translation[];
  setTranslations: (value: Translation[]) => void;
}

const Reader: FC<ReaderProps> = (props: ReaderProps) => {
  // Config variables
  const SPREADSHEET_ID = process.env.REACT_APP_SPREADSHEET_ID;
  const SHEET_ID = process.env.REACT_APP_SHEET_ID;
  const CLIENT_EMAIL = process.env.REACT_APP_GOOGLE_CLIENT_EMAIL;
  const PRIVATE_KEY = process.env.REACT_APP_GOOGLE_SERVICE_PRIVATE_KEY;

  const doc = new GoogleSpreadsheet(SPREADSHEET_ID);

  const getAllTranslations = async () => {
    if (!(SPREADSHEET_ID && SHEET_ID && CLIENT_EMAIL && PRIVATE_KEY)) {
      return;
    }
    try {
      await doc.useServiceAccountAuth({ client_email: CLIENT_EMAIL, private_key: PRIVATE_KEY });
      await doc.loadInfo();

      const sheet = doc.sheetsById[SHEET_ID];
      await sheet.getRows().then((rows: GoogleSpreadsheetRow[]) => {
        props.setTranslations(
          rows.map((row: GoogleSpreadsheetRow) => ({
            index: row.rowIndex,
            PL: row.PL,
            ENG: row.ENG,
          })),
        );
      });
    } finally {
    }
  };

  // const appendSpreadsheet = async (row: any) => {
  //   try {
  //     if (CLIENT_EMAIL && PRIVATE_KEY && SHEET_ID) {
  //       await doc.useServiceAccountAuth({
  //         client_email: CLIENT_EMAIL,
  //         private_key: PRIVATE_KEY,
  //       });
  //       // loads document properties and worksheets
  //       await doc.loadInfo();
  //
  //       const sheet = doc.sheetsById[SHEET_ID];
  //       const result = await sheet.addRow(row);
  //
  //       console.log(result);
  //       console.log(
  //         await sheet.getRows().then((rows) => {
  //           rows.map((row) => row.PL).forEach(console.log);
  //         }),
  //       );
  //     }
  //   } catch (e) {
  //     console.error('Error: ', e);
  //   }
  // };

  // const newRow = { ENG: 'HELLO WORLD', PL: 'WITAJ świeci' };

  // useEffect(() => {});
  return (
    <>
      <button onClick={getAllTranslations}>Click me</button>
      <table>
        <thead>
          <tr>
            <th>PL</th>
            <th>ENG</th>
          </tr>
        </thead>
        <tbody>
          {props.translations.map((translation) => {
            return (
              <tr key={translation.index}>
                <td>{translation.PL}</td>
                <td>{translation.ENG}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default Reader;
