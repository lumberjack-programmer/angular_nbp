export class Currency {
  // @ts-ignore
  table: string;
  // @ts-ignore
  no: string;
  // @ts-ignore
  tradingDate : Date;
  // @ts-ignore
  effectiveDate : Date;
  // @ts-ignore
  rates : [
    {
      currency: string;
      code: string;
      bid: number;
      ask: number;
    }
  ];
}


// [
//   {
//     "table": "C",
//     "no": "104/C/NBP/2022",
//     "tradingDate": "2022-05-30",
//     "effectiveDate": "2022-05-31",
//     "rates": [
//       {
//         "currency": "dolar amerykański",
//         "code": "USD",
//         "bid": 4.2094,
//         "ask": 4.2944
//       },
