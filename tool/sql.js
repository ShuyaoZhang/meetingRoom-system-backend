//sql.js
// SQL语句封裝
var page = {
  // 用户
  userSelect: 'select * from user where username=?',
  userInsert: 'insert into user(username,password,role,created_at,updated_at) values(?,?,?,?,?)',
  userList: "select id,username,role,DATE_FORMAT(created_at,'%Y-%m-%d %H:%i:%s') created_at,DATE_FORMAT(updated_at,'%Y-%m-%d %H:%i:%s') updated_at from user",
  userDelete:'delete from user WHERE id=?',
  userUpdate:'update user set role=?,updated_at=? WHERE id=?',

  // 会议室
  roomSelect:'select * from room',
  roomAdd:'insert into room(roomName,roomNum,roomLocation,projector,display,whiteboard,blackboard,building) values(?,?,?,?,?,?,?,?)',
  roomUpdate:'update room set roomName=?,roomNum=?,roomLocation=?,projector=?,display=?,whiteboard=?,blackboard=?,building=? where id=?',
  roomDelete:'delete from room WHERE id=?',
  roomSelectByCondition:"select id,roomName from room where roomNum >= ? and id not in (SELECT roomid FROM meeting WHERE UNIX_TIMESTAMP(CONCAT(?,' ',?)) < UNIX_TIMESTAMP(CONCAT(meetingdate,' ',endTime)) AND UNIX_TIMESTAMP(CONCAT(?,' ',?)) > UNIX_TIMESTAMP(CONCAT(meetingdate,' ',startTime)) AND (approveResult = 1 OR approveResult=0)) ",

  // 会议
  meetingSelect:"select meeting.*,DATE_FORMAT(meetingDate,'%Y-%m-%d') meetingDate, room.roomName,room.building,room.roomLocation, room.projector,room.display,room.whiteboard,room.blackboard,user.username as bookPerson,(SELECT t.username FROM USER t WHERE meeting.approvePersonId = t.id) approvePerson FROM meeting,room,USER WHERE meeting.roomId = room.id AND meeting.bookPersonId = user.id ",
  meetingBook:"insert into meeting(roomId,meetingNum,meetingTheme,meetingDate,startTime,endTime,approveResult) values(?,?,?,?,?,?,?)",
  meetingApprove:'update meeting set approveResult=?,rejectReason=?,approvePersonId=? where id=?',

};
module.exports = page;
