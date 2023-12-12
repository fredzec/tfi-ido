import moment from "moment";

console.log(moment('8PM 03/15/2022 +0000', 'hA MM/DD/YYYY Z').toDate().getTime())

console.log(moment(1702351659000).toDate().getTime())
