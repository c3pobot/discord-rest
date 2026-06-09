import log from './logger.js'
import { REST, Routes } from 'discord.js'

export const discordRest = new REST().setToken(process.env.BOT_TOKEN)
const DISCORD_CLIENT_ID = process.env.DISCORD_CLIENT_ID

function reportError(e){
  if(e?.rawError){
    log.error(JSON.stringify(e.rawError))
    return {...e.rawError, status: e.status }
  }
  if(e?.message){
    log.error(e)
    return { status: 400, message: `${e.name} : ${e.message}` }
  }
  log.error(e)
}
export async function guildCmds(guildId, body, method = 'GET'){
  try{
    if(!guildId) return { status: 400, message: `guildId not provided` }
    let res = await discordRest[method.toLowerCase()](Routes.applicationGuildCommands(DISCORD_CLIENT_ID, guildId), body ? { body }: null)
    return { data: res, status: 200 }
  }catch(e){
    return reportError(e)
  }
}
export async function globalCmds(body, method = 'GET'){
  try{
    let res = await discordRest[method.toLowerCase()](Routes.applicationCommands(DISCORD_CLIENT_ID), body ? { body }: null)
    return { data: res, status: 200 }
  }catch(e){
    return reportError(e)
  }
}
export async function guild(guildId, body, method = "GET"){
  try{
    let res = await discordRest[method.toLowerCase()](Routes.guild(guildId), body ? { body }: null)
    return { data: res, status: 200 }
  }catch(e){
    return reportError(e)
  }
}
export async function user(userId, body, method = "GET"){
  try{
    let res = await discordRest[method.toLowerCase()](Routes.user(userId), body ? { body }: null)
    return { data: res, status: 200 }
  }catch(e){
    return reportError(e)
  }
}
