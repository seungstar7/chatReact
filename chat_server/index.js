const express = require("express");
const app = express();
const http = require("http");
const { Server } = require('socket.io');
const cors = require("cors");
//const moment = require("moment")
const mysql = require("mysql");

app.use(cors())

//Express 4.16.0버전 부터 body-parser의 일부 기능이 익스프레스에 내장 body-parser 연결 
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

const server = http.createServer(app)

const db = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "1234",
	database: "kakao",
	insecureAuth : true
});

/**
 * @path {POST} http://localhost:3001/joinuser/add
 * @description POST Method
 * 
 *  POST 데이터를 생성할 때 사용된다.
 *  req.body에 데이터를 담아서 보통 보낸다.
 */
app.post("/joinuser", (req, res) => {
	const { id, pw, nickname } = req.body
	console.log(id + pw + nickname)
	console.log("들어왔냔미아ㅓㅁㄴ;ㅣ어ㅏ미나어ㅣ")
	const sqlQuery = `INSERT INTO users ( id, pw, nickname, regdate ) VALUES ( '${id}', '${pw}', '${nickname}', now() )`;

	console.log(sqlQuery)
	db.query(sqlQuery,(err, result) => {
		console.log(err);
		res.send("success!");
	});
});

app.post("/messagein", (req, res) => {
	console.log(req.body)
	
	const { roomno, id, msg, msgtime } = req.body
	//console.log(room + author + message)
	
	const sqlQuery = `INSERT INTO talkroom (roomno , id, msg, msgtime ) VALUES ( '${roomno}', '${id}', '${msg}', '${msgtime}' )`;

	db.query(sqlQuery,(err, result) => {
		console.log(err);
		res.send(result);
	});
});

app.get('/myprofile/:id',(req, res) => {
	const paramsData = req.params.id
	const sqlQuery =  ` select * from users where id = '${paramsData}' `
	db.query(sqlQuery,(err, result) => {
		console.log(result)
		console.log(err)
		res.send(result)
	})
})

app.get("/joinroom", (req, res) => {
	const sqlQuery = "INSERT INTO talkroom () VALUES ()";
	db.query(sqlQuery,(err, result) => {
		console.log(err);
		res.send("success!");
	});
});
/*
app.get("/chatfriend/:id/:findId/:room", (req, res) => {
	const pramsData = req.params.findId
	const sqlQuery = `select * from users where id='${pramsData}' or nickname like'%${pramsData}%'`;
	db.query(sqlQuery,(err, result) => {
		console.log(err);
		res.send(result);
	});
});*/

app.get("/findfriend/:fid", (req, res) => {
	const pramsData = req.params.fid

	const sqlQuery = `select * from users where id='${pramsData}' or nickname like'%${pramsData}%'`;
	db.query(sqlQuery,(err, result) => {
		console.log(err);
		res.send(result);
	});
});

app.post("/createroom", (req, res) => {
	const { id, fid, talkroom } = req.body
	console.log(id + fid + talkroom );
	
	const sqlQuery = `update talkfriend set roomno='${talkroom}' where id='${id}' and fid='${fid}'`;
	db.query(sqlQuery,(err, result) => {
		console.log(err);
		if(result.affectedRows===1){
			const sqlQuery2 = `update talkfriend set roomno='${talkroom}' where id='${fid}'and fid='${id}'`
			db.query(sqlQuery2,(err, result) => {
				console.log(err);
				res.send(result);
			});
		}
	});
});

app.post("/updateprofile",(req, res) => {
	const { id, nickname, status_msg} = req.body;
	var sqlQuery;
	if(nickname==='' || nickname===null){
		sqlQuery = ` UPDATE users SET status_msg='${status_msg}' where id='${id}' `
	}else if (status_msg==='' || status_msg===null){
		sqlQuery = ` UPDATE users SET nickname='${nickname}' where id='${id}' `
	}else{
		sqlQuery = ` UPDATE users SET nickname='${nickname}', status_msg='${status_msg}' where id='${id}' `
	}
	db.query(sqlQuery,(err, result) => {
		console.log(result);
		console.log(err);
		res.send(result);
	});
});



app.post("/login", (req, res) => {
	const { id, pw } = req.body
	const sqlQuery = `select count(*) as cnt from users where id='${id}' and pw='${pw}'`;
	db.query(sqlQuery,(err, result) => {
		//console.log(result.data.cnt);
		//console.log(err);
		res.send(result);
	});
});

app.get("/getchat/:room", (req, res) => {
	const room = req.params.room
	console.log(room);
	
	const sqlQuery = ` select roomno, id, msg, msgtime, row_number() over(order by roomno desc) as num from talkroom  where roomno='${room}' `;
	db.query(sqlQuery,(err, result) => {
		console.log(err);
		console.log(result);
		res.send(result);
	});
});



app.get("/addfriend/:id/:findId", (req, res) => {
	const id = req.params.id
	const fid = req.params.findId
	const sqlQuery = ` INSERT INTO talkfriend (id, fid)  VALUES ('${id}', '${fid}') `;
	
	db.query(sqlQuery,(err, result) => {
		console.log(err);
		if(result.affectedRows===1){
			const sqlQuery2 = `INSERT INTO talkfriend (id, fid)  VALUES ('${fid}', '${id}')`
			db.query(sqlQuery2,(err, result) => {
				console.log(err);
				console.log(result.affectedRows);
				res.send("success");
			});
		}
	});
});

app.get("/getlist/:id", (req, res) => {
	const id = req.params.id
	const sqlQuery = ` select 
							u.id as fid,
							u.nickname,
							tf.roomno,
							u.status_msg
						from 
							users u join 
							talkfriend tf on u.id=tf.fid
						where tf.id='${id}' `;
	
	db.query(sqlQuery,(err, result) => {
		console.log(err);
		res.send(result);
	});
});


const io = new Server(server,{
	cors: {
		origin: "http://localhost:3000",
		methods: ["GET", "POST"]
	}
});

io.on("connection",(socket) =>{
	socket.on("join_room", (data)=> {
		socket.join(data);
		console.log(`User with ID : ${socket.id} Joined room : ${data}`)
	})

	socket.on("send_message",(data)=>{
		console.log(data.roomno)
        io.emit(data.roomno, data);
    });

	socket.on("disconnect", () => {
		console.log(`User Disconnented : ${socket.id}`)
	})
})

server.listen(3001, () =>{
	console.log("server is running ")
})