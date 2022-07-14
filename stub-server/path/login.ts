import { Express } from 'express';

export const loginRoutes = (server: Express) => {

  server.get('/path', (req, res) => {
    let data = { 
      Name:'Aravind'
    };    
    
    res.json(data);
  });

  server.post('/path1', (req, res) => {
    let data ={  };     
    res.json(data);
  });


};
