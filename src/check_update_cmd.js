import log from './logger.js'
import { guildCmds } from './discord_rest.js'
import UPDATE_CMD from './update_cmd.json' with { type: 'json' };

const BOT_HELP_SERVER_ID = process.env.BOT_HELP_SERVER_ID, TEST_BOT = process.env.IS_TEST_BOT

async function checkUpdateCmd(){
  try{
    if(TEST_BOT) return log.info(`Skipping updatecmd check`)
    if(!BOT_HELP_SERVER_ID) return

    let res = await guildCmds(BOT_HELP_SERVER_ID, UPDATE_CMD)
    if(!res?.data) return log.error('Error checking for updatecmd...')
    let commandExists = res.data?.find(x=>x?.name == 'updatecmds')
    if(commandExists?.name == 'updatecmds') return log.info(`bot updatecmd exists`)

    let obj = await guildCmds(BOT_HELP_SERVER_ID, UPDATE_CMD, 'POST')
    if(obj?.data?.name == 'updatecmds') return log.info(`bot updatecmds added...`)
    log.error(`Error adding bot updatecmds...`)
  }catch(e){
    log.error(e)
  }
}
checkUpdateCmd()
