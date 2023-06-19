const axios = require('axios');
const cheerio = require('cheerio');
require('dotenv').config();


const url = process.env.URL;

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

                           if (!name.includes('Mã ĐB')) {
                              // for (let i = 0; i < names.length; i++) {
                              if (names.includes(name)) {
                                 return;
                              } else {
                                 names.push(
                                    name
                                       .replace('Giải', 'G')
                                       .split(' ')
                                       .join('')
                                 );
                              }
                              // }
                           }
                        });
                  });
               numbers.splice(0, 1); // xóa phần tử đầu tiên
               if (numbers.length > 0) {
                  for (let i = 0; i < names.length; i++) {
                     results[names[0]] = [
                        numbers[0] ? numbers[0] : 'Đang cập nhật',
                     ];
                     results[names[1]] = [
                        numbers[1] ? numbers[1] : 'Đang cập nhật',
                     ];
                     results[names[2]] = [
                        numbers[2] ? numbers[2] : 'Đang cập nhật',
                        numbers[3] ? numbers[3] : 'Đang cập nhật',
                     ];
                     results[names[3]] = [
                        numbers[4] ? numbers[4] : 'Đang cập nhật',
                        numbers[5] ? numbers[5] : 'Đang cập nhật',
                        numbers[6] ? numbers[6] : 'Đang cập nhật',
                        numbers[7] ? numbers[7] : 'Đang cập nhật',
                        numbers[8] ? numbers[8] : 'Đang cập nhật',
                        numbers[9] ? numbers[9] : 'Đang cập nhật',
                     ];
                     results[names[4]] = [
                        numbers[10] ? numbers[10] : 'Đang cập nhật',
                        numbers[11] ? numbers[11] : 'Đang cập nhật',
                        numbers[12] ? numbers[12] : 'Đang cập nhật',
                        numbers[13] ? numbers[13] : 'Đang cập nhật',
                     ];
                     results[names[5]] = [
                        numbers[14] ? numbers[14] : 'Đang cập nhật',
                        numbers[15] ? numbers[15] : 'Đang cập nhật',
                        numbers[16] ? numbers[16] : 'Đang cập nhật',
                        numbers[17] ? numbers[17] : 'Đang cập nhật',
                        numbers[18] ? numbers[18] : 'Đang cập nhật',
                        numbers[19] ? numbers[19] : 'Đang cập nhật',
                     ];
                     results[names[6]] = [
                        numbers[20] ? numbers[20] : 'Đang cập nhật',
                        numbers[21] ? numbers[21] : 'Đang cập nhật',
                        numbers[22] ? numbers[22] : 'Đang cập nhật',
                     ];
                     results[names[7]] = [
                        numbers[23] ? numbers[23] : 'Đang cập nhật',
                        numbers[24] ? numbers[24] : 'Đang cập nhật',
                        numbers[25] ? numbers[25] : 'Đang cập nhật',
                        numbers[26] ? numbers[26] : 'Đang cập nhật',
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

               const date = $('div.tit-mien.clearfix.txt-center > div', html)
                  .first()
                  .find('a:last-child')
                  .text()
                  .split(' ')[2];

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
