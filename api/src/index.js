const express = require("express");
const cors = require("cors");

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('db.json');
const db = low(adapter);
  
db.defaults({items : []}).write();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

function sortCompleted(x){
    x.sort((a, b) => Number(a.completed) - Number(b.completed));
}

app.get('/get', (req, res) => {
    const items = db.get("items").value();
    sortCompleted(items);
    return res.json({
        items
    });
});

app.post('/add', (req, res) => {
    const todo = req.body;
    
    db.get("items").push(todo).write();
    const items = db.get("items").value();
    sortCompleted(items);
    res.json({
        items
    });
});

app.delete('/delete/:id', (req,res) => {

    const id = req.params.id;

    const loopitems = db.get("items").value();
    for (const item of loopitems) { 
        if(item.id.toString() == id){
            db.get("items").remove({id:item.id}).write();
        }
    }

    const items = db.get("items").value();
    sortCompleted(items);
    res.json({
        items
    });
});

app.patch('/complete/:id', (req,res) => {

    const id = req.params.id;
    
    const loopitems = db.get("items").value();
    for (const item of loopitems) { 
        if(item.id.toString() == id){
            let completed = (item.completed == true)? false : true;
            db.get("items").find({ id: item.id }).assign({completed:completed}).write();
        }
    }
    
    const items = db.get("items").value();
    sortCompleted(items);
    res.json({
        items
    });
});

app.put('/update/:id/:name', (req,res) => {

    const id = req.params.id;
    const name = req.params.name;

    const loopitems = db.get("items").value();
    for (const item of loopitems) { 
        if(item.id.toString() == id){
            db.get("items").find({ id: item.id }).assign({name:name}).write();
        }
    }
    
    const items = db.get("items").value();
    sortCompleted(items);
    res.json({
        items
    });
});

  
const PORT = 3001;
  
app.listen(PORT, console.log(`Server started on port ${PORT}`));