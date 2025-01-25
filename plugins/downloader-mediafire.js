import fetch from 'node-fetch';

let HS = async (m, { conn, text }) => {
if (!text) return conn.reply(m.chat, `🚩 Ingrese el enlace de un archivo de Mediafire.`, m, rcanal)

try {
let api = await fetch(`https://restapi.apibotwa.biz.id/api/mediafire?url=${text}`)
let json = await api.json()
let { filename, type, size, uploaded, ext, mimetype, download:dl_url } = json.data.response
m.reply(`*${filename}*

✩  *Tipo* : ${type}
✩ *Tamaño* : ${size}
✩ *Creado* : ${uploaded}`)
await conn.sendFile(m.chat, dl_url, filename, null, m, null, { mimetype: ext, asDocument: true })

} catch (error) {
console.error(error)
}}

HS.command = ['mediafire', 'mf']
HS.help = ['mediafire', 'mf']
HS.tags = ["Descargas de archivos"]
HS.premium = false
HS.group = true
HS.limit = 15


export default HS

