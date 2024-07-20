//server.js 문서 새로 작성
const express = require('express');
const cors = require('cors');
const mysql2 = require('mysql2');
const bodyParser = require('body-parser');
const { log } = require('console');


//서버생성
const app = express();
const PORT = process.env.PORT || 3000 ;
app.use(cors());
app.use(bodyParser.json());

//mysql서버연결 naver,127.0.0.1, root, 1234
const db = mysql2.createConnection({
    database : 'naver'  ,
    host : '127.0.0.1'  ,
    user : 'root'   ,
    password : '1234'  ,
    port : '3306'
});

db.connect((error)=>{
    if(!error){
        console.log('mysql연결성공');
        var dt = new Date();
        console.log(dt.toLocaleDateString());
        console.log(dt.toLocaleTimeString());
    }else{
        console.log('mysql연결실패');       
    }
});

app.listen(PORT, () => {
    console.log(`웹브라우저 실행 http://localhost:${PORT}`);
});

//전체출셕 select * from t_board order by id;
//t_board 테이블 app.get('/매핑', (req,res)=>{쿼리문기술});
app.get('/list.do', (req,res)=>{
    console.log('/list.do Test');
    const msg = "select * from t_board order by id";
    console.log(msg);
    db.query(msg,(err,data)=>{
        if(!err){
            res.send(data);
        }else{
            console.log('전체조회 실패');
        }
    });

});

//한건 등록 insert into t_board(필드명) values ('${값}');
//t_board 테이블 app.get('/매핑', (req,res)=>{쿼리문기술});
app.get('/insert.do', (req,res)=>{
    console.log('/insert.do Test');
    const title = 'winter';
    const content = 'snow';
    const name = 'park';

    const msg = `insert into t_board(title,content,name) values('${title}','${content}','${name}')`;
    console.log(msg);
    db.query(msg,(err,data)=>{
        if(!err){
            res.send(data);
        }else{
            console.log('한건 등록 실패');
        }
    });

});

//한건상세 select * from t_board where id=2;
//t_board 테이블 app.get('/매핑', (req,res)=>{쿼리문기술});
//app.get('detail.do/2', (req,res) => {console.log('/~.do test');});
app.get('/detail.do/:id', (req,res)=>{
    //console.log('/detail.do/:id Test');
    const id = req.params.id;
    const msg = `select * from t_board where id = ${id}`;
    console.log(msg);
    db.query(msg,(err,data)=>{
        if(!err){
            res.send(data);
            console.log('한건 조회 성공');
        }else{
            console.log('한건 조회 실패');
        }
    });

});

// 한건 삭제
app.get('/delete.do/:id', (req,res)=>{
    const id = req.params.id;
    const msg = `delete from t_board where id = ${id}`;
    console.log(msg);
    db.query(msg,(err,data)=>{
        if(!err){
            res.send(data);
            console.log('한건 삭제 성공');
        }else{
            console.log('한건 삭제 실패');
        }
    });

});

// 한건 수정
app.get('/update.do/:id', (req,res)=>{
    console.log('/update.do Test');
    const title = 'haha';
    const content = 'hihi';
    const name = 'hoho';
    const id = req.params.id;

    const msg = `update t_board set title = '${title}', content = '${content}', name ='${name}' where id = ${id}`;

    console.log(msg);
    db.query(msg,(err,data)=>{
        if(!err){
            res.send(data);
            console.log('한건 수정 성공');
        }else{
            console.log('한건 수정 실패');
        }
    });

});