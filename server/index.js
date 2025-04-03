const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql2/promise');
app.use(bodyParser.json());
const port = 8000;
const cors = require('cors');
app.use(cors());

let conn = null;

const validateData = (userData) => {
    let errors = [];
    if (!userData.firstname){
        errors.push('กรุณากรอกชื่อ')
    }
    if (!userData.lastname){
        errors.push('กรุณากรอกนามสกุล')
    }
    if (!userData.tel){
        errors.push('กรุณากรอกเบอร์โทรศัพท์')
    }
    if (!userData.email){
        errors.push('กรุณากรอกอีเมล')
    }
    if (!userData.type){
        errors.push('กรุณากรอกประเภทการรับส่ง')
    }
    if (userData.type !== 'รับเอง' && !userData.address) {
        errors.push('กรุณากรอกที่อยู่');
    }
    return errors;
}

const initMySQL = async () => {
    conn = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'webdb',
        port: 8840
    })
}
app.get('/register', async (req, res) =>{
    const results = await conn.query('SELECT * FROM register');
    res.json(results[0]);
});

app.get('/register/:id', async(req, res) => {
    try{
        let id = req.params.id;
        const results = await conn.query('SELECT * FROM register WHERE id = ?', id)
        if (results[0].length == 0) {
            throw {statusCode: 404, message: 'User not found'}
        }
        res.json(results[0][0])
    } catch (error) {
        console.error('errorMessage',error.message)
        let statusCode = error.statusCode || 500
        res.status(statusCode).json({
           message: 'something went wrong',
           errorMessage: error.message
        })
    }
})

app.post('/register', async (req, res) => {
    try {
        let user = req.body;
        const errors = validateData(user);
        if(errors.length > 0){
            throw {
                message: 'กรุณากรอกข้อมูลให้ครบถ้วน', 
                errors: errors
            }
        }
        const results = await conn.query('INSERT INTO register SET ?', user);
        console.log('results', results)
        res.json({
            message: 'User created',
            data: results[0]
        })
    } catch (error) {
        const errorMessage = error.message || 'something went wrong';
        const errors =error.errors || [];
        console.error('Error fetching users:', error.message)
        res.status(500).json({
            message: errorMessage,
            errors: errors
        })
    }
})

app.put('/register/:id', async (req, res) => { 
    try {
        let id = req.params.id;
        let updateUser = req.body;
        const result = await conn.query('UPDATE register SET ? WHERE id = ?', [updateUser, id])
        res.json({
            message: 'Updated user',
            data: result[0]
        })
    } catch (error) {
        console.log('Error creating user:', error.Message)
        res.status(500).json({
            message: 'Something went wrong',
            errorMessage: error.message
        })
    }
})

app.delete('/register/:id', async (req, res) => { 
    try {
        let id = req.params.id; 
        const result = await conn.query('DELETE FROM register WHERE id = ?', id)
        res.json({
            message: 'Deleted user',
            data: result[0]
        })
    } catch (error) {
        console.log('Error creating user:', error.Message) 
        res.status(500).json({ 
            message: 'Something went wrong',
            errorMessage: error.message
        })
    }
})

//PDF
//npm install express pdfkit fs
// การสร้าง PDF
const PDFDocument = require("pdfkit");
const path = require("path");
const fs = require("fs");

app.post("/export-pdf", async (req, res) => {
    try {
        // ดึงข้อมูลผู้ใช้จากฐานข้อมูล
        const [users] = await conn.query('SELECT * FROM register');
        
        // ตรวจสอบว่ามีข้อมูลผู้ใช้หรือไม่
        if (users.length === 0) {
            return res.status(400).json({ message: "ไม่มีข้อมูลผู้ใช้" });
        }

        // ตรวจสอบข้อมูลที่ดึงมาจากฐานข้อมูล
        console.log('Users:', users);

        // สร้าง PDF
        const doc = new PDFDocument();
        res.setHeader("Content-Disposition", 'attachment; filename="Users.pdf"');
        res.setHeader("Content-Type", "application/pdf");
        doc.pipe(res);

        // ตั้งค่าฟอนต์ไทย
        const fontPath = path.join(__dirname, '..', 'font', 'THSarabunNew.ttf');
        doc.font(fontPath);

        doc.fontSize(24).text("ข้อมูลผู้ใช้", { align: "center" }).moveDown();

        users.forEach((user, index) => {
            // เพิ่มข้อมูลใน PDF
            doc.fontSize(16).text(`คิวที่ ${index + 1}`, { underline: true });
        
            // เพิ่มข้อมูลต่างๆ โดยไม่ใช้ moveDown() บ่อยเกินไป
            doc.fontSize(14).text(`ID: ${user.id || 'N/A'}`);
            doc.text(`ชื่อ: ${user.firstname || 'N/A'}`);
            doc.text(`นามสกุล: ${user.lastname || 'N/A'}`);
            doc.text(`เบอร์โทรศัพท์: ${user.tel || 'N/A'}`);
            doc.text(`อีเมล: ${user.email || 'N/A'}`);
            doc.text(`ประเภท: ${user.type || 'N/A'}`);
            doc.text(`ที่อยู่: ${user.address || 'N/A'}`);
        
            // เพิ่ม moveDown() เฉพาะเมื่อจำเป็น
            if (index < users.length - 1) {
                doc.moveDown(0.5); // เลือกระยะห่างที่พอเหมาะ
            }
        });

        // จบการสร้าง PDF
        doc.end();
    } catch (error) {
        console.error('Error generating PDF:', error.message);
        res.status(500).json({ message: 'เกิดข้อผิดพลาดในการสร้าง PDF', errorMessage: error.message });
    }
});


app.listen(port, async (req, res) => {
    await initMySQL();
    console.log('Server is running on port', + port);
})