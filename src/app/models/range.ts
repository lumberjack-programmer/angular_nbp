export class Range {
  // @ts-ignore
  table: string;
  // @ts-ignore
  currency: string;
  // @ts-ignore
  code: string;
  // @ts-ignore
  rates: [
    {
      no: string;
      effectiveDate: Date;
      bid: number;
      ask: number;
    }
  ];
}






//
// table": "C",
// "currency": "dolar amerykański",
//   "code": "USD",
//   "rates": [
//   {
//     "no": "001/C/NBP/2020",
//     "effectiveDate": "2020-01-02",
//     "bid": 3.7597,
//     "ask": 3.8357
//   },
