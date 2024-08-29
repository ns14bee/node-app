import { Router } from "express";
import { asyncExample } from "../examples/promises";

const router =  Router();

router.get('/async', async (req, res) => {
  try{
    
    const data = await asyncExample();
    console.log(data)
    res.send(data)
  }catch(err){
  res.send(err)
}
})

export default router;