const express = require('express')
const BookRouter = express.Router()
const Book = require("../models/Book");

// 전체 도서 목록 조회
BookRouter.route('/').get( async (req, res) => {
    const books = await Book.find()
    console.log(books)
    res.json({status: 200, books})
})

// 특정 도서 조회
BookRouter.route('/:id').get( (req, res) => {
    Book.findById(req.params.id, (err, book) => {
        if(err) throw err;
        res.json({status:200, book})
    })
})

// 조회하는 API 테스트
BookRouter.route('/').post( (req, res) => {
    Book.findOne({ISBN: req.body.ISBN}, async(err, book) => { // 중복 체크
        if(err) throw err;
        if(!book){ // 데이터베이스에서 해당 도서를 조회하지 못한 경우
            const newBook = new Book(req.body);
            await newBook.save().then( () => {
                res.json({status:201, msg:'new book created in db !', newBook})
            })
        } else{
            const msg = 'this book already exists in db !'
            console.log(msg)
            res.json({status:204, msg})
        }
    })
})

// 특정 도서 변경
BookRouter.route('/:id').put( (req, res) => {
    // 데이터베이스 접속후 id 값으로 모델 조회하고 변경함
    Book.findByIdAndUpdate(req.params.id,req.body,{new:true},(err, book) =>{
        if(err) throw err;
        res.json({status:201,msg: `book ${req.params.id} updated in db !`, book})
    })
})

// 도서 삭제 delete
BookRouter.route('/:id').delete((req, res) => {
    Book.findByIdAndRemove(req.params.id, (err, book) => {
        if(err) throw err;
        res.json({status:204, msg:`book ${req.params.id} removed in db !`})
    })
})

module.exports = BookRouter;
