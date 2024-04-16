import moment from "moment";

console.log(moment('11AM 04/17/2024 +0000', 'hA MM/DD/YYYY Z').toDate().getTime())

console.log(moment(1713322800000).toDate().getTime())
