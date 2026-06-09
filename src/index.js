import log from './logger.js'

import express from 'express'
import bodyParser from 'body-parser'
import compression from 'compression'

import * as Cmds from './discord_rest.js'
import './check_update_cmd.js'

const app = express()
app.use(bodyParser.json({
  limit: '1000MB',
  verify: (req, res, buf)=>{
    req.rawBody = buf.toString()
  }
}))
app.use(compression())
app.get('/healthz', (req, res)=>{
  res.sendStatus(200)
})

const server = app.listen(process.env.PORT || 3000, ()=>{
  log.info(`listening on port ${server.address().port}`)
});

app.use('/cmds/:guildId', async(req, res)=>{
  try{
    let guildId = req?.params?.guildId
    if(!guildId) res.status(400).json({ message: `guildId not provided` })
    let d
    if(guildId == 'global'){
      d = await Cmds.globalCmds(req.body, req.method)
    }else{
      d = await Cmds.guildCmds(guildId, req.body, req.method)
    }
    if(d?.status){
      if(d.data) return res.status(d.status).json(d.data)
      return res.status(d.status).json(d)
    }else{
      return res.status(400).json({ message: 'unknown error occured'})
    }
  }catch(e){
    log.error(e)
  }
})
app.use('/guild/:guildId', async(req, res)=>{
  try{
    let guildId = req?.params?.guildId
    if(!guildId) res.status(400).json({ message: `guildId not provided` })
    let d = await Cmds.guild(guildId, req.body, req.method)
    if(d?.status){
      if(d.data) return res.status(d.status).json(d.data)
      return res.status(d.status).json(d)
    }else{
      return res.status(400).json({ message: 'unknown error occured'})
    }
  }catch(e){
    log.error(e)
  }
})
app.use('/user/:userId', async(req, res)=>{
  try{
    let userId = req?.params?.userId
    if(!userId) res.status(400).json({ message: `guildId not provided` })
    let d = await Cmds.user(userId, req.body, req.method)
    if(d?.status){
      if(d.data) return res.status(d.status).json(d.data)
      return res.status(d.status).json(d)
    }else{
      return res.status(400).json({ message: 'unknown error occured'})
    }
  }catch(e){
    log.error(e)
  }
})
