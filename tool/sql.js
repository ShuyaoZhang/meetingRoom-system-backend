//sql.js
// SQL语句封裝
var page = {
  // 落地页
  pageSelect:"select id,page_key,name,title,main_img,DATE_FORMAT(create_time,'%Y-%m-%d %H:%i:%s') create_time,DATE_FORMAT(update_time,'%Y-%m-%d %H:%i:%s') update_time from landpages",
  pageSelectById:'select * from landpages WHERE id=?',
  pageSelectByKey:'select * from landpages WHERE page_key=?',
  pageInsert:'INSERT INTO landpages(page_key,name,title,apk_url,main_img,components,create_time,update_time) VALUES(?,?,?,?,?,?,?,?)',
  pageUpdate:'UPDATE landpages SET page_key=?,name=?,title=?,apk_url=?,main_img=?,components=?,update_time=? WHERE id=?',
  pageDelete:'DELETE FROM landpages WHERE id=?',

  // 上传
  upload:'INSERT INTO upload(url, upload_time) VALUES(?,?)',
};
module.exports = page;
