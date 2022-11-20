const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
  
const items = [];

function sortCompleted(x){
    x.sort((a, b) => Number(a.completed) - Number(b.completed));
}

app.get('/get', (req, res) => {
    sortCompleted(items);
    res.json({
        items
    });
});

app.post('/add', (req, res) => {
    const todo = req.body;
    
    items.push(todo);
    sortCompleted(items);
    res.json({
        items
    });
});

app.delete('/delete/:id', (req,res) => {

    const id = req.params.id;

    for (const item of items) { 
        if(item.id.toString() == id){
            const itemRemove = items.indexOf(item);
            items.splice(itemRemove,1);
        }
    }
    
    sortCompleted(items);
    res.json({
        items
    });
});

app.patch('/complete/:id', (req,res) => {

    const id = req.params.id;
    
    for (const item of items) { 
        if(item.id.toString() == id){
            item.completed = (item.completed == true)? false : true;
        }
    }
    
    sortCompleted(items);
    res.json({
        items
    });
});

app.put('/update/:id/:name', (req,res) => {

    const id = req.params.id;
    const name = req.params.name;


    for (const item of items) { 
        if(item.id.toString() == id){
            item.name = name;
        }
    }
    
    sortCompleted(items);
    res.json({
        items
    });
});

  
const PORT = 3001;
  
app.listen(PORT, console.log(`Server started on port ${PORT}`));