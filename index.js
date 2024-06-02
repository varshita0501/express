import express from 'express'
const app = express()
const port = 3000

// app.get('/' , (req,res)=>{
//     res.send("Hello World")
// })

// app.get('/varsh' , (req,res)=>{
//     res.send("Hello World from varsh")
// })
// app.get('/twitter' , (req,res)=>{
//     res.send("varshita_yerva")
// })

let teaData =[]
let nextId = 1
app.use(express.json()) // middleware to handle the req and res objects

// add a new tea

app.post('/teas', (req,res)=>{
    const {name, price}= req.body
    const newTea={id:nextId++,name,price}
    teaData.push(newTea)
    res.status(201).send(newTea)

})
// get all tea

app.get('/teas',(req,res)=>{
    res.status(200).send(teaData)
})
// get a tea with id
app.get('/teas/:id',(req,res)=>{
   const tea = teaData.find(t=> t.id === parseInt(req.params.id))
    if(!tea){
        return res.send(404).send('Tea Not found')
    }
    res.status(200).send(tea)
})

//update tea

app.put('/teas/:id', (req,res)=>{
    const teaId= req.params.id 
    const tea = teaData.find(t=> t.id === parseInt(req.params.id))
    if(!tea){
        return res.send(404).send('Tea Not found')
    }
    const{name,price}=req.body
    tea.name = name
    tea.price = price
    res.send(200).send(tea)
    
})

// delete tea
app.delete('/teas/:id', (req,res)=>{
    const index=teaData.findIndex(t => t.id ===parseInt(req.params.id))
    if(index===-1){
        return res.status(404).send("tea not found")

    }
    teaData.splice(index,1)
    return res.status(204).send("Deleted")
})



app.listen(port, () => {
    console.log(`Server is running at port : ${port}`)
})
