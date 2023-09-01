export{}
const express = require('express')
const cors = require('cors')
const mssql = require('mssql')


const app = express();
app.use(cors())
app.use(express.json())
const port = 8080;

const config = {
    user: 'anusuyajmd222', 
    password: 'Anusuya@jmd222',
    server: 'anusuya-jman.database.windows.net',
    database: 'anusuyatrainingdb',


}

const pool = new mssql.ConnectionPool(config)

interface Info {
    id : number,
    username : string ,
    email: string,
    password: string
}

class userData{
    async createTable(tableName) {
        try {
            await pool.connect()
            const checkTable = await this.tableExist(tableName)
            if(checkTable === false){
                const query:string = `Create Table ${tableName} (Id int primary key IDENTITY(1,1), Name varchar(30), Email varchar(50), Password varchar(50))`
                pool.request().query(query);
                console.log("table created")
            }     
        } catch (err) {
            console.log(err)
        };
    
    }
    
    async tableExist(tableName: string): Promise<boolean>{
        try{
            await pool.connect()
            const result = await pool.request().query(`SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = '${tableName}'`);
            // console.log(result);
            
            
            return result.recordset.length > 0; // Error may occur here
        }catch(err){
            console.log(err);
            return false;
        }
    }
    
    async userInput(tableName, userInfo:Info){
        try{
            await pool.connect()
            if(await this.tableExist(tableName)){
                const query = `INSERT INTO ${tableName}(Name , Email, Password) VALUES ('${userInfo.username}', '${userInfo.email}', '${userInfo.password}')`
                await pool.request().query(query);
            }
    
        }catch(err){
            console.log(err);
        }
    } 
}

const obj = new userData()
app.get('/signin', async(req, res) => {
    await pool.connect()

    // if (pool.connected) {
    //     console.log('Connected to the database');
    // }
    await obj.createTable("UsersData")
    
    res.send("Hello World")
})
app.post('/signup', async(req, res) => {
    const data = req.body
    if (data.username && data.email && data.password) {
        await obj.createTable("UsersData")
        await pool.connect()
        const existUserQuery = `SELECT * FROM UsersData WHERE Email = '${data.email}'`
        const userExistData = await pool.request().query(existUserQuery)
        console.log(userExistData.recordset.length);
        
            if (userExistData.recordset.length > 0) {
                res.json({message:"User already exist"});
            } else {
                await obj.userInput("UsersData",data).then(()=>{
                    res.json({message:"userCreated"})
                })        
            }
    } else {
        res.json({message:"All fields are required!"});
    }
    
})

app.post('/signin', async (req, res) => {
    const data = req.body;
    console.log(data.password);
    console.log(data.email);
    
    if (data.email && data.password) {
        try {
            await pool.connect();
            const userQuery = `SELECT * FROM UsersData WHERE Email = '${data.email}'`;
            const userData = await pool.request().query(userQuery);
            console.log(userData);
            
            
            if (userData.recordset.length > 0) {
                const user = userData.recordset[0];
                if (user.Password === data.password) {
                    console.log(user.Password,data.password);
                    
                    res.json({ message: "Sign-in successful" });
                } else {
                    res.json({ message: "Invalid credentials" });
                }
            } else {
                res.json({ message: "User not found" });
            }
        } catch (error) {
            console.error("Error during sign-in:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    } else {
        res.status(400).json({ message: "All fields are required" });
    }
});


app.post('/myprofile', async (req, res) => {
    const employeeEmail = req.params.email;
    
    try {
        await pool.connect();
        const employeeQuery = `SELECT * FROM Employees WHERE Email = ${employeeEmail}`;
        const employeeData = await pool.request().query(employeeQuery);
        
        if (employeeData.recordset.length !== 0) {
            const employee = employeeData.recordset[0];
            res.json(employee);
        } else {
            res.json({ message: "Employee not found" });
        }
    } catch (error) {
        console.error("Error fetching employee profile:", error);
        res.json({ message: "Internal server error" });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})