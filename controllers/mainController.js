const axios = require('axios');
const cheerio = require('cheerio');

const url = 'https://xosoketqua.com/xsmb-xo-so-mien-bac.html';

class MainController {
   getAll = (req, res) => {
      const numbers = [];
      const names = [];
      const times = [];
      const objTimesNames = {};
      const obj = {};

      try {
         axios(url).then(response => {
            const html = response.data;
            const $ = cheerio.load(html); // sử dụng giống jQuery

            $('table', html)
               .first()
               .each(function () {
                  $(this)
                     .find('td > span.div-horizontal')
                     .each(function () {
                        numbers.push($(this).text());
                     });

                  // console.log(numbers);
                  $(this)
                     .find('tr > td:first-child')
                     .each(function (i) {
                        const name = $(this).text();

                        if (name !== 'Mã ĐB') {
                           // for (let i = 0; i < names.length; i++) {
                           if (names.includes(name)) {
                              return;
                           } else {
                              names.push(name);
                           }
                           // }
                        }
                     });
               });
            if (numbers.length > 0) {
               for (let i = 0; i < names.length; i++) {
                  objTimesNames[names[0]] = numbers[0];
                  objTimesNames[names[1]] = numbers[1];
                  objTimesNames[names[2]] = [numbers[2], numbers[3]];
                  objTimesNames[names[3]] = [
                     numbers[4],
                     numbers[5],
                     numbers[6],
                     numbers[7],
                     numbers[8],
                     numbers[9],
                  ];
                  objTimesNames[names[4]] = [
                     numbers[10],
                     numbers[11],
                     numbers[12],
                     numbers[13],
                  ];
                  objTimesNames[names[5]] = [
                     numbers[14],
                     numbers[15],
                     numbers[16],
                     numbers[17],
                     numbers[18],
                     numbers[19],
                  ];
                  objTimesNames[names[6]] = [
                     numbers[20],
                     numbers[21],
                     numbers[22],
                  ];
                  objTimesNames[names[7]] = [
                     numbers[23],
                     numbers[24],
                     numbers[25],
                     numbers[26],
                  ];
               }
            }

            // $('.list-link', html)
            //    .find('h2 > a:last-child')
            //    .each(function () {
            //       const time = $(this).prop('innerHTML').split(' ')[1];

            //       // times.push(time);
            //       console.log(time);
            //    });

            // if (times.length > 0) {
            //    times.forEach(time => {
            //       for (let i = 0; i < names.length; i++) {
            //          objTimesNames[time] = [...names];
            //       }
            //    });
            // }
            const nowDay = new Date();
            // console.log(nowDay.getDate() + '/' + ((nowDay.getMonth() + 1) < 10 ?  ('0'+ (nowDay.getMonth() + 1)) : (nowDay.getMonth() + 1)) + '/' + nowDay.getFullYear());
            // console.log(nowDay.getHours() + ':' + nowDay.getMinutes());
            // console.log(objTimesNames);
            res.status(200).json({
               countNumbers: numbers.length,
               time: nowDay,
               objTimesNames,
            });
         });
      } catch (e) {
         res.status(500).json({ msg: e });
      }
   };
   getById = async (req, res) => {};
}

module.exports = new MainController();
