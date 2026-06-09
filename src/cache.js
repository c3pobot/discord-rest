import { MongoCacheShared } from 'mongo-cache'

MongoCacheShared.connect('mongodb://mongo-data-rs2.datastore.svc.cluster.local?replicaSet=rs2&ssl=false&compressors=snappy&retryReads=true&retryWrites=true')

const NAME_SPACE = process.env.NAME_SPACE || 'default'
export const swgohCache = new MongoCacheShared.client({
  db_name: `swgoh_${NAME_SPACE}`
})
