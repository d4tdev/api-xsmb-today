const axios = require('axios');
const cheerio = require('cheerio');

// const url = 'https://xosoketqua.com/xsmb-xo-so-mien-bac.html';
const url = 'https://az24.vn/xsmb-sxmb-xo-so-mien-bac.html';

class MainController {
   getAll = async (req, res) => {
      const numbers = [];
      const names = [];
      const results = {};

      try {
         axios(url, {
            method: 'GET',
         })
            .then((response) => {
               const html = response.data;
               const $ = cheerio.load(html); // sử dụng giống jQuery

               $('table:nth-child(1)', html)
                  .first()
                  .each(function () {
                     $(this)
                        .find('td.v-giai > span ')
                        .each(function () {
                           numbers.push($(this).text());
                        });

                     $(this)
                        .find('tr > td:first-child')
                        .each(function (i) {
                           const name = $(this).text();
                           console.log(name);

                           if (!name.includes('Mã ĐB')) {
                              // for (let i = 0; i < names.length; i++) {
                              if (names.includes(name)) {
                                 return;
                              } else {
                                 names.push(name.split('.').join('_'));
                              }
                              // }
                           }
                        });
                  });
               numbers.splice(0, 1); // xóa phần tử đầu tiên
               if (numbers.length > 0) {
                  for (let i = 0; i < names.length; i++) {
                     results[names[0]] = [numbers[0]];
                     results[names[1]] = [numbers[1]];
                     results[names[2]] = [numbers[2], numbers[3]];
                     results[names[3]] = [
                        numbers[4],
                        numbers[5],
                        numbers[6],
                        numbers[7],
                        numbers[8],
                        numbers[9],
                     ];
                     results[names[4]] = [
                        numbers[10],
                        numbers[11],
                        numbers[12],
                        numbers[13],
                     ];
                     results[names[5]] = [
                        numbers[14],
                        numbers[15],
                        numbers[16],
                        numbers[17],
                        numbers[18],
                        numbers[19],
                     ];
                     results[names[6]] = [
                        numbers[20],
                        numbers[21],
                        numbers[22],
                     ];
                     results[names[7]] = [
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

               // times.push(time);
               //       console.log(time);
               //    });

               // if (times.length > 0) {
               //    times.forEach(time => {
               //       for (let i = 0; i < names.length; i++) {
               //          results[time] = [...names];
               //       }
               //    });
               // }
               const nowDay = new Date();
               const calendar =
                  nowDay.getDate() +
                  '/' +
                  (nowDay.getMonth() + 1 < 10
                     ? '0' + (nowDay.getMonth() + 1)
                     : nowDay.getMonth() + 1) +
                  '/' +
                  nowDay.getFullYear();
               // console.log(nowDay.getHours() + ':' + nowDay.getMinutes());
               // console.log(results);

               const date = $('.class-title-list-link', html)
                  .first()
                  .find('a:last-child')
                  .text()
                  .split(' ')[1];

               res.status(200).json({
                  countNumbers: numbers.length,
                  time: date,
                  results,
               });
            })
            .catch((err) => {
               console.log(err);
               return res.status(500).json({ msg: err });
            });
      } catch (e) {
         res.status(500).json({ msg: e });
      }
   };
   getById = async (req, res) => {};
}

module.exports = new MainController();
