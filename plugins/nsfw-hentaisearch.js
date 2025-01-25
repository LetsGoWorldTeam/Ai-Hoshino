let handler = async (m, { conn, text, usedPrefix, command, args }) => {
    if (!global.db.data.chats[m.chat].nsfw) throw `🚩 El grupo no admite contenido *Nsfw.*\n\n> Para activarlo un *Administrador* debe usar el comando *.nsfw on*`, m, rcanal)
    let user = global.db.data.users[m.sender].age
    if (user < 17) throw m.reply(`🚩 Necesitas tener +18 para usar este comandó`)
    
    if (!text) return m.reply(`🚩 *Ingresa el texto de algún hentai*`)
    try {
    m.reply(global.wait)
    let res = await fetch(`https://api.lolhuman.xyz/api/nhentaisearch?apikey=${lolkeysapi}&query=${text}`)    
    let json = await res.json()
    let aa = json.result[0].id
    let aa2 = json.result[0].title_native
    let res2 = await fetch(`https://api.lolhuman.xyz/api/nhentaipdf/${aa}?apikey=${lolkeysapi}`)
    let json2 = await res2.json()
    let aa3 = json2.result
    await conn.sendMessage(m.chat, { document: { url: aa3 }, mimetype: 'application/pdf', fileName: `${aa2}.pdf` }, { quoted: m })
    } catch {
    throw `🚩 Ocurrió un error`
    }}
handler.help = ['hentai <texto>']
handler.tags = ['nsfw']
handler.command = ['hentai', 'hentaisearch']

export default handler
